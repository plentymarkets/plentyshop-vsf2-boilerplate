import { AgnosticFacetSearchParams } from '@vue-storefront/core';
import { Context, FacetResponse, FacetSearchPlentyApiResponse } from 'src/types';

const ITEMS_PER_PAGE = [20, 40, 100];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getFacet(context: Context, params: AgnosticFacetSearchParams): Promise<FacetResponse> {
  // TODO: use default category id
  const categoryId = params.categoryId?.toString() || '16';
  const url = new URL('/rest/storefront/items', context.config.api.url);

  url.searchParams.set('categoryId', categoryId);
  url.searchParams.set('type', 'category');

  if (params.page) {
    url.searchParams.set('page', params.page?.toString());
  }
  if (params.itemsPerPage) {
    url.searchParams.set('items', params.itemsPerPage?.toString());
  }
  if (params.sort) {
    url.searchParams.set('sorting', params.sort);
  }
  if (params.facets) {
    url.searchParams.set('facets', params.facets);
  }
  const { data } = await context.client.get(url.href);

  const { category, itemList, facets, urls }: FacetSearchPlentyApiResponse = data;

  return {
    category: category,
    products: itemList.documents.map(document => document.data),
    pagination: {
      totals: itemList.total || 0
    },
    facets: facets,
    languageUrls: urls
  };
}

