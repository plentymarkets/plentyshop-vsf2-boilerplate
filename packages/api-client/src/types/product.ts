import { ReviewAverage } from './review';

export type ProductAttribute = {
    attributeId: number,
    position: number,
    name: string,
    type: string,
    values: {
        attributeValueId: number,
        position: number,
        imageUrl: string,
        name: string
    }[]
}

export type ProductVariation = {
    variationId: number,
    isSalable: boolean,
    unitCombinationId: number,
    unitId: number,
    unitName: string,
    attributes: {
        attributeId: number,
        attributeValueId: number
    }[]
}

export interface Price {
    value: number | null;
    formatted: string;
}

export interface Vat {
    id: number;
    value: number;
}

export interface Discount {
    percent: number;
    amount: number;
}

export interface DefaultData {
    salesPriceId: number;
    price: number;
    priceNet: number;
    basePrice: number;
    basePriceNet: number;
    unitPrice: number;
    unitPriceNet: number;
    lowestPrice: null;
    lowestPriceNet: null;
    customerClassDiscountPercent: number;
    customerClassDiscount: number;
    customerClassDiscountNet: number;
    categoryDiscountPercent: number;
    categoryDiscount: number;
    categoryDiscountNet: number;
    vatId: number;
    vatValue: number;
    currency: string;
    interval: string;
    conversionFactor: number;
    minimumOrderQuantity: string;
    updatedAt: string;
    type: string;
}

export interface Default {
    price: Price;
    unitPrice: Price;
    basePrice: string;
    baseLot: null;
    baseUnit: null;
    baseSinglePrice: null;
    minimumOrderQuantity: number;
    contactClassDiscount: Discount;
    categoryDiscount: Discount;
    currency: string;
    lowestPrice: Price;
    vat: Vat;
    isNet: boolean;
    data: DefaultData;
}

export interface Prices {
    default: Default;
    rrp: Default;
    set: null;
    specialOffer: null;
    graduatedPrices: Default[];
}

export interface LanguageNames {
    [key: string]: string,
    'x-default': string
}

export type Product = {
    attributes: {
        attributeId: number,
        valueId: number
    }[],
    texts: {
        name1: string,
        name2: string,
        name3: string,
        description: string,
        technicalData: string,
        shortDescription: string,
        urlPath: string,
        lang: string,
    },
    unit: {
        names: { "unitId": Number, "lang": String, "name": String },
        unitOfMeasurement: String,
        content: Number
    },
    images: {
        all: {
            position: string,
            names: {
                imageId: number,
                name: string,
                alternate: string,
                lang: string
            }
            url: string,
            urlMiddle: string,
            urlPreview: string
        }[],
        variation: {
            position: string,
            names: {
                imageId: number,
                name: string,
                alternate: string,
                lang: string
            }
            url: string,
            urlMiddle: string,
            urlPreview: string
        }[],
    },
    defaultCategories: {
        id: number,
        parentCategoryId: number,
        level: 2
    }[]
    name: string,
    variation: {
        id: number
    },
    item: {
        id: number
    },
    sku: string,
    prices: Prices,
    feedback: ReviewAverage,
    variationAttributeMap?: {
        attributes: ProductAttribute[],
        variations: ProductVariation[]
    },
    urls: LanguageNames
}
