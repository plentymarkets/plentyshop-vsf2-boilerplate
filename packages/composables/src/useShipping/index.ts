import {
  Context,
  useShippingFactory,
  UseShippingParams
} from '@vue-storefront/core';
import { AddressType, ShippingAddress } from '@vue-storefront/plentymarkets-api';
import type {
  UseShippingAddParams as AddParams
} from '../types';

const params: UseShippingParams<ShippingAddress, AddParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Shipping);
    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { shippingDetails, customQuery }) => {
    return await context.$plentymarkets.api.saveAddress(AddressType.Shipping, shippingDetails);
  }
};

export const useShipping = useShippingFactory<ShippingAddress, AddParams>(params);
