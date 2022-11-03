import { Logger } from '@vue-storefront/core';
import { LOGGER_PREFIX } from '../../consts';
import { PaypalIntegrationContext } from '../../types';

const exampleEndpoint = async (
  context: PaypalIntegrationContext, 
  params: TODO
): Promise<TODO> => {
  try {
    return Promise.resolve({});
  } catch (err) {
    Logger.error(`${LOGGER_PREFIX} ${err.message}`);
    throw err;
  }
};

export default exampleEndpoint;
