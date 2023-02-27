import {
  Context,
  useUserBillingFactory,
  UseUserBillingFactoryParams
} from '@vue-storefront/core';
import {
  AddressType,
  BillingAddressDetailsParams,
  Address
} from '@vue-storefront/plentymarkets-api';

const params: UseUserBillingFactoryParams<Address[], Address> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addAddress: async (context: Context, params: BillingAddressDetailsParams) => {
    await context.$plentymarkets.api.saveAddress(AddressType.Billing, params.address);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);
    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteAddress: async (context: Context, params: BillingAddressDetailsParams) => {
    await context.$plentymarkets.api.deleteAddress(params.address.id, AddressType.Billing);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);
    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAddress: async (context: Context, params: BillingAddressDetailsParams) => {
    await context.$plentymarkets.api.saveAddress(AddressType.Billing, params.address);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);
    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context): Promise<Address[]> => {
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);
    return data?.length > 0 ? data : [];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDefaultAddress: async (context: Context, params: BillingAddressDetailsParams) => {
    await context.$plentymarkets.api.setAddressAsDefault(params.address.id, AddressType.Billing);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);
    return data ?? null;
  }
};

export const useUserBilling = useUserBillingFactory<Address[], Address>(params);
