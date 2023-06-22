import page from '../pages/factory';

const uniqueEmail = `e2etestemail-${new Date().getTime()}@plentymarkets.com`;
const password = 'Testuser1234';

const hasCartProducts = (): void => {
  page.product.header.openCart();
  cy.get('[data-e2e="collected-product"]').should('exist');
}

context('Cart', () => {
  beforeEach(function init () {
    page.home.setDefaultCookies();

    page.home.visit();
    
    page.home.addCartItem(1100, 1);
  });

  it(['happyPath', 'regression'], 'Should clear the cart', function test() {
    cy.intercept('/api/plentymarkets/clearCart').as('clearCart');

    // Clear cart is only available on Desktop
    cy.viewport(1920, 1080);

    hasCartProducts();

    cy.get('[data-e2e="clear-cart"]').click();
    cy.wait('@clearCart');
    cy.get('[data-e2e="collected-product"]').should('not.exist');
  });

  it(['happyPath', 'regression'], 'Should navigate to login if not authenticated', function test() {
    hasCartProducts();

    page.cart.goToCheckoutButton.click();
    cy.url().should('include', '/Checkout/login')
  });

  it(['happyPath', 'regression'], 'Should navigate to billing if authenticated', function test() {
    cy.intercept('/api/plentymarkets/getActiveShippingCountries').as('getActiveShippingCountries');
    cy.intercept('/api/plentymarkets/loadAddresses').as('loadAddresses');

    page.home.registerUser(uniqueEmail, password);
    cy.reload();

    hasCartProducts();

    page.cart.goToCheckoutButton.click();
    cy.wait(['@loadAddresses', '@getActiveShippingCountries']);
    cy.url().should('include', '/checkout/billing');
  })
});
