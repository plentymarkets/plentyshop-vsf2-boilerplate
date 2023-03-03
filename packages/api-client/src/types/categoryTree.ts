import { Category } from './category';

export interface CategoryTree {
  items: Category[];
}

export interface CategoryTreeGetters {
  getItems(categoryTree: CategoryTree): Category[];
}
