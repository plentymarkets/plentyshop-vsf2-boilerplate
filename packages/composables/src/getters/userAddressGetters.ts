import type {
  Address,
  UserShippingAddressSearchCriteria,
  UserAddressGetters,
  Country
} from '@vue-storefront/plentymarkets-api';
import { countryGetters } from './countryGetters';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAddresses(addresses: Address[], criteria?: UserShippingAddressSearchCriteria): Address[] {
  return addresses || [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDefault(addresses: Address[]): Address {
  return addresses.find((address) => address.primary);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotal(addresses: Address[]): number {
  return addresses?.length || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPostCode(address: Address): string {
  return address?.zipCode ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStreetName(address: Address): string {
  return address?.streetName ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStreetNumber(address: Address): string | number {
  return address?.apartment ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCity(address: Address): string {
  return address?.city ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFirstName(address: Address): string {
  return address?.firstName ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getLastName(address: Address): string {
  return address?.lastName ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCountry(countries: Country[], id: string): string {
  if (!countries.length) {
    return '';
  }
  const country = countries.find(
    (country) => Number(country.id) === Number(id)
  );

  return country.name || country.isoCode2;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPhone(address: Address): string {
  return address?.phoneNumber ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getEmail(address: Address): string {
  return address?.email ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getProvince(address: Address): string {
  return address?.state ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCompanyName(address: Address): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTaxNumber(address: Address): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(address: Address): string {
  return address?.id?.toString() ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getApartmentNumber(address: Address): string | number {
  return address?.apartment ?? 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isDefault(address: Address): boolean {
  return address?.primary > 0;
}

function getAddressWithoutId(address: Address): Address {
  delete address.id;
  return address;
}

function getCountryId(address: Address): string {
  return address?.country?.toString() ?? '0';
}

function getStateId(address: Address): string {
  return address?.state?.toString() ?? '0';
}

const getCountryName = (address: Address, countries: Country[]): string => {
  const country = countryGetters.getCountryById(countries, getCountryId(address));

  return countryGetters.getCountryName(country);
};

const getStateName = (address: Address, countries: Country[]): string => {
  const countryId = getCountryId(address);
  const country = countryGetters.getCountryById(countries, countryId);
  const stateId = getStateId(address);
  const state = countryGetters.getStateById(country, stateId);

  return countryGetters.getStateName(state) ? `${countryGetters.getStateName(state)}, ` : '';
};

export const userAddressGetters: UserAddressGetters = {
  getAddresses,
  getDefault,
  getTotal,
  getPostCode,
  getStreetName,
  getStreetNumber,
  getCity,
  getFirstName,
  getLastName,
  getPhone,
  getEmail,
  getProvince,
  getCompanyName,
  getTaxNumber,
  getId,
  getApartmentNumber,
  isDefault,
  getAddressWithoutId,
  getCountryId,
  getStateId,
  getCountryName,
  getStateName
};
