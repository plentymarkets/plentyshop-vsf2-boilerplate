import { Context, ShippingProvider } from 'src/types';

export async function getShippingProvider(context: Context): Promise<ShippingProvider> {
  const url: URL = new URL('/rest/io/checkout/shipping-profiles/', context.config.api.url);
  const { data } = await context.client.get(url.href);

  return { list: data.data, selected: 0 };
}

export async function selectShippingProvider(context: Context, shippingId: number): Promise<string> {
  const url: URL = new URL('/rest/io/checkout/shippingId/', context.config.api.url);
  const { data } = await context.client.post(url.href, { shippingId: shippingId });

  return data;
}
