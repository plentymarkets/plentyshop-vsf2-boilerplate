<template>
  <div>
      <SfProperty
      :name="$t('CartPreview.Subtotal')"
      class="sf-property--full-width spacer"
    >
      <template #value>
        <SfPrice :regular="$n(cartGetters.getSubTotal(totals), 'currency')" />
      </template>
    </SfProperty>

    <SfProperty
      :name="$t('CartPreview.Shipping')"
      class="sf-property--full-width"
    >
      <template #value>
        <SfPrice :regular="$n(cartGetters.getShippingAmount(totals), 'currency')" />
      </template>
    </SfProperty>

    <SfProperty
      :name="$t('CartPreview.Vat total') + ' (' + cartGetters.getVatValue(totals) + '%)'"
      class="sf-property--full-width"
    >
      <template #value>
        <SfPrice :regular="$n(cartGetters.getVatAmount(totals), 'currency')" />
      </template>
    </SfProperty>
    <SfDivider />
    <SfProperty
      :name="$t('CartPreview.Total')"
      class="sf-property--full-width sf-property--large my-cart__total-price spacer"
    >
      <template #value>
        <SfPrice :regular="$n(cartGetters.getTotal(totals), 'currency')" />
      </template>
    </SfProperty>

    <SfProperty
      v-if="couponDiscount"
      :name="$t('CartPreview.Coupon Discount')"
      class="sf-property--full-width"
    >
      <template #value>
        <SfPrice :regular="$n(couponDiscount, 'currency')" />
      </template>
    </SfProperty>
    <SfDivider />
    <SfProperty
      :name="$t('CartPreview.To be payed')"
      class="sf-property--full-width sf-property--large my-cart__total-price spacer"
    >
      <template #value>
        <SfPrice :regular="$n(cartGetters.getToBePayed(totals), 'currency')" />
      </template>
    </SfProperty>
  </div>
</template>
<script>
import {
  SfProperty,
  SfPrice,
  SfDivider
} from '@storefront-ui/vue';
import { computed } from '@nuxtjs/composition-api';
import { useCart, cartGetters } from '@vue-storefront/plentymarkets';

export default {
  name: 'CartTotals',
  components: {
    SfProperty,
    SfPrice,
    SfDivider
  },
  setup() {
    const { cart } = useCart();

    const totals = computed(() => cartGetters.getTotals(cart.value));
    const couponDiscount = computed(() => cartGetters.getCouponDiscount(totals));

    return {
      cart,
      cartGetters,
      totals,
      couponDiscount
    };
  }
};
</script>
<style lang="scss" scoped>
.spacer {
  margin: var(--spacer-xs) 0;
}
</style>
