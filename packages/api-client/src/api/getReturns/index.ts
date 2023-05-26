import { UseUserOrderSearchParams } from '@vue-storefront/core';
import { Context, GetReturnsResponse } from 'src/types';

export async function getReturns(context: Context, params: UseUserOrderSearchParams): Promise<GetReturnsResponse> {
  const url: URL = new URL('/rest/io/customer/order/return', context.config.api.url);

  url.searchParams.set('page', params?.page?.toString() ?? '1');
  url.searchParams.set('items', '5');

  const { data } = await context.client.get(url.href);

  return data;
}
