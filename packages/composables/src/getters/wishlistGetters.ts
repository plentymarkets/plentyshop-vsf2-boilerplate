import {
  WishlistGetters,
  AgnosticAttribute,
  AgnosticPrice,
  AgnosticTotals
} from '@vue-storefront/core';
import type { Wishlist, WishlistItem } from '@vue-storefront/plentymarkets-api';
import { productImageFilter } from '../helpers/productImageFilter';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(wishlist: Wishlist): WishlistItem[] {
  return wishlist?.items ?? [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotals(wishlist: Wishlist): AgnosticTotals {
  return {
    total: 0,
    subtotal: 0
  };
}

function getItemName(item: WishlistItem): string {
  return item?.texts?.name1 ?? '';
}

function getItemImage(item: WishlistItem): string {
  return item ? productImageFilter(item)[0].small : '';
}

function getItemPrice(item: WishlistItem): AgnosticPrice {
  return {
    special: item?.prices?.default?.price?.value ?? 0,
    regular: item?.prices?.rrp?.price?.value ?? 0
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSpecialItemPrice(item: WishlistItem): number {
  return item?.prices?.default?.price?.value ?? 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getRegularItemPrice(item: WishlistItem): number {
  return item?.prices?.rrp?.price?.value ?? 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemQty(item: WishlistItem): number {
  return 1;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemAttributes(item: WishlistItem, filters?: string[]): Record<string, AgnosticAttribute | string> {
  return {
    color: 'red'
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(item: WishlistItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(product: WishlistItem): string {
  return product?.variation?.id.toString() ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingPrice(wishlist: Wishlist): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalItems(wishlist: Wishlist): number {
  return wishlist?.items?.length ?? 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return price?.toString() ?? '';
}

export const wishlistGetters: WishlistGetters<Wishlist, WishlistItem> = {
  getItems,
  getTotals,
  getItemName,
  getItemImage,
  getItemPrice,
  getSpecialItemPrice,
  getRegularItemPrice,
  getItemQty,
  getItemAttributes,
  getShippingPrice,
  getItemSku,
  getTotalItems,
  getFormattedPrice,
  getId
};
