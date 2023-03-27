import {
  Context,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import type { Category } from '@vue-storefront/plentymarkets-api';
import type {
  UseCategorySearchParams as SearchParams
} from '../types';

const params: UseCategoryFactoryParams<Category, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  categorySearch: async (context: Context) => {
    const data = await context.$plentymarkets.api.getCategory();

    return data;
  }
};

export const useCategory = useCategoryFactory<Category, SearchParams>(params);
