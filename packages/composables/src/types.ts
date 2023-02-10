import {
  Context, ProductsSearchParams, UseCartFactoryParams
} from '@vue-storefront/core';
import { ReviewSearchParams } from '@vue-storefront/plentymarkets-api';

export type TODO = any;

export type UseBillingAddParams = TODO;

export type UseCategorySearchParams = TODO;

export type UseFacetSearchParams = TODO;

export type UseProductSearchParams = ProductsSearchParams;

export type UseReviewSearchParams = ReviewSearchParams;

export type UseReviewAddParams = TODO;

export type UseShippingAddParams = TODO;

export type UseStoreFilterParams = TODO;

export type UseUserUpdateParams = TODO;

export type UseUserRegisterParams = TODO;

export type useUserOrderSearchParams = TODO;

export interface UsePlentyCartFactoryParams<Cart, CartItem, Product> extends UseCartFactoryParams<Cart, CartItem, Product> {
  deleteCart (context: Context): Promise<Cart>
}
