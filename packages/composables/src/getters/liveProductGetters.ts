import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters,
  AgnosticBreadcrumb
} from '@vue-storefront/core';
import type { Category, Product, ProductFilter, ProductVariation } from '@vue-storefront/plentymarkets-api';
import { productImageFilter } from '../helpers/productImageFilter';

const NO_SELECTION_ID = -1;

function getName(item: any): string {
  return item?.item?.texts?.name1 ?? '';
}

export const liveProductGetters: any = {
  getName,
};
