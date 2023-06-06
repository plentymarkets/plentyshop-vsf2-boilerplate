import { createApiClient } from '@vue-storefront/plentymarkets-api';

export function buildApiClient(config: unknown) {
  console.log('pp build api client');
  return createApiClient(config);
}
