<template>
  <div class="payment-summary">
    <h3
      class="mb-5 sf-c-primary font-semibold"
    >
      {{ $t('ThankYou.Payment Summary') }}
    </h3>

    <div class="billing mb-5">
      <p class="font-bold">
        {{ $t('ThankYou.Billing address') }}
      </p>

      <div
        v-if="orderShippingAddress.id === orderBillingAddress.id"
        class="font-light"
      >
        {{ $t('ThankYou.Same As Shipping Address') }}
      </div>

      <OrderAddress
        v-else
        :type="'billing'"
      />
    </div>

    <div
      v-if="paymentMethodName"
      class="payment"
    >
      <p class="font-bold">
        {{ $t('ThankYou.Payment method') }}
      </p>

      <div class="font-light">
        {{ paymentMethodName }}
      </div>
      <div class="font-light">
        {{ $t('ThankYou.Status') }}: {{ paymentStatus }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api';
import { orderGetters, useOrder } from '@vue-storefront/plentymarkets';
import OrderAddress from '~/components/OrderAddress.vue';

export default {
  name: 'OrderPaymentSummary',

  components: { OrderAddress },

  setup() {
    const { order } = useOrder();

    const orderBillingAddress = computed(() => {
      return orderGetters.getBillingAddress(order.value);
    });

    const orderShippingAddress = computed(() => {
      return orderGetters.getShippingAddress(order.value);
    });

    const paymentMethodName = computed(() => {
      return orderGetters.getPaymentMethodName(order.value);
    });

    const paymentStatus = computed(() => {
      return orderGetters.getPaymentStatus(order.value);
    });

    return {
      orderBillingAddress,
      orderShippingAddress,
      paymentMethodName,
      paymentStatus
    };

  }
};
</script>
