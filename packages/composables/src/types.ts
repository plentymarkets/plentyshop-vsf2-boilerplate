import {
  ProductsSearchParams
} from '@vue-storefront/core';
import { ReviewSearchParams, ShippingMethod } from '@vue-storefront/plentymarkets-api';
import { ComputedRef } from '@nuxtjs/composition-api';

export type TODO = unknown;

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

export interface ComposableBaseResponse<T> {
  result: ComputedRef<T>
  loading: ComputedRef<boolean>
  error: ComputedRef<{search: unknown}>
}

export interface CompanyDetails {
  name: string,
  street: string,
  city: string,
  email: string
}

export interface ShippingMethods {
  shippingMethod: ShippingMethod[]
}
