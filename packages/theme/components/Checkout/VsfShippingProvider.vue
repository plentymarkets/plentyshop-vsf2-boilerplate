<template>
  <div v-if="shippingMethods && shippingMethods.length > 0">
    <h4>{{ $t("Shipping Method") }}</h4>
    <SfRadio v-e2e="'shipping-method'" v-for="method in shippingMethods"
      :key="shippingProviderGetters.getParcelServicePresetId(method)"
      :value="shippingProviderGetters.getParcelServicePresetId(method)" :selected="selectedMethodId" name="shippingMethod"
      class="form__radio shipping" @change="selectMethod(method)"
      :label="shippingProviderGetters.getShippingMethodName(method)"
      :description="shippingProviderGetters.getShippingAmount(method)">
    </SfRadio>
    <div v-if="shippingProviderGetters.getDataPrivacyAgreementHint(selectedMethod)">
      <SfCheckbox v-model="shippinngPrivacyCheck" name="Shipping Privacy"
        :label="$t('ShowDataPrivacyAgreementHint', { parcelServiceInformation: shippingProviderGetters.getShippingMethodName(selectedMethod) })"
        :selected="false"
        @change="val => changeHint(val)"
         />
    </div>
  </div>
</template>

<script>
import { SfButton, SfRadio, SfCheckbox } from '@storefront-ui/vue';
import { ref, computed, watch } from '@nuxtjs/composition-api';
import { keyBy } from 'lodash';
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
  setup(props, { emit }) {
    const selectedMethodId = ref(null);
    const selectedMethod = ref(null);
    const shippinngPrivacyCheck = ref(false);
    const initialSelection = ref(true);
    const {
      save,
      state: shippingProvider, loading: loadingShippingProvider } = useShippingProvider();
    const { load: loadPaymentProviders } = usePaymentProvider();
    const { cart } = useCart();
    const shippingMethods = computed(() => shippingProviderGetters.getShippingProviders(shippingProvider.value));
    const shippingMethodsById = computed(() => keyBy(shippingMethods.value, 'parcelServicePresetId'));
    if (shippingProviderGetters.getShippingProfileId(cart?.value)) {
      selectedMethodId.value = shippingProviderGetters.getShippingProfileId(cart?.value);
    }
    const selectMethod = async (method) => {
      await save({ shippingMethod: shippingProviderGetters.getValue(method)});
      selectedMethod.value = method;
      selectedMethodId.value = shippingProviderGetters.getParcelServicePresetId(method);
      await loadPaymentProviders();
    };
    watch(loadingShippingProvider, async (newLoading) => {
      if (!newLoading && initialSelection.value) {
        initialSelection.value = false;
        selectedMethodId.value = shippingProviderGetters.getShippingProfileId(cart?.value);
        const method = shippingMethodsById.value[selectedMethodId.value];
        await selectMethod(method);
      }
    }, { immediate: true });

    // onMounted(async () => {
    //   if (Object.keys(shippingMethods.value).length) {
    //     selectedMethodId.value = shippingProviderGetters.getShippingProfileId(cart?.value);
    //     const method = shippingMethodsById.value[selectedMethodId.value];
    //     await selectMethod(method);
    //   }
    // });

    const changeHint = (val) => {
      emit('shippingPrivacyHintAccepted', val);
    };

    return {
      loadingShippingProvider,
      shippinngPrivacyCheck,
      shippingMethods,
      selectedMethodId,
      selectedMethod,
      selectMethod,
      shippingProviderGetters,
      changeHint
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
