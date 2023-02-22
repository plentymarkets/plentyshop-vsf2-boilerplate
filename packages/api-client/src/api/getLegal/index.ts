import { Context } from '@vue-storefront/core';
import { LegalInformationResponse } from '../../types';

export async function getLegalInformation(context: Context, type: string): Promise<LegalInformationResponse> {
  const url: URL = new URL('/rest/storefront/legal', context.config.api.url);
  url.searchParams.set('type', type);
  const { data } = await context.client.get(url.href);
  return data;
}
