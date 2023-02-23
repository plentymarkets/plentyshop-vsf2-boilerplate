import { Context, FacetSearchCriteria, CategoryPage, FacetResponse } from 'src/types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getFacet(context: Context, params: FacetSearchCriteria): Promise<CategoryPage> {
  // TODO: use default category id
  const categoryId = params.categoryId?.toString() || '16';
  const url = new URL('/rest/io/category', context.config.api.url);
  url.searchParams.set('categoryId', categoryId);

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
  const facetResponse = await context.client.get(url.href) as FacetResponse;

  return {
    products: facetResponse.data.itemList.documents.map(document => document.data),
    pagination: {
      totals: facetResponse.data.itemList.total
    },
    facets: facetResponse.data.facets
  };
}

