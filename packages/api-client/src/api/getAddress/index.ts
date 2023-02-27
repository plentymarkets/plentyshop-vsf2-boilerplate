import { Address, AddressData, AddressOptionType, AddressType, Context, SetAddressDefaultResponse, SaveAddressResponse } from 'src/types';

export async function loadAddresses(context: Context, typeId: AddressType): Promise<Address[]> {
  const url: URL = new URL('/rest/io/customer/address', context.config.api.url);
  url.searchParams.set('typeId', typeId.toString());

  const { data } = await context.client.get(url.href);

  return (data.data as AddressData[]).map(addressData => mapAddressForClient(addressData)) || [];
}

export async function saveAddress(context: Context, typeId: AddressType = AddressType.Billing, addressData: Address): Promise<SaveAddressResponse> {
  const url: URL = new URL('/rest/io/customer/address/', context.config.api.url);

  url.searchParams.set('typeId', typeId.toString());

  const payload = {
    ...mapAddressForServer(addressData)
  };

  const { data } = await context.client.post(url.href, payload);

  return data.data;
}

export async function setAddressAsDefault(context: Context, addressId: number, typeId: number): Promise<SetAddressDefaultResponse> {
  const url: URL = new URL(`/rest/io/customer/address/${addressId}`, context.config.api.url);
  url.searchParams.set('typeId', typeId.toString());
  return await context.client.put(url.href);
}

export async function deleteAddress(context: Context, addressId: number, typeId: number): Promise<boolean> {
  const url: URL = new URL(`/rest/io/customer/address/${addressId}`, context.config.api.url);
  url.searchParams.set('typeId', typeId.toString());
  const { data } = await context.client.delete(url.href);
  return Boolean(data);
}

function mapAddressForServer(addressData): object {
  return {
    id: addressData.id,
    gender: 'male',
    countryId: addressData.country,
    email: addressData.email,
    name1: null,
    name2: addressData.firstName,
    name3: addressData.lastName,
    vatNumber: '',
    contactPerson: '',
    address1: addressData.streetName,
    address2: addressData.apartment,
    postalCode: addressData.zipCode,
    town: addressData.city,
    telephone: addressData.phoneNumber,
    stateId: addressData.state
  };
}

function mapAddressForClient(addressData: AddressData): Address {
  const address = {
    id: addressData.id,
    firstName: addressData.name2,
    lastName: addressData.name3,
    streetName: addressData.address1,
    apartment: addressData.address2,
    city: addressData.town,
    state: addressData.stateId?.toString(),
    country: addressData.countryId?.toString(),
    zipCode: addressData.postalCode,
    phoneNumber: '',
    email: '',
    primary: addressData.primary
  };

  addressData.options.forEach(option => {
    switch (option.typeId) {
      case AddressOptionType.Telephone:
        address.phoneNumber = option.value;
        break;
      case AddressOptionType.Email:
        address.email = option.value;
        break;
    }
  });

  return address;
}
