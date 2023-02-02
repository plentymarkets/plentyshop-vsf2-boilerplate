import Base from './base';
import Header from './components/header';

class Home extends Base {
  get header() {
    return Header;
  }

  visit(): Cypress.Chainable {
    return cy.visit('/', { headers: { 'Accept-Encoding': 'gzip, deflate' } });
  }
}

export default new Home();
