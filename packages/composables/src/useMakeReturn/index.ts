import {
  Context,
  useMakeOrderFactory
} from '@vue-storefront/core';
import type {
  CreateReturnResponse, MakeReturnParams
} from '@vue-storefront/plentymarkets-api';

export const useMakeReturn = async (context: Context, params: MakeReturnParams): Promise<CreateReturnResponse> => {
  return await context.$plentymarkets.api.makeOrderReturn(
    103, 'orderKey', [1103, 1], ''
  );
};
