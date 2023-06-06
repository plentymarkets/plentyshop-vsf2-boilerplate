import { UseUserOrderSearchParams } from '@vue-storefront/core';
import { Context, GetOrdersResponse } from 'src/types';

export async function getOrders(context: Context, params: UseUserOrderSearchParams): Promise<GetOrdersResponse> {
  const url: URL = new URL('/rest/io/order', context.config.api.url);

  url.searchParams.set('page', params?.page?.toString() ?? '1');
  url.searchParams.set('items', '5');

  let { data } = await context.client.get(url.href);

  const newData = data.orderItems.filter(item => item.typeId !== 6);

  data = {...data,...newData}

  return data;
}
