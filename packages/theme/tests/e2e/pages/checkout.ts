import { Customer } from '../types/customer';
import { el, uniquePlentyMarketsEmail } from './utils/element';

class Checkout {
  protected step: string;

  get heading(): Cypress.Chainable {
    return cy.get(`h3:contains("${Cypress._.capitalize(this.step)}")`);
  }

  public url(): Cypress.Chainable {
    return cy.location('pathname').should('eq', `/checkout/${this.step}`);
  }

  get firstName(): Cypress.Chainable {
    return el(`${this.step}-firstName`, 'input');
  }

  get lastName(): Cypress.Chainable {
    return el(`${this.step}-lastName`);
  }

  get streetName(): Cypress.Chainable {
    return el(`${this.step}-streetName`);
  }

  get apartment(): Cypress.Chainable {
    return el(`${this.step}-apartment`);
  }

  get city(): Cypress.Chainable {
    return el(`${this.step}-city`);
  }

  get country(): Cypress.Chainable {
    return el(`${this.step}-country`);
  }

  get state(): Cypress.Chainable {
    return el(`${this.step}-state`);
  }

  get zipcode(): Cypress.Chainable {
    return el(`${this.step}-zipCode`);
  }

  get phone(): Cypress.Chainable {
    return el(`${this.step}-phoneNumber`);
  }

  public get createAddress(): Cypress.Chainable {
    return el('update-address-button');
  }

}

class CheckoutLogin {

  get email(): Cypress.Chainable {
    return el('register-mail-input');
  }

  get continueToBilling(): Cypress.Chainable {
    return el('continue-to-billing');
  }

  get createAccountCheckbox(): Cypress.Chainable {
    return el('create-account-checkbox');
  }

  get setAccountPassword(): Cypress.Chainable {
    return el('create-password-input');
  }

  public continueAsUser(customer: Customer): void {
    const mail = uniquePlentyMarketsEmail(customer.email);
    this.email.type(mail);
    this.createAccountCheckbox.click();
    this.setAccountPassword.type('Testuser1234');
    this.continueToBilling.click();
  }

  public continueAsGuest(customer: Customer): void {
    const mail = uniquePlentyMarketsEmail(customer.email);
    this.email.type(mail);
    this.continueToBilling.click();
  }
}

class Shipping extends Checkout {
  constructor() {
    super();
    this.step = 'shipping';
  }

  get continueToPaymentButton(): Cypress.Chainable {
    return el('continue-to-payment');
  }

  get selectShippingButton(): Cypress.Chainable {
    return cy.contains('Select shipping method');
  }

  get shippingMethods(): Cypress.Chainable {
    return el('shipping-method', 'label');
  }

  public fillForm(customer: Customer): void {
    this.firstName.type(customer.firstName);
    this.lastName.type(customer.lastName);
    this.streetName.type(customer.address.shipping.streetName);
    this.apartment.type(customer.address.shipping.apartment);
    this.city.type(customer.address.shipping.city);
    this.country.click();
    el(`${this.step}-country-${customer.address.shipping.country}`).click();
    this.zipcode.type(customer.address.shipping.zipCode);
    this.state.click();
    el(`${this.step}-state-${customer.address.shipping.state}`).click();
    this.phone.type(customer.address.shipping.phoneNumber);
  }
}

class Billing extends Checkout {
  constructor() {
    super();
    this.step = 'billing';
  }

  get continueToShipping(): Cypress.Chainable {
    return el('continue-to-shipping');
  }

  public fillForm(customer: Customer): void {
    this.firstName.type(customer.firstName);
    this.lastName.type(customer.lastName);
    this.streetName.type(customer.address.billing.streetName);
    this.apartment.type(customer.address.billing.apartment);
    this.city.type(customer.address.billing.city);
    this.country.click();
    el(`${this.step}-country-${customer.address.billing.country}`).click();
    this.zipcode.type(customer.address.billing.zipCode);
    this.state.click();
    el(`${this.step}-state-${customer.address.billing.state}`).click();
    this.phone.type(customer.address.billing.phoneNumber);
  }

}

class Payment {
  get makeAnOrderButton(): Cypress.Chainable {
    return cy.contains('Make an order');
  }

  get paymentMethods(): Cypress.Chainable {
    return el('payment-method');
  }

  get terms(): Cypress.Chainable {
    return el('terms', 'label');
  }
}

class ThankYou {
  get heading(): Cypress.Chainable {
    return el('thank-you-banner', 'h2');
  }
  get itemsTable(): Cypress.Chainable {
    return el('thank-you-items');
  }

  visit(orderId, accesskey): Cypress.Chainable {
  return cy.visit('/checkout/thank-you?orderId=' + orderId + '&orderAccessKey=' + accesskey);
  }
}

export {
  CheckoutLogin,
  Shipping,
  Billing,
  Payment,
  ThankYou
};
