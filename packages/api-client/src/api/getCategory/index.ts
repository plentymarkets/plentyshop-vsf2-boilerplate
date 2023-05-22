/* eslint-disable @typescript-eslint/no-unused-vars */
import { CategoryTreeItem, Context } from 'src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getCategory(context: Context): Promise<CategoryTreeItem[]> {
  const url: URL = new URL('/rest/storefront/categories', context.config.api.url);

  url.searchParams.set('level', '5');
  const { data } = await context.client.get(url.href);

  return data;
}
