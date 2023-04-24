import { CategoryGetters, AgnosticCategoryTree, AgnosticBreadcrumb } from '@vue-storefront/core';
import type { CategoryTreeItemDetails, CategoryTreeItem } from '@vue-storefront/plentymarkets-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTree(category: CategoryTreeItem): AgnosticCategoryTree {
  return {
    label: getCategoryDetails(category.details)?.name || '',
    slug: getCategoryDetails(category.details)?.nameUrl || '',
    items: category.children ? category.children.map(cat => getTree(cat)) : [],
    isCurrent: false,
    count: category?.itemCount[0]?.count || 0
  };
}

function getTreeItems(categoryTree: AgnosticCategoryTree): AgnosticCategoryTree[] {
  return categoryTree.items;
}

function findCategoryBySlug(categories: CategoryTreeItem[], slug: string): CategoryTreeItem {
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

function findCategoryPathById(categories: CategoryTreeItem[], id: number, path: CategoryTreeItem[] = []): CategoryTreeItem[] {
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

function getMappedBreadcrumbs(categories: CategoryTreeItem[], categoryId: number): AgnosticBreadcrumb[] {
  const categoryPath = findCategoryPathById(categories, categoryId);

  return categoryPath.map((category) => {
    const categoryDetails = getCategoryDetails(category.details);

    return {
      text: categoryDetails.name,
      link: '/c/' + categoryDetails.nameUrl
    };
  });
}

function getCategoryDetails(details:CategoryTreeItemDetails[]): CategoryTreeItemDetails | null {
  // TODO:  return correct details for selected language and webstoreId
  return details ? details[0] : null;
}

function getCategoryName(category: CategoryTreeItem): string {
  return category ? getCategoryDetails(category.details)?.name : '';
}

function getCount(category: AgnosticCategoryTree): number {
  return category ? category.count : 0;
}

function getLabel(category: AgnosticCategoryTree): string {
  return category ? category.label : '';
}

function getSlug(category: AgnosticCategoryTree): string {
  return category ? category.slug : '';
}

function getItems(category: AgnosticCategoryTree): AgnosticCategoryTree[] {
  return category ? category.items : [];
}

export const categoryGetters: CategoryGetters<CategoryTreeItem> = {
  getTree,
  getCount,
  getLabel,
  getSlug,
  getItems,
  getCategoryName,
  findCategoryBySlug,
  getCategoryDetails,
  findCategoryPathById,
  getTreeItems,
  getMappedBreadcrumbs
};
