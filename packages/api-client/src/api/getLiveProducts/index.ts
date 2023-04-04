import { ProductsSearchParams } from '@vue-storefront/core';
import { Product, Context, ReviewAverage } from 'src/types';

export async function getLiveProducts(context: Context, params: any): Promise<any> {
  let url: URL;
  url = new URL(`/rest/storefront/items/?type=live-shopping&liveShoppingId=${ params }`, context.config.api.url);

  const { data } = await context.client.get(url.href);

  return data;
}
