import page from '../pages/factory';

const PAYPAL_EMAIL = 'sb-fiqc015598959@personal.example.com';
const PAYPAL_PASSWORD = 'CA2Oo&y7';

/*
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

    cy.get('[data-e2e*="app-header"]').eq(1).find('a').click();
    page.product.header.openCart();
    cy.get('[data-e2e="paypal-button"]').should('exist');
  });
});
*/

context('PayPal express checkout', () => {
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
    cy.intercept('/api/plentymarkets/loadAddresses').as('loadAddresses');
    cy.intercept('/api/plentymarkets/getActiveShippingCountries').as('getActiveShippingCountries');
    cy.intercept('/api/plentymarkets/getPaymentProviders').as('getPaymentProviders');
    cy.intercept('/api/plentymarkets/getShippingProvider').as('getShippingProvider');
    cy.intercept('/api/plentymarkets/executePayPalOrder').as('executePayPalOrder');

    cy.paypalFlow(PAYPAL_EMAIL, PAYPAL_PASSWORD)
    cy.paypalComplete()

    cy.wait(['@loadAddresses', '@getActiveShippingCountries', '@getPaymentProviders', '@getShippingProvider'], {
      timeout: 20000
    });

    page.checkout.checkoutReadyOnly.terms.click();
    page.checkout.checkoutReadyOnly.makeOrderButton.click();

    cy.wait(['@executePayPalOrder']);
  });
});
