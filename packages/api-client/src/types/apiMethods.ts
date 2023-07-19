import { ApiClientMethods, IntegrationContext, ProductsSearchParams, UseUserOrderSearchParams } from '@vue-storefront/core';
import { AxiosInstance } from 'axios';
import { AddressType, DeleteAddressResponse, SetAddressDefaultResponse, SaveAddressResponse, Address } from './address';
import { Cart } from './cart';
import { CategoryTreeItem } from './categoryTree';
import { ActiveShippingCountry } from './country';
import { FacetSearchCriteria, FacetApiResponse } from './facet';
import { ItemSearchParams, ItemSearchResult } from './itemSearch';
import { LegalInformationResponse } from './legal';
import {
  AdditionalInformationParams,
  GetOrdersResponse,
  Order,
  OrderDetails,
  OrderSearchParams,
  GetReturnsResponse
} from './order';
import { GetPaymentResponse, PaymentProviders, PreparePaymentResult } from './payment';
import { Product } from './product';
import { RegisterParams } from './register';
import { Review, ReviewSearchParams } from './review';
import { SessionResult } from './session';
import { ShippingProvider } from './shipping';
import { UserChangeResponse } from './user';
import { Wishlist } from './wishlist';
import { NewsletterParams, SubscribeNewsletterResponse, UnsubscribeNewsletterResponse } from './newsletter';
import {PayPalApproveOrder, PayPalCreateOrder, PayPalExecutePayment} from './paypal';

export type ClientInstance = AxiosInstance;

export type Settings = {
    api: {
      url: string
    }
  };

export type PaginatedResult<T> = {
    firstOnPage: number,
    isLastPage: boolean,
    itemsPerPage: number,
    lastOnPage: number,
    lastPageNumber: number,
    page: number,
    totalsCount: number,
    entries: T[]
}

export interface PlentymarketsApiMethods {
    getProduct(
        params: ProductsSearchParams
    ): Promise<Product[]>,

    getCategory(): Promise<CategoryTreeItem[]>,

    getFacet(
        params: FacetSearchCriteria
    ): Promise<FacetApiResponse>,

    getReview(
        params: ReviewSearchParams
    ): Promise<Review>

    getSearch(
        params: ItemSearchParams
    ): Promise<ItemSearchResult>

    getWishlist(): Promise<Wishlist>,

    addWishlistItem(
        productId: number
    ): Promise<boolean>,

    removeWishlistItem(
        productId: number
    ): Promise<boolean>,

    getCart(): Promise<Cart>,

    addCartItem(
        params: { productId: number, quantity?: number }
    ): Promise<Cart>,

    removeCartItem(
        cartItemId: number
    ): Promise<Cart>,

    updateCartItemQty(
        params: { productId: number, cartItemId: number, quantity: number }
    ): Promise<Cart>

    clearCart(): Promise<Cart>

    deleteCart(): Promise<Cart>

    getSession(initialRestCall: boolean): Promise<SessionResult>

    loginUser(email: string, password: string): Promise<UserChangeResponse>

    registerUser(params: RegisterParams): Promise<UserChangeResponse>

    logoutUser(): Promise<boolean>

    changePassword(currentPassword, newPassword): Promise<UserChangeResponse>

    getShippingProvider(): Promise<ShippingProvider>

    selectShippingProvider(shippingId: number): Promise<ShippingProvider>

    loginAsGuest(email: string): Promise<SessionResult>

    saveAddress(typeId: AddressType, addressData: Address): Promise<SaveAddressResponse>

    setAddressAsDefault(addressId: number, typeId: number): Promise<SetAddressDefaultResponse>;

    loadAddresses(typeId: AddressType): Promise<Address[]>

    deleteAddress(addressId: number, typeId: number): Promise<DeleteAddressResponse>;

    getActiveShippingCountries(): Promise<ActiveShippingCountry[]>

    getPaymentProviders(): Promise<PaymentProviders>

    setPaymentProvider(paymentId: number): Promise<void>

    getOrder(params: OrderSearchParams): Promise<OrderDetails>

    additionalInformation(params: AdditionalInformationParams): Promise<void>

    preparePayment(): Promise<PreparePaymentResult>

    placeOrder(): Promise<Order>

    makeOrderReturn(params: string): Promise<Order>

    getOrders(params: UseUserOrderSearchParams): Promise<GetOrdersResponse>

    getReturns(params: UseUserOrderSearchParams): Promise<GetReturnsResponse>

    executePayment(orderId: number, paymentId: number): Promise<GetPaymentResponse>

    getLegalInformation(type: string): Promise<LegalInformationResponse>

    subscribeNewsletter(params: NewsletterParams): Promise<SubscribeNewsletterResponse>

    unsubscribeNewsletter(params: NewsletterParams): Promise<UnsubscribeNewsletterResponse>

    createOrder(fundingSource: string): Promise<PayPalCreateOrder>

    approveOrder(orderID: string, payerID: string): Promise<PayPalApproveOrder>

    executePayPalOrder(mode: string, orderID: number, paypalOrderID: string, merchantId: string): Promise<PayPalExecutePayment>
}

export type Context = IntegrationContext<ClientInstance, Settings, ApiClientMethods<PlentymarketsApiMethods>>;
