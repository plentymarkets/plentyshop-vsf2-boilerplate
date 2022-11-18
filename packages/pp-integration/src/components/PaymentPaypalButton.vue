<template>
  <div id="paypal-button">
  </div>
</template>

<script lang="ts">
import { usePaypal } from '@vue-storefront/pp-plentymarkets';

export default {
  name: 'PaymentPaypalButton',
  async setup() {
    const { loadScript } = usePaypal();
    const paypal = await loadScript();

    if (paypal) {
      try {
        await paypal.Buttons().render('#paypal-button');
      } catch (error) {
        console.error('failed to render the PayPal Buttons', error);
      }
    }
  }
};
</script>
