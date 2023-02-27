import { AgnosticCategoryTree } from '@vue-storefront/core';
import { Product } from './product';
import { FilterGroup } from './filters';

export type CategoryDetails = {
    name: string,
    lang: string,
    nameUrl: string,
    metaTitle: string,
    imagePath: string,
    image2Path: string,
};
export interface ItemCount {
    count: number
}

export type Category = {
    id: number,
    type: string,
    itemCount: ItemCount[],
    childCount: number,
    children: Category[],
    details: CategoryDetails[]
};

export interface ItemList {
    total: number,
    documents: {data: Product}[],
    inactiveVariationIds: number[],
    'categories.all': { [key: string]: number };
}

export type Facet = {
    products: Product[],
    tree: AgnosticCategoryTree,
    facets: FilterGroup[],
    pagination: {
        perPageOptioons: number[],
        total: number
    }
};

export interface FacetResponse {
    itemList: ItemList;
    facets: FilterGroup[];
}

export interface FacetSearchCriteria {
    categoryId: string,
    page: number,
    itemsPerPage: number,
    sort: string,
    facets: string
}

export type CategoryPage = {
    products: Product[],
    facets: FilterGroup[],
    pagination: {
        totals: number
    }
}
