import {
  Context,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import type { CategoryTreeItem } from '@vue-storefront/plentymarkets-api';
import type {
  UseCategorySearchParams as SearchParams
} from '../types';

const params: UseCategoryFactoryParams<CategoryTreeItem, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  categorySearch: async (context: Context) => {
    const data = await context.$plentymarkets.api.getCategory();

    return data;
  }
};

export const useCategory = useCategoryFactory<CategoryTreeItem, SearchParams>(params);
