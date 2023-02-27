import page from '../pages/factory';
context('CookieBar functionality', () => {
  beforeEach(function init() {
    page.home.visit();
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
});
