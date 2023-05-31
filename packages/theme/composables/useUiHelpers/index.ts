
import { useRoute, getCurrentInstance } from '@nuxtjs/composition-api';
import { AgnosticCategoryTree, Context } from '@vue-storefront/core';

export interface GetFacetsFromURLResponse {
  categorySlug?: string,
  facets?: string,
  itemsPerPage?: number,
  page?: number,
  sort?: string,
  term?: string
  categoryId?: string
}

interface Filters {
  [key: number]: string
}

export interface UseUiHelperResponse {
  getFacetsFromURL(): GetFacetsFromURLResponse
  getCatLink(category: AgnosticCategoryTree): string
  changeSorting(sort: string): void
  changeFilters(filters: Filters): void
  changeItemsPerPage(itemsPerPage: number): void
  setTermForUrl(term: string): void
  isFacetColor(facet: unknown): boolean
  isFacetCheckbox(facet: unknown): boolean
  getSearchTermFromUrl(): void
  changeAttributeSelection(productId: string): void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getContext = (): Context => {
  const vm = getCurrentInstance();

  return vm.root.proxy;
};

const nonFilters = ['page', 'sort', 'term', 'itemsPerPage'];

const useUiHelpers = (): UseUiHelperResponse => {

  const context = getContext();
  const getFacetsFromURL = (): GetFacetsFromURLResponse => {
    const route = useRoute();
    const { query } = context.$router.currentRoute;

    return {
      categorySlug: route.value.path.split('/').pop(),
      page: parseInt(query.page as string, 10) || 1,
      sort: query.sort,
      facets: query.facets,
      itemsPerPage: parseInt(query.itemsPerPage as string) || 20,
      term: query.term
    };
  };

  // eslint-disable-next-line
  const getCatLink = (category: AgnosticCategoryTree): string => {
    return `/c/${category.slug}`;
  };

  // eslint-disable-next-line
  const changeSorting = (sort: string) => {
    const { query } = context.$router.currentRoute;

    context.$router.push({ query: { ...query, sort } });
  };

  const reduceFilters = (query: GetFacetsFromURLResponse) => (prev: GetFacetsFromURLResponse, curr: string): GetFacetsFromURLResponse => {
    const makeArray = Array.isArray(query[curr]) || nonFilters.includes(curr);

    return {
      ...prev,
      [curr]: makeArray ? query[curr] : [query[curr]]
    };
  };

  const getFiltersDataFromUrl = (context: Context, onlyFilters: boolean): GetFacetsFromURLResponse => {
    const { query } = context.$router.history.current;

    return Object.keys(query)
      .filter(f => onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f))
      .reduce(reduceFilters(query), {});
  };

  const changeFilters = (filters: Filters): void => {
    const filtersIds = Object.values(filters).filter((entry: string []) => entry.length > 0).join(',');

    if (filtersIds) {
      context.$router.push({
        query: {
          ...getFiltersDataFromUrl(context, false),
          facets: filtersIds
        }
      });
    } else {
      context.$router.push({
        query: {
          ...getFiltersDataFromUrl(context, false)
        }
      });
    }
  };

  const changeItemsPerPage = (itemsPerPage: number): void => {
    context.$router.push({
      query: {
        ...getFiltersDataFromUrl(context, false),
        itemsPerPage
      }
    });
  };

  const changeAttributeSelection = (productId: string): void => {
    context.$router.push({
      query: {
        ...getFiltersDataFromUrl(context, false)
      },
      params: {
        id: productId
      }
    });
  };

  const setTermForUrl = (term: string): void => {
    context.$router.push({
      query: {
        ...getFiltersDataFromUrl(context, false),
        term: term || undefined
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isFacetColor = (facet: unknown): boolean => {
    // @TODO implement useUiHelpers.isFacetColor
    return false;
  };

  // eslint-disable-next-line
  const isFacetCheckbox = (facet): boolean => {
    // @TODO implement useUiHelpers.isFacetCheckbox
    return false;
  };

  const getSearchTermFromUrl = (): void => {
    // @TODO implement useUiHelpers.getSearchTermFromUrl
  };

  return {
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    setTermForUrl,
    isFacetColor,
    isFacetCheckbox,
    getSearchTermFromUrl,
    changeAttributeSelection
  };
};

export default useUiHelpers;
