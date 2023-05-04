import { computed, ComputedRef } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext } from '@vue-storefront/core';
import { Product } from '@vue-storefront/plentymarkets-api';

export interface UseLastSeenResponse {
    addItem(variationId: string): void,
    search(): void,
    result: ComputedRef<Product[]>,
    loading: ComputedRef<boolean>,
    error: ComputedRef<{
        lastSeen: unknown
    }>

}

export const useLastSeen = (id: string): UseLastSeenResponse => {

  const key = 'lastSeen';
  const context = useVSFContext();
  const result = sharedRef(null, `useLastSeen-${id}`);
  const loading = sharedRef(false, `useLastSeen-loading-${id}`);
  const error = sharedRef({
    search: null
  }, `useLastSeen-error-${id}`);

  const addItem = (variationId: string): void => {

    let lastSeen = window.localStorage.getItem(key);
    let newLastSeen;

    if (lastSeen) {
      lastSeen = JSON.parse(lastSeen);
      newLastSeen = JSON.stringify([variationId, ...lastSeen]);
      window.localStorage.setItem(key, newLastSeen);
    } else {
      window.localStorage.setItem(key, JSON.stringify([variationId]));
    }

    /* if (lastSeen && lastSeen.includes(variationId)) {
      lastSeen = lastSeen.replace(variationId + ',', '');
    }

    if (lastSeen && lastSeen.includes(variationId)) {
      lastSeen = lastSeen.replace(variationId, '');
    } */
  };

  const search = async (): Promise<void> => {

    try {
      loading.value = true;
      result.value = await context.$plentymarkets.api.getProducts({ ids: window.localStorage.getItem(key)});
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    addItem,
    search,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
