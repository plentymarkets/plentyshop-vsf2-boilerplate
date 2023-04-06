import * as console from 'console';
import { Context } from '@vue-storefront/core';
export async function getReviewFeedback(context: Context,params: any): Promise<void> {
  const url: URL = new URL('/rest/feedbacks/feedback/create', context.config.api.url);

  console.log('getReviewFeedback POST');
  console.log(params);
  await context.client.post(url.href, params);
}