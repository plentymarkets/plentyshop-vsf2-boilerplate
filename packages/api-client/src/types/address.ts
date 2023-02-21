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
    countryId: string | null;
    stateId?: string | null;
    readOnly: boolean;
    checkedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    contactPerson: string;
    options: AddressOption[];
    primary: number;
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
    getAddresses: (addresses: Address[], criteria?: Record<string, any>) => Address[];
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
