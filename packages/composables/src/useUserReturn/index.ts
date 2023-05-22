import {
  Context,
  useUserOrderFactory,
  UseUserOrderFactoryParams
} from '@vue-storefront/core';
import type { GetReturnsResponse } from '@vue-storefront/plentymarkets-api';
import type {
  useUserOrderSearchParams as SearchParams
} from '../types';
//
const params: UseUserOrderFactoryParams<GetReturnsResponse, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params) => {
    const orderReturns = await context.$plentymarkets.api.getReturns(params);

    return orderReturns;
  }
};

export const useUserReturn = useUserOrderFactory<GetReturnsResponse, SearchParams>(params);
