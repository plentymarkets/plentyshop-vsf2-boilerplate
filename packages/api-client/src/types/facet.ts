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

export interface FacetApiResponse {
    category: Category,
    itemList: ItemList;
    facets: FilterGroup[];
    urls: LanguageUrls
}

export interface Facet {
    category: Category,
    facets: FilterGroup[],
    products: Product[],
    languageUrls: LanguageUrls
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

