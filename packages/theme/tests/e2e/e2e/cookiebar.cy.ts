import page from '../pages/factory';
context('CookieBar functionality', () => {
  beforeEach(function init() {
    page.home.visit();
  });
  it('Should successfully accept all cookies', function test() {
    // 1. Accept all
    cy.get('[data-e2e*="accept-all"]').click();
    // exists and all are checked
    cy.getCookie('plenty-shop-cookie').should('exist');
    // check that all coookies in the all cookiegroups are true
    cy.getCookie('plenty-shop-cookie').then((cookie) => {
      const decodedGroup = JSON.parse(decodeURIComponent(cookie.value));
      decodedGroup.forEach((group) => {
        const cookieList = Object.values(group)[0] as Array<any>;
        const isConsented = cookieList.some(x => Object.values(x)[0]);
        expect(isConsented).to.equal(true);
      });
    });
    // if we have set cookies check if the cookie banner is in hidden state
    cy.get('[data-e2e*="cookie-show-banner-button"]').click();
  });
  it('Should successfully check first checkbox and click on accept selection button', function test() {
    // check second checkbox
    cy.get('[data-e2e*="checkbox-1"]').click();
    cy.get('[data-e2e*="accept-selection"]').click();
    // check if cookies from first group are true and the rest are false
    cy.getCookie('plenty-shop-cookie').then((cookie) => {
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
  });
  it('Should successfully reject all cookies', function test() {
    cy.get('[data-e2e*="reject-all"]').click();
    // check if cookies from first group are true and the rest are false
    cy.getCookie('plenty-shop-cookie').then((cookie) => {
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
  });
  it('Should successfully pass if the external third party script was called when the second checkbox was checked', function test() {
    cy.intercept('https://www.plentymarkets.com').as('testcookieload');
    cy.get('[data-e2e*="checkbox-1"]').click();
    cy.get('[data-e2e*="accept-selection"]').click();
    cy.getCookie('plenty-shop-cookie').then((cookie) => {
      const decodedGroup = JSON.parse(decodeURIComponent(cookie.value));
      decodedGroup.forEach((group, index) => {
        if (index === 1) {
          cy.wait('@testcookieload');
        }
      });
    });
  });
  it('Should successfully pass when the second checkbox is not checked,and the external script call is not made', function test() {
    cy.intercept('https://www.plentymarkets.com').as('testcookieload');
    cy.wait(2000);
    cy.get('@testcookieload.all').then((interceptions) => {
        expect(interceptions).to.have.length(0);
    });
  });
});
