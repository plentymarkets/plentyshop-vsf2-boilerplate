import { Product } from './product';
import { PaginatedResult } from './apiMethods';
import { AddressData } from './address';
import { TODO } from './todo';
import { CustomQuery } from '@vue-storefront/core';

interface VariationMap {
  [variationId: string]: Product
}

interface VariationStringMap {
  [variationId: string]: string
}

export interface OrderSearchParams {
  orderId: string;
  accessKey: string;
  name: string;
  postcode: string;
}

export interface AddressRelation {
  id: number;
  orderId: number;
  typeId: number;
  addressId: number;
}

export interface AmountVat {
  id: number;
  orderAmountId: number;
  countryVatId: number;
  vatField: number;
  vatRate: number;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  netTotal: number;
  grossTotal: number;
}

export interface OrderAmount {
  id: number;
  orderId: number;
  isSystemCurrency: boolean;
  isNet: boolean;
  currency: string;
  exchangeRate: number;
  netTotal: number;
  grossTotal: number;
  vatTotal: number;
  invoiceTotal: number;
  paidAmount: number;
  giftCardAmount: number;
  createdAt: Date;
  updatedAt: Date;
  shippingCostsGross: number;
  shippingCostsNet: number;
  taxlessAmount: number;
  prepaidAmount: number;
  vats: AmountVat[];
}

export interface Option {
  id: number;
  addressId: number;
  typeId: number;
  value: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DateElement {
  orderId: number;
  typeId: number;
  date: Date;
}

export interface OrderItemAmount {
  id: number;
  orderItemId: number;
  isSystemCurrency: boolean;
  currency: string;
  exchangeRate: number;
  purchasePrice: number;
  priceOriginalGross: number;
  priceOriginalNet: number;
  priceGross: number;
  priceNet: number;
  surcharge: number;
  discount: number;
  isPercentage: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GiftCard {
  isGiftCard: boolean;
  information: unknown[];
  hasPdf: boolean;
}

export interface OrderItemProperty {
  id: number;
  orderItemId: number;
  typeId: number;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  orderId: number;
  typeId: number;
  referrerId: number;
  itemVariationId: number;
  quantity: number;
  orderItemName: string;
  attributeValues: null;
  shippingProfileId: number;
  countryVatId: number;
  vatField: number;
  vatRate: number;
  position: string;
  createdAt: Date;
  updatedAt: Date;
  warehouseId: number | null;
  bundleComponents?: null;
  bundleType?: null;
  giftCard?: GiftCard;
  attributes?: unknown[];
  variationProperties?: null;
  orderProperties: unknown[];
  properties: OrderItemProperty[];
  dates: unknown[];
  amounts: OrderItemAmount[];
  references: unknown[];
}

export interface OrderProperty {
  orderId: number;
  typeId: number;
  value: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Relation {
  orderId: number;
  referenceType: string;
  referenceId: number;
  relation: string;
}

export interface PaymentMethodListForSwitch {
  id: number;
  name: string;
  fee: number;
  icon: string;
  description: string;
  sourceUrl: string;
  key: string;
  isSwitchableFrom: boolean;
  isSwitchableTo: boolean;
}

export interface OrderTotalsVat {
  rate: number;
  value: number;
}

export interface OrderTotals {
  itemSumGross: number;
  itemSumNet: number;
  itemSumRebateGross: number;
  itemSumRebateNet: number;
  shippingGross: number;
  shippingNet: number;
  vats: OrderTotalsVat[];
  couponValue: number;
  openAmount: number;
  couponType: string;
  couponCode: string;
  totalGross: number;
  totalNet: number;
  currency: string;
  isNet: boolean;
  additionalCosts: unknown[];
  additionalCostsWithTax: unknown[];
  subAmount: number;
  promotionalCouponsValue: number;
  giftCardsValue: number;
  paidAmount: number;
}

export interface OrderDetails {
  id: number;
  referrerId: number;
  roundTotalsOnly: boolean;
  numberOfDecimals: number;
  statusName: string;
  plentyId: number;
  typeId: number;
  lockStatus: string;
  locationId: string;
  createdAt: Date;
  updatedAt: Date;
  statusId: number;
  ownerId: string;
  relations: Relation[];
  properties: OrderProperty[];
  dates: DateElement[];
  amounts: OrderAmount[];
  orderReferences: unknown[];
  orderItems: OrderItem[];
  addressRelations: AddressRelation[];
  billingAddress: AddressData;
  deliveryAddress: AddressData;
  documents: unknown[];
  accessKey: string;
  error: {
    message: string,
    code: string,
    data: unknown
  }
}

export interface Order {
  order: OrderDetails;
  status: string;
  totals: OrderTotals;
  shippingProfileId: number;
  shippingProvider: string;
  shippingProfileName: string;
  paymentMethodName: string;
  paymentMethodIcon: string;
  paymentStatus: string;
  allowPaymentMethodSwitchFrom: boolean;
  paymentMethodListForSwitch: PaymentMethodListForSwitch[];
  isReturnable: boolean;
  highlightNetPrices: boolean;
  itemURLs: VariationStringMap;
  itemImages: VariationStringMap;
  variations: VariationMap;
}

export type CreateOrderResponse = {
  order: Order
}

export type GetOrdersResponse = {
  events: TODO[],
  data: PaginatedResult<Order>
}

export type GetReturnsResponse = {
  events: TODO[],
  data: PaginatedResult<Order>
}

export interface AdditionalInformationParams {
  orderContactWish: string | null,
  orderCustomerSign: string | null,
  shippingPrivacyHintAccepted: boolean,
  templateType: string
}

export interface MakeOrderParams {
  paymentId: number,
  shippingPrivacyHintAccepted: boolean,
  customQuery?: CustomQuery;
}

export interface CreateReturnResponse {
  status: number,
  message: string
}

export interface MakeReturnParams {
  orderId: number
  orderAccessKey: string
  variationIds: [{
    id: number,
    quantity: number
  }]
  returnNote: string
}

// variationIds[variationId]=quantity
interface variationIds {
  [variationIds: string]: number
}

export interface MakeReturnApiParams {
  orderId: number,
  orderAccessKey: string,
  returnNote: string,
  variationIds: variationIds
}
