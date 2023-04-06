<template>
  <client-only>
    <div>
      <ul class="flex flex-col">
        <li
          v-for="product of components"
          :key="product.item.id"
          class="flex justify-between mb-3"
        >
          <div class="w-full md:w-1/3">
            <img
              class=""
              :src="itemImage(product)"
              :alt="product.texts.name1"
            >
          </div>
          <div class="w-full md:2/3 p-4">
            <nuxt-link
              :to="localePath( `/p/${product.variation.id}/${getProductSlug(product)}`)"
              class="font-bold"
            >
              {{ product.texts.name1 }}
            </nuxt-link>

            <div class="flex justify-between">
              <input
                v-if="product.orderQuantityPossible"
                type="number"
                :value="product.quantity"
                class="w-16 border-b-1 mr-6"
                @input="changeQuantity(product, $event)"
              >

              <template v-if="product.variationAttributeMap">
                <div class="w-full" v-if="product.variationAttributeMap.attributes.length">
                  <SfSelect
                    v-for="attribute of product.variationAttributeMap.attributes"
                    :key="attribute.attributeId"
                    class="sf-select--underlined product__select-size"
                    :value="getSelectedAttributeValue(product, attribute.attributeId)"
                    @input="selectAttribute(product, attribute.attributeId, $event)"
                  >
                    <SfSelectOption
                      v-for="attributeValue of attribute.values"
                      :key="attributeValue.attributeValueId"
                      :value="attributeValue.attributeValueId"
                    >
                      {{ attributeValue.name }}
                    </SfSelectOption>
                  </SfSelect>
                </div>
              </template>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </client-only>
</template>

<script>
import { useSetComponents } from '@vue-storefront/plentymarkets';
import { computed, onMounted } from '@vue/composition-api';
import { SfSelect } from '@storefront-ui/vue';

export default {
  components: {
    SfSelect
  },

  props: {
    setComponents: {
      type: Array,
      required: true
    }
  },

  setup(props) {
    const { loadSetComponents, setSelection, setQuantity, result } = useSetComponents();
    const components = computed(() => result.value);

    onMounted(async () => {
      await loadSetComponents(props.setComponents);
    });

    const getProductSlug = (product) => {
      return product.texts?.urlPath.split('/').pop();
    };

    const selectAttribute = (product, attributeId, attributeValueId) => {
      const variation = product.variationAttributeMap.variations.find(variation => {
        return variation.attributes.some(attribute => {
          console.log(attributeId, attributeValueId, attribute.attributeId, attribute.attributeValueId);
          return attribute.attributeId === parseInt(attributeId) && attribute.attributeValueId === parseInt(attributeValueId);
        });
      });

      setSelection(product.item.id, variation.variationId);
    };

    const getSelectedAttributeValue = (product, attributeId) => {
      if (!product.variationAttributeMap) {
        return null;
      }

      const selectedVariation = product.variationAttributeMap.variations.find(variation => variation.variationId === product.selectedVariationId);

      if (!selectedVariation) {
        return null;
      }

      const selectedAttribute = selectedVariation.attributes.find(attribute => attribute.attributeId === attributeId);

      return String(selectedAttribute.attributeValueId);
    };

    const itemImage = (product) => {
      const image = product.images.variation[0] ?? product.images.all[0];

      return image?.urlMiddle ?? '';
    };

    const changeQuantity = (product, event) => {
      const quantity = event.target.value;

      setQuantity(product.itemId, quantity);
    };

    return {
      components,
      itemImage,
      changeQuantity,
      getSelectedAttributeValue,
      getProductSlug,
      selectAttribute
    };
  }
};
</script>
