<template>
  <SfTabs :open-tab="1">
    <SfTab :title="$t('OrderHistory.My orders')">
      <div v-if="currentOrder">
        <SfButton
          class="sf-button--text all-orders"
          @click="currentOrder = null"
        >
          {{ $t('OrderHistory.All orders') }}
        </SfButton>
        <div class="highlighted highlighted--total">
          <SfProperty
            name="Order ID"
            :value="orderGetters.getId(currentOrder)"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Date"
            :value="orderGetters.getDate(currentOrder)"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Status"
            :value="orderGetters.getStatus(currentOrder)"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Total"
            :value="$n(orderGetters.getPrice(currentOrder), 'currency')"
            class="sf-property--full-width property"
          />
        </div>

        <OrderItems :order="currentOrder" />
      </div>
      <div v-else>
        <p class="message">
          {{ $t('OrderHistory.Details and order status') }}
        </p>
        <div
          v-if="totalOrders === 0"
          class="no-orders"
        >
          <p class="no-orders__title">
            {{ $t('OrderHistory.You currently have no orders') }}
          </p>
          <SfButton class="no-orders__button">
            {{ $t('OrderHistory.Start shopping') }}
          </SfButton>
        </div>

        <OrdersOverview @set-current-order="setCurrentOrder" />

        <p>{{ $t('OrderHistory.Total orders') }} - {{ totalOrders }}</p>
      </div>
    </SfTab>
    <SfTab :title="$t('OrderHistory.Returns')">
      <div v-if="currentReturn">
        <SfButton
          class="sf-button--text all-orders"
          @click="currentReturn = null"
        >
          {{ $t('OrderHistory.All returns') }}
        </SfButton>
        <div class="highlighted highlighted--total">
          <SfProperty
            name="Order ID"
            :value="returnGetters.getId(currentReturn)"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Date"
            :value="returnGetters.getDate(currentReturn)"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Status"
            :value="returnGetters.getStatus(currentReturn)"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Total"
            :value="$n(returnGetters.getPrice(currentReturn), 'currency')"
            class="sf-property--full-width property"
          />
        </div>
        <SfTable class="products">
          <SfTableHeading>
            <SfTableHeader class="products__name">
              {{ $t('OrderHistory.Product') }}
            </SfTableHeader>
            <SfTableHeader>{{ $t('OrderHistory.Quantity') }}</SfTableHeader>
            <SfTableHeader>{{ $t('OrderHistory.Price') }}</SfTableHeader>
          </SfTableHeading>
          <SfTableRow
            v-for="(item, i) in returnGetters.getItems(currentReturn)"
            :key="i"
          >
            <SfTableData class="products__name">
              <nuxt-link :to="localePath(returnGetters.getOrderItemLink(currentReturn, item.itemVariationId))">
                {{ returnGetters.getItemName(item) }}
              </nuxt-link>
            </SfTableData>
            <SfTableData>{{ returnGetters.getItemQty(item) }}</SfTableData>
            <SfTableData>{{ $n(returnGetters.getItemPrice(item), 'currency') }}</SfTableData>
          </SfTableRow>
        </SfTable>
      </div>
      <div v-else>
        <p class="message">
          {{ $t('OrderHistory.Details and return status') }}
        </p>
        <div
          v-if="totalReturns === 0"
          class="no-orders"
        >
          <p class="no-orders__title">
            {{ $t('OrderHistory.You currently have no orders') }}
          </p>
          <SfButton class="no-orders__button">
            {{ $t('OrderHistory.Start shopping') }}
          </SfButton>
        </div>
        <SfTable
          v-else
          class="orders"
        >
          <SfTableHeading>
            <SfTableHeader
              v-for="tableHeader in tableHeaders"
              :key="tableHeader"
            >
              {{ $t(tableHeader) }}
            </SfTableHeader>
            <SfTableHeader class="orders__element--right" />
          </SfTableHeading>
          <SfTableRow
            v-for="orderReturn in returns"
            :key="returnGetters.getId(orderReturn)"
          >
            <SfTableData v-e2e="'order-number'">
              {{ returnGetters.getId(orderReturn) }}
            </SfTableData>
            <SfTableData>{{ returnGetters.getDate(orderReturn) }}</SfTableData>
            <SfTableData>{{ $n(returnGetters.getPrice(orderReturn), 'currency') }}</SfTableData>
            <SfTableData>
              <span :class="getStatusTextClass(orderReturn)">{{ returnGetters.getStatus(orderReturn) }}</span>
            </SfTableData>
            <SfTableData class="orders__view orders__element--right">
              <SfButton
                class="sf-button--text desktop-only"
                @click="currentReturn = orderReturn"
              >
                {{ $t('OrderHistory.View details') }}
              </SfButton>
            </SfTableData>
          </SfTableRow>
        </SfTable>
        <LazyHydrate on-interaction>
          <SfPagination
            v-show="paginationGetters.getTotalPages(pagination) > 1"
            class="products__pagination desktop-only"
            :current="paginationGetters.getCurrentPage(pagination)"
            :total="paginationGetters.getTotalPages(pagination)"
            :visible="5"
          />
        </LazyHydrate>
        <p>{{ $t('OrderHistory.Total returns') }} - {{ totalReturns }}</p>
      </div>
    </SfTab>
  </SfTabs>
