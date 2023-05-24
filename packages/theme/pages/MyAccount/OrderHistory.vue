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
      <p class="message">
        This feature is not implemented yet! Please take a look at
        <br>
        <SfLink
          class="message__link"
          link="#"
        >
          https://github.com/DivanteLtd/vue-storefront/issues
        </SfLink>
        for our Roadmap!
      </p>
    </SfTab>
  </SfTabs>
</template>

<script lang="js">
import {
  SfTabs,
  SfButton,
  SfProperty,
  SfLink
} from '@storefront-ui/vue';
import { computed, ref } from '@nuxtjs/composition-api';
import { getCurrentInstance } from '@nuxtjs/composition-api';
import { useUserOrder, orderGetters } from '@vue-storefront/plentymarkets';
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
    SfLink
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

    onSSR(async () => {
      await search(query);
    });

    return {
      orders,
      totalOrders,
      orderGetters,
      currentOrder,
      setCurrentOrder
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
