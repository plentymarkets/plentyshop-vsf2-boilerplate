import { Context, NewsletterParams, SubscribeNewsletterResponse, UnsubscribeNewsletterResponse } from 'src/types';

export async function subscribeNewsletter(context: Context, params: NewsletterParams): Promise<SubscribeNewsletterResponse> {
  const url: URL = new URL('/rest/storefront/newsletter', context.config.api.url);

  const { data } = await context.client.post(url.href, params);

  return data;
}

export async function unsubscribeNewsletter(context: Context, params: NewsletterParams): Promise<UnsubscribeNewsletterResponse> {
  const url: URL = new URL('/rest/storefront/newsletter/' + params.email, context.config.api.url);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data } = await context.client.delete(url.href, params);

  return data;
}
