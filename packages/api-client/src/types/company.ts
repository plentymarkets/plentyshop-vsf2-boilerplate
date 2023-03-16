export interface CompanyDetails {
    name: string,
    street: string,
    city: string,
    email: string
}
export interface CompanyGetters {
    getName(company: CompanyDetails): string
    getStreet(company: CompanyDetails): string
    getCity(company: CompanyDetails): string
    getEmail(company: CompanyDetails): string
}
