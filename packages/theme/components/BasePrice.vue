<template>
  <div>
    <div class="priceOnUnit">
      <div>
        {{ productGetters.getDefaultBasePrice(product) }}
      </div>
      <div>
        <span class="font-bold"> {{ $t('Content') }}: </span>
        {{ productGetters.getUnitId(product) }}
        {{ productGetters.getUnitName(product) }}
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
      default: () => {}
    }
  },
  setup() {
    return {
      productGetters
    };
  }
};
</script>
<style>
.priceOnUnit {
  font-size: 75%;
  text-align: left;
  font-weight: 400;
}
</style>
