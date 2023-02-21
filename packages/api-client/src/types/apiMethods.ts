import { ApiClientMethods, IntegrationContext, ProductsSearchParams, UseUserOrderSearchParams } from '@vue-storefront/core';
import { AxiosInstance } from 'axios';
import { AddressData, AddressType } from './address';
import { Cart } from './cart';
import { Category, CategoryPage } from './category';
import { ActiveShippingCountry } from './country';
import { ItemSearchParams, ItemSearchResult } from './itemSearch';
import { CreateOrderResponse, GetOrdersResponse } from './order';
import { GetPaymentResponse, PaymentProviders, PreparePaymentResult } from './payment';
import { Product } from './product';
import { RegisterParams } from './register';
import { Review, ReviewSearchParams } from './review';
import { SessionResult } from './session';
import { ShippingProvider } from './shipping';
import { TODO } from './todo';
import { Wishlist } from './wishlist';

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

    getCategory(
        params: any
    ): Promise<Category[]>,

    getFacet(
        params: any
    ): Promise<CategoryPage>,

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

    loginUser(email: string, password: string): Promise<SessionResult>

    registerUser(params: RegisterParams): Promise<any>

    logoutUser(): Promise<boolean>

    changePassword(currentPassword, newPassword): Promise<boolean>

    getShippingProvider(): Promise<ShippingProvider>

    selectShippingProvider(shippingId: number): Promise<string>

    loginAsGuest(email: string): Promise<SessionResult>

    saveAddress(typeId: AddressType, addressData: TODO): Promise<any>

    setAddressAsDefault(addressId: number, typeId: number): Promise<any>;

    loadAddresses(typeId: AddressType): Promise<AddressData[]>

    deleteAddress(addressId: number, typeId: number): Promise<any>;

    getActiveShippingCountries(): Promise<ActiveShippingCountry[]>

    getPaymentProviders(): Promise<PaymentProviders>

    setPaymentProvider(paymentId: number): Promise<string>

    additionalInformation(params: any): Promise<void>

    preparePayment(): Promise<PreparePaymentResult>

    placeOrder(): Promise<CreateOrderResponse>

    getOrders(params: UseUserOrderSearchParams): Promise<GetOrdersResponse>

    executePayment(orderId: number, paymentId: number): Promise<GetPaymentResponse>

    saveBillingAsShipping(): Promise<any>
}

export type Context = IntegrationContext<ClientInstance, Settings, ApiClientMethods<PlentymarketsApiMethods>>;
