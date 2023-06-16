<template>
  <div
    :id="'paypal' + uuid"
    class="z-0 relative paypal-button"
  />
</template>

<script>
import { usePayPal, usePaymentProvider, useCart } from '@vue-storefront/plentymarkets';
import { onMounted, useContext, useRouter} from '@nuxtjs/composition-api';
import { useUiState } from '~/composables';

export default {
  name: 'PayPalProductExpressButton',
  props: {
    uuid: {
      type: String,
      required: true
    },
    product: {
      type: Object,
      required: true
    }
  },
  setup (props, context) {
    const { app, $config } = useContext();
    const { addItem } = useCart();
    const { loadScript, createOrder, approveOrder } = usePayPal();
    const router = useRouter();
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const paypalUuid = props.uuid;
    const currency = app.$cookies.get('vsf-currency') ?? $config.fallbackCurrency;

    onMounted(async () => {
      const { save: savePaymentProvider } = usePaymentProvider('paypal_express_button');
      const paypal = await loadScript(currency);

      if (paypal) {
        const FUNDING_SOURCES = [
          paypal.FUNDING.PAYPAL
        ];

        try {
          FUNDING_SOURCES.forEach((fundingSource) => {
            const btn = paypal.Buttons({
              async onApprove(data) {
                const res = await approveOrder(data.orderID, data.payerID);

                if (res.url) {
                  router.push(context.root.localePath(`/CheckoutReadOnly?payerId=${data.payerID}&orderId=${data.orderID}`));
                  if (isCartSidebarOpen.value) {
                    toggleCartSidebar();
                  }
                }
              },

              async createOrder() {
                await savePaymentProvider($config.integrationConfig.payment.paypal.paymentId);
                const res = await createOrder(fundingSource);

                return res.id ?? '';
              },

              async onClick() {
                const product = props.product;

                await addItem({ product: product.product, quantity: parseInt(product.quantity) });
              },

              style: {
                layout: 'vertical',
                label: 'buynow'
              },
              fundingSource: fundingSource
            });

            // eslint-disable-next-line max-depth
            if (btn.isEligible()) {
              btn.render('#paypal' + paypalUuid);
            }
          });
        } catch (error) {
          // console.error('failed to render the PayPal Buttons', error);
        }
      }
    });
  }
};
</script>
