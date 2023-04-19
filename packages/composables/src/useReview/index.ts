import {
  Context,
  useReviewFactory,
  UseReviewFactoryParams
} from '@vue-storefront/core';
import type { Review, ReviewSearchParams } from '@vue-storefront/plentymarkets-api';
import type {
  UseReviewSearchParams as SearchParams,
  UseReviewAddParams as AddParams
} from '../types';

const params: UseReviewFactoryParams<Review, SearchParams, AddParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context: Context, params: ReviewSearchParams) => {
    const data = await context.$plentymarkets.api.getReview(params);

    return data;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addReview: async (context: Context, params: ReviewSearchParams): Promise<Review> => {
    console.log('Mocked: useReview.addReview');
    const data = await context.$plentymarkets.api.getReview(params);

    return data;
  }
};

export const useReview = useReviewFactory<Review, SearchParams, AddParams>(params);
