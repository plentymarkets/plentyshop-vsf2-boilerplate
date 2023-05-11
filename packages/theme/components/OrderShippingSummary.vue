<template>
  <div class="shipping-summary">
    <h3
      class="mb-5 sf-c-primary font-semibold"
    >
      {{ $t('ThankYou.Shipping Summary') }}
    </h3>

    <div class="shipping-address mb-5">
      <p class="font-bold">
        {{ $t('ThankYou.Ship To') }}
      </p>

      <OrderAddress />
    </div>

    <div
      v-if="shippingProvider"
      class="shipping-method"
    >
      <p class="font-bold">
        {{ $t('ThankYou.Shipping Method') }}
      </p>

      <div class="font-light">
        {{ shippingProvider }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api';
import { orderGetters, useOrder } from '@vue-storefront/plentymarkets';
import OrderAddress from '~/components/OrderAddress.vue';

export default {
  name: 'OrderShippingSummary',

  components: { OrderAddress },

  setup() {
    const { order } = useOrder();

    const shippingProvider = computed(() => {
      return orderGetters.getShippingProvider(order.value);
    });

    return {
      shippingProvider
    };

  }
};
</script>

<style scoped>

</style>
