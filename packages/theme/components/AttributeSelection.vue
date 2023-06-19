<template>
  <div>
    <SfSelect
      v-for="(option, key) in options"
      :key="key"
      :v-e2e="'size-select'"
      class="sf-select--underlined product__select-size"
      :label="option.label"
      :value="selectedAttributes[key]"
      :required="true"
      :disabled="loading"
      @input="optionValueKey => selectOption(key, optionValueKey || NO_SELECTION_ID)"
    >
      <SfSelectOption
        v-if="hasEmptyOption || selectedAttributes[key] === NO_SELECTION_ID"
        :value="NO_SELECTION_ID"
      >
        {{ $t('AttributeSelection.No selection') }}
      </SfSelectOption>
      <SfSelectOption
        v-for="(optionValue, valueKey) in option.value"
        :key="valueKey"
        :value="valueKey"
        :disabled="loading"
      >
        {{ optionValue }}
      </SfSelectOption>
    </SfSelect>

    <SfSelect
      v-if="Object.keys(units).length > 1"
      v-model="selectedUnit"
      :v-e2e="'content-select'"
      class="sf-select--underlined product__select-size"
      :label="$t('AttributeSelection.Content')"
      :required="true"
      @input="optionValueKey => selectOption()"
    >
      <SfSelectOption
        v-for="(unitName, unitCombinationId) in units"
        :key="unitCombinationId"
        :value="unitCombinationId"
      >
        {{ unitName }}
      </SfSelectOption>
    </SfSelect>

    <p v-if="!selectedVariationId">
      {{ $t('AttributeSelection.Select a valid variation') }}
    </p>
  </div>
</template>

<script>
const NO_SELECTION_ID = '-1';

import Vue from 'vue';
import { SfSelect } from '@storefront-ui/vue';
import { productGetters, useProduct } from '@vue-storefront/plentymarkets';
import { computed, reactive, ref, watch } from '@vue/composition-api';

export default {
  name: 'AttributeSelection',
  components: {
    SfSelect
  },
  setup(props, context) {
    const { products, loading } = useProduct('products');
    const product = computed(() => productGetters.getFiltered(products.value, { })[0]);

    const options = computed(() => productGetters.getAttributes(products.value, ['color', 'size']));
    const units = computed(() => productGetters.getUnits(products.value));
    const hasEmptyOption = computed(() => {
      return product.value.variationAttributeMap.variations.some(variation => !variation.attributes.length);
    });

    const selectedAttributes = reactive({});
    const selectedUnit = ref(null);

    const selectedVariationId = computed(() => productGetters.getVariationIdForAttributes(product.value, selectedAttributes, selectedUnit.value));

    const preselectAttributes = () => {
      if (product.value?.variationAttributeMap) {
        // set attribute-less variation
        if (!product.value.attributes.length && Object.keys(options.value).length) {
          for (const key in options.value) {
            Vue.set(selectedAttributes, key, NO_SELECTION_ID);
          }
        // set attributes
        } else {
          for (const attribute of product.value.attributes) {
            Vue.set(selectedAttributes, attribute.attributeId, attribute.valueId.toString());
          }
        }

        // set unit
        const variation = product.value.variationAttributeMap.variations.find(variation =>
          variation.variationId === product.value.variation.id);

        if (variation) {
          selectedUnit.value = variation.unitCombinationId.toString();
        }
      }
    };

    const selectOption = (attributeId, attributeValueId) => {
      if (attributeId) {
        Vue.set(selectedAttributes, attributeId, attributeValueId);
      }
    };

    if (!loading.value) {
      preselectAttributes();
    } else {
      watch(loading, (value, oldValue) => {
        if (!value && oldValue) {
          preselectAttributes();
        }
      });
    }

    watch(selectedVariationId, (value) => {
      context.emit('selection-changed', value);
    });

    return {
      options,
      units,
      selectedAttributes,
      selectedUnit,
      selectOption,
      selectedVariationId,
      loading,
      hasEmptyOption,
      NO_SELECTION_ID
    };
  }
};
</script>
