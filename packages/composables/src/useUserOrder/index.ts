import {
  Context,
  useUserOrderFactory,
  UseUserOrderFactoryParams
} from '@vue-storefront/core';
import type { GetOrdersResponse } from '@vue-storefront/plentymarkets-api';
import type {
  useUserOrderSearchParams as SearchParams
} from '../types';
//
const params: UseUserOrderFactoryParams<GetOrdersResponse, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params) => {
    const orders = await context.$plentymarkets.api.getOrders(params);

    return orders;
  }
};

export const useUserOrder = useUserOrderFactory<GetOrdersResponse, SearchParams>(params);
