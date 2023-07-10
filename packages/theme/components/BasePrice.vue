<template>
  <div>
    <div :class="basePriceCss">
      <div
        v-if="oneline"
        class="flex-1"
      />
      <div id="basePrice">{{ $n(productGetters.getDefaultBasePrice(product), 'currency') }} / {{ productGetters.getUnitName(product) }} </div>
      <div
        v-if="oneline"
        id="lineSeparator"
      >
        |
      </div>
      <div id="content">
        <span
          v-if="!oneline"
          class="font-bold"
        > {{ $t('Content') }}: </span>
        <span class="mr-1">
          {{ productGetters.getUnitContent(product) }}
          {{ productGetters.getUnitName(product) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  productGetters
} from '@vue-storefront/plentymarkets';
export default {
  props: {
    product: {
      type: Object,
      default: () => { }
    },
    oneline: {
      type: Boolean,
      default: () => false
    },
    contentLineFirst: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props) {
    let basePriceCss = !props.oneline ? 'twolineItems' : 'inlineItems rearangeByRow';

    if (!props.oneline && props.contentLineFirst) {
      basePriceCss += ' rearangeByColumn';
    }

    return {
      basePriceCss,
      productGetters
    };
  }
};
</script>
<style scoped>
.rearangeByRow {
  flex-direction: row-reverse !important;
}
.rearangeByColumn {
  flex-direction: column-reverse !important;
}
.inlineItems {
  font-size: 75%;
  text-align: left!important;
  font-weight: 400;
  display: flex;
  width: 100%;
}

.twolineItems {
  display: flex;
  flex-direction: column;
  font-size: 75%;
  text-align: left;
  font-weight: 300;
}
.twolineItems #basePrice {
  width: 100%;
}
#lineSeparator {
  margin-right:4px;
}
</style>
