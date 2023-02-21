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
    icon: any
    excludedPaymentMethodIds: number[]
    allowedPaymentMethodNames: string[]
};

export interface ShippingProvider {
    list: ShippingMethod[],
    selected: number
}
