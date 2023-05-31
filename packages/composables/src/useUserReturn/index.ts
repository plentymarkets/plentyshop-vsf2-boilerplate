import { computed } from '@nuxtjs/composition-api';
import { useVSFContext, sharedRef, UseUserOrderSearchParams } from '@vue-storefront/core';

export interface UseUserReturnResponse {
  load: (params: UseUserOrderSearchParams) => Promise<void>
  result: ReturnType<typeof computed>
  loading: ReturnType<typeof computed>
  error: ReturnType<typeof computed>
}

export const useUserReturn = (id: string): UseUserReturnResponse => {
  const context = useVSFContext();
  const result = sharedRef(null, `useUserReturn-${id}`);
  const loading = sharedRef(false, `useUserReturn-loading-${id}`);
  const error = sharedRef({
    search: null
  }, `useUserReturn-error-${id}`);

  const load = async (params: UseUserOrderSearchParams): Promise<void> => {
    try {
      loading.value = true;
      result.value = await context.$plentymarkets.api.getReturns(params);
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
