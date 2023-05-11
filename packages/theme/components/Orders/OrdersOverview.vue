<template>
  <div>
    <BaseTable
      table-class="orders table-column-flex-1"
      :table-headers="headers"
      :items="items"
      action-buttons-class="text-right"
      :actions="actions"
      :show-pagination="paginationGetters.getTotalPages(pagination) > 1"
      pagination-class="products__pagination desktop-only"
      :current-page="paginationGetters.getCurrentPage(pagination)"
      :total-pages="paginationGetters.getTotalPages(pagination)"
      :pagination-visible="5"
      @view-details="$emit('set-current-order', $event)"
    />
  </div>
</template>

<script>

import BaseTable from '~/components/BaseTable.vue';
import { computed, useContext } from '@nuxtjs/composition-api';
import { orderGetters, useUserOrder, paginationGetters } from '@vue-storefront/plentymarkets';
import { AgnosticOrderStatus } from '@vue-storefront/core';

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
  setup() {
    const { app } = useContext();

    const { orders: orderResult } = useUserOrder();
    const pagination = computed(() => orderGetters.getPagination(orderResult.value));
    const orders = computed(() => orderResult.value?.data?.entries);
    const getStatusTextClass = (order) => {
      const status = orderGetters.getStatus(order);

      switch (status) {
        case AgnosticOrderStatus.Open:
          return 'text-warning';
        case AgnosticOrderStatus.Complete:
          return 'text-success';
        default:
          return '';
      }
    };

    const actions = [
      {
        value: 'OrderHistory.View details',
        event: 'view-details',
        class: 'sf-button--text desktop-only'
      }
    ];

    const headers = [
      'OrderHistory.Order ID',
      'OrderHistory.Order date',
      'OrderHistory.Amount',
      'OrderHistory.Status'
    ];

    const items = computed(() => {
      const result = [];

      if (orders.value && orders.value.length) {
        orders.value.forEach(order => {
          result.push({
            'OrderHistory.Order ID': {
              value: orderGetters.getId(order),
              e2e: 'order-number'
            },
            'OrderHistory.Order date': orderGetters.getDate(order),
            'OrderHistory.Amount': app.i18n.n(orderGetters.getPrice(order), 'currency'),
            'OrderHistory.Status': {
              value: orderGetters.getStatus(order),
              textClass: getStatusTextClass(order)
            }
          });
        });
      }

      return result;
    });

    return {
      actions,
      headers,
      items,
      pagination,
      paginationGetters
    };
  }
};
</script>
