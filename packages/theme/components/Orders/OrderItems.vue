<template>
  <div>
    <BaseTable
      v-if="currentOrderItems && currentOrderItems.length"
      table-class="products"
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
        textClass: 'flex-2'
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
            tdClass: 'mr-sf-sm flex-2',
            url: app.localePath(orderGetters.getOrderItemLink(props.order, item.itemVariationId))
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

<style lang="scss" scoped>
  .sf-bottom-modal {
    @include for-desktop {
      --bottom-modal-height: 100vh;
    }
  }
  .sf-bottom-modal::v-deep .sf-bottom-modal__close {
    position: var(--circle-icon-position, absolute);
    top: var(--spacer-xs);
    right: var(--spacer-xs);
  }

  .sf-button {
    --button-box-shadow-opacity: 0;
    --button-background: trasnparent;
  }
</style>
