import { Address } from '@vue-storefront/plentymarkets-api';

export type Customer = {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: {
    shipping: Address,
    billing: Address
  }
}
