<template>
  <div v-if="shippingMethods && shippingMethods.length > 0">
    <h4>{{ $t("VsfShippingProvider.Shipping method") }}</h4>
    <SfRadio
      v-for="method in shippingMethods"
      :key="shippingProviderGetters.getParcelServicePresetId(method)"
      v-e2e="'shipping-method'"
      :value="shippingProviderGetters.getParcelServicePresetId(method)"
      :selected="selectedMethod"
      name="shippingMethod"
      class="form__radio shipping"
      :label="shippingProviderGetters.getShippingMethodName(method)"
      :description="getShippingAmount(method)"
      @change="selectMethod(method)"
    />
  </div>
</template>

<script>
import { SfRadio } from '@storefront-ui/vue';
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
    SfRadio
  },

  setup () {
    const selectedMethod = ref(null);
    const {
      save,
      state: shippingProvider
    } = useShippingProvider();
    const { load: loadPaymentProviders } = usePaymentProvider();
    const { cart, load: loadCart, setCart } = useCart();
    const shippingMethods = computed(() => shippingProviderGetters.getShippingProviders(shippingProvider.value));

    if (shippingProviderGetters.getShippingProfileId(cart?.value)) {
      selectedMethod.value = shippingProviderGetters.getShippingProfileId(cart?.value);
    }
    const selectMethod = async (method) => {
      await save({ shippingMethod: shippingProviderGetters.getValue(method)});
      selectedMethod.value = shippingProviderGetters.getParcelServicePresetId(method);
      await loadPaymentProviders();
      setCart(null);
      await loadCart();
    };

    const getShippingAmount = (method) => {
      return shippingProviderGetters.getShippingAmount(method) === '0' ? 'Free' : shippingProviderGetters.getShippingAmount(method);
    };

    return {
      getShippingAmount,
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
