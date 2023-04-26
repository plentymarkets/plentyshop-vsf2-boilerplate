<template>
  <div>
    <SfProperty
      :name="$t('CartPreview.Subtotal')"
      class="sf-property--full-width spacer"
    >
      <template #value>
        <SfPrice :regular="$n(orderGetters.getSubTotal(totals), 'currency')" />
      </template>
    </SfProperty>

    <SfProperty
      :name="$t('CartPreview.Shipping')"
      class="sf-property--full-width"
    >
      <template #value>
        <SfPrice :regular="$n(orderGetters.getShippingAmount(totals), 'currency')" />
      </template>
    </SfProperty>

    <SfProperty
      :name="$t('CartPreview.Vat total') + ' (' + orderGetters.getVatValue(totals) + '%)'"
      class="sf-property--full-width"
    >
      <template #value>
        <SfPrice :regular="$n(orderGetters.getVatAmount(totals), 'currency')" />
      </template>
    </SfProperty>
    <SfDivider />
    <SfProperty
      :name="$t('CartPreview.Total')"
      class="sf-property--full-width sf-property--large my-cart__total-price spacer"
    >
      <template #value>
        <SfPrice :regular="$n(orderGetters.getTotal(totals), 'currency')" />
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
        <SfPrice :regular="$n(orderGetters.getToBePayed(totals), 'currency')" />
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
import { useOrder, orderGetters } from '@vue-storefront/plentymarkets';

export default {
  name: 'OrderTotals',
  components: {
    SfProperty,
    SfPrice,
    SfDivider
  },
  setup() {
    const { order } = useOrder();

    const totals = computed(() => orderGetters.getTotal(order.value));

    return {
      orderGetters,
      totals
    };
  }
};
</script>
<style lang="scss" scoped>
.spacer {
  margin: var(--spacer-xs) 0;
}
</style>
