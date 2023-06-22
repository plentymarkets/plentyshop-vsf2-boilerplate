import Base from './base';
import Header from './components/header';

class Home extends Base {
  get header() {
    return Header;
  }

  visit(): Cypress.Chainable {
    return cy.visit('/');
  }

  setDefaultCookies(): void {
    Cypress.Cookies.debug(true);
    cy.setCookie("vsf-locale", "en");
    cy.setCookie(
      "consent-cookie",
      "%5B%7B%22Essentials%22%3A%5B%7B%22Session%22%3Atrue%7D%2C%7B%22Consent%22%3Atrue%7D%2C%7B%22Session2%22%3Atrue%7D%5D%7D%2C%7B%22External%20Media%22%3A%5B%7B%22Session%22%3Afalse%7D%2C%7B%22Consent%22%3Afalse%7D%2C%7B%22Session2%22%3Afalse%7D%5D%7D%2C%7B%22Functional%22%3A%5B%7B%22Session%22%3Afalse%7D%2C%7B%22Consent%22%3Afalse%7D%2C%7B%22Session2%22%3Afalse%7D%5D%7D%2C%7B%22Marketing%22%3A%5B%7B%22Session%22%3Afalse%7D%2C%7B%22Consent%22%3Afalse%7D%2C%7B%22Session2%22%3Afalse%7D%5D%7D%5D"
    );
  }
}

export default new Home();
