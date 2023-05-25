import { AgnosticPagination, UserOrderGetters } from '@vue-storefront/core';
import type { GetOrdersResponse, Order, OrderItem } from '@vue-storefront/plentymarkets-api';
import { productGetters } from './productGetters';
import { GetReturnsResponse } from '@vue-storefront/plentymarkets-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDate(returnItem: Order): string {
  if (returnItem && returnItem.order) {
    return new Date(returnItem.order.createdAt).toLocaleString();
  }

  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(returnItem: Order): string {
  return returnItem.order?.id.toString() || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStatus(returnItem: Order): string {
  return returnItem?.order?.statusName || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPrice(returnItem: Order): number | null {
  return returnItem?.order?.amounts[0]?.grossTotal || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(returnItem: Order): OrderItem[] {
  return returnItem.order.orderItems || [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(item: OrderItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemName(item: OrderItem): string {
  return item.orderItemName || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemQty(item: OrderItem): number {
  return item.quantity || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemVariationId(item: OrderItem): number {
  return item.itemVariationId || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemPrice(item: OrderItem): number {
  return item.amounts[0].priceOriginalGross || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return price.toString() || '0';
}

// eslint-disable-next-line
function getOrdersTotal(returns: any): number {
  return returns?.data?.totalsCount || 0;
}

function getPagination(returns: GetOrdersResponse): AgnosticPagination {
  const totalPages = returns?.data?.lastPageNumber || 1;
  const pageOptions = [returns?.data?.itemsPerPage] || [5];
  const totalItems = returns?.data?.totalsCount || 1;
  const currentPage = returns?.data?.page || 1;
  const itemsPerPage = returns?.data?.itemsPerPage || 10;

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    pageOptions
  };
}

function getOrderItemLink(order: Order, productId: number): string {
  const link = `/p/${productId}/${productGetters.getSlug(order.variations[productId])}`;

  return link;
}

function getOrders(returns: GetReturnsResponse): Order[] {
  return returns?.data?.entries || [];

}

export const returnGetters: UserOrderGetters<Order, OrderItem> = {
  getDate,
  getId,
  getStatus,
  getPrice,
  getItems,
  getItemSku,
  getItemName,
  getItemQty,
  getItemVariationId,
  getItemPrice,
  getFormattedPrice,
  getOrdersTotal,
  getPagination,
  getOrderItemLink,
  getOrders
};
