import page from '../pages/factory';

/**
 * Generate a unique email address to use with a new account. Adding +<something> after your
 * username in your plenty/google email will ensure that you receive the email in your original
 * email account.
 */

const uniqueMail = `e2etestmail-${new Date().getTime()}@plentymarkets.com`;
const password = 'Testuser1234';

context('Register account', () => {
  beforeEach(function init () {
    page.home.visit();
    page.home.header.openAccount();
    page.home.header.openRegistrationButton.click();
    page.home.header.accountModalForm.find('button[type=submit]').as('submit');
  });

  it(['exceptionPath', 'regression'], 'Fails due to missing data or wrongfully formatted email', function test() {
    cy.get('@submit').click();
    page.home.header.accountModalForm.contains('The Email field is required');

    page.home.header.accountModalForm.find('input#email').clear().type('wrong@email', { force: true });
    page.home.header.accountModalForm.find('input#password').clear().type(password, { force: true });

    cy.get('@submit').click();
    page.home.header.accountModalForm.contains('The Email field must be a valid email');
  });

  it(['happyPath', 'regression'], 'Should register an new account', function test() {
    cy.intercept('/api/plentymarkets/registerUser').as('registerUser');
    cy.intercept('/api/plentymarkets/loginUser').as('loginUser');

    page.home.header.accountModalForm.find('input#email').clear().type(uniqueMail, { force: true });
    page.home.header.accountModalForm.find('input#password').clear().type(password, { force: true });

    cy.get('@submit').click();
    cy.wait('@registerUser');
    cy.wait('@loginUser').its('response.statusCode').should('eq', 200);
  });
});
