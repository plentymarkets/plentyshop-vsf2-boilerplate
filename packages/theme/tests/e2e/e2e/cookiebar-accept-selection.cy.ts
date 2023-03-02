import page from '../pages/factory';
context('CookieBar functionality', () => {
  beforeEach(function init() {
    page.home.visit();
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
});
