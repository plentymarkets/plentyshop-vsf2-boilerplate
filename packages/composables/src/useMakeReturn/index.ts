import { computed } from '@nuxtjs/composition-api';
import { useVSFContext, sharedRef } from '@vue-storefront/core';
import { CreateReturnResponse, MakeReturnParams } from '@vue-storefront/plentymarkets-api';
import { ComposableBaseResponse } from 'src/types';

interface UseMakeReturnResponse extends ComposableBaseResponse<CreateReturnResponse> {
  makeReturn(params: MakeReturnParams): Promise<void>
}

export const useMakeReturn = (id: string): UseMakeReturnResponse => {
  const context = useVSFContext();
  const result = sharedRef(null, `useMakeReturn-${id}`);
  const loading = sharedRef(false, `useMakeReturn-loading-${id}`);
  const error = sharedRef({
    makeReturn: null
  }, `useMakeReturn-error-${id}`);

  const makeReturn = async (params: MakeReturnParams): Promise<void> => {
    try {
      loading.value = true;
      result.value = await context.$plentymarkets.api.makeOrderReturn(params);
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
