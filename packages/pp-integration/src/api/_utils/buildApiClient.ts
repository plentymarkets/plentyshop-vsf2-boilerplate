import { createApiClient } from '@vue-storefront/plentymarkets-api';

export function buildApiClient(config: any) {
  console.log('pp build api client');
  return createApiClient(config);
}
