<template>
  <div
    v-e2e="'order-summary'"
    class="order-summary"
  >
    <h3
      class="mb-5 text-sf-c-primary font-semibold"
    >
      {{ $t('ThankYou.Order Summary') }}
    </h3>

    <div class="order-summary-table">
      <div class="grid grid-cols-3 mb-2">
        <p class="font-bold">
          {{ $t('ThankYou.Order Number') }}
        </p>

        <div class="font-light">
          {{ orderNumber }}
        </div>
      </div>

      <div class="grid grid-cols-3 mb-2">
        <p class="font-bold">
          {{ $t('ThankYou.Order Date') }}
        </p>

        <div class="font-light">
          {{ orderDate }}
        </div>
      </div>

      <div class="grid grid-cols-3">
        <p class="font-bold">
          {{ $t('ThankYou.Status') }}
        </p>

        <div class="font-light">
          {{ orderStatus }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api';
import { orderGetters, useOrder } from '@vue-storefront/plentymarkets';

export default {
  name: 'OrderSummary',

  setup() {
    const { order } = useOrder();

    const orderNumber = computed(() => {
      return orderGetters.getId(order.value);
    });

    const orderDate = computed(() => {
      return orderGetters.getDate(order.value);
    });

    const orderStatus = computed(() => {
      return orderGetters.getStatus(order.value);
    });

    return {
      orderNumber,
      orderDate,
      orderStatus
    };

  }
};
</script>
