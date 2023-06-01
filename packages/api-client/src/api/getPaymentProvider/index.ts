import { Context, PaymentProviders } from 'src/types';

export async function getPaymentProviders(context: Context): Promise<PaymentProviders> {
  const url: URL = new URL('/rest/storefront/checkout/payment/providers/', context.config.api.url);
  const { data } = await context.client.get(url.href);

  return { list: data, selected: 0 };
}

export async function setPaymentProvider(context: Context, paymentId: number): Promise<void> {
  const url: URL = new URL('/rest/storefront/checkout/payment/', context.config.api.url);

  await context.client.put(url.href, { paymentMethodId: paymentId });
}
