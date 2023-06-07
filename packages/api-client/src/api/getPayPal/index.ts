import {Context} from '../../types';

export async function createOrder(context: Context, foundingSource: string): Promise<any> {
  const url: URL = new URL('/rest/payment/payPal/smart_payment/create/' + foundingSource + '/', context.config.api.url);

  const { data } = await context.client.post(url.href);

  console.log('createOrder', data);

  return data;
}

export async function approveOrder(context: Context, orderID: string, payerID: string) {
  const url: URL = new URL('/rest/payment/payPal/smart_payment/' + orderID + '/' + payerID + '/capture', context.config.api.url);
  const { data } = await context.client.post(url.href);

  console.log('approveOrder', data);

  return data;
}
