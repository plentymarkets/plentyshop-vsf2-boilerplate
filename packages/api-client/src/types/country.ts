export type State = {
    id: number,
    name: string
}

export type Country = {
    id: number,
    name: string,
    isoCode2: string,
    states: State[]
}

export type ShippingCountryName = {
    country_id: string,
    id: number,
    language: string,
    name: string
}

export type ShippingCountryState = {
    countryId: string,
    id: number,
    isoCode: string,
    isoCode3166: string,
    name: string
}

export type ActiveShippingCountry = {
    active: boolean,
    currLangName: string,
    id: number,
    isCountryStateMandatory: boolean,
    isoCode2: string,
    isoCode3: string,
    lang: string,
    name: string,
    names: ShippingCountryName[]
    shippingDestinationId: number,
    states: ShippingCountryState[]
    storehouseId: number
    vatCodes: string[]
}

export interface CountryGetters {
    getStates(country: Country): State[],
    getStateId(state: State): string,
    getStateName(state: State): string,
    getCountryId(country: Country): string,
    getCountryName(country: Country): string,
    getCountryIsoCode(country: Country): string
    getCountryById(countries: Country[], countryId: string): Country | null
    getStateById(country: Country, stateId: string): State | null
}
