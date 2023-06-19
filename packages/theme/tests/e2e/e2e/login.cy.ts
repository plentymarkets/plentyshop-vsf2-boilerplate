import page from '../pages/factory';

const uniqueEmail = `e2etestemail-${new Date().getTime()}@plentymarkets.com`;
const password = 'Testuser1234';

const noEmail = '';
const noPassword = '';
const wrongEmail = 'wrong@email.com';
const wronglyFormattedEmail = 'wrongEmail@';
const wrongPassword = 'wrongPassword';

context('Login', () => {

  before(() => {
    page.home.registerUser(uniqueEmail, password);
    cy.clearCookies();
  });

  beforeEach(function init () {
    cy.intercept('/api/plentymarkets/loginUser').as('loginUser');

    page.home.visit();
  });

  it(['exceptionPath', 'regression'], 'Fails due to missing email', function test() {
    page.home.header.login(noEmail, password);
    page.home.header.accountModalForm.contains('The Email field is required');
  });

  it(['exceptionPath', 'regression'], 'Fails due to wrongly formatted email', function test() {
    page.home.header.login(wronglyFormattedEmail, password);
    page.home.header.accountModalForm.contains('The Email field must be a valid email');
  });

  it(['exceptionPath', 'regression'], 'Fails due to wrong email', function test() {
    page.home.header.login(wrongEmail, password);
    cy.wait('@loginUser').its('response.statusCode').should('eq', 401);
    cy.get('.notifications').find('.sf-notification').should('have.class', 'color-danger');
  });

  it(['exceptionPath', 'regression'], 'Fails due to missing password', function test() {
    page.home.header.login(uniqueEmail, noPassword);
    page.home.header.accountModalForm.contains('The Password field is required');
  });

  it(['exceptionPath', 'regression'], 'Fails due to wrong password', function test() {
    page.home.header.login(uniqueEmail, wrongPassword);
    cy.wait('@loginUser').its('response.statusCode').should('eq', 401);
    cy.get('.notifications').find('.sf-notification').should('have.class', 'color-danger');
  });

  it(['happyPath', 'regression'], 'Should login successfully', function test() {
    page.home.header.login(uniqueEmail, password);
    cy.wait('@loginUser').its('response.statusCode').should('eq', 200);
  });
});
