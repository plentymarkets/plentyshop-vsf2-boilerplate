<template>
  <div>
    <h4>{{ $t("VsfPaymentProvider.Payment method") }}</h4>
    <SfRadio
      v-for="method in paymentMethods"
      :key="paymentProviderGetters.getId(method)"
      :v-e2e="'payment-method'"
      :value="paymentProviderGetters.getId(method)"
      :selected="selectedMethod"
      name="paymentMethod"
      class="form__radio shipping"
      @change="selectMethod(paymentProviderGetters.getId(method))"
    >
      <template
        #label
      >
        <div class="payment-option">
          <img
            width="40px"
            :src="paymentProviderGetters.getIcon(method)"
          >
          <div>{{ paymentProviderGetters.getName(method) }}</div>
        </div>
      </template>
    </SfRadio>
  </div>
</template>

<script>
import { SfRadio } from '@storefront-ui/vue';
import { ref, computed } from '@nuxtjs/composition-api';
import { usePaymentProvider, useCart, paymentProviderGetters, useShippingProvider } from '@vue-storefront/plentymarkets';

export default {
  name: 'VsfPaymentProvider',

  components: {
    SfRadio
  },

  setup(props, { emit }) {
    const selectedMethod = ref(null);
    const { result: paymentProviders, save: setPaymentProvider } = usePaymentProvider();
    const { load: loadShippingProfiles } = useShippingProvider();
    const { cart } = useCart();
    const paymentMethods = computed(() => paymentProviders?.value?.list);

    if (paymentProviderGetters.getMethodOfPaymentId(cart?.value)) {
      selectedMethod.value = paymentProviderGetters.getMethodOfPaymentId(cart?.value);
      emit('status', selectedMethod.value);
    }

    const selectMethod = async (paymentId) => {
      await setPaymentProvider(paymentId);
      selectedMethod.value = paymentId;
      emit('status', paymentId);
      await loadShippingProfiles();
    };

    return {
      paymentMethods,
      selectedMethod,
      selectMethod,
      paymentProviders,
      paymentProviderGetters
    };
  }
};
</script>

<style lang="scss" scoped>
.payment-option {
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    margin-right: 10px;
  }
}
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
