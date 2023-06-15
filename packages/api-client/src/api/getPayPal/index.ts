import {Context} from '../../types';
import {PayPalApproveOrder, PayPalCreateOrder, PayPalExecutePayment} from '../../types/paypal';

export async function createOrder(context: Context, foundingSource: string): Promise<PayPalCreateOrder> {
  const url: URL = new URL('/rest/payment/payPal/smart_payment/create/' + foundingSource + '/', context.config.api.url);

  const { data } = await context.client.post(url.href);

  return data;
}

export async function approveOrder(context: Context, orderID: string, payerID: string): Promise<PayPalApproveOrder> {
  const url: URL = new URL('/rest/payment/payPal/smart_payment/' + orderID + '/' + payerID + '/capture', context.config.api.url);
  const { data } = await context.client.post(url.href);

  return data;
}

export async function executePayPalOrder(context: Context, mode: string, orderID: number, paypalOrderID: string, merchantId: string): Promise<PayPalExecutePayment> {
  const url: URL = new URL(`rest/payment/payPal/${mode}/${orderID}/${paypalOrderID}/${merchantId}/execute-payment`, context.config.api.url);
  const { data } = await context.client.get(url.href);

  // console.log('executePayPalOrder', data);

  return data;
}
