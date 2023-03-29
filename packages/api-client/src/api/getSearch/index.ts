import { ItemSearchResult } from './../../types';
import { Context, ItemSearchParams } from 'src/types';

export async function getSearch(context: Context, params: ItemSearchParams): Promise<ItemSearchResult> {
  const url: URL = new URL('/rest/io/item/search/', context.config.api.url);

  if (!params.term) {
    console.warn('product search is missing search term');
  }
  url.searchParams.set('query', params.term);
  url.searchParams.set('types[]', 'item');
  url.searchParams.set('templateType', 'home');
  const { data } = await context.client.get(url.href);

  return { products: data.data.itemList.documents.map((item) => item.data) };
}
