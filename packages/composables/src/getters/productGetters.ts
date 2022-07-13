import { categoryGetters } from './categoryGetters';
import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters,
  AgnosticBreadcrumb
} from '@vue-storefront/core';
import type { Category, Product, ProductFilter } from '@vue-storefront/plentymarkets-api';

function getName(product: Product): string {
  return product?.texts?.name1 ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSlug(product: Product): string {
  return product?.texts?.urlPath.split('/').pop() ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPrice(product: Product): AgnosticPrice {
  return {
    special: product?.prices?.default?.price?.value ?? 0,
    regular: product?.prices?.rrp?.price?.value ?? 0
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGallery(product: Product): AgnosticMediaGalleryItem[] {
  return _itemImageFilter(product);
}

function getBreadcrumbs(product: Product, categoryPath?: Category[]): AgnosticBreadcrumb [] {
  categoryPath = categoryPath?.length ? categoryPath : [];

  return [
    {
      text: 'Home',
      link: '/'
    },

    ...categoryPath.map((category) => {
      const categoryDetails = categoryGetters.getCategoryDetails(category.details);
      return {
        text: categoryDetails.name,
        link: categoryDetails.nameUrl
      };
    }),
    {
      text: product.texts.name1,
      link: ''
    }
  ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCoverImage(product: Product): string {
  return product ? _itemImageFilter(product)[0].small : '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFiltered(products: Product[], filters: ProductFilter): Product[] {
  // TODO: test only
  return products;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAttributes(products: Product[] | Product, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> {
  return {};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDescription(product: Product): string {
  return product?.texts?.description ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShortDescription(product: Product): string {
  return product?.texts?.shortDescription ?? product?.texts?.description ?? '';
}

function getTechnicalData(product: Product): string {
  return product?.texts?.technicalData ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryIds(product: Product): string[] {
  return product?.defaultCategories?.map(category => category.id.toString()) ?? [''];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(product: Product): string {
  return product?.variation?.id.toString() ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemId(product: Product): string {
  return product?.item?.id.toString() ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return price?.toString() ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalReviews(product: Product): number {
  return Number(product?.feedback?.counts?.ratingsCountTotal);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAverageRating(product: Product): number {
  return Number(product?.feedback?.counts?.averageValue);
}

export function _itemImageFilter(product: Product): { small: string, normal: string, big: string }[] {
  if (!product) {
    return [
      {
        small: '',
        normal: '',
        big: ''
      }
    ];
  }

  const images = product.images;
  const imagesAccessor = images.variation?.length ? 'variation' : 'all';
  const result = [];

  images[imagesAccessor].forEach(image => {
    result.push({
      small: image.urlPreview || image.urlMiddle,
      normal: image.urlMiddle,
      big: image.url || image.urlMiddle,
      position: image.position
    });
  });

  return result;
}

export const productGetters: ProductGetters<Product, ProductFilter> = {
  getName,
  getSlug,
  getPrice,
  getGallery,
  getCoverImage,
  getFiltered,
  getAttributes,
  getDescription,
  getShortDescription,
  getTechnicalData,
  getCategoryIds,
  getId,
  getFormattedPrice,
  getTotalReviews,
  getAverageRating,
  getBreadcrumbs: getBreadcrumbs,
  getItemId
};
