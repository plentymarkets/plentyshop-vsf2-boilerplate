<template>
  <SfTabs :open-tab="1">
    <SfTab :title="$t('OrderReturn.Returns')">
      <div v-if="currentReturn">
        <SfButton
          class="sf-button--text all-orders"
          @click="currentReturn = null"
        >
          {{ $t('OrderReturn.All returns') }}
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
              <nuxt-link
                :to="
                  localePath(
                    returnGetters.getOrderItemLink(
                      currentReturn,
                      returnGetters.getItemVariationId(item)
                    )
                  )
                "
              >
                {{ returnGetters.getItemName(item) }}
              </nuxt-link>
            </SfTableData>
            <SfTableData>{{ returnGetters.getItemQty(item) }}</SfTableData>
            <SfTableData>
              {{
                $n(returnGetters.getItemPrice(item), 'currency')
              }}
            </SfTableData>
          </SfTableRow>
        </SfTable>
      </div>
      <div v-else>
        <p class="message">
          {{ $t('OrderReturn.Details and return status') }}
        </p>
        <div
          v-if="totalReturns === 0"
          class="no-orders"
        >
          <p class="no-orders__title">
            {{ $t('OrderReturn.You currently have no returns') }}
          </p>
          <SfButton
            class="no-orders__button my-12"
            @click="router.push($t('MyAccount.Order history'))"
          >
            {{ $t('OrderReturn.Return your items now') }}
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
            <SfTableData :v-e2e="'order-number'">
              {{ returnGetters.getId(orderReturn) }}
            </SfTableData>
            <SfTableData>{{ returnGetters.getDate(orderReturn) }}</SfTableData>
            <SfTableData>
              {{
                $n(returnGetters.getPrice(orderReturn), 'currency')
              }}
            </SfTableData>
            <SfTableData>
              <span :class="getStatusTextClass(orderReturn)">{{
                returnGetters.getStatus(orderReturn)
              }}</span>
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
            v-show="paginationGetters.getTotalPages(returnsPagination) > 1"
            class="products__pagination desktop-only"
            :current="paginationGetters.getCurrentPage(returnsPagination)"
            :total="paginationGetters.getTotalPages(returnsPagination)"
            :visible="5"
          />
        </LazyHydrate>
        <p>{{ $t('OrderReturn.Total returns') }} - {{ totalReturns }}</p>
      </div>
    </SfTab>
  </SfTabs>
</template>

<script>
import {
  SfTabs,
  SfTable,
  SfButton,
  SfProperty,
  SfPagination
} from '@storefront-ui/vue';
import LazyHydrate from 'vue-lazy-hydration';
import {
  getCurrentInstance,
  useRouter,
  ref,
  computed
} from '@nuxtjs/composition-api';
import {
  useUserReturn,
  orderGetters,
  returnGetters,
  paginationGetters
} from '@vue-storefront/plentymarkets';
import { AgnosticOrderStatus } from '@vue-storefront/core';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'PersonalDetails',
  components: {
    SfTabs,
    SfTable,
    SfButton,
    SfProperty,
    SfPagination,
    LazyHydrate
  },
  setup() {
    const ctx = getCurrentInstance().root.proxy;
    const { query } = ctx.$router.currentRoute;
    const router = useRouter();

    const userReturn = useUserReturn('user-return');
    const currentReturn = ref(null);

    const returns = computed(() =>
      returnGetters.getOrders(userReturn.result.value)
    );
    const returnsPagination = computed(() =>
      returnGetters.getPagination(userReturn.result.value)
    );

    onSSR(async () => {
      await userReturn.load(query);
    });

    const tableHeaders = [
      'OrderHistory.Order ID',
      'OrderHistory.Order date',
      'OrderHistory.Amount',
      'OrderHistory.Status'
    ];

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

    return {
      tableHeaders,
      returns,
      returnsPagination,
      paginationGetters,
      totalReturns: computed(() =>
        returnGetters.getOrdersTotal(userReturn.result.value)
      ),
      getStatusTextClass,
      orderGetters,
      returnGetters,
      currentReturn,
      router
    };
  }
};
</script>

<style lang="scss" scoped>
.no-orders {
  &__title {
    margin: 0 0 var(--spacer-lg) 0;
    font: var(--font-weight--normal) var(--font-size--base) / 1.6
      var(--font-family--primary);
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 17, 5rem;
    }
  }
}
.orders {
  @include for-desktop {
    &__element {
      &--right {
        --table-column-flex: 1;
        text-align: right;
      }
    }
  }
}
.all-orders {
  --button-padding: var(--spacer-base) 0;
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6
    var(--font-family--primary);
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
.product {
  &__properties {
    margin: var(--spacer-xl) 0 0 0;
  }
  &__property,
  &__action {
    font-size: var(--font-size--sm);
  }
  &__action {
    color: var(--c-gray-variant);
    font-size: var(--font-size--sm);
    margin: 0 0 var(--spacer-sm) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__qty {
    color: var(--c-text);
  }
}
.products {
  --table-column-flex: 1;
  &__name {
    margin-right: var(--spacer-sm);
    @include for-desktop {
      --table-column-flex: 2;
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
