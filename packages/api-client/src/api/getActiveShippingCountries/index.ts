import { Context } from '@vue-storefront/core';
import { ActiveShippingCountry } from 'src/types/country';

export async function getActiveShippingCountries(context: Context): Promise<ActiveShippingCountry[]> {
  const url = new URL('/rest/storefront/countries', context.config.api.url);

  const { data } = await context.client.get(url.href);
  return data;
}
