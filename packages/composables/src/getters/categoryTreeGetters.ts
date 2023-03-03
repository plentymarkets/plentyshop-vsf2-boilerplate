import { Category, CategoryTree, CategoryTreeGetters } from '@vue-storefront/plentymarkets-api';

function getItems(categoryTree: CategoryTree): Category[] {
  return categoryTree.items;
}

export const categoryTreeGetters: CategoryTreeGetters = {
  getItems
};
