import { categoryGetters } from './../getters/categoryGetters';
import { useCategory } from './../useCategory/index';
import {
  Context,
  useFacetFactory,
  FacetSearchResult,
  AgnosticCategoryTree
} from '@vue-storefront/core';
import type {
  UseFacetSearchParams as SearchParams
} from '../types';
import { Facet } from '@vue-storefront/plentymarkets-api';

const ITEMS_PER_PAGE = [20, 40, 100];

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<SearchParams>) => {

    const { categories } = useCategory('categories');

    const category = categoryGetters.findCategoryBySlug(categories.value, params.input.categorySlug);

    const tree: AgnosticCategoryTree = categoryGetters.getTree(category);
    const treeWrapper: AgnosticCategoryTree = {
      label: '',
      items: [tree],
      isCurrent: false
    };
    if (category) {
      params.input.categoryId = category.id;
    }
    const data = await context.$plentymarkets.api.getFacet(params.input);
    return {
      products: data.products,
      tree: treeWrapper,
      facets: data.facets,
      pagination: {
        perPageOptioons: ITEMS_PER_PAGE,
        total: data.pagination.totals
      }
    } as Facet;
  }
};

export const useFacet = useFacetFactory<SearchParams>(factoryParams);
