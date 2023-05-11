import { ApiClientMethods, IntegrationContext, ProductsSearchParams, UseUserOrderSearchParams } from '@vue-storefront/core';
import { AxiosInstance } from 'axios';
import { AddressType, DeleteAddressResponse, SetAddressDefaultResponse, SaveAddressResponse, Address } from './address';
import { Cart } from './cart';
import { CategoryTreeItem } from './categoryTree';
import { ActiveShippingCountry } from './country';
import { FacetSearchCriteria, FacetApiResponse } from './facet';
import { ItemSearchParams, ItemSearchResult } from './itemSearch';
import { LegalInformationResponse } from './legal';
import { AdditionalInformationParams, CreateOrderResponse, GetOrdersResponse, OrderDetails } from './order';
import { GetPaymentResponse, PaymentProviders, PreparePaymentResult } from './payment';
import { Product } from './product';
import { RegisterParams } from './register';
import { Review, ReviewSearchParams } from './review';
import { SessionResult } from './session';
import { ShippingProvider } from './shipping';
import { UserChangeResponse } from './user';
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

    selectShippingProvider(shippingId: number): Promise<string>

    loginAsGuest(email: string): Promise<SessionResult>

    saveAddress(typeId: AddressType, addressData: Address): Promise<SaveAddressResponse>

    setAddressAsDefault(addressId: number, typeId: number): Promise<SetAddressDefaultResponse>;

    loadAddresses(typeId: AddressType): Promise<Address[]>

    deleteAddress(addressId: number, typeId: number): Promise<DeleteAddressResponse>;

    getActiveShippingCountries(): Promise<ActiveShippingCountry[]>

    getPaymentProviders(): Promise<PaymentProviders>

    setPaymentProvider(paymentId: number): Promise<string>

    getOrder(orderId: string, orderAccessKey: string): Promise<OrderDetails>

    additionalInformation(params: AdditionalInformationParams): Promise<void>

    preparePayment(): Promise<PreparePaymentResult>

    placeOrder(): Promise<CreateOrderResponse>

    getOrders(params: UseUserOrderSearchParams): Promise<GetOrdersResponse>

    executePayment(orderId: number, paymentId: number): Promise<GetPaymentResponse>

    getLegalInformation(type: string): Promise<LegalInformationResponse>

}

export type Context = IntegrationContext<ClientInstance, Settings, ApiClientMethods<PlentymarketsApiMethods>>;
