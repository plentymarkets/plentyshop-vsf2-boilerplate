import { categoryGetters } from './../getters/categoryGetters';
import { useCategory } from './../useCategory/index';
import {
  Context,
  useFacetFactory,
  FacetSearchResult,
  AgnosticCategoryTree
} from '@vue-storefront/core';
import { FacetSearchCriteria, Facet } from '@vue-storefront/plentymarkets-api';

const ITEMS_PER_PAGE = [20, 40, 100];

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<Facet>): Promise<Facet> => {

    const { categories } = useCategory('categories');
    const searchParams = params.input as FacetSearchCriteria;

    const treeCategory = categoryGetters.findCategoryBySlug(categories.value, params.input.categorySlug);
    const tree: AgnosticCategoryTree = {
      label: '',
      items: [categoryGetters.getTree(treeCategory)],
      isCurrent: false
    };

    if (treeCategory) {
      searchParams.categoryId = treeCategory.id;
    }

    const { urls, itemList, facets, category } = await context.$plentymarkets.api.getFacet(searchParams);

    const products = itemList.documents.map(document => document.data);

    return {
      category,
      languageUrls: urls,
      products,
      facets,
      pagination: {
        perPageOptions: ITEMS_PER_PAGE,
        totals: products.length || 0
      },
      tree
    };
  }
};

export const useFacet = useFacetFactory<Facet>(factoryParams);
