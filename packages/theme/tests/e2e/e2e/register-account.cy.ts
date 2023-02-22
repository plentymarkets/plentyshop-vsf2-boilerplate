import page from '../pages/factory';

/**
 * Generate a unique email address to use with a new account. Adding +<something> after your
 * username in your plenty/google email will ensure that you receive the email in your original
 * email account.
 */

const uniqueMail = `e2etestmail-${new Date().getTime()}@plentymarkets.com`;
const password = 'Testuser1234';

const noEmail = '';
const noPassword = '';
const wronglyFormattedEmail = 'wrongEmail@';

const registerHelper = (email: string, password: string): void => {
  if (email) {
    page.home.header.accountModalForm.find('input#email').clear().type(email, { force: true });
  }
  if (password) {
    page.home.header.accountModalForm.find('input#password').clear().type(password, { force: true });
  }

  page.home.header.accountModalForm.find('button[type=submit]').click();
};

context('Register account', () => {
  beforeEach(function init () {
    page.home.visit();
    page.home.header.openAccount();
    page.home.header.openRegistrationButton.click();
  });

  it(['exceptionPath', 'regression'], 'Fails due to missing data', function test() {
    registerHelper(noEmail, noPassword);
    page.home.header.accountModalForm.contains('The Email field is required');
    page.home.header.accountModalForm.contains('The Password field is required');
  });

  it(['exceptionPath', 'regression'], 'Fails due to wrongly formatted email', function test() {
    registerHelper(wronglyFormattedEmail, password);
    page.home.header.accountModalForm.contains('The Email field must be a valid email');
  });

  it(['happyPath', 'regression'], 'Should register a new account', function test() {
    cy.intercept('/api/plentymarkets/loginUser').as('loginUser');
    cy.intercept('/api/plentymarkets/registerUser').as('registerUser');

    registerHelper(uniqueMail, password);
    cy.wait('@registerUser');
    cy.wait('@loginUser').its('response.statusCode').should('eq', 200);
  });
});
