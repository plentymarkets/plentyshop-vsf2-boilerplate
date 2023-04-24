import { AgnosticFacetSearchParams } from '@vue-storefront/core';
import { Context, FacetApiResponse } from 'src/types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getFacet(context: Context, params: AgnosticFacetSearchParams): Promise<FacetApiResponse> {
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

  return data;
}

