import {
  useVSFContext
} from '@vue-storefront/core';
import type {
  CreateReturnResponse, MakeReturnParams
} from '@vue-storefront/plentymarkets-api';

export const useMakeReturn = (params: MakeReturnParams): Promise<CreateReturnResponse> => {
  const context = useVSFContext();

  return context.$plentymarkets.api.makeOrderReturn(
    103, 'orderKey', [1103, 1], ''
  );
};
