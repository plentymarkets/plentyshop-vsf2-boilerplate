import {
  CartGetters,
  AgnosticPrice,
  AgnosticTotals,
  AgnosticCoupon,
  AgnosticDiscount,
  AgnosticAttribute
} from '@vue-storefront/core';
import type { Cart, CartItem } from '@vue-storefront/plentymarkets-api';
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
function getItemQty(item: CartItem): number {
  return item?.quantity ?? 1;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemAttributes(item: CartItem, filterByAttributeName?: Array<string>): Record<string, AgnosticAttribute | string> {
  // TODO
  return {
    color: 'red'
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(item: CartItem): string {
  return '';
}

function getItemId(item: CartItem): number {
  return item?.id ?? 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotals(cart: Cart): AgnosticTotals {
  return {
    total: cart?.basketAmount ?? 0,
    shippingAmount: cart?.shippingAmount ?? 0,
    vatAmount: cart?.totalVats[0]?.vatAmount ?? 0,
    subtotal: cart?.itemSum ?? 0,
    special: cart?.basketAmount ?? 0,
    rebate: cart?.basketRebate ?? 0,
    couponDiscount: cart?.couponDiscount ?? 0,
    toBePayed: cart?.basketAmount ?? 0 - cart?.couponDiscount ?? 0
  };
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
  getShippingPrice,
  getItems,
  getItemName,
  getItemImage,
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
