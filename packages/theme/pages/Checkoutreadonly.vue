<template>
  <div>
    <div class="text-2xl mb-5 font-medium">
      Please Check your order
    </div>
    <div class="flex">
      <div class="flex-1">
        <h3>Invoice data</h3>
        <SfAddressPicker selected="">
          <SfAddress name="first">
            <span>Jack Smith</span>
            <span>Mazowiecka 34</span>
            <span>02-020</span>
            <span>Warszawa, Mazowieckie</span>
            <span>Poland</span>
            <span>+48 777 777 777</span>
          </SfAddress>
        </SfAddressPicker>
        <h3>Shipping data</h3>
        <SfAddressPicker selected="">
          <SfAddress name="first">
            <span>Jack Smith</span>
            <span>Mazowiecka 34</span>
            <span>02-020</span>
            <span>Warszawa, Mazowieckie</span>
            <span>Poland</span>
            <span>+48 777 777 777</span>
          </SfAddress>
        </SfAddressPicker>
        <VsfPaymentProvider
          class="spacer"
          :readonly="true"
          @status="selectionChangedPaymentProvider"
        />
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
                v-for="(value, key) in cartGetters.getItemAttributes(product, [
                  'size',
                  'color',
                ])"
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
                  :regular="
                    $n(cartGetters.getRegularItemPrice(product), 'currency')
                  "
                  :special="
                    cartGetters.getSpecialItemPrice(product) &&
                      $n(cartGetters.getSpecialItemPrice(product), 'currency')
                  "
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
              disabled
              style="background: green"
              type="button"
              class="w-full"
              size="lg"
            >
              Order now
            </SfButton>
          </div>
          <div>
            <SfButton
              disabled
              variant="secondary"
              style="background: red"
              class="w-full"
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
  SfAddressPicker
} from '@storefront-ui/vue';
import { computed } from '@nuxtjs/composition-api';
import {
  useCart,
  cartGetters,
  usePaymentProvider
} from '@vue-storefront/plentymarkets';
import { addBasePath, onSSR } from '@vue-storefront/core';
import CheckoutAddressDetails from '~/components/Checkout/CheckoutAddressDetails.vue';

export default {
  name: 'ReviewOrder',
  components: {
    SfTable,
    SfAddressPicker,
    SfButton,
    SfImage,
    SfPrice,
    VsfPaymentProvider: () => import('~/components/Checkout/VsfPaymentProvider'),
    CartTotals: () => import('~/components/CartTotals'),
    CheckoutAddressDetails
  },
  setup() {
    const { cart } = useCart();
    const { load: loadPaymentProviders } = usePaymentProvider();

    onSSR(async () => {
      await loadPaymentProviders();
    });

    return {
      addBasePath,
      products: computed(() => cartGetters.getItems(cart.value)),
      totals: computed(() => cartGetters.getTotals(cart.value)),
      tableHeaders: ['Description', 'Size', 'Color', 'Quantity', 'Amount'],
      cartGetters
    };
  }
};
</script>
