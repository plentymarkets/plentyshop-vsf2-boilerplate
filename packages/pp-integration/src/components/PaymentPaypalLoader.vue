<template>
  <div>
    Loading Paypal button...
  </div>
</template>

<script lang="ts">
import { usePaypal } from '@vue-storefront/pp-plentymarkets';

export default {
  name: 'PaymentPaypalLoader',
  setup() {
    const { exampleEndpoint } = usePaypal();
    exampleEndpoint();
  }
};
</script>