</template>

<script lang="js">
import {
  SfTabs,
  SfButton,
  SfProperty,
  SfPagination
} from '@storefront-ui/vue';
import { computed, ref } from '@nuxtjs/composition-api';
import { getCurrentInstance } from '@nuxtjs/composition-api';
import { useUserOrder, useUserReturn, orderGetters, returnGetters, paginationGetters } from '@vue-storefront/plentymarkets';
import { AgnosticOrderStatus } from '@vue-storefront/core';
import { onSSR } from '@vue-storefront/core';
import OrderItems from '~/components/Orders/OrderItems.vue';
import OrdersOverview from '~/components/Orders/OrdersOverview.vue';

export default {
  name: 'PersonalDetails',
  components: {
    OrdersOverview,
    OrderItems,
    SfTabs,
    SfButton,
    SfProperty,
    SfPagination,
    LazyHydrate
  },
  setup() {
    const ctx = getCurrentInstance().root.proxy;
    const { query } = ctx.$router.currentRoute;
    const { orders: orderResult, search } = useUserOrder();
    const currentOrder = ref(null);
    const orders = computed(() => orderResult.value?.data?.entries);
    const totalOrders = computed(() => orderGetters.getOrdersTotal(orderResult.value));

    const setCurrentOrder = (item) => {
      const orderId = item['OrderHistory.Order ID'].value;

      currentOrder.value = orderGetters.getById(orders.value, orderId);
    };

    const userReturn = useUserReturn('user-return');
    const currentReturn = ref(null);

    userReturn.load();
    const returns = computed(() => returnGetters.getOrders(userReturn.result.value));

    onSSR(async () => {
      await search(query);
    });

    return {
      orders,
      returns,
      pagination,
      // returnPagination,
      loading,
      paginationGetters,
      totalOrders: computed(() => orderGetters.getOrdersTotal(orderResult.value)),
      totalReturns: computed(() => returnGetters.getOrdersTotal(userReturn.result.value)),
      getStatusTextClass,
      orderGetters,
      returnGetters,
      currentOrder,
      currentReturn
    };

  }
};
</script>

<style lang='scss' scoped>
.no-orders {
  &__title {
    margin: 0 0 var(--spacer-lg) 0;
    font: var(--font-weight--normal) var(--font-size--base) / 1.6 var(--font-family--primary);
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 17,5rem;
    }
  }
}
.all-orders {
  --button-padding: var(--spacer-base) 0;
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--primary);
  &__link {
    color: var(--c-primary);
    font-weight: var(--font-weight--medium);
    font-family: var(--font-family--primary);
    font-size: var(--font-size--base);
    text-decoration: none;
    &:hover {
      color: var(--c-text);
    }
  }
}
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-sm);
  --property-value-font-size: var(--font-size--base);
  --property-name-font-size: var(--font-size--base);
  &:last-child {
    margin-bottom: 0;
  }
  ::v-deep .sf-property__name {
    white-space: nowrap;
  }
  ::v-deep .sf-property__value {
    text-align: right;
  }
  &--total {
    margin-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    padding: var(--spacer-xl);
    --property-name-font-size: var(--font-size--lg);
    --property-name-font-weight: var(--font-weight--medium);
    --property-value-font-size: var(--font-size--lg);
    --property-value-font-weight: var(--font-weight--semibold);
  }
}
</style>
