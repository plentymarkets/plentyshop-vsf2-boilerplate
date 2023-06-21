import page from '../pages/factory';

context('PayPal buttons rendering', () => {
  beforeEach(function init() {
    cy.intercept('/api/plentymarkets/getFacet').as('getFacet');
    cy.intercept('/api/plentymarkets/getProduct').as('getProduct');

    page.home.visit();
    cy.get('[data-e2e*="app-header"]').eq(1).find('a').click();
    cy.wait('@getFacet');

    page.category.products.first().click();
    cy.wait('@getProduct');
  });

  it(['happyPath', 'regression'], 'Single item page', function test() {
    cy.get('[data-e2e="paypal-button"]').should('exist');
  });

  it(['happyPath', 'regression'], 'Cart preview', function test() {
    cy.intercept('/api/plentymarkets/addCartItem').as('addCartItem');
    page.product.addToCartButton.click();
    cy.wait('@addCartItem');

    page.product.header.openCart();
    cy.get('[data-e2e="collected-product"]').should('exist');
  });
});
