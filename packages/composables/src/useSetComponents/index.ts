import { Product } from '@vue-storefront/plentymarkets-api';
import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext } from '@vue-storefront/core';

export const useSetComponents = (id) => {
  const context = useVSFContext();
  const result = sharedRef(null, `useSetComponents-${id}`);
  const loading = sharedRef(false, `useSetComponents-loading-${id}`);
  const error = sharedRef(
    {
      setComponents: null
    },
    `useSetComponents-error-${id}`
  );

  const loadSetComponents = async (setComponents) => {
    try {
      loading.value = true;

      const productCalls = setComponents.map(async (component) => {
        const data = await context.$plentymarkets.api.getProduct({
          id: component.defaultVariationId
        });

        // TODO - Create Type for this
        return {
          ...component,
          ...data[0],
          selectedVariationId: component.defaultVariationId,
          quantity: 1
        };
      });

      const products: Product[] = await Promise.all(productCalls);

      result.value = products;
      error.value.setComponents = null;
    } catch (err) {
      error.value.setComponents = err;
    } finally {
      loading.value = false;
    }
  };

  const setSelection = async (itemId, variationId) => {
    try {
      loading.value = true;

      result.value = await Promise.all(
        result.value.map(async (product) => {
          if (product.itemId === itemId) {
            const variationData = await context.$plentymarkets.api.getProduct({
              id: variationId
            });

            product = {...product, ...variationData[0], selectedVariationId: variationId};
          }

          return product;
        })
      );

      error.value.setComponents = null;
    } catch (err) {
      error.value.setComponents = err;
    } finally {
      loading.value = false;
    }
  };

  const setQuantity = (itemId, quantity) => {
    result.value = result.value.map((product) => {
      if (product.itemId === itemId) {
        product.quantity = parseInt(quantity);
      }

      return product;

    });
  };

  return {
    loadSetComponents,
    setSelection,
    setQuantity,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
