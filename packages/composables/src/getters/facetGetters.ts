import {
  FacetsGetters,
  FacetSearchResult,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet
} from '@vue-storefront/core';
import type { Category, Facet, FacetSearchCriteria, Product } from '@vue-storefront/plentymarkets-api';
import { useContext } from '@nuxtjs/composition-api';
import { categoryGetters } from './categoryGetters';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAll(params: FacetSearchResult<Facet>, criteria?: FacetSearchCriteria): AgnosticFacet[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGrouped(params: FacetSearchResult<Facet>, criteria?: FacetSearchCriteria): AgnosticGroupedFacet[] {
  const selectedFacets = params.input?.facets?.split(',');

  if (!params?.data?.facets) {
    return [];
  }

  return params.data.facets.map((group) => {
    return {
      id: group.id.toString(),
      label: group.name,
      count: group.count,
      options: group.values.map((filter) => {
        return {
          selected: selectedFacets && selectedFacets.includes(filter.id.toString()),
          type: group.type,
          count: filter.count,
          id: filter.id.toString(),
          value: filter.name.toString()
        };
      })
    };
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSortOptions(params: FacetSearchResult<Facet>): AgnosticSort {

  const { app } = useContext();
  // TODO: Move translations to CategoryPageHeader component.
  const options = [
    {
      id: 'texts.name1_asc',
      value: app.i18n.t('CategoryPageHeader.name-a-z'),
      type: 'sort'
    },
    {
      id: 'texts.name1_desc',
      value: app.i18n.t('CategoryPageHeader.name-z-a'),
      type: 'sort'
    },
    {
      id: 'sorting.price.avg_asc',
      value: app.i18n.t('CategoryPageHeader.price-up'),
      type: 'sort'
    },
    {
      id: 'sorting.price.avg_desc',
      value: app.i18n.t('CategoryPageHeader.price-down'),
      type: 'sort'
    }
  ].map(o => ({ ...o, selected: o.id === params.input.sort }));
  const selected = options.find(o => o.id === params.input.sort)?.id;

  return { selected, options };
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryTree(params: FacetSearchResult<Facet>): AgnosticCategoryTree {
  return params?.data?.tree || {
    label: 'Placeholder',
    items: [],
    isCurrent: false
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getProducts(products: FacetSearchResult<Facet>): Product[] {
  return products?.data?.products ?? [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPagination(params: FacetSearchResult<Facet>): AgnosticPagination {
  const totals = params.data?.pagination?.total || 1;
  const pageOptions = params.data?.pagination?.perPageOptioons || [20, 40, 100];
  const totalItems = params.data?.pagination?.total || 1;

  return {
    currentPage: params.input.page,
    totalPages: Math.ceil(Number(totals) / Number(params.input.itemsPerPage)),
    totalItems: totalItems,
    itemsPerPage: params.input.itemsPerPage,
    pageOptions: pageOptions
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBreadcrumbs(params: FacetSearchResult<Facet>, categories?: Category[]): AgnosticBreadcrumb[] {
  if (!categories) {
    return [];
  }
  const breadcrumbs = categoryGetters.getMappedBreadcrumbs(categories, params.input.categoryId);

  return [
    {
      text: 'Home',
      link: '/'
    },
    ...breadcrumbs
  ];
}

export const facetGetters: FacetsGetters<Facet, Product[], FacetSearchCriteria> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};
