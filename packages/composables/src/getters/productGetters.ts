import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters,
  AgnosticBreadcrumb
} from '@vue-storefront/core';
import type {
  CategoryTreeItem,
  Product,
  ProductFilter,
  ProductVariation
} from '@vue-storefront/plentymarkets-api';
import { productImageFilter } from '../helpers/productImageFilter';
import { categoryTreeGetters } from './categoryTreeGetters';

const NO_SELECTION_ID = -1;

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
function getSpecialPrice(product: Product): number {
  return product?.prices?.default?.price?.value ?? 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getRegularPrice(product: Product): number {
  return product?.prices?.rrp?.price?.value ?? 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGallery(product: Product): AgnosticMediaGalleryItem[] {
  return productImageFilter(product);
}

function getBreadcrumbs(
  product: Product,
  categories?: CategoryTreeItem[]
): AgnosticBreadcrumb[] {
  if (categories.length <= 0 || !product) {
    return [];
  }

  const breadcrumbs = categoryTreeGetters.getMappedBreadcrumbs(
    categories,
    product.defaultCategories[0].id
  );

  return [
    {
      text: 'Home',
      link: '/'
    },
    ...breadcrumbs,
    {
      text: product.texts.name1,
      link: ''
    }
  ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCoverImage(product: Product): string {
  return product ? productImageFilter(product)[0].small : '';
}

function getMiddleImage(product: Product): string {
  return product ? product.images.all[0].urlMiddle : '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFiltered(products: Product[], filters: ProductFilter): Product[] {
  // TODO: test only
  return products;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAttributes(products: Product[], filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> {
  // const isSingleProduct = !Array.isArray(products);
  // const productList = isSingleProduct ? [products] : products;
  const attributes = {};

  products.forEach((product) => {
    product.variationAttributeMap?.attributes.forEach((attribute) => {
      attribute.values.forEach((attributeValue) => {
        if (!attributes[attribute.attributeId]) {
          attributes[attribute.attributeId] = {
            name: attribute.name,
            value: { [attributeValue.attributeValueId]: attributeValue.name },
            label: attribute.name
          } as AgnosticAttribute;
        } else {
          attributes[attribute.attributeId].value[
            attributeValue.attributeValueId
          ] = attributeValue.name;
        }
      });
    });
  });

  return attributes;
}

function getUnits(products: Product[]): Record<number, string> {
  // const isSingleProduct = !Array.isArray(products);
  // const productList = isSingleProduct ? [products] : products;
  const units = {};

  products.forEach((product) => {
    if (product.variationAttributeMap?.variations) {
      for (const variation of product.variationAttributeMap.variations) {
        units[variation.unitCombinationId] = variation.unitName;
      }
    }
  });

  return units;
}

function getVariationIdForAttributes(
  product: Product,
  selectedAttributes: Record<number, string>,
  unitCombinationId: string | null
): number {
  const variations = product?.variationAttributeMap?.variations || [];

  const result = variations.find((variation) => {
    if (
      unitCombinationId &&
      parseInt(unitCombinationId) !== variation.unitCombinationId
    ) {
      return false;
    }

    for (const selectedAttributeId in selectedAttributes) {
      const selectedAttributeValueId = parseInt(
        selectedAttributes[selectedAttributeId]
      );

      const variationAttribute = variation.attributes.find(
        (variationAttribute) =>
          variationAttribute.attributeId === parseInt(selectedAttributeId)
      );

      if (
        (variationAttribute &&
          variationAttribute.attributeValueId !== selectedAttributeValueId) ||
        (!variationAttribute && selectedAttributeValueId !== NO_SELECTION_ID)
      ) {
        return false;
      }
    }

    return true;
  });

  return result?.variationId;
}

function getVariariationById(
  product: Product,
  variationId: number
): ProductVariation {
  return product.variationAttributeMap.variations.find(
    (variation) => variation.variationId === variationId
  );
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
  return (
    product?.defaultCategories?.map((category) => category.id.toString()) ?? [
      ''
    ]
  );
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

function showPricePerUnit(product: Product): Boolean {
  return !(
    product.unit.unitOfMeasurement === 'C62' && product.unit.content === 1
  );
}

function getUnitContent(product: Product): number {
  return Number(product?.unit?.content);
}

function getUnitName(product: Product): String {
  return product?.unit?.names?.name;
}

function getDefaultBaseSinglePrice(product: Product): number {
  return product?.prices?.default?.baseSinglePrice;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAverageRating(product: Product): number {
  return Number(product?.feedback?.counts?.averageValue);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getMaxRating(product: Product): number {
  // return product?.rating?.max;
  return 5;
}

export const productGetters: ProductGetters<Product, ProductFilter> = {
  getUnitContent,
  showPricePerUnit,
  getUnitName,
  getDefaultBaseSinglePrice,
  getName,
  getSlug,
  getPrice,
  getMaxRating,
  getMiddleImage,
  getSpecialPrice,
  getRegularPrice,
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
  getItemId,
  getVariariationById,
  getVariationIdForAttributes,
  getUnits
};
