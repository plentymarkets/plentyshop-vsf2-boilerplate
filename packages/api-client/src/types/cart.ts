import { AgnosticTotals } from '@vue-storefront/core';
import { Product } from './product';

export type TotalVat = {
    vatAmount: number
    vatValue: number
};

export interface CartItem {
    id: number
    quantity: number
    price: number
    itemId: number
    variation: Product
    variationId: number
    basketItemOrderParams: any[]
    inputLength: number
    inputWidth: number
    setComponents: any[]
    itemType: number
}

export type Cart = {
    id: number
    sessionId: string
    orderId: number
    customerId: number
    customerShippingAddressId: number
    currency: string
    referrerId: number
    shippingCountryId: number
    methodOfPaymentId: number
    shippingProviderId: number
    shippingProfileId: number
    itemSum: number
    itemSumNet: number
    basketAmount: number
    basketAmountNet: number
    shippingAmount: number
    shippingAmountNet: number
    paymentAmount: number
    couponCode: string
    couponDiscount: number
    shippingDeleteByCoupon: boolean
    basketRebate: number
    maxFsk: number
    orderTimestamp: string
    createdAt: string
    updatedAt: string
    basketRebateType: string
    customerInvoiceAddressId: number
    itemQuantity: number
    totalVats: TotalVat[]
    subAmount: number
    isExportDelivery: boolean
    shopCountryId: number
    itemWishListIds: number[],
    items: CartItem[]
};

export interface PlentyAgnosticTotals extends AgnosticTotals {
    shippingAmount: number,
    vatValue: number,
    vatAmount: number,
    rebate: number,
    couponDiscount: number,
    toBePayed: number
}
