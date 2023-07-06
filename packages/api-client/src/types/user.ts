import { CustomQuery } from '@vue-storefront/core';
import { AfterAccountAuthentication, AfterBasketChanged, CheckoutChanged, FrontendUpdateCustomerSettings } from './events';
import { Ref } from '@nuxtjs/composition-api';
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
    }
}

export interface UserEmailResponse {
    email: string,
    error: {
        message: string,
        code: string,
        data: unknown
    }
}

export interface ForgotPasswordResponse {
    data: {
        message: '',
    },
    error: {
        message: string,
        code: string,
        data: unknown
    }
}

export interface ForgotPassword {
    loading: Ref<boolean>;
    error: Ref<{
        load: null
    }>;
    resetPassword:(email:String) => Promise<void>;
    setNewPassword:(hash:String, newPassword:String, newPassword2:String, contactId:String) => Promise<void>;
}
