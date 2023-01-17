<template>
  <div v-if="shippingMethods && shippingMethods.length > 0">
    <h4>{{ $t("Shipping Method") }}</h4>
    <SfRadio v-e2e="'shipping-method'" v-for="method in shippingMethods"
      :key="shippingProviderGetters.getParcelServicePresetId(method)"
      :value="shippingProviderGetters.getParcelServicePresetId(method)" :selected="selectedMethod" name="shippingMethod"
      class="form__radio shipping" @change="selectMethod(method)"
      :label="shippingProviderGetters.getShippingMethodName(method)"
      :description="shippingProviderGetters.getShippingAmount(method)">
    </SfRadio>
    <div v-if="shippingPrivacyInformation">
      <SfCheckbox v-model="shippinngPrivacyCheck" name="Shipping Privacy"
        :label="$t('Shipping Provider will request more info')" hintMessage="Required." :required="true"
        :infoMessage="$t('Please check')" :errorMessage="$t('Please check')" valid :disabled="false"
        :selected="false" />
    </div>
  </div>
</template>

<script>
import { SfButton, SfRadio, SfCheckbox } from '@storefront-ui/vue';
import { ref, computed } from '@nuxtjs/composition-api';
import {
  useShippingProvider,
  shippingProviderGetters,
  usePaymentProvider,
  useCart
} from '@vue-storefront/plentymarkets';
export default {
  name: 'VsfShippingProvider',
  components: {
    SfButton,
    SfRadio,
    SfCheckbox
  },
  setup() {
    const selectedMethod = ref(null);
    const shippinngPrivacyCheck = ref(false);
    const {
      save,
      state: shippingProvider
    } = useShippingProvider();
    const { load: loadPaymentProviders } = usePaymentProvider();
    const { cart } = useCart();
    const shippingMethods = computed(() => shippingProviderGetters.getShippingProviders(shippingProvider.value));
    const shippingPrivacyInformation = ref(false);
    if (shippingProviderGetters.getShippingProfileId(cart?.value)) {
      selectedMethod.value = shippingProviderGetters.getShippingProfileId(cart?.value);
    }
    const selectMethod = async (method) => {
      await save({ shippingMethod: method });
      shippingPrivacyInformation.value = shippingProviderGetters.getShippingPrivacyInformation(method);
      console.log(shippingPrivacyInformation.value);
      selectedMethod.value = shippingProviderGetters.getParcelServicePresetId(method);
      await loadPaymentProviders();
    };
    return {
      shippinngPrivacyCheck,
      shippingPrivacyInformation,
      shippingMethods,
      selectedMethod,
      selectMethod,
      shippingProviderGetters
    };
  }
};
</script>
<style lang="scss" scoped>
.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }
  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
</style>
