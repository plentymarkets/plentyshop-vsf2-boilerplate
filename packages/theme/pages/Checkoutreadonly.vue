<template>
  <div>
    <h1>Review your order</h1>
    <SfDivider class="mb-sf-xl" />
    <div class="flex opacity-80 pointer-events-none">
      <div class="flex-1">
        <div class="flex gap-sf-lg flex-col font-sf-secondary">
          <div>
            <h3 class="mb-3">
              Invoice to:
            </h3>
            <div class="flex flex-col">
              <span>Jack Smith</span>
              <span>Mazowiecka 34</span>
              <span>02-020</span>
              <span>Warszawa, Mazowieckie</span>
              <span>Poland</span>
              <span>+48 777 777 777</span>
            </div>
          </div>
          <div>
            <h3 class="mb-3">
              Shipping to:
            </h3>
            <div class="flex flex-col">
              <span>Jack Smith</span>
              <span>Mazowiecka 34</span>
              <span>02-020</span>
              <span>Warszawa, Mazowieckie</span>
              <span>Poland</span>
              <span>+48 777 777 777</span>
            </div>
          </div>
          <div>
            <h3 class="mb-3">
              Payment method
            </h3>
            <div class="flex items-center gap-5">
              <img
                src="https://cdn02.plentymarkets.com/mevofvd5omld/plugin/2/paypal/images/logos/de-pp-logo.png"
                style="width: 60px"
              >
              <span>Paypal</span>
            </div>
          </div>

          <div>
            <h3 class="mb-3">
              Shipping method
            </h3>
            <div class="flex items-center gap-5">
              <img
                src="https://assets.dpdhl-brands.com/guides/dhl/guides-de/design-basics/logo-and-claim/logo/versions-01.png"
                style="width: 60px"
              >
              <span>DHL</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1">
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
        </div>
      </div>
    </div>
    <div>
      <SfCheckbox
        v-e2e="'terms'"
        name="terms"
        class="summary__terms my-sf-lg"
      >
        <template #label>
          <div class="sf-checkbox__label">
            {{ $t('Payment.I agree to') }} <SfLink link="#">
              {{ $t('Payment.Terms and conditions') }}
            </SfLink>
          </div>
        </template>
      </SfCheckbox>
      <div class="my-2">
        <SfButton
          type="button"
          class="w-full color-primary"
          size="lg"
        >
          Order now
        </SfButton>
      </div>
      <div>
        <SfButton
          class="w-full color-secondary"
        >
          cancel order
        </SfButton>
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
  SfCheckbox,
  SfDivider,
  SfLink
} from '@storefront-ui/vue';
import { computed } from '@nuxtjs/composition-api';
import {
  useCart,
  cartGetters,
  usePaymentProvider
} from '@vue-storefront/plentymarkets';
import { addBasePath, onSSR } from '@vue-storefront/core';

export default {
  name: 'ReviewOrder',
  components: {
    SfTable,
    SfButton,
    SfLink,
    SfImage,
    SfDivider,
    SfPrice,
    SfCheckbox,
    CartTotals: () => import('~/components/CartTotals')
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
