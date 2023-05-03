import { ProductsSearchParams } from '@vue-storefront/core';
import { Product, Context } from 'src/types';

export async function getProducts(context: Context, params: ProductsSearchParams): Promise<Product[]> {
  const url = new URL('/rest/storefront/items/', context.config.api.url);

  url.searchParams.set('variationIds[]', params.ids);
  url.searchParams.set('type', 'variation-list');

  const { data } = await context.client.get(url.href);

  return data.item.documents.map(document => document.data);
}
