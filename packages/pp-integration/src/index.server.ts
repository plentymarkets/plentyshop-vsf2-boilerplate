/* istanbul ignore file */
import { apiClientFactory } from '@vue-storefront/core';

import {
  buildApiClient,
  buildPaymentApiClient
} from './api/_utils';
import { endpointsExtension } from './serverExtensions/endpoints';
import getSession from './api/exampleEndpoint';
import { PaypalServerConfig } from './types';

const { createApiClient } = apiClientFactory<PaypalServerConfig, any>({
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
    getSession
  }
});

export {
  createApiClient
};
