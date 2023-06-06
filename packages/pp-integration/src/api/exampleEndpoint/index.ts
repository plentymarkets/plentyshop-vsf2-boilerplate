import { Logger } from '@vue-storefront/core';
import { LOGGER_PREFIX } from '../../consts';
import { PaypalIntegrationContext } from '../../types';

const exampleEndpoint = async (
  context: PaypalIntegrationContext,
  params: any
): Promise<any> => {
  // context.client.pp.sendIT()
  try {
    return Promise.resolve({});
  } catch (err) {
    Logger.error(`${LOGGER_PREFIX} ${err.message}`);
    throw err;
  }
};

export async function createOrder(context: PaypalIntegrationContext, fundingSource: string) {
  const url: URL = new URL('/rest/payment/payPal/smart_payment/create/' + fundingSource, context.config.api.url);
  const { data } = await context.client.pp.get(url.href);

  return data;
}

export async function getSession(context: PaypalIntegrationContext, initialRestCall: boolean): Promise<any> {
  console.log('getSession: ', context);
  const url: URL = new URL('/rest/io/session/', context.config.api.url);

  url.searchParams.set('initialRestCall', initialRestCall.toString());
  const { data } = await context.client.pp.get(url.href);

  console.log('get sess exampleEndpoint: ', data);

  return {
    user: data.data.customer,
    basket: data.data.basket
  };
}

export default createOrder;
