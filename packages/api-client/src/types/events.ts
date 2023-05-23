import { TODO } from './todo';
import { User } from './user';

export type AfterBasketChanged = TODO;
export type CheckoutChanged = TODO;
export type AfterAccountAuthentication = {
    accountContact: User
};
export type FrontendUpdateCustomerSettings = TODO;
