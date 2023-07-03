import page from '../pages/factory';
const hasCartProducts = (): void => {
  page.product.header.openCart();
  cy.get('[data-e2e="collected-product"]').should('exist');
}

context('Login as a guest', () => {
  beforeEach(function init() {
    cy.setLocaleCookie('en');

    cy.intercept('/api/plentymarkets/loginAsGuest').as('loginAsGuest');
    cy.intercept('/api/plentymarkets/loadAddresses').as('loadAddresses');
    cy.intercept('/api/plentymarkets/getActiveShippingCountries').as('getActiveShippingCountries');

    page.home.visit();
    page.home.addCartItem(1100, 1);
  });

  it(['happyPath', 'regression'], 'Should not able to login two times as a guest', function test() {
    hasCartProducts();

    page.cart.goToCheckoutButton.click();
    cy.url().should('include', '/Checkout/login');

    page.checkout.checkoutlogin.continueAsGuest('testuser@plentysystems.com');
    cy.wait(['@loginAsGuest', '@loadAddresses', '@getActiveShippingCountries']);

    page.checkout.checkoutlogin.step.click();
    cy.url().should('not.include', '/Checkout/login');
  });
});
