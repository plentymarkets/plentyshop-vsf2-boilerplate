<template>
  <div
    :id="'paypal' + paypalUuid"
    class="z-0 relative paypal-button"
  />
</template>

<script lang="ts">
import { usePaypal } from '@vue-storefront/pp-plentymarkets';
import { OnApproveData, CreateOrderData, CreateOrderActions } from '@paypal/paypal-js';
import { usePayPal } from '@vue-storefront/plentymarkets';
import { useContext } from '@nuxtjs/composition-api';

export default {
  name: 'PaymentPaypalButton',
  props: ['paypalUuid'],
  async setup(props) {
    const { app } = useContext();
    const { loadScript } = usePaypal();
    const { createOrder, approveOrder } = usePayPal();
    const paypal = await loadScript('EUR');

    const paypalUuid = props.paypalUuid;

    console.log('currency', app.i18n);

    const FUNDING_SOURCES = [
      paypal.FUNDING.PAYPAL,
      paypal.FUNDING.PAYLATER
    ];

    if (paypal) {
      try {
        FUNDING_SOURCES.forEach((fundingSource) => {
          const btn = paypal.Buttons({
            async onApprove(data: OnApproveData) {
              console.log('OnApproveData', data);

              const res = await approveOrder(data.orderID, data.payerID);

              console.log('onApprove', res);

              if (res.url) {
                // window.location.href = res.url;
              }
            },
            async createOrder(data: CreateOrderData, actions: CreateOrderActions) {
              const res = await createOrder(fundingSource);

              console.log('orderId', res.id);

              return res.id ?? '';
            },
            onClick(data: unknown) {
              console.log('onClick', data);
            },
            style: {
              layout: 'vertical'
            },
            fundingSource: fundingSource
          });

          // eslint-disable-next-line max-depth
          if (btn.isEligible()) {
            btn.render('#paypal' + paypalUuid);
          }
        });
      } catch (error) {
        console.error('failed to render the PayPal Buttons', error);
      }
    }
  }
};
</script>
