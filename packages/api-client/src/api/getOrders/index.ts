import { UseUserOrderSearchParams } from '@vue-storefront/core';
import { Context, GetOrdersResponse } from 'src/types';

export async function getOrders(context: Context, params: UseUserOrderSearchParams): Promise<GetOrdersResponse> {
  const url: URL = new URL('/rest/io/order', context.config.api.url);

  url.searchParams.set('page', params?.page?.toString() ?? '1');
  url.searchParams.set('items', '5');

  const { data } = await context.client.get(url.href);

  return data;
}
