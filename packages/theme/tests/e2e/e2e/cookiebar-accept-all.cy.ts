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
});
