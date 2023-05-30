import { AgnosticPagination, UserOrderGetters } from '@vue-storefront/core';
import type { AddressData, GetOrdersResponse, Order, OrderItem, OrderTotals } from '@vue-storefront/plentymarkets-api';
import { productGetters } from './productGetters';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDate(order: Order): string {
  if (order && order.order) {
    return new Date(order.order.createdAt).toLocaleString();
  }

  return '';
}

function getById(orders: Order[], id: string): Order {
  return orders.find(
    order => order?.order?.id.toString() === id
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(order: Order): string {
  return order?.order?.id?.toString() || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getOrderEmail(order: Order): string {
  const option = order?.order?.deliveryAddress?.options
    .find(op => op.typeId === 5);

  return option?.value || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBillingAddress(order: Order): AddressData | {} {
  return order?.order?.billingAddress || {};
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingAddress(order: Order): AddressData | {} {
  return order?.order?.deliveryAddress || {};
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPaymentMethodName(order: Order): AddressData | {} {
  return order?.paymentMethodName || {};
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPaymentStatus(order: Order): AddressData | {} {
  return order?.paymentStatus || {};
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingProfileName(order: Order): AddressData | {} {
  return order?.shippingProfileName || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStatus(order: Order): string {
  return order?.order?.statusName || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPrice(order: Order): number | null {
  return order?.order?.amounts[0]?.grossTotal || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(order: Order): OrderItem[] {
  return order?.order?.orderItems || [];
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
function getOrdersTotal(orders: any): number {
  return orders?.data?.totalsCount || 0;
}

function getAccessKey(order: Order): string {
  return order?.order?.accessKey || '';
}

function getTotals(order: Order): OrderTotals {
  return order?.totals;
}

function getSubTotal(totals: OrderTotals): number {
  return totals?.itemSumGross;
}

function getShippingAmount(totals: OrderTotals): number {
  return totals?.shippingGross;
}

function getVatRate(totals: OrderTotals): number {
  return totals?.vats[0].rate;
}

function getVatAmount(totals: OrderTotals): number {
  return totals?.vats[0].value;
}

function getTotal(totals: OrderTotals): number {
  return totals?.totalGross;
}

function getPagination(orders: GetOrdersResponse): AgnosticPagination {
  const totalPages = orders?.data?.lastPageNumber || 1;
  const pageOptions = [orders?.data?.itemsPerPage] || [5];
  const totalItems = orders?.data?.totalsCount || 1;
  const currentPage = orders?.data?.page || 1;
  const itemsPerPage = orders?.data?.itemsPerPage || 10;

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

export const orderGetters: UserOrderGetters<Order, OrderItem> = {
  getAccessKey,
  getById,
  getOrderEmail,
  getDate,
  getFormattedPrice,
  getId,
  getItemName,
  getItemPrice,
  getItemQty,
  getItemVariationId,
  getItems,
  getItemSku,
  getOrderItemLink,
  getOrdersTotal,
  getPagination,
  getPrice,
  getShippingAmount,
  getStatus,
  getSubTotal,
  getTotal,
  getTotals,
  getVatAmount,
  getVatRate,
  getBillingAddress,
  getShippingAddress,
  getPaymentMethodName,
  getPaymentStatus,
  getShippingProfileName
};
