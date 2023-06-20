<template>
  <div
    v-if="paypalUuid"
    :id="'paypal-' + paypalUuid"
    class="z-0 relative paypal-button"
    :class="{ 'opacity-50 pointer-events-none': disabledButton }"
  />
</template>

<script>
import {usePayPal, usePaymentProvider, useCart, orderGetters, useMakeOrder} from '@vue-storefront/plentymarkets';
import {ref, onMounted, useContext, useRouter, computed, watch} from '@nuxtjs/composition-api';
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
  setup (props, context) {
    const { app, $config } = useContext();
    const { loadScript, createOrder, approveOrder, executePayPalOrder } = usePayPal();
    const { setCart } = useCart();
    const { make, order } = useMakeOrder();
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const paypalUuid = ref(null);
    const disabled = ref(props.disabled);
    const currency = app.$cookies.get('vsf-currency') ?? $config.fallbackCurrency;
    const type = props.value.type ?? 'CartPreview';
    const router = useRouter();

    watch(() => props.disabled, (selection) => {
      disabled.value = selection;
    });

    onMounted(() => {
      paypalUuid.value = uuid();
    });

    onMounted(async () => {
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

                if (res.url && (type === 'CartPreview' || type === 'SingleItem')) {
                  router.push(context.root.localePath(`/CheckoutReadOnly?payerId=${data.payerID}&orderId=${data.orderID}`));
                }

                if (type === 'Checkout') {
                  await make({
                    paymentId: $config.integrationConfig.payment.paypal.paymentId,
                    shippingPrivacyHintAccepted: true
                  });

                  await executePayPalOrder(
                    'paypal',
                    parseInt(orderGetters.getId(order.value)),
                    data.orderID,
                    $config.integrationConfig.payment.paypal.merchantId
                  );

                  const thankYouPath = {
                    name: 'thank-you',
                    query: {
                      orderId: orderGetters.getId(order.value),
                      accessKey: orderGetters.getAccessKey(order.value)
                    }
                  };

                  router.push(context.root.localePath(thankYouPath));
                  setCart({ items: [] });
                }

                if (isCartSidebarOpen.value) {
                  toggleCartSidebar();
                }
              },

              async createOrder() {
                await savePaymentProvider($config.integrationConfig.payment.paypal.paymentId);
                const res = await createOrder(fundingSource);

                return res.id ?? '';
              },

              async onClick() {
                if (disabled.value) {
                  return false;
                }

                if (type === 'SingleItem') {
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
      paypalUuid: computed(() => paypalUuid.value),
      disabledButton: computed(() => disabled.value)
    };
  }
};
</script>
