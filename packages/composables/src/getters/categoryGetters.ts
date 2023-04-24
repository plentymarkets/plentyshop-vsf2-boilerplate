import type { Category, CategoryDetails } from '@vue-storefront/plentymarkets-api';

interface categoryGetters {
  getCategoryName(category: Category),
  getCategoryDetails(category: Category)
}

function getCategoryDetails(category: Category): CategoryDetails | null {
  // TODO:  return correct details for selected language and webstoreId
  return category.details ? category.details[0] : null;
}

function getCategoryName(category: Category): string {
  return category ? getCategoryDetails(category)?.name : '';
}

export const categoryGetters: categoryGetters = {
  getCategoryName,
  getCategoryDetails
};
