<template>
  <div class="payment-container">
    <transition name="fade">
      <slot name="price-mismatch" v-if="isMalformed">
        <div class="payment-error-container">
          {{ $t('We stopped the payment process as it looks like the total price in your cart changed since the payment was initiated. Please retry and we will create a payment request with the updated price.') }}
        </div>
      </slot>
    </transition>
    <slot name="loader" v-if="isLoading">
      <PaymentPaypalLoader />
    </slot>
    <div class="payment" ref="ppDiv" />
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/composition-api';
import { MALFORMED_PRICE_QUERY_STRING, usePaypal } from '@vsf-enterprise/pp-plentymarkets';
import { useVSFContext } from '@vue-storefront/core';
import { useCart } from '@vsf-enterprise/plentymarkets';
import { useRoute } from '@nuxtjs/composition-api';
import PaymentPaypalLoader from './PaymentPaypalLoader.vue';

export default {
  name: 'PaymentPaypalProvider',
  components: {
    PaymentPaypalLoader
  },
  props: {
    beforeLoad: {
      type: Function,
      default: details => details
    },
    beforePay: {
      type: Function,
      default: details => details
    },
    afterPay: {
      type: Function,
      default: paymentAndOrder => {}
    },
    afterSelectedDetailsChange: {
      type: Function,
      default: details => {}
    },
    onError: {
      type: Function
    }
  },
  setup(props, { root: { $route: { query } }}) {
    const isMalformed = ref(false);
    const isLoading = ref(true);
    const { exampleEndpoint, error } = usePaypal();
    const { load: loadCart, setCart } = useCart();
    const route = useRoute();

    onMounted(async () => {
      if (!process.server) {
        if (route.value.query.error === MALFORMED_PRICE_QUERY_STRING) {
          isMalformed.value = true;
        }
      }

      isLoading.value = false;
    });

    return {
      isLoading,
      isMalformed,
      error
    };
  }
};
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .7s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .payment-container {
    margin-top: 40px;
  }

  .payment-error-container {
    background: #d12727;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
    margin-bottom: 10px;
  }
</style>
