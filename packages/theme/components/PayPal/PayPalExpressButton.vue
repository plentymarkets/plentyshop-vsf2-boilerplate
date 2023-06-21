<template>
  <div
    v-if="paypalUuid"
    :id="'paypal-' + paypalUuid"
    class="z-0 relative paypal-button"
    :class="{ 'opacity-50 pointer-events-none': disabled }"
  />
</template>

<script>
import {usePayPal, usePaymentProvider, useCart, orderGetters, useMakeOrder, paypalGetters} from '@vue-storefront/plentymarkets';
import {ref, onMounted, useContext, useRouter, computed} from '@nuxtjs/composition-api';
import { useUiState } from '~/composables';
import { v4 as uuid } from 'uuid';

export default {
  name: 'PayPalExpressButton',
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const TypeCartPreview = 'CartPreview';
    const TypeSingleItem = 'SingleItem';
    const TypeCheckout = 'Checkout';

    const { app, $config } = useContext();
    const { loadScript, createOrder, approveOrder, executePayPalOrder } = usePayPal();
    const { setCart } = useCart();
    const { make, order } = useMakeOrder();
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const paypalUuid = ref(null);
    const currency = app.$cookies.get('vsf-currency') ?? $config.fallbackCurrency;
    const type = props.value.type ?? TypeCartPreview;
    const router = useRouter();

    const paymentId = paypalGetters.getPaymentId();
    const merchantId = paypalGetters.getMerchantId();

    onMounted(async () => {
      paypalUuid.value = uuid();
      const { save: savePaymentProvider } = usePaymentProvider('paypal_express_button');
      const { addItem } = useCart();
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

                if (res.url && (type === TypeCartPreview || type === TypeSingleItem)) {
                  router.push(app.localePath(`/CheckoutReadOnly?payerId=${data.payerID}&orderId=${data.orderID}`));
                }

                if (type === TypeCheckout) {
                  await make({
                    paymentId: paymentId,
                    shippingPrivacyHintAccepted: true
                  });

                  await executePayPalOrder(
                    'paypal',
                    parseInt(orderGetters.getId(order.value)),
                    data.orderID,
                    merchantId
                  );

                  const thankYouPath = {
                    name: 'thank-you',
                    query: {
                      orderId: orderGetters.getId(order.value),
                      accessKey: orderGetters.getAccessKey(order.value)
                    }
                  };

                  router.push(app.localePath(thankYouPath));
                  setCart({ items: [] });
                }

                if (isCartSidebarOpen.value) {
                  toggleCartSidebar();
                }
              },

              async createOrder() {
                await savePaymentProvider(paymentId);
                const res = await createOrder(fundingSource);

                return res.id ?? '';
              },

              async onClick() {
                if (props.disabled) {
                  return false;
                }

                if (type === TypeSingleItem) {
                  await addItem(props.value.data);
                }
              },

              style: {
                layout: 'vertical',
                label: 'buynow'
              },
              fundingSource: fundingSource
            });

            // eslint-disable-next-line max-depth
            if (btn.isEligible() && document.getElementById('paypal-' + paypalUuid.value)) {
              btn.render('#paypal-' + paypalUuid.value);
            }
          });
        } catch (error) {
          // console.error('failed to render the PayPal Buttons', error);
        }
      }
    });

    return {
      paypalUuid: computed(() => paypalUuid.value)
    };
  }
};
</script>
