import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext } from '@vue-storefront/core';
import { PaymentProviders } from '@vue-storefront/plentymarkets-api';
import { ComposableBaseResponse } from 'src/types';

export interface useActiveShippingCountriesResponse extends ComposableBaseResponse<PaymentProviders> {
  load: (type: string) => Promise<void>
  save: (paymentId: number) => Promise<void>
}

export const usePaymentProvider = (id: string): useActiveShippingCountriesResponse => {

  const context = useVSFContext();
  const result = sharedRef(null, `useCustom-${id}`);
  const loading = sharedRef(false, `useCustom-loading-${id}`);
  const error = sharedRef({
    search: null
  }, `useCustom-error-${id}`);

  const load = async (): Promise<void> => {
    try {
      loading.value = true;
      result.value = await context.$plentymarkets.api.getPaymentProviders();
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
    } finally {
      loading.value = false;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const save = async (paymentId: number): Promise<void> => {
    await context.$plentymarkets.api.setPaymentProvider(paymentId);

    if(result.value)
      result.value.selected = paymentId;
  };

  return {
    load,
    save,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
