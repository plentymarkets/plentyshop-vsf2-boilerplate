import page from '../pages/factory';

context('Cart', () => {
  beforeEach(function init () {
    page.home.visit();

  });

  it(['happyPath', 'regression'], 'Should clear the cart', function test() {
    cy.intercept('/api/plentymarkets/addCartItem').as('addCartItem');
    cy.intercept('/api/plentymarkets/clear').as('clearCart');
    cy.intercept('/api/plentymarkets/getProduct').as('getProduct');

    // page.home.addCartItem(1100, 1);
    cy.get('[data-e2e*="app-header"]').eq(1).find('a').click();
    page.category.products.first().click().wait('@getProduct');

    page.product.addToCartButton.click();
    cy.wait('@addCartItem');
    page.product.header.openCart();
    cy.get('[data-e2e="clear-cart"]').click();
    cy.wait('@clearCart');
    cy.get('[data-e2e="collected-product"]').should('not.exist');
  });
});
