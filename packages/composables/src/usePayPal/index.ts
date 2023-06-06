import {useVSFContext, sharedRef} from '@vue-storefront/core';
import {computed} from '@nuxtjs/composition-api';

export const usePayPal = () => {
  const context = useVSFContext();
  const loading = sharedRef(false, 'usePayPal-loading');

  const error = sharedRef({
    usePayPal: null
  }, 'usePayPal-error');

  const createOrder = async (fundingSource: string): Promise<any> => {
    return await context.$plentymarkets.api.createOrder(fundingSource);
  };

  const approveOrder = async (orderID: string, payerID: string): Promise<any> => {
    return await context.$plentymarkets.api.approveOrder(orderID, payerID);
  };

  return {
    createOrder,
    approveOrder,
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
