import { Category } from '@vue-storefront/plentymarkets-api';

export interface CategoryTree {
  items: Category[]
}

function getItems(categoryTree: CategoryTree): Category[] {
  return categoryTree.items;
}

export const categoryTreeGetters = {
  getItems
};
