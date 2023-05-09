import {
  useVSFContext
} from '@vue-storefront/core';
import type {
  CreateReturnResponse, MakeReturnParams
} from '@vue-storefront/plentymarkets-api';

export const useMakeReturn = (params: { orderId: number, orderAccessKey: string, variationIds: object, returnNote: string}): Promise<CreateReturnResponse> => {
  const context = useVSFContext();

  return context.$plentymarkets.api.makeOrderReturn(
    866, 'KD8M4D809', [1063], ''
  );
};
