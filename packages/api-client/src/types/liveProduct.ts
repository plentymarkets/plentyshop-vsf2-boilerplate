export interface LiveProductResponse {
    item:         LiveProductResponseItem;
    liveShopping: LiveShopping;
}

export interface LiveProductResponseItem {
    images:                   Images;
    item:                     ItemItem;
    texts:                    Texts;
    defaultCategories:        DefaultCategory[];
    variation:                Variation;
    filter:                   ItemFilter;
    unit:                     Unit;
    stock:                    any[];
    hasOrderProperties:       boolean;
    hasRequiredOrderProperty: boolean;
    properties:               any[];
    prices:                   ItemPrices;
    facets:                   any[];
    attributes:               any[];
}

export interface DefaultCategory {
    id:               number;
    parentCategoryId: number;
    level:            number;
    type:             string;
    linklist:         boolean;
    right:            string;
    sitemap:          boolean;
    updatedAt:        string;
    manually:         boolean;
    plentyId:         number;
}

export interface ItemFilter {
    isSalable:          boolean;
    isSalableAndActive: boolean;
    hasActiveChildren:  boolean;
    hasChildren:        boolean;
}

export interface Images {
    all:       All[];
    variation: any[];
}

export interface All {
    names:          AllNames;
    path:           string;
    position:       number;
    urlMiddle:      string;
    cleanImageName: string;
}

export interface AllNames {
    imageId:   number;
    lang:      string;
    name:      string;
    alternate: string;
}

export interface ItemItem {
    id:                    number;
    storeSpecial:          null;
    manufacturerId:        number;
    itemType:              string;
    manufacturer:          Manufacturer;
    rebate:                number;
    salableVariationCount: number;
    customsTariffNumber:   string;
    producingCountry:      Condition;
    condition:             Condition;
}

export interface Condition {
    names: any[];
}

export interface Manufacturer {
    id:                    number;
    name:                  string;
    logo:                  string;
    url:                   string;
    street:                string;
    email:                 string;
    position:              number;
    pixmaniaBrandId:       number;
    neckermannBrandId:     number;
    externalName:          string;
    neckermannAtEpBrandId: number;
    postcode:              string;
    houseNo:               string;
    town:                  string;
    countryId:             number;
    phoneNumber:           string;
    faxNumber:             string;
    laRedouteBrandId:      number;
    comment:               string;
    updatedAt:             string;
    nameExternal:          string;
}

export interface ItemPrices {
    default:         DefaultItemPrice;
    rrp:             DefaultItemPrice;
    set:             null;
    specialOffer:    null;
    graduatedPrices: DefaultItemPrice[];
}

export interface DefaultItemPrice {
    price:                ItemPrice;
    unitPrice:            ItemPrice;
    basePrice:            string;
    baseLot:              number;
    baseUnit:             string;
    baseSinglePrice:      number;
    minimumOrderQuantity: number;
    contactClassDiscount: PriceDiscount;
    categoryDiscount:     PriceDiscount;
    currency:             string;
    lowestPrice:          ItemPrice;
    vat:                  ItemVat;
    isNet:                boolean;
    data:                 Data;
}

export interface PriceDiscount {
    percent: number;
    amount:  number;
}

export interface Data {
    salesPriceId:                 number;
    price:                        number;
    priceNet:                     number;
    basePrice:                    number;
    basePriceNet:                 number;
    unitPrice:                    number;
    unitPriceNet:                 number;
    lowestPrice:                  null;
    lowestPriceNet:               null;
    customerClassDiscountPercent: number;
    customerClassDiscount:        number;
    customerClassDiscountNet:     number;
    categoryDiscountPercent:      number;
    categoryDiscount:             number;
    categoryDiscountNet:          number;
    vatId:                        number;
    vatValue:                     number;
    currency:                     string;
    interval:                     string;
    conversionFactor:             number;
    minimumOrderQuantity:         string;
    updatedAt:                    string;
    type:                         string;
}

export interface ItemPrice {
    value:     number | null;
    formatted: string;
}

export interface ItemVat {
    id:    number;
    value: number;
}

export interface Texts {
    lang:    string;
    name2:   string;
    name3:   string;
    urlPath: string;
    name1:   string;
}

export interface Unit {
    names:             UnitNames;
    unitOfMeasurement: string;
    content:           number;
}

export interface UnitNames {
    unitId: number;
    lang:   string;
    name:   string;
}

export interface Variation {
    itemId:                number;
    availabilityId:        number;
    maximumOrderQuantity:  null;
    minimumOrderQuantity:  number;
    intervalOrderQuantity: number;
    releasedAt:            null;
    name:                  string;
    vatId:                 number;
    bundleType:            null;
    mayShowUnitPrice:      boolean;
    availability:          Availability;
    id:                    number;
    availabilityUpdatedAt: string;
    model:                 string;
}

export interface Availability {
    id:          number;
    icon:        string;
    averageDays: number;
    createdAt:   string;
    updatedAt:   string;
    names:       AvailabilityNames;
}

export interface AvailabilityNames {
    id:             number;
    availabilityId: number;
    lang:           string;
    name:           string;
    createdAt:      string;
    updatedAt:      string;
}

export interface LiveShopping {
    id:             number;
    fromTime:       string;
    toTime:         string;
    itemId:         number;
    quantitySold:   number;
    quantityMax:    number;
    liveShoppingId: number;
    link:           number;
}
