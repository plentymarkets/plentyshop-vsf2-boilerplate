import { CompanyGetters, CompanyDetails } from '@vue-storefront/plentymarkets-api';

function getName(company: CompanyDetails): string {
  return company ? company.name : '';
}

function getStreet(company: CompanyDetails): string {
  return company ? company.street : '';
}

function getCity(company: CompanyDetails): string {
  return company ? company.city : '';
}

function getEmail(company: CompanyDetails): string {
  return company ? company.email : '';
}

export const companyGetters: CompanyGetters = {
  getName,
  getStreet,
  getCity,
  getEmail
};
