import Header from './components/header';
import { register } from './utils/element';

export default class Base {
  get path(): string {
    return '/';
  }

  get header(): typeof Header {
    return Header;
  }

  visit(): Cypress.Chainable {
    return cy.visit(this.path);
  }

  /**
   * Creates a new user with a unique mail via api call
   */
  registerUser(email: string, password: string): void {
    register(email, password);
  }
}
