import { computed } from '@nuxtjs/composition-api';
import { useVSFContext, sharedRef } from '@vue-storefront/core';

export const useLegalInformation = (id: string): any => {

  const context = useVSFContext();
  const result = sharedRef(null, `useLegalInformation-${id}`);
  const loading = sharedRef(false, `useLegalInformation-loading-${id}`);
  const error = sharedRef({
    search: null
  }, `useLegalInformation-error-${id}`);
  const load = async (type: string) => {

    try {
      loading.value = true;
      result.value = await context.$plentymarkets.api.getLegalInformation(type);
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    load,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
