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

export type Category = {
    id: number,
    type: string,
    // TODO: maybe implement correct type
    itemCount: any,
    childCount: number,
    children: Category[],
    details: CategoryDetails[]
};

export type Facet = {
    products: Product[],
    tree: AgnosticCategoryTree,
    facets: FilterGroup[],
    pagination: any
};

export type CategoryPage = {
    products: Product[],
    facets: FilterGroup[],
    pagination: any
}
