<template>
  <div
    :v-e2e="'order-totals'"
    class="order-totals"
  >
    <SfProperty
      :name="$t('OrderTotals.Subtotal')"
      class="sf-property--full-width spacer"
    >
      <template #value>
        <SfPrice :regular="$n(orderGetters.getSubTotal(totals), 'currency')" />
      </template>
    </SfProperty>

    <SfProperty
      :name="$t('OrderTotals.Shipping')"
      class="sf-property--full-width"
    >
      <template #value>
        <SfPrice :regular="$n(orderGetters.getShippingAmount(totals), 'currency')" />
      </template>
    </SfProperty>

    <SfProperty
      :name="$t('OrderTotals.Vat total') + ' (' + orderGetters.getVatRate(totals) + '%)'"
      class="sf-property--full-width"
    >
      <template #value>
        <SfPrice :regular="$n(orderGetters.getVatAmount(totals), 'currency')" />
      </template>
    </SfProperty>
    <SfDivider />
    <SfProperty
      :name="$t('OrderTotals.Total')"
      class="sf-property--full-width sf-property--large my-cart__total-price spacer"
    >
      <template #value>
        <SfPrice :regular="$n(orderGetters.getTotal(totals), 'currency')" />
      </template>
    </SfProperty>

    <!-- <SfProperty
      v-if="couponDiscount"
      :name="$t('CartPreview.Coupon Discount')"
      class="sf-property--full-width"
    >
      <template #value>
        <SfPrice :regular="$n(couponDiscount, 'currency')" />
      </template>
    </SfProperty>
    <SfDivider /> -->
    <!-- <SfProperty
      :name="$t('CartPreview.To be payed')"
      class="sf-property--full-width sf-property--large my-cart__total-price spacer"
    >
      <template #value>
        <SfPrice :regular="$n(cartGetters.getToBePayed(totals), 'currency')" />
      </template>
    </SfProperty> -->
  </div>
</template>
<script>
import {
  SfProperty,
  SfPrice,
  SfDivider
} from '@storefront-ui/vue';
import { computed } from '@nuxtjs/composition-api';
import { orderGetters } from '@vue-storefront/plentymarkets';

export default {
  name: 'OrderTotals',
  components: {
    SfProperty,
    SfPrice,
    SfDivider
  },
  props: {
    order: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const totals = computed(() => orderGetters.getTotals(props.order));

    return {
      totals,
      orderGetters
    };
  }
};
</script>
<style lang="scss" scoped>
.spacer {
  margin: var(--spacer-xs) 0;
}
</style>
