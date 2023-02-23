import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext } from '@vue-storefront/core';
import { ActiveShippingCountry } from '@vue-storefront/plentymarkets-api';
import { ComposableBaseResponse } from '../types';

export interface useActiveShippingCountriesResponse extends ComposableBaseResponse<ActiveShippingCountry[]> {
  load:() => Promise<void>
}

export const useActiveShippingCountries = (): useActiveShippingCountriesResponse => {
  const context = useVSFContext();

  const result = sharedRef([], 'active-shipping-countries-result');

  const loading = sharedRef(false, 'active-shipping-countries-loading');

  const error = sharedRef({ search: null }, 'active-shipping-countries-error');

  const load = async (): Promise<void> => {
    try {
      loading.value = true;
      result.value = await context.$plentymarkets.api.getActiveShippingCountries();
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
