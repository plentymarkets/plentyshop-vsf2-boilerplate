<template>
  <div>
    <SfProperty
      :name="$t('CartPreview.Subtotal')"
      class="sf-property--full-width"
    >
      <template #value>
        <SfPrice :special="$n(totals.subtotal, 'currency')" />
      </template>
    </SfProperty>

    <SfProperty
      :name="$t('CartPreview.Shipping')"
      class="sf-property--full-width"
    >
      <template #value>
        <SfPrice :special="$n(totals.shippingAmount, 'currency')" />
      </template>
    </SfProperty>

    <SfProperty
      :name="$t('CartPreview.Vat total')"
      class="sf-property--full-width"
    >
      <template #value>
        <SfPrice :special="$n(totals.vatAmount, 'currency')" />
      </template>
    </SfProperty>
    <SfDivider />
    <SfProperty
      :name="$t('CartPreview.Total')"
      class="sf-property--full-width sf-property--large my-cart__total-price"
    >
      <template #value>
        <SfPrice :special="$n(totals.total, 'currency')" />
      </template>
    </SfProperty>

    <SfProperty
      :name="$t('CartPreview.Coupon Discount')"
      class="sf-property--full-width"
    >
      <template #value>
        <SfPrice :special="$n(totals.couponDiscount, 'currency')" />
      </template>
    </SfProperty>
    <SfDivider />
    <SfProperty
      :name="$t('CartPreview.To be payed')"
      class="sf-property--full-width sf-property--large my-cart__total-price"
    >
      <template #value>
        <SfPrice :special="$n(totals.toBePayed, 'currency')" />
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
  name: 'Cart',
  components: {
    SfProperty,
    SfPrice,
    SfDivider
  },
  setup() {
    const { cart } = useCart();

    return {
      totals: computed(() => cartGetters.getTotals(cart.value))
    };
  }
};
</script>
