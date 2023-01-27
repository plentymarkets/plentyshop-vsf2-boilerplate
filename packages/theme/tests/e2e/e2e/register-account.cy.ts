import page from '../pages/factory';

const CYPRESS_DEFAULT_ACCOUNT_EMAIL = Cypress.env('CYPRESS_DEFAULT_ACCOUNT_EMAIL');
const CYPRESS_DEFAULT_ACCOUNT_PASSWORD = Cypress.env('CYPRESS_DEFAULT_ACCOUNT_PASSWORD');

/**
 * Generate a unique email address to use with a new account. Adding +<something> after your
 * username in your plenty/google email will ensure that you receive the email in your original
 * email account.
 */
const uniquePlentyMarketsEmail = (email: string): string => {
  const parts = email.split('@');
  if (parts[1] !== 'plentymarkets.com') {
    throw new Error('You must use a plentymarkets.com email address.');
  }

  return `${parts[0].split('+')[0]}+${new Date().getTime()}@${parts[1]}`;
};

context('Register account', () => {
  beforeEach(function init () {
    page.home.visit();
    page.home.header.openAccount();
    page.home.header.openRegistrationButton.click();
    page.home.header.accountModalForm.find('button[type=submit]').as('submit');
  });

  it(['exceptionPath', 'regression'], 'Fails due to missing data or wrongfully formatted email', function test() {
    cy.get('@submit').click();
    page.home.header.accountModalForm.contains('This field is required');

    page.home.header.accountModalForm.find('input#email').clear().type('wrong@email', { force: true });
    page.home.header.accountModalForm.find('input#password').clear().type(CYPRESS_DEFAULT_ACCOUNT_PASSWORD, { force: true });

    cy.get('@submit').click();
    page.home.header.accountModalForm.contains('Invalid email');
  });

  it(['happyPath', 'regression'], 'Should register an new account', function test() {
    cy.intercept('/api/plentymarkets/registerUser').as('registerUser');
    cy.intercept('/api/plentymarkets/loginUser').as('loginUser');

    page.home.header.accountModalForm.find('input#email').clear().type(uniquePlentyMarketsEmail(CYPRESS_DEFAULT_ACCOUNT_EMAIL), { force: true });
    page.home.header.accountModalForm.find('input#password').clear().type(CYPRESS_DEFAULT_ACCOUNT_PASSWORD, { force: true });

    cy.get('@submit').click();
    cy.wait(['@registerUser', '@loginUser']);
    cy.visit('/my-account');
    cy.get('body').contains('My Account');
  });
});
