import { CustomQuery } from '@vue-storefront/core';
import { AfterAccountAuthentication, AfterBasketChanged, CheckoutChanged, FrontendUpdateCustomerSettings } from './events';

export type User = {
    guestMail?: string,
    accounts?: []
    anonymizeAt?: string
    birthdayAt?: string
    blocked?: number
    bookAccount?: string
    classId?: number
    contactPerson?: string
    createdAt?: string
    dhlPostIdent?: string
    discountDays?: number
    discountPercent?: number
    ebayName?: string
    email?: string
    externalId?: string
    firstName?: string
    formOfAddress?: string
    fullName?: string
    gender?: string
    id?: number
    inLeadStatusSince?: number
    isLead?: boolean
    klarnaPersonalId?: string
    lang?: string
    lastLoginAt?: string
    lastName?: string
    lastOrderAt?: string
    leadStatusKey?: string
    marketplacePartner?: string
    newsletterAllowanceAt?: number
    number?: number
    options?: []
    paypalEmail?: string
    paypalPayerId?: string
    plentyId?: number
    privateFax?: string
    privateMobile?: string
    privatePhone?: string
    rating?: number
    referrerId?: number
    salesRepresentativeContactId?: number
    singleAccess?: string
    timeForPaymentAllowedDays?: number
    title?: string
    typeId?: number
    updatedAt?: string
    userId?: number
    valuta?: number
}

export interface UserRegisterParams {
    email: string
    password: string
    firstName: string
    lastName: string
    customQuery?: CustomQuery;
}

export interface UserChangeResponse {
    data: User,
    events: {
        AfterBasketChanged: AfterBasketChanged,
        CheckoutChanged: CheckoutChanged,
        AfterAccountAuthentication: AfterAccountAuthentication,
        FrontendUpdateCustomerSettings: FrontendUpdateCustomerSettings
    },
    status?: number;
    message?: string;
}
