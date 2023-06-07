<template>
  <div
    :id="'paypal' + paypalUuid"
    class="z-0 relative paypal-button"
  />
</template>

<script>
import { usePaypal } from '@vue-storefront/pp-plentymarkets';
import { usePayPal } from '@vue-storefront/plentymarkets';
import { onMounted, useContext, useRouter} from '@nuxtjs/composition-api';
import useUiState from '../../../theme/_theme/composables/useUiState';

export default {
  name: 'PaymentPaypalButton',
  props: ['paypalUuid'],
  setup (props) {
    const { app } = useContext();
    const { loadScript } = usePaypal();
    const { createOrder, approveOrder } = usePayPal();
    const router = useRouter();
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();

    const paypalUuid = props.paypalUuid;

    console.log('currency', app.i18n);

    onMounted(async () => {
      const paypal = await loadScript('EUR');
      const FUNDING_SOURCES = [
        paypal.FUNDING.PAYPAL,
        paypal.FUNDING.PAYLATER
      ];

      if (paypal) {
        try {
          FUNDING_SOURCES.forEach((fundingSource) => {
            const btn = paypal.Buttons({
              async onApprove(data) {
                console.log('OnApproveData', data);

                const res = await approveOrder(data.orderID, data.payerID);

                console.log('onApprove', res);

                if (res.url) {
                  router.push(`/CheckoutReadOnly?payerId=${data.payerID}&orderId=${data.orderID}`);
                  if (isCartSidebarOpen.value) {
                    toggleCartSidebar();
                  }
                }
              },
              // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
              async createOrder(data, actions) {
                const res = await createOrder(fundingSource);

                console.log('orderId', res.id);

                return res.id ?? '';
              },
              onClick(data) {
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
    });
  }
};
</script>
