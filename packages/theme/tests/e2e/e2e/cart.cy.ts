import page from '../pages/factory';

const hasCartProducts = (): void => {
  page.product.header.openCart();
  cy.get('[v-e2e="collected-product"]').should('exist');
}

context('Cart', () => {
  beforeEach(function init () {
    cy.intercept('/api/plentymarkets/addCartItem', {fixture: 'responses/add-cart-item'}).as('addCartItem');
    cy.intercept('/api/plentymarkets/getCart', { fixture: 'responses/get-cart' }).as('getCart');
    cy.intercept('/api/plentymarkets/loginUser', { fixture: 'responses/login' }).as('loginUser');

    page.category.visit('/c/gear');
    page.category.productToCartButton;
  });

  it(['happyPath', 'regression'], 'Should clear the cart', function test() {
    cy.intercept('/api/plentymarkets/clearCart').as('clearCart');

    hasCartProducts();

    cy.get('[v-e2e="clear-cart"]').click();
    cy.wait('@clearCart');
    cy.get('[v-e2e="collected-product"]').should('not.exist');
  });

  it(['happyPath', 'regression'], 'Should navigate to login if not authenticated', function test() {
    hasCartProducts();

    page.cart.goToCheckoutButton.click();
    cy.url().should('include', '/Checkout/login')
  });

  it(['happyPath', 'regression'], 'Should navigate to billing if authenticated', function test() {
    page.home.header.login();

    hasCartProducts();

    page.cart.goToCheckoutButton.click();
    cy.url().should('include', '/checkout/billing');
  })
});
