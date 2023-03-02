import { Cart } from './cart';

export interface ShippingPrivacyInformation {
    showDataPrivacyAgreementHint: boolean
    id: number
    parcelServiceId: number
    parcelServiceName: string
    parcelServiceAddress: string
}

export type ShippingMethod = {
    parcelServicePresetId: number
    parcelServicePresetName: string
    parcelServiceType: number
    parcelServiceId: number
    parcelServiceName: string
    shippingAmount: number
    shippingPrivacyInformation: ShippingPrivacyInformation[]
    isPostOffice: boolean
    isParcelBox: boolean
    icon: unknown
    excludedPaymentMethodIds: number[]
    allowedPaymentMethodNames: string[]
};

export interface ShippingProvider {
    list: ShippingMethod[],
    selected: number
}

export interface ShippingProviderGetters {
    getShippingProviders(shippingProvider: ShippingProvider): ShippingMethod[]
    getShippingMethodName(shippingMethod: ShippingMethod): string
    getShippingProvidersLength(ShippingMethods: ShippingMethod[]): number
    getShippingAmount(shippingMethod: ShippingMethod): string
    getValue(shippingMethod: ShippingMethod): ShippingMethod
    getParcelServicePresetId(shippingMethod: ShippingMethod): string
    getShippingProfileId(cart: Cart): string
}
