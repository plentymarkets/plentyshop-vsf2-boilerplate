/* istanbul ignore file */
import { apiClientFactory } from '@vue-storefront/core';

import * as api from './api';
import {
  buildApiClient,
  buildPaymentApiClient
} from './api/_utils';
import { PaypalServerConfig } from './types';
import { endpointsExtension } from './serverExtensions/endpoints';

const { createApiClient } = apiClientFactory<PaypalServerConfig, typeof api>({
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
  api
});

export {
  createApiClient
};
