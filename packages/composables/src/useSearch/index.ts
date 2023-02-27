import { ItemSearchParams, ItemSearchResult } from '@vue-storefront/plentymarkets-api';
import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext } from '@vue-storefront/core';
import { ComposableBaseResponse } from '../types';

export interface UseSearchResponse extends ComposableBaseResponse<ItemSearchResult> {
  search: (params: ItemSearchParams) => Promise<void>
}

export const useSearch = (id: string): UseSearchResponse => {

  const context = useVSFContext();
  const result = sharedRef(null, `useCustom-${id}`);
  const loading = sharedRef(false, `useCustom-loading-${id}`);
  const error = sharedRef({
    search: null
  }, `useCustom-error-${id}`);

  const search = async (params: ItemSearchParams): Promise<void> => {

    try {
      loading.value = true;
      result.value = await context.$plentymarkets.api.getSearch(params);
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    search,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
