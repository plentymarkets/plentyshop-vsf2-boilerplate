import { OrderDetails } from '@vue-storefront/plentymarkets-api';
import { computed, ComputedRef } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext } from '@vue-storefront/core';

interface SearchError {
    load: unknown
}

export interface UseOrderResponse {
    order: ComputedRef<OrderDetails>
    loading: ComputedRef<boolean>
    error: ComputedRef<SearchError>
    load: (orderId: string, orderAccessKey: string) => Promise<void>
}

export const useOrder = (id: string): UseOrderResponse => {

  const context = useVSFContext();
  const order = sharedRef(null, `useOrder-${id}`);
  const loading = sharedRef(false, `useOrder-loading-${id}`);
  const error = sharedRef({
    load: null
  }, `useOrder-error-${id}`);

  const load = async (orderId: string, orderAccessKey: string): Promise<void> => {

    try {
      loading.value = true;
      const orderData = await context.$plentymarkets.api.getOrder(orderId, orderAccessKey);

      if (orderData.error) {
        error.value.load = orderData.error;
        return;
      }
      order.value = orderData;
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    load,
    order: computed(() => order.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
