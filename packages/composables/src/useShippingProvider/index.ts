import { useShippingProviderFactory, UseShippingProviderParams, Context } from '@vue-storefront/core';
import type { ShippingProvider, ShippingMethod } from '@vue-storefront/plentymarkets-api';

const params: UseShippingProviderParams<ShippingProvider, ShippingMethod> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    const shippingProviders = await context.$plentymarkets.api.getShippingProvider();

    return shippingProviders;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { shippingMethod, customQuery }) => {
    await context.$plentymarkets.api.selectShippingProvider(shippingMethod.parcelServicePresetId);
    return { list: [], selected: shippingMethod.parcelServicePresetId };
  }
};

export const useShippingProvider = useShippingProviderFactory<ShippingProvider, ShippingMethod>(params);
