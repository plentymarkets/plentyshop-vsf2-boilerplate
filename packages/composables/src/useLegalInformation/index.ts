import { computed } from '@nuxtjs/composition-api';
import { useVSFContext, sharedRef } from '@vue-storefront/core';
import { LegalInformationResponse } from '@vue-storefront/plentymarkets-api';
import { ComposableBaseResponse } from '../types';

export interface UseLegalInformationResponse extends ComposableBaseResponse<LegalInformationResponse> {
  load: (type: string) => Promise<void>
}

export const useLegalInformation = (id: string): UseLegalInformationResponse => {

  const context = useVSFContext();
  const result = sharedRef(null, `suseLegalInformation-${id}`);
  const loading = sharedRef(false, `useLegalInformation-loading-${id}`);
  const error = sharedRef({
    search: null
  }, `useLegalInformation-error-${id}`);
  const load = async (type: string): Promise<void> => {

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
