<template>
  <div>
    <VsfShippingProvider class="spacer" />
    <VsfPaymentProvider
      class="spacer"
      @status="isPaymentReady = true"
    />
    <SfTable class="sf-table--bordered table desktop-only">
      <SfTableHeading class="table__row">
        <SfTableHeader class="table__header table__image">
          {{ $t('Payment.Item') }}
        </SfTableHeader>
        <SfTableHeader
          v-for="tableHeader in tableHeaders"
          :key="tableHeader"
          class="table__header"
          :class="{ table__description: tableHeader === 'Description' }"
        >
          {{ tableHeader }}
        </SfTableHeader>
      </SfTableHeading>
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
            :regular="$n(cartGetters.getItemPrice(product).regular, 'currency')"
            :special="cartGetters.getItemPrice(product).special && $n(cartGetters.getItemPrice(product).special, 'currency')"
            class="product-price"
          />
        </SfTableData>
      </SfTableRow>
    </SfTable>
    <div class="summary">
      <div class="summary__group">
        <CartTotals />
        <SfCheckbox
          v-model="terms"
          v-e2e="'terms'"
          name="terms"
          class="summary__terms"
        >
          <template #label>
            <div class="sf-checkbox__label">
              {{ $t('Payment.I agree to') }} <SfLink link="#">
                {{ $t('Payment.Terms and conditions') }}
              </SfLink>
            </div>
          </template>
        </SfCheckbox>

        <div
          v-e2e="'payment-summary-buttons'"
          class="summary__action"
        >
          <SfButton
            :disabled="loading || !isPaymentReady || !terms"
            class="summary__action-button"
            @click="processOrder"
          >
            {{ $t('Payment.Make an order') }}
          </SfButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SfTable,
  SfCheckbox,
  SfButton,
  SfImage,
  SfPrice,
  SfLink
} from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { ref, computed, useRouter } from '@nuxtjs/composition-api';
import { useMakeOrder, useCart, cartGetters, orderGetters, useShippingProvider, usePaymentProvider } from '@vue-storefront/plentymarkets';
import { addBasePath } from '@vue-storefront/core';

export default {
  name: 'ReviewOrder',
  components: {
    SfTable,
    SfCheckbox,
    SfButton,
    SfImage,
    SfPrice,
    SfLink,
    VsfPaymentProvider: () => import('~/components/Checkout/VsfPaymentProvider'),
    VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider'),
    CartTotals: () => import('~/components/CartTotals')
  },
  setup(props, context) {
    const router = useRouter();
    const { cart, load, setCart } = useCart();
    const { order, make, loading } = useMakeOrder();
    const { load: loadShippingProvider } = useShippingProvider();
    const { load: loadPaymentProviders } = usePaymentProvider();

    const isPaymentReady = ref(false);
    const terms = ref(false);

    onSSR(async () => {
      await load();
      await loadShippingProvider();
      await loadPaymentProviders();
    });

    const processOrder = async () => {
      const paymentMethodId = cart.value.methodOfPaymentId;
      await make({paymentId: paymentMethodId});
      const thankYouPath = { name: 'thank-you', query: { order: orderGetters.getId(order.value) }};
      router.push(context.root.localePath(thankYouPath));
      setCart({items: []});
    };

    return {
      addBasePath,
      router,
      isPaymentReady,
      terms,
      loading,
      products: computed(() => cartGetters.getItems(cart.value)),
      totals: computed(() => cartGetters.getTotals(cart.value)),
      tableHeaders: ['Description', 'Size', 'Color', 'Quantity', 'Amount'],
      cartGetters,
      processOrder
    };
  }
};
</script>

<style lang="scss" scoped>
.spacer {
  margin: var(--spacer-xl) 0;
}
.table {
  margin: 0 0 var(--spacer-base) 0;
  &__row {
    justify-content: space-between;
  }
  @include for-desktop {
    &__header {
      text-align: center;
      &:last-child {
        text-align: right;
      }
    }
    &__data {
      text-align: center;
    }
    &__description {
      text-align: left;
      flex: 0 0 12rem;
    }
    &__image {
      --image-width: 5.125rem;
      text-align: left;
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
.product-sku {
  color: var(--c-text-muted);
  font-size: var(--font-size--sm);
}
.price {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
.product-price {
  --price-font-size: var(--font-size--base);
}
.summary {
  &__terms {
    margin: var(--spacer-base) 0 0 0;
  }
  &__total {
    margin: 0 0 var(--spacer-sm) 0;
    flex: 0 0 16.875rem;
  }
  &__action {
    @include for-desktop {
      display: flex;
      margin: var(--spacer-xl) 0 0 0;
    }
  }
  &__action-button {
    margin: 0;
    width: 100%;
    margin: var(--spacer-sm) 0 0 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    &--secondary {
      @include for-desktop {
        text-align: right;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 0 0;
    width: 100%;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    color:  var(--c-white);
    &:hover {
      color:  var(--c-white);
    }
  }
  &__property-total {
    margin: var(--spacer-xl) 0 0 0;
  }
}
.property {
  margin: 0 0 var(--spacer-sm) 0;
  &__name {
    color: var(--c-text-muted);
  }
}
.accordion {
  margin: 0 0 var(--spacer-xl) 0;
  &__item {
    display: flex;
    align-items: flex-start;
  }
  &__content {
    flex: 1;
  }
  &__edit {
    flex: unset;
  }
}
.content {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-text);
  &:last-child {
    margin: 0;
  }
  &__label {
    font-weight: var(--font-weight--normal);
  }
}
</style>
