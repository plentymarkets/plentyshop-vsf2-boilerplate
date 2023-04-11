import { Category } from './category';
import { FilterGroup } from './filters';
import { Product } from './product';
import { AgnosticCategoryTree } from '@vue-storefront/core';

export interface ItemList {
    total: number,
    documents: { data: Product }[],
    inactiveVariationIds: number[],
    'categories.all': { [key: string]: number };
}

export interface LanguageUrls {
    [key: string]: string,
    'x-default': string
}

export interface FacetSearchPlentyApiResponse {
    category: Category,
    itemList: ItemList;
    facets: FilterGroup[];
    urls: LanguageUrls
}
export interface FacetResponse {
    category: Category,
    facets: FilterGroup[],
    products: Product[],
    pagination: {
        totals: number
    },
    languageUrls: LanguageUrls
}

export interface Facet extends FacetResponse {
    pagination: {
        totals: number,
        perPageOptions: number[]
    },
    tree: AgnosticCategoryTree
}

export interface FacetSearchCriteria {
    categorySlug: string,
    categoryId?: string,
    page: number,
    itemsPerPage: number,
    sort: string,
    facets: string
}

