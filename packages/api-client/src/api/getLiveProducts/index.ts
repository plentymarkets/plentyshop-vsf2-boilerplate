import { Context, LiveProductResponse } from 'src/types';

export async function getLiveProducts(context: Context, id: number): Promise<LiveProductResponse> {
  let url: URL;
  url = new URL(`/rest/storefront/items/?type=live-shopping&liveShoppingId=${ id }`, context.config.api.url);

  const { data } = await context.client.get(url.href);

  return data;
}
