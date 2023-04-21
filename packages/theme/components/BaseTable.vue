<template>
  <div>
    <SfTable
      :class="tableClass"
      class="base-table"
    >
      <SfTableHeading>
        <SfTableHeader
          v-for="(header, headerKey) in tableHeaders"
          :key="headerKey"
          :class="getTextClass(header)"
        >
          <span>{{ $t(getText(header)) }}</span>
        </SfTableHeader>
        <SfTableHeader
          v-if="actions.length"
          class="text-right"
        />
      </SfTableHeading>

      <SfTableRow
        v-for="(item, key) in items"
        :key="key"
      >
        <SfTableData
          v-for="(header, headerKey) in headersKeys"
          :key="headerKey"
          :class="getTdClass(item[header])"
          v-bind="getBindings(item[header])"
        >
          <nuxt-link
            v-if="getItemUrl(item[header])"
            :to="getItemUrl(item[header])"
            :class="getTextClass(item[header])"
          >
            {{ getText(item[header]) }}
          </nuxt-link>

          <span
            v-else
            :class="getTextClass(item[header])"
          >
            {{ getText(item[header]) }}
          </span>
        </SfTableData>

        <SfTableData
          v-if="actions.length"
          :class="actionButtonsClass"
        >
          <SfButton
            v-for="action in actions"
            :key="action.value"
            :class="action.class"
            @click="$emit(action.event, item)"
          >
            {{ $t(action.value) }}
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
  setup(props) {
    const headersKeys = props.tableHeaders
      .map(tableHeader => tableHeader instanceof Object ? tableHeader.value : tableHeader);

    const getBindings = (item) => {
      const result = {};

      if (item instanceof Object && item.e2e) {
        result['data-e2e'] = item.e2e;
      }

      return result;
    };

    const getText = (item) => {
      return item instanceof Object ? item.value : item;
    };
    const getTextClass = (item) => {
      return item instanceof Object ? item.textClass : '';
    };
    const getTdClass = (item) => {
      return item instanceof Object ? item.tdClass : '';
    };
    const getItemUrl = (item) => {
      return item instanceof Object ? item.url : '';
    };

    return {
      getText,
      headersKeys,
      getBindings,
      getTextClass,
      getTdClass,
      getItemUrl
    };
  }
};
</script>
