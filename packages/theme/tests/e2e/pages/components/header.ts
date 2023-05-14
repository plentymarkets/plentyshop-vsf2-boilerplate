import { el } from '../utils/element';

class Header {
  get cart(): Cypress.Chainable {
    return el('header-icons').children().eq(2);
  }

  get categories(): Cypress.Chainable {
    return cy.get('[v-e2e*="app-header"]');
  }

  get category() {
    return {
      women: () => el('app-header-url_women'),
      men: () => el('app-header-url_men')
    };
  }

  get account() {
    return el('header-icons').children().eq(0);
  }

  get accountModalForm() {
    return cy.get('[v-e2e="login-modal"]').find('form');
  }

  get openRegistrationButton(): Cypress.Chainable {
    return el('open-registration-form');
  }

  openCart(): Cypress.Chainable {
    const click = ($el) => $el.click();
    return this.cart.pipe(click).should(() => {
      expect(Cypress.$('[v-e2e="sidebar-cart"]')).to.exist;
    });
  }

  openAccount(): Cypress.Chainable {
    const click = ($el) => $el.click();

    return this.account.pipe(click).should(() => {
      expect(Cypress.$('[v-e2e="login-modal"]')).to.exist;
    });
  }
}

export default new Header();
