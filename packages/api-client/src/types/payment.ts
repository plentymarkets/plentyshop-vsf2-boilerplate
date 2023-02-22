export type PaymentMethod = {
    id: number,
    name: string,
    fee: number,
    icon: string,
    description: string,
    sourceUrl: string,
    isSelectable: boolean,
    key: string
}

export type PaymentProviders = {
    list: PaymentMethod[],
    selected: number
}

export type PreparePaymentResult = {
    type: string,
    value: any
}

export type GetPaymentResponse = {
    type: any,
    value: any
}
