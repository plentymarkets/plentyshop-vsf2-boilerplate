<template>
  <div>
    <div class="highlighted top-items">
      <SfHeading :level="3" :title="$t('CartPreview.Order summary')" class="sf-heading--left sf-heading--no-underline title" />
      <a class="notice__link edit-cart-link" @click='toggleCartSidebar'>{{ $t('CartPreview.Edit cart') }}</a>
    </div>
    <div class="highlighted">
      <SfProperty :name="$t('CartPreview.Products')" :value="totalItems"
                  class="sf-property--full-width sf-property--large property" />
      <CartTotals></CartTotals>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfProperty } from '@storefront-ui/vue';
import { computed, defineComponent } from '@nuxtjs/composition-api';
import { cartGetters, useCart } from '@vue-storefront/plentymarkets';
import { useUiState } from '~/composables';
export default defineComponent({
  name: 'CartPreview',
  components: {
    SfHeading,
    SfProperty,
    CartTotals: () => import('~/components/CartTotals')
  },
  setup() {
    const { cart, removeItem, updateItemQty } = useCart();
    const { toggleCartSidebar } = useUiState();
    const products = computed(() => cartGetters.getItems(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));

    return {
      cart,
      totalItems,
      products,
      totals,
      removeItem,
      updateItemQty,
      cartGetters,
      toggleCartSidebar
    };
  }
});
</script>

<style lang="scss" scoped>
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-xl) var(--spacer-xl) 0;

  &:last-child {
    padding-bottom: var(--spacer-xl);
  }
}

.total-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacer-xl);
}

.property {
  margin-bottom: var(--spacer-base);
}

.property-total {
  margin-top: var(--spacer-xl);
  padding-top: var(--spacer-lg);
  font-size: var(--font-size-xl);
  border-top: var(--c-white) 1px solid;
  --property-name-font-weight: var(--font-weight--semibold);
  --property-name-color: var(--c-text);
}

.characteristic {
  &:not(:last-child) {
    margin-bottom: var(--spacer-base);
  }
}
.top-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-cart-link {
  color: var(--_c-blue-primary);
  cursor: pointer;
  text-align: right;
}
</style>
