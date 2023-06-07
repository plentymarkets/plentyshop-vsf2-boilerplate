<template>
  <div v-if="shippingMethods && shippingMethods.length > 0">
    <h4>{{ $t("VsfShippingProvider.Shipping method") }}</h4>
    <SfRadio
      v-for="method in shippingMethods"
      :key="shippingProviderGetters.getParcelServicePresetId(method)"
      v-e2e="'shipping-method'"
      :value="shippingProviderGetters.getParcelServicePresetId(method)"
      :selected="selectedMethodId"
      name="shippingMethod"
      class="form__radio shipping"
      :label="shippingProviderGetters.getShippingMethodName(method)"
      :description="providerAmount(method)"
      :disabled="readonly"
      @change="selectMethod(method)"
    />

    <div v-if="shippingProviderGetters.getDataPrivacyAgreementHint(selectedMethod)">
      <SfCheckbox
        v-model="shippingPrivacyCheck"
        class="mt-5"
        name="Shipping Privacy"
        :label="$t('VsfShippingProvider.ShowDataPrivacyAgreementHint', {
          parcelServiceInformation: shippingProviderGetters.getShippingMethodName(selectedMethod)
        })"
        :selected="false"
        :disabled="readonly"
        @change="val => changeHint(val)"
      />
    </div>
  </div>
</template>

<script>
import { SfRadio, SfCheckbox } from '@storefront-ui/vue';
import { ref, computed, watch, useContext } from '@nuxtjs/composition-api';
import {
  useShippingProvider,
  shippingProviderGetters,
  usePaymentProvider,
  useCart
} from '@vue-storefront/plentymarkets';
import { keyBy } from 'lodash';

export default {
  name: 'VsfShippingProvider',

  components: {
    SfRadio,
    SfCheckbox
  },

  props: {
    readonly: true
  },

  setup(props, { emit }) {
    const { app } = useContext();

    const selectedMethodId = ref(null);
    const selectedMethod = ref(null);
    const shippingPrivacyCheck = ref(false);

    const {
      save,
      state: shippingProvider,
      loading: loadingShippingProvider
    } = useShippingProvider();

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

    const providerAmount = (method) => {
      const amount = shippingProviderGetters.getShippingAmount(method);

      return amount !== '0' ? amount : app.i18n.t('VsfShippingProvider.Free');
    };

    watch(loadingShippingProvider, async (loading) => {
      if (!loading) {
        selectedMethodId.value = shippingProviderGetters.getShippingProfileId(cart?.value);

        selectedMethod.value = shippingMethodsById.value[selectedMethodId.value];
      }
    }, { immediate: true });

    const changeHint = (val) => {
      emit('shippingPrivacyHintAccepted', val);
    };

    return {
      loadingShippingProvider,
      shippingPrivacyCheck,
      shippingMethods,
      selectedMethodId,
      selectedMethod,
      selectMethod,
      shippingProviderGetters,
      providerAmount,
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
