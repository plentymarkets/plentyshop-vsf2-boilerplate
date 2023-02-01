import { Context, PaymentProviders } from 'src/types';

export async function getPaymentProviders(context: Context): Promise<PaymentProviders> {
  const url: URL = new URL('/rest/storefront/checkout/payment/providers/', context.config.api.url);
  const { data } = await context.client.get(url.href);

  return { list: data, selected: 0 };
}

export async function setPaymentProvider(context: Context, paymentId: number): Promise<string> {
  const url: URL = new URL('/rest/io/checkout/paymentId/', context.config.api.url);
  const { data } = await context.client.post(url.href, { paymentId: paymentId });
  return data;
}
