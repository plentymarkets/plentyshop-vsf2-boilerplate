import { ItemSearchParams, ItemSearchResult } from '@vue-storefront/plentymarkets-api';
import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext } from '@vue-storefront/core';
import { ComposableBaseResponse } from '../types';

// export interface UseSearchResponse extends ComposableBaseResponse<ItemSearchResult> {
//   search: (params: ItemSearchParams) => Promise<void>
// }

export const useLiveProducts = async (id: string): Promise<any> => {

  const context = useVSFContext();

  const search = async (params: any): Promise<any> => {
    try {
      return await context.$plentymarkets.api.getLiveProducts(params);
    } catch (err) {
      console.log({err});
    }
  };

  return await search(id);
};
