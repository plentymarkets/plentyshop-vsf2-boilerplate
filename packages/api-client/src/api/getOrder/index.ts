import {
  AdditionalInformationParams,
  Context,
  GetPaymentResponse,
  PreparePaymentResult,
  OrderDetails,
  OrderSearchParams,
  Order,
  CreateReturnResponse
} from 'src/types';

export async function getOrder(context: Context, params: OrderSearchParams): Promise<OrderDetails> {
  const url: URL = new URL('/rest/storefront/order', context.config.api.url);

  if (params.orderId) {
    url.searchParams.set('orderId', params.orderId);
  }

  if (params.name) {
    url.searchParams.set('name', params.name);
  }

  if (params.accessKey) {
    url.searchParams.set('accessKey', params.accessKey);
  }

  if (params.postcode) {
    url.searchParams.set('postcode', params.postcode);
  }

  const { data } = await context.client.get(url.href);

  return data;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function additionalInformation(context: Context, params: AdditionalInformationParams): Promise<void> {
  const url: URL = new URL('/rest/storefront/order/additional_information', context.config.api.url);
  const { data } = await context.client.post(url.href, params);

  return data;
}

export async function preparePayment(context: Context): Promise<PreparePaymentResult> {
  const url: URL = new URL('/rest/io/checkout/payment', context.config.api.url);
  const { data } = await context.client.post(url.href);

  return data.data;
}

export async function placeOrder(context: Context): Promise<Order> {
  const url: URL = new URL('/rest/storefront/order', context.config.api.url);
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

export async function makeOrderReturn(context: Context, params: string): Promise<CreateReturnResponse> {
  const url: URL = new URL('/rest/io/order/return', context.config.api.url);

  const { data } = await context.client.post(url.href, params);

  return data;
}
