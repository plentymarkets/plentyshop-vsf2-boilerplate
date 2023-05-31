import { Context, ShippingProvider } from 'src/types';

export async function getShippingProvider(context: Context): Promise<ShippingProvider> {
  const url: URL = new URL('/rest/storefront/checkout/shipping/profiles/', context.config.api.url);
  const { data } = await context.client.get(url.href);

  return { list: data, selected: 0 };
}

export async function selectShippingProvider(context: Context, shippingId: number): Promise<string> {
  const url: URL = new URL('/rest/storefront/checkout/shipping', context.config.api.url);
  const { data } = await context.client.put(url.href, { shippingProfileId: shippingId });

  return data.data;
}
