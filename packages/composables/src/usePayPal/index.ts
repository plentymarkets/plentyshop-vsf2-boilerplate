import {useVSFContext, sharedRef} from '@vue-storefront/core';
import {computed} from '@nuxtjs/composition-api';

export const usePayPal = () => {
  const context = useVSFContext();
  const loading = sharedRef(false, 'usePayPal-loading');

  const error = sharedRef({
    usePayPal: null
  }, 'usePayPal-error');

  const createOrder = async (fundingSource: string): Promise<unknown> => {
    return await context.$plentymarkets.api.createOrder(fundingSource);
  };

  const approveOrder = async (orderID: string, payerID: string): Promise<unknown> => {
    return await context.$plentymarkets.api.approveOrder(orderID, payerID);
  };

  const captureOrder = async (orderID: string, payerID: string): Promise<unknown> => {
    return await context.$plentymarkets.api.captureOrder(orderID, payerID);
  };

  return {
    approveOrder,
    captureOrder,
    createOrder,
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
