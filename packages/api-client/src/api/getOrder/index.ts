import { AdditionalInformationParams, Context, CreateOrderResponse, GetPaymentResponse, PreparePaymentResult, CreateReturnResponse } from 'src/types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function additionalInformation(context: Context, params: AdditionalInformationParams): Promise<void> {
  const url: URL = new URL('/rest/io/order/additional_information', context.config.api.url);
  const { data } = await context.client.post(url.href, params);

  return data;
}

export async function preparePayment(context: Context): Promise<PreparePaymentResult> {
  const url: URL = new URL('/rest/io/checkout/payment', context.config.api.url);
  const { data } = await context.client.post(url.href);

  return data.data;
}

export async function placeOrder(context: Context): Promise<CreateOrderResponse> {
  const url: URL = new URL('/rest/io/order', context.config.api.url);
  const { data } = await context.client.post(url.href);

  return data;
}

export async function executePayment(context: Context, orderId: number, paymentId: number): Promise<GetPaymentResponse> {
  const url: URL = new URL('/rest/storefront/checkout/payment/execute', context.config.api.url);
  const { data } = await context.client.post(url.href, {
    orderId: orderId,
    paymentMethodId: paymentId
  });

  return data;
}

export async function makeOrderReturn(context: Context, orderId: number, orderAccessKey:string, variationIds: object, returnNote: string): Promise<CreateReturnResponse> {
  const url: URL = new URL('/rest/io/order/return', context.config.api.url);
  const { data } = await context.client.post(url.href,{
    orderId: orderId,
    orderAccessKey: orderAccessKey,
    variationIds: variationIds,
    returnNote: returnNote
  });

  return data;
}