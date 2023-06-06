import { PaypalIntegrationContext } from '../../types';

export async function createOrder(context: PaypalIntegrationContext, foundingSource: string): Promise<string> {
  const url: URL = new URL('/rest/payment/payPal/smart_payment/create/paylater/', context.config.api.url);

  const { data } = await context.client.pp.post(url.href);

  console.log('createOrder', data);

  return data;
}
