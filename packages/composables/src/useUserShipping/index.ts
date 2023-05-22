import {
  Context,
  useUserShippingFactory,
  UseUserShippingFactoryParams
} from '@vue-storefront/core';
import {
  Address,
  AddressType,
  ShippingAddressDetailsParams
} from '@vue-storefront/plentymarkets-api';

const params: UseUserShippingFactoryParams<Address[], Address> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addAddress: async (context: Context, params: ShippingAddressDetailsParams) => {
    await context.$plentymarkets.api.saveAddress(AddressType.Shipping, params.address);

    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Shipping);

    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteAddress: async (context: Context, params: ShippingAddressDetailsParams) => {
    await context.$plentymarkets.api.deleteAddress(params.address.id, AddressType.Shipping);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Shipping);

    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAddress: async (context: Context, params: ShippingAddressDetailsParams) => {
    console.error('use useUserShipping.addAddress to update addresses');
    return [];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params): Promise<Address[]> => {
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Shipping);

    return data?.length > 0 ? data : [];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDefaultAddress: async (context: Context, params: ShippingAddressDetailsParams) => {
    await context.$plentymarkets.api.setAddressAsDefault(params.address.id, AddressType.Shipping);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Shipping);

    return data ?? null;
  }
};

export const useUserShipping = useUserShippingFactory<Address[], Address>(params);
