import page from '../pages/factory';

const CYPRESS_DEFAULT_ACCOUNT_EMAIL = Cypress.env('CYPRESS_DEFAULT_ACCOUNT_EMAIL');
const CYPRESS_DEFAULT_ACCOUNT_PASSWORD = Cypress.env('CYPRESS_DEFAULT_ACCOUNT_PASSWORD');

const loginHelper = (cy: Cypress.cy & CyEventEmitter, email: string, password: string, isRememberChecked = false): void => {
  // If the modal does not exit, click the open account. This helps with using the login
  // command multiple times inside the same test.
  cy.get('body').then($el => {
    if ($el.find('.sf-modal__content').length === 0) {
      page.home.header.openAccount();
    }
  });

  // if the login to your account button exists, click it
  cy.get('.sf-modal__content').then($el => {
    if ($el.find('button.sf-button:contains("login in to your account")').length > 0) {
      cy.get('.sf-modal__content').find('.sf-button').contains('login in to your account').click();
    }
  });

  if (email) {
    page.home.header.accountModalForm.find('input#email').clear().type(email, { force: true });
  }
  if (password) {
    page.home.header.accountModalForm.find('input#password').clear().type(password, { force: true });
  }
  if (isRememberChecked) {
    page.home.header.accountModalForm.find('label.sf-checkbox__container').click();
  }

  page.home.header.accountModalForm.find('button[type=submit]').click();
};
const uniqueMail = `e2etestmail-${new Date().getTime()}@plentymarkets.com`;

context('Login', () => {

  before(() => {
    cy.request({
      url: '/',
      timeout: 60000
    });
    page.home.visit();
    page.home.registerUser(uniqueMail, 'Testuser1234');
    cy.clearCookies()
  });

  beforeEach(function init () {
    page.home.visit();
  });

  it(['exceptionPath', 'regression'], 'Fails due to missing or wrongfully formatted email', function test() {
    loginHelper(cy, '', CYPRESS_DEFAULT_ACCOUNT_PASSWORD);
    page.home.header.accountModalForm.contains('The Email field is required');

    loginHelper(cy, 'badEmail@', CYPRESS_DEFAULT_ACCOUNT_PASSWORD);
    page.home.header.accountModalForm.contains('The Email field must be a valid email');
  });

  it(['exceptionPath', 'regression'], 'Fails login due to missing password', function test() {
    loginHelper(cy, CYPRESS_DEFAULT_ACCOUNT_EMAIL, '');
    page.home.header.accountModalForm.contains('The Password field is required');
  });

  it(['exceptionPath', 'regression'], 'Fails due to wrong email', function test() {
    cy.intercept('/api/plentymarkets/loginUser').as('loginUser');

    loginHelper(cy, 'wrong@email.com', CYPRESS_DEFAULT_ACCOUNT_PASSWORD);
    cy.wait('@loginUser').its('response.statusCode').should('eq', 401);
    cy.get('.notifications').find('.sf-notification').should('have.class', 'color-danger');
  });

  it(['exceptionPath', 'regression'], 'Fails due to wrong password', function test() {
    cy.intercept('/api/plentymarkets/loginUser').as('loginUser');
    loginHelper(cy, uniqueMail, 'wrongPassword');
    cy.wait('@loginUser').its('response.statusCode').should('eq', 401);
    cy.get('.notifications').find('.sf-notification').should('have.class', 'color-danger');
  });

  it(['happyPath', 'regression'], 'Should login successfully', function test() {
    cy.intercept('/api/plentymarkets/loginUser').as('loginUser');
    cy.intercept('/api/plentymarkets/logoutUser').as('logoutUser');

    // Login
    loginHelper(cy, CYPRESS_DEFAULT_ACCOUNT_EMAIL, CYPRESS_DEFAULT_ACCOUNT_PASSWORD);
    cy.wait('@loginUser').its('response.statusCode').should('eq', 200);
  });
});
