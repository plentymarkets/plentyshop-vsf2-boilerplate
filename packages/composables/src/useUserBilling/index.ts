import {
  Context,
  useUserBillingFactory,
  UseUserBillingFactoryParams
} from '@vue-storefront/core';
import {
  AddressData,
  AddressType,
  UserBillingAddress as Address,
  UserBillingAddressItem as AddressItem,
  BillingAddressDetailsParams
} from '@vue-storefront/plentymarkets-api';

const params: UseUserBillingFactoryParams<Address, AddressItem> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addAddress: async (context: Context, addressDetails: BillingAddressDetailsParams) => {
    await context.$plentymarkets.api.saveAddress(AddressType.Billing, addressDetails.address);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);
    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteAddress: async (context: Context, addressDetails: BillingAddressDetailsParams) => {
    await context.$plentymarkets.api.deleteAddress(addressDetails.address.id, AddressType.Billing);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);
    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAddress: async (context: Context, addressDetails: BillingAddressDetailsParams) => {
    await context.$plentymarkets.api.saveAddress(AddressType.Billing, addressDetails.address);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);
    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context): Promise<AddressData[]> => {
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);
    return data?.length > 0 ? data : [];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDefaultAddress: async (context: Context, addressDetails: BillingAddressDetailsParams) => {
    await context.$plentymarkets.api.setAddressAsDefault(addressDetails.address.id, AddressType.Billing);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Billing);
    return data ?? null;
  }
};

export const useUserBilling = useUserBillingFactory<Address, AddressItem>(params);
