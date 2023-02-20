import type { Country, CountryGetters, State } from '@vue-storefront/plentymarkets-api';

function getCountryId(country: Country): string {
  return country?.id?.toString() ?? '';
}

function getCountryName(country: Country): string {
  return country?.name ?? '';
}

function getCountryIsoCode(country: Country): string {
  return country?.isoCode2 ?? '';
}
function getStates(country: Country): State[] {
  return country?.states || [];
}

function getStateId(state: State): string {
  return state?.id?.toString() ?? '';
}

function getStateName(state: State): string {
  return state?.name ?? '';
}

function getCountryById(countries: Country[], countryId: string): Country | null {
  if (!countries.length) {
    return null;
  }
  const country = countries.find(
    (country) => Number(country.id) === Number(countryId)
  );
  return country;
}

function getStateById(country: Country, stateId: string): State | null {
  if (country?.states?.length > 0) {
    const state = country.states.find((state) => Number(state.id) === Number(stateId));
    return state;
  }
  return null;
}

export const countryGetters: CountryGetters = {
  getStates,
  getStateId,
  getStateName,
  getCountryId,
  getCountryName,
  getCountryIsoCode,
  getCountryById,
  getStateById
};
