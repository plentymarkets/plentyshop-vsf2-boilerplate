<template>
  <div>
    <SfTable
      :class="tableClass"
      class="base-table"
    >
      <SfTableHeading>
        <SfTableHeader
          v-for="tableHeader in tableHeaders"
          :key="tableHeader"
        >
          <span v-if="tableHeader instanceof Object">
            {{ $t(tableHeader.label) }}
          </span>
          <span v-else>{{ $t(tableHeader) }}</span>
        </SfTableHeader>
        <SfTableHeader
          v-if="actions.length"
          class="orders__element--right text-right"
        />
      </SfTableHeading>

      <SfTableRow
        v-for="(item, key) in items"
        :key="key"
      >
        <SfTableData
          v-for="(tableHeader, headerKey) in tableHeaders"
          :key="headerKey"
          v-e2e="item[tableHeader] instanceof Object ? item[tableHeader].e2e : ''"
        >
          <nuxt-link
            v-if="getItemUrl(item[tableHeader])"
            :to="getItemUrl(item[tableHeader])"
            :class="getItemClass(item[tableHeader])"
          >
            {{ getText(item[tableHeader]) }}
          </nuxt-link>

          <span
            v-else
            :class="getItemClass(item[tableHeader])"
          >
            {{ getText(item[tableHeader]) }}
          </span>
        </SfTableData>

        <SfTableData
          v-if="actions.length"
          :class="actionButtonsClass"
        >
          <SfButton
            v-for="action in actions"
            :key="action.text"
            :class="action.class"
            @click="$emit(action.event, item)"
          >
            {{ $t(action.text) }}
          </SfButton>
        </SfTableData>
      </SfTableRow>
    </SfTable>

    <LazyHydrate on-interaction>
      <SfPagination
        v-show="showPagination"
        :class="paginationClass"
        :current="currentPage"
        :total="totalPages"
        :visible="paginationVisible"
      />
    </LazyHydrate>
  </div>
</template>
<script>
import { SfButton, SfPagination, SfTable } from '@storefront-ui/vue';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'BaseTable',

  components: {
    SfPagination,
    SfButton,
    SfTable,
    LazyHydrate
  },
  props: {
    showPagination: {
      type: Boolean,
      default: () => false
    },
    paginationClass: {
      type: String,
      default: () => ''
    },
    currentPage: {
      type: Number,
      default: () => 1
    },
    paginationVisible: {
      type: Number,
      default: () => 5
    },
    totalPages: {
      type: Number,
      default: () => 1
    },
    tableClass: {
      type: String,
      default: () => ''
    },
    actionButtonsClass: {
      type: String,
      default: () => ''
    },
    tableHeaders: {
      type: Array,
      default: () => []
    },
    actions: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  setup() {

    const getText = (item) => {
      return item instanceof Object ? item.value : item;
    };
    const getItemClass = (item) => {
      return item instanceof Object ? item.class : '';
    };
    const getItemUrl = (item) => {

      return item instanceof Object ? item.url : '';
    };

    return {
      getText,
      getItemClass,
      getItemUrl
    };
  }
};
</script>
<style lang="scss" scoped>
.spacer {
  margin: var(--spacer-xs) 0;
}
</style>
