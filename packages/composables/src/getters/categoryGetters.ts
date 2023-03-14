import { useContext } from '@nuxtjs/composition-api';
import { CategoryGetters, AgnosticCategoryTree, AgnosticBreadcrumb } from '@vue-storefront/core';
import type { Category, CategoryDetails } from '@vue-storefront/plentymarkets-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTree(category: Category): AgnosticCategoryTree {
  return {
    label: getCategoryDetails(category.details)?.name || '',
    slug: getCategoryDetails(category.details)?.nameUrl || '',
    items: category.children ? category.children.map(cat => getTree(cat)) : [],
    isCurrent: false,
    count: category?.itemCount[0]?.count || 0
  };
}

function getNavigationTree(categories: Category[]): AgnosticCategoryTree[] {
  return categories.map((cat) => getTree(cat)).filter((tree) => tree.label);
}

function findCategoryBySlug(categories: Category[], slug: string): Category {
  for (const category of categories) {
    if (getCategoryDetails(category.details)?.nameUrl === slug) {
      return category;
    }
    if (category.children) {
      const foundCategory = findCategoryBySlug(category.children, slug);

      if (foundCategory) {
        return foundCategory;
      }
    }
  }
}

function findCategoryPathById(categories: Category[], id: number, path: Category[] = []): Category[] {
  for (const category of categories) {
    if (category.id === id) {
      return [...path, category];
    }
    if (category.children) {
      const foundPath = findCategoryPathById(category.children, id, [...path, category]);
      if (foundPath?.length > path?.length) {
        return foundPath;
      }
    }
  }
}

function getMappedBreadcrumbs(categories: Category[], categoryId: number): AgnosticBreadcrumb[] {
  const categoryPath = findCategoryPathById(categories, categoryId);
  const context = useContext();

  return categoryPath.map((category) => {
    const categoryDetails = getCategoryDetails(category.details);
    return {
      text: categoryDetails.name,
      link: context.app.localePath('/c/' + categoryDetails.nameUrl)
    };
  });
}

function getCategoryDetails(details:CategoryDetails[]): CategoryDetails | null {
  // TODO:  return correct details for selected language and webstoreId
  return details ? details[0] : null;
}

export const categoryGetters: CategoryGetters<Category> = {
  getTree,
  findCategoryBySlug,
  getCategoryDetails,
  findCategoryPathById,
  getMappedBreadcrumbs,
  getNavigationTree
};
