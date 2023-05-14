import page from '../pages/factory';

const uniqueEmail = `e2etestemail-${new Date().getTime()}@plentymarkets.com`;
const password = 'Testuser1234';

const noEmail = '';
const noPassword = '';
const wrongEmail = 'wrong@email.com';
const wronglyFormattedEmail = 'wrongEmail@';
const wrongPassword = 'wrongPassword';

const loginHelper = (email: string, password: string, isRememberChecked = false): void => {
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

context('Login', () => {

  before(() => {
    page.home.registerUser(uniqueEmail, password);
    cy.clearCookies();
  });

  beforeEach(function init () {
    cy.intercept('/api/plentymarkets/loginUser').as('loginUser');

    page.home.visit();
    page.home.header.openAccount();
  });

  it(['exceptionPath', 'regression'], 'Fails due to missing email', function test() {
    loginHelper(noEmail, password);
    page.home.header.accountModalForm.contains('The Email field is required');
  });

  it(['exceptionPath', 'regression'], 'Fails due to wrongly formatted email', function test() {
    loginHelper(wronglyFormattedEmail, password);
    page.home.header.accountModalForm.contains('The Email field must be a valid email');
  });

  it(['exceptionPath', 'regression'], 'Fails due to wrong email', function test() {
    loginHelper(wrongEmail, password);
    cy.wait('@loginUser').its('response.statusCode').should('eq', 401);
    cy.get('.notifications').find('.sf-notification').should('have.class', 'color-danger');
  });

  it(['exceptionPath', 'regression'], 'Fails due to missing password', function test() {
    loginHelper(uniqueEmail, noPassword);
    page.home.header.accountModalForm.contains('The Password field is required');
  });

  it(['exceptionPath', 'regression'], 'Fails due to wrong password', function test() {
    loginHelper(uniqueEmail, wrongPassword);
    cy.wait('@loginUser').its('response.statusCode').should('eq', 401);
    cy.get('.notifications').find('.sf-notification').should('have.class', 'color-danger');
  });

  it(['happyPath', 'regression'], 'Should login successfully', function test() {
    loginHelper(uniqueEmail, password);
    cy.wait('@loginUser').its('response.statusCode').should('eq', 200);
  });
});
