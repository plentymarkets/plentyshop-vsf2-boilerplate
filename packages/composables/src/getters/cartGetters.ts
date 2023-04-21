import {
  CartGetters,
  AgnosticPrice,
  AgnosticCoupon,
  AgnosticDiscount,
  AgnosticAttribute
} from '@vue-storefront/core';
import type { Cart, CartItem, PlentyAgnosticTotals as AgnosticTotals } from '@vue-storefront/plentymarkets-api';
import { productGetters } from './productGetters';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(cart: Cart): CartItem[] {
  return cart?.items ?? [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemName(item: CartItem): string {
  return productGetters.getName(item?.variation);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemImage(item: CartItem): string {
  return productGetters.getCoverImage(item?.variation);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemPrice(item: CartItem): AgnosticPrice {
  return productGetters.getPrice(item?.variation);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getRegularItemPrice(item: CartItem): AgnosticPrice {
  return productGetters.getRegularPrice(item?.variation);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSpecialItemPrice(item: CartItem): AgnosticPrice {
  return productGetters.getSpecialPrice(item?.variation);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemQty(item: CartItem): number {
  return item?.quantity ?? 1;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemAttributes(item: CartItem, filterByAttributeName?: Array<string>): Record<string, AgnosticAttribute | string> {
  const attr = item?.variation.attributes[0];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const sizeName = attr?.attribute?.fruugoAttribute === 'size' ? attr?.value?.names.name : '-';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const colorName = attr?.attribute?.fruugoAttribute === 'color' ? attr?.value?.names.name : '-';

  return {
    size: sizeName,
    color: colorName
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(item: CartItem): string {
  return '';
}

function getItemId(item: CartItem): number {
  return item?.id ?? 0;
}

function getVariationId(item: CartItem): number {
  return item?.variationId ?? 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotals(cart: Cart): AgnosticTotals {
  return {
    total: cart?.basketAmount ?? 0,
    shippingAmount: cart?.shippingAmount ?? 0,
    vatValue: cart?.totalVats[0]?.vatValue ?? 0,
    vatAmount: cart?.totalVats[0]?.vatAmount ?? 0,
    subtotal: cart?.itemSum ?? 0,
    special: cart?.basketAmount ?? 0,
    rebate: cart?.basketRebate ?? 0,
    couponDiscount: cart?.couponDiscount ?? 0,
    toBePayed: cart?.basketAmount ?? 0 - cart?.couponDiscount ?? 0
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSubTotal(total: AgnosticTotals): number {
  return total?.subtotal ?? 0;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingAmount(total: AgnosticTotals): number {
  return total?.shippingAmount ?? 0;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getVatAmount(total: AgnosticTotals): number {
  return total?.vatAmount ?? 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotal(total: AgnosticTotals): number {
  return total?.total ?? 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCouponDiscount(total: AgnosticTotals): number {
  return total?.couponDiscount ?? 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getVatValue(total: AgnosticTotals): number {
  return total?.vatValue ?? 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getToBePayed(total: AgnosticTotals): number {
  return total?.toBePayed ?? 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingPrice(cart: Cart): number {
  return cart?.shippingAmount ?? 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalItems(cart: Cart): number {
  return cart?.items?.length ?? 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCoupons(cart: Cart): AgnosticCoupon[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDiscounts(cart: Cart): AgnosticDiscount[] {
  return [];
}

export const cartGetters: CartGetters<Cart, CartItem> = {
  getTotals,
  getSubTotal,
  getShippingAmount,
  getTotal,
  getVatValue,
  getToBePayed,
  getVariationId,
  getCouponDiscount,
  getVatAmount,
  getShippingPrice,
  getItems,
  getItemName,
  getItemImage,
  getRegularItemPrice,
  getSpecialItemPrice,
  getItemPrice,
  getItemQty,
  getItemAttributes,
  getItemSku,
  getFormattedPrice,
  getTotalItems,
  getCoupons,
  getDiscounts,
  getItemId
};
