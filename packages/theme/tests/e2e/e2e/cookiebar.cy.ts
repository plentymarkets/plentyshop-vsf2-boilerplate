import page from '../pages/factory';
context('CookieBar functionality', () => {
  beforeEach(function init() {
    page.home.visit();
  });
  it('Should successfully accept and reject all cookies, banner should reapear after cookie expiration', function test() {
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
    // if we have a the cookies set check if banner is in hidden state
    cy.get('[data-e2e*="cookie-show-banner-button"]').click();
    // 2. Reject all
    cy.clearCookie('plenty-shop-cookie');
    cy.reload();
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
    // 3. banner should reapear after cookie expiration
    cy.clearCookie('plenty-shop-cookie');
    cy.reload();
    cy.get('[data-e2e*="accept-all"]').click();
  });
});
