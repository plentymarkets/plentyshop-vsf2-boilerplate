import { computed } from '@nuxtjs/composition-api';
import { useVSFContext, sharedRef } from '@vue-storefront/core';

export const useMakeReturn = (id) => {
  const context = useVSFContext();
  const result = sharedRef(null, `useMakeReturn-${id}`);
  const loading = sharedRef(false, `useMakeReturn-loading-${id}`);
  const error = sharedRef({
    makeReturn: null
  }, `useMakeReturn-error-${id}`);

  const makeReturn = async (params) => {
    try {
      loading.value = true;
      result.value = await context.$plentymarkets.api.makeOrderReturn(
        params.orderId, params.orderAccessKey, params.variationIds, params.returnNote
      );
      error.value.makeReturn = null;
    } catch (err) {
      error.value.makeReturn = typeof err === 'object' ? err : { message: err.toString() };
    } finally {
      loading.value = false;
    }
  };


  return {
    makeReturn,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
