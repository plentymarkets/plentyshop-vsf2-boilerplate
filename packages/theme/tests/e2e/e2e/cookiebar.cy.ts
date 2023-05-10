import page from '../pages/factory';
context('CookieBar functionality', () => {
  // default script for testing also defined in cookieConfig.js
  const externalCookieScriptForTest = 'https://www.plentymarkets.com';
  const cookieName = 'consent-cookie';

  beforeEach(function init() {
    page.home.visit();
  });
  it('Should successfully accept all cookies', function test() {
    cy.intercept(externalCookieScriptForTest).as('testcookieload');
    // 1. Accept all
    cy.get('[data-e2e*="accept-all"]').click();
    // exists and all are checked
    cy.getCookie(cookieName).should('exist');
    // check that all coookies saved in memory are updated to true
    cy.getCookie(cookieName).then((cookie) => {
      const decodedGroup = JSON.parse(decodeURIComponent(cookie.value));
      decodedGroup.forEach((group) => {
        const cookieList = Object.values(group)[0] as Array<any>;
        const isConsented = cookieList.some(x => Object.values(x)[0]);
        expect(isConsented).to.equal(true);
      });
    });
    // check if the request for the external Cookie Script is made
    cy.wait('@testcookieload');
    // if we have set cookies check if the cookie banner is in hidden state
    cy.get('[data-e2e*="cookie-show-banner-button"]').click();
  });
  it('Should successfully check second checkbox and click on accept selection button', function test() {
    cy.intercept(externalCookieScriptForTest).as('testcookieload');
    // check second checkbox
    cy.get('[data-e2e*="checkbox-1"]').click();
    cy.get('[data-e2e*="accept-selection"]').click();
    // check if cookies from first group are true and the rest are false
    cy.getCookie(cookieName).then((cookie) => {
      const decodedGroup = JSON.parse(decodeURIComponent(cookie.value));
      decodedGroup.forEach((group, index) => {
        const cookieList = Object.values(group)[0] as Array<any>;
        const isConsented = cookieList.some(x => Object.values(x)[0]);
        if (index === 0 || index === 1) {
          expect(isConsented).to.equal(true);
        } else {
          expect(isConsented).to.equal(false);
        }
      });
    });
    // check if the request for the external Cookie Script is made
    cy.wait('@testcookieload');
  });
  it('Should successfully reject all cookies', function test() {
    cy.intercept(externalCookieScriptForTest).as('testcookieload');
    cy.get('[data-e2e*="reject-all"]').click();
    // check that all coookies saved in memory except the first one are updated to false
    cy.getCookie(cookieName).then((cookie) => {
      const decodedGroup = JSON.parse(decodeURIComponent(cookie.value));
      decodedGroup.forEach((group, index) => {
        const cookieList = Object.values(group)[0] as Array<any>;
        const isConsented = cookieList.some(x => Object.values(x)[0]);
        if (index === 0) {
          expect(isConsented).to.equal(true);
        } else {
          expect(isConsented).to.equal(false);
        }
      });
    });
    // check if the request for the external Cookie Script is not made
    cy.wait(2000);
    cy.get('@testcookieload.all').then((interceptions) => {
      expect(interceptions).to.have.length(0);
    });
  });
});
