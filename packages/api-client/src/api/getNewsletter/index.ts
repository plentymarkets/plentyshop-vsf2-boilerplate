import { Context, NewsletterParams } from 'src/types';

export async function subscribeNewsletter(context: Context, params: NewsletterParams): Promise<string> {
  const url: URL = new URL('/rest/io/customer/newsletter', context.config.api.url);

  const { data } = await context.client.post(url.href, params);

  return data;
}
