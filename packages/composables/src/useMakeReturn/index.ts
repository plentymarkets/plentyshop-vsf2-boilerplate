import {
  Context,
  useMakeOrderFactory
} from '@vue-storefront/core';
import type {
  makeOrderReturn,
  MakeReturnParams,
  Order
} from '@vue-storefront/plentymarkets-api';

const params: MakeReturnParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  make: async (context: Context, params: MakeReturnParams): Promise<Order> => {
    return await context.$plentymarkets.api.makeOrderReturn({
      orderId: '103',
      orderAccessKey: 'orderKey',
      variationIds: [1103, 1],
      returnNote: ''
    });
  }
};

export const useMakeReturn = useMakeOrderFactory<Order>(params);
