import { el } from '../utils/element';

const uniqueEmail = `e2etestemail-${new Date().getTime()}@plentymarkets.com`;
const password = 'Testuser1234';
    
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

  login(mail = uniqueEmail, pw = password, isRememberChecked = false): void {
    this.openAccount();
    
    if (mail) {
      this.accountModalForm.find('input#email').clear().type(mail, { force: true });
    }
    if (pw) {
      this.accountModalForm.find('input#password').clear().type(pw, { force: true });
    }
    if (isRememberChecked) {
      this.accountModalForm.find('label.sf-checkbox__container').click();
    }
  
    this.accountModalForm.find('button[type=submit]').click();
  }
}

export default new Header();
