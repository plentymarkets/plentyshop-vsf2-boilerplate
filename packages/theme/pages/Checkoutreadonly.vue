<template>
  <div>
    <div class="text-2xl mb-5 font-medium">
      Please Check your order
    </div>
    <div class="flex">
      <div class="flex-1">
        <div class="my-2">
          <div class="text-xl mb-2 font-medium">
            Invoice address
          </div>
          <div class="bg-gray-100 p-2">
            <div>
              John doe
            </div>
            <div>
              123 123
            </div>
            <div>
              435500 dasd
            </div>
            <div>
              Germany
            </div>
            <div>
              test@plentymarkets.com
            </div>
          </div>
        </div>

        <div class="my-2">
          <div class="text-xl mb-2 font-medium">
            Delivery address
          </div>
          <div class="bg-gray-100 p-2">
            <div>
              John Doe
            </div>
            <div>
              123 123
            </div>
            <div>
              435500 test
            </div>
            <div>
              Germany
            </div>
            <div>
              test@plentymarkets.com
            </div>
          </div>
        </div>
        <div class="my-2">
          <div class="text-xl mb-2 font-medium">
            Shipping address
          </div>
          <div class="bg-gray-100 p-2">
            <div>
              John doe
            </div>
            <div>
              123 123
            </div>
            <div>
              test 12312
            </div>
            <div>
              Germany
            </div>
            <div>
              test@plentymarkets.com
            </div>
          </div>
        </div>

        <div class="my-2">
          <div class="text-xl mb-2 font-medium">
            Payment method
          </div>
          <div class="bg-gray-100 p-2">
            <div>
              Paypall
            </div>
            <div>
              Other
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div class="text-xl mb-2 font-medium">
          Shopping Cart
        </div>
        <div class="p-5">
          <SfTable class="sf-table--bordered table">
            <SfTableRow
              v-for="(product, index) in products"
              :key="index"
              class="table__row"
            >
              <SfTableData class="table__image">
                <SfImage
                  :width="100"
                  :height="100"
                  :src="addBasePath(cartGetters.getItemImage(product))"
                  :alt="cartGetters.getItemName(product)"
                />
              </SfTableData>
              <SfTableData class="table__data table__description table__data">
                <div class="product-title">
                  {{ cartGetters.getItemName(product) }}
                </div>
                <div class="product-sku">
                  {{ cartGetters.getItemSku(product) }}
                </div>
              </SfTableData>
              <SfTableData
                v-for="(value, key) in cartGetters.getItemAttributes(product, ['size', 'color'])"
                :key="key"
                class="table__data"
              >
                {{ value }}
              </SfTableData>
              <SfTableData class="table__data">
                {{ cartGetters.getItemQty(product) }}
              </SfTableData>
              <SfTableData class="table__data price">
                <SfPrice
                  :regular="$n(cartGetters.getRegularItemPrice(product), 'currency')"
                  :special="cartGetters.getSpecialItemPrice(product) && $n(cartGetters.getSpecialItemPrice(product), 'currency')"
                  class="product-price"
                />
              </SfTableData>
            </SfTableRow>
          </SfTable>
          <div class="summary">
            <div class="summary__group">
              <CartTotals />
            </div>
          </div>
          <div class="mb-2">
            <SfButton
              type="button"
              class="w-full bg-sf-c-primary"
              size="lg"
              :disabled="loading"
              @click="checkout"
            >
              <SfLoader
                :class="{ loader: loading }"
                :loading="loading"
              >
                <div>Order now</div>
              </SfLoader>
            </SfButton>
          </div>
          <div>
            <SfButton
              disabled
              variant="secondary"
              class="w-full bg-sf-c-secondary"
            >
              cancel order
            </SfButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SfTable,
  SfButton,
  SfImage,
  SfPrice,
  SfLoader
} from '@storefront-ui/vue';
import {computed, useRoute, useRouter} from '@nuxtjs/composition-api';
import {useMakeOrder, useCart, cartGetters, orderGetters, usePayPal} from '@vue-storefront/plentymarkets';
import {addBasePath, sharedRef} from '@vue-storefront/core';

export default {
  name: 'ReviewOrder',
  components: {
    SfTable,
    SfButton,
    SfImage,
    SfPrice,
    SfLoader,
    CartTotals: () => import('~/components/CartTotals')
  },
  setup(props, context) {
    const { cart, setCart } = useCart();
    const { make, order } = useMakeOrder();
    const { executePayPalOrder } = usePayPal();
    const router = useRouter();
    const route = useRoute();
    const loading = sharedRef(false, 'useCheckout-loading');

    const checkout = async () => {
      loading.value = true;

      await make({
        paymentId: 6001,
        shippingPrivacyHintAccepted: true
      });

      await executePayPalOrder('paypal', parseInt(orderGetters.getId(order.value)), route.value.query.orderId ?? '', 'N94FCPY5FXPMC');

      const thankYouPath = { name: 'thank-you',
        query: {
          orderId: orderGetters.getId(order.value),
          accessKey: orderGetters.getAccessKey(order.value)
        }};

      router.push(context.root.localePath(thankYouPath));
      setCart({items: []});

      loading.value = false;
    };

    return {
      checkout,
      addBasePath,
      loading: computed(() => loading.value),
      products: computed(() => cartGetters.getItems(cart.value)),
      totals: computed(() => cartGetters.getTotals(cart.value)),
      tableHeaders: ['Description', 'Size', 'Color', 'Quantity', 'Amount'],
      cartGetters
    };
  }
};
</script>
