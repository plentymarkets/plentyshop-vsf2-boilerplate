<template>
  <div>
    <BaseTable
      v-if="currentOrderItems && currentOrderItems.length"
      v-e2e="'thank-you-items'"
      table-class="products table-column-flex-1"
      :table-headers="productsTableHeaders"
      :items="currentOrderItems"
    />
  </div>
</template>

<script>

import BaseTable from '~/components/BaseTable.vue';
import { computed, useContext } from '@nuxtjs/composition-api';
import { orderGetters } from '@vue-storefront/plentymarkets';

export default {
  components: {
    BaseTable
  },
  props: {
    order: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const { app } = useContext();

    const productsTableHeaders = [
      {
        value: 'OrderHistory.Product',
        textClass: 'sm:flex-2'
      },
      'OrderHistory.Quantity',
      'OrderHistory.Price'
    ];

    const currentOrderItems = computed(() => {
      const items = orderGetters.getItems(props.order);

      const result = [];

      items.forEach(item => {
        result.push({
          'OrderHistory.Product': {
            value: orderGetters.getItemName(item),
            tdClass: 'mr-sf-sm sm:flex-2',
            e2e: 'order-item-product-name'
            // url: app.localePath(orderGetters.getOrderItemLink(props.order, item.itemVariationId))
          },
          'OrderHistory.Quantity': orderGetters.getItemQty(item),
          'OrderHistory.Price': app.i18n.n(orderGetters.getItemPrice(item), 'currency')
        });
      });

      return result;
    });

    return {
      productsTableHeaders,
      currentOrderItems
    };
  }
};
</script>
