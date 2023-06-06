/* istanbul ignore file */
import { apiClientFactory } from '@vue-storefront/core';

import {
  buildApiClient,
  buildPaymentApiClient
} from './api/_utils';
import { endpointsExtension } from './serverExtensions/endpoints';
import getSession from './api/exampleEndpoint';
import {createOrder} from './api';
import { PaypalServerConfig } from './types';

const { createApiClient } = apiClientFactory<PaypalServerConfig, unknown>({
  onCreate: (config: PaypalServerConfig) => {
    return {
      config,
      client: {
        plentymarkets: buildApiClient(config),
        pp: buildPaymentApiClient(config)
      }
    };
  },
  extensions: [
    endpointsExtension
  ],
  api: {
    getSession,
    createOrder
  }
});

export {
  createApiClient
};
