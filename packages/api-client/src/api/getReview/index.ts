import { Review, ReviewSearchParams } from './../../types';
import { Context } from 'src/types';

export async function getReview(context: Context, params: ReviewSearchParams): Promise<Review> {
  const url: URL = new URL(`/rest/feedbacks/feedback/helper/feedbacklist/${params.productId}/1`, context.config.api.url);

  url.searchParams.set('feedbacksPerPage', '10');

  const { data } = await context.client.get(url.href);

  return data;
}
