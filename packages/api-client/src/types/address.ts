import { UserShippingAddressSearchCriteria } from './todo';
import { AfterBasketChanged, CheckoutChanged } from './events';
import { CustomQuery } from '@vue-storefront/core';
export enum AddressType {
    Billing = 1,
    Shipping = 2
}

export enum AddressOptionType {
    VATNumber = 1,
    ExternalAddressID = 2,
    EntryCertificate = 3,
    Telephone = 4,
    Email = 5,
    PostNumber = 6,
    PersonalId = 7,
    BBFC = 8,
    Birthday = 9,
    SessionID = 10,
    Title = 11,
    ContactPerson = 12,
    ExternalCustomerID = 13
}

export type AddressOption = {
    id: number;
    addressId: number;
    typeId: AddressOptionType;
    value: string;
    position: number;
    createdAt: Date;
    updatedAt: Date;
}

export type AddressPivot = {
    contactId: number;
    addressId: number;
    id: number;
    typeId: number;
    isPrimary: number;
}

export type AddressData = {
    id: number;
    gender: string;
    name1?: string;
    name2: string;
    name3: string;
    name4?: string;
    address1: string;
    address2: string;
    address3?: string;
    address4?: string;
    postalCode: string;
    town: string;
    countryId: number;
    stateId?: number | null;
    readOnly: boolean;
    checkedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    primary: number;
    title: string;
    contactPerson: string;
    taxIdNumber: string;
    pivot: AddressPivot;
    options: AddressOption[];
}

export type Address = {
    id?: number,
    firstName: string,
    lastName: string,
    streetName: string,
    apartment: string,
    city: string,
    state: string | null | undefined,
    country: string | null | undefined,
    zipCode: string,
    phoneNumber: string | null | undefined,
    email?: string,
    primary?: number
}

export interface UserAddressGetters {
    getAddresses: (addresses: Address[], criteria?: UserShippingAddressSearchCriteria) => Address[];
    getDefault: (addresses: Address[]) => Address;
    getTotal: (addresses: Address[]) => number;
    getPostCode: (address: Address) => string;
    getStreetName: (address: Address) => string;
    getStreetNumber: (address: Address) => string | number;
    getCity: (address: Address) => string;
    getFirstName: (address: Address) => string;
    getLastName: (address: Address) => string;
    getPhone: (address: Address) => string;
    getEmail: (address: Address) => string;
    getProvince: (address: Address) => string;
    getCompanyName: (address: Address) => string;
    getTaxNumber: (address: Address) => string;
    getId: (address: Address) => string | number;
    getApartmentNumber: (address: Address) => string | number;
    isDefault: (address: Address) => boolean;
    getAddressWithoutId(address: Address): Address;
    getCountryId(address: Address): string;
    getStateId(address: Address): string;
}

export interface BillingAddressDetailsParams {
    address: Readonly<Address>
    billing: Readonly<Address[]>;
    customQuery?: CustomQuery;
}

export interface ShippingAddressDetailsParams {
    address: Readonly<Address>
    shipping: Readonly<Address[]>;
    customQuery?: CustomQuery;
}

export interface SetAddressDefaultResponse {
    data: string
    events: {
        AfterBasketChanged: AfterBasketChanged,
        CheckoutChanged: CheckoutChanged
    }
}

export interface DeleteAddressResponse {
    data: Address[]
    events: {
        AfterBasketChanged: AfterBasketChanged,
        CheckoutChanged: CheckoutChanged
    }
}

export interface SaveAddressResponse {
    data: Address,
    events: {
        AfterBasketChanged: AfterBasketChanged,
        CheckoutChanged: CheckoutChanged
    }
}
