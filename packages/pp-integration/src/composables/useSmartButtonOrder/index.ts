import {useVSFContext, sharedRef} from '@vue-storefront/core';
import {computed} from '@nuxtjs/composition-api';
import {VSFContext} from '../../types';

export const useSmartButtonOrder = () => {
  const { $pp: { api }} = useVSFContext() as VSFContext;
  const loading = sharedRef(false, 'useSmartButtonOrder-loading');

  const error = sharedRef({
    createOrder: null
  }, 'useSmartButtonOrder-error');

  const createOrderSmartButton = async (fundingSource: string): Promise<string> => {
    let response = null;

    try {
      loading.value = true;
      response = await api.createOrder(fundingSource);
      console.log('useSmartButtonOrder/createOrder', response);
    } catch (err) {
      error.value.createOrder = err.message;
    } finally {
      loading.value = false;
    }

    return response;
  };

  return {
    createOrderSmartButton,
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
