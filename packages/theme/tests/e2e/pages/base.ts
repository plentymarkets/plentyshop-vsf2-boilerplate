import Header from './components/header';
import { addCartItem, register } from './utils/element';

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

  /**
   * Adds an item to the cart via api call
   */
  addCartItem(productId: number, quantity: number): any {
    addCartItem(productId, quantity);
  }
}
