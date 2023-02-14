import page from '../pages/factory';

context('Cart', () => {
  beforeEach(function init () {
    page.home.visit();
    page.home.addCartItem(1100, 1);
  });

  it(['happyPath', 'regression'], 'Should clear the cart', function test() {
    cy.intercept('/api/plentymarkets/clear').as('clearCart');
    cy.intercept('/api/plentymarkets/getProduct').as('getProduct');

    page.product.header.openCart();
    cy.get('[data-e2e="clear-cart"]').click();
    cy.wait('@clearCart');
    cy.get('[data-e2e="collected-product"]').should('not.exist');
  });
});
