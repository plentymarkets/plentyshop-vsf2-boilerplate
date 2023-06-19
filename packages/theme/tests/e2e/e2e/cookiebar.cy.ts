import page from '../pages/factory';
context('CookieBar functionality', () => {
  const externalTestScript = 'https://cdn01.plentymarkets.com/avw8j9fg70hi/frontend/layout/plentycom/js/jquery-3_5_1.min.js';
  const cookieName = 'consent-cookie';

  beforeEach(function init() {
    cy.intercept(externalTestScript).as('testCookieLoad');

    cy.clearCookies();
    page.home.visit();
  });

  it('Should successfully accept all cookies', function test() {
    cy.get('[v-e2e*="accept-all"]').click();
    cy.getCookie(cookieName).should('exist');
    cy.getCookie(cookieName).then((cookie) => {
      const decodedGroup = JSON.parse(decodeURIComponent(cookie.value));
      decodedGroup.forEach((group) => {
        const cookieList = Object.values(group)[0] as Array<any>;
        const isConsented = cookieList.some(x => Object.values(x)[0]);
        expect(isConsented).to.equal(true);
      });
    });

    cy.wait('@testCookieLoad');

    cy.get('[v-e2e*="cookie-show-banner-button"]').click();
  });
  it('Should successfully check second checkbox and click on accept selection button', function test() {
    cy.get('[v-e2e*="checkbox-1"]').click();
    cy.get('[v-e2e*="accept-selection"]').click();
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
    
    cy.wait('@testCookieLoad');
  });
  it('Should successfully reject all cookies', function test() {
    cy.get('[v-e2e*="reject-all"]').click();
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
    
    cy.wait(1000);
    cy.get('@testCookieLoad.all').then((interceptions) => {
      expect(interceptions).to.have.length(0);
    });
  });
});
