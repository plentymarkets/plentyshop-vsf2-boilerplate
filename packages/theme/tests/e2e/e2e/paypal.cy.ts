import page from '../pages/factory';

context('PayPal buttons rendering', () => {
  beforeEach(function init() {
    cy.setConsentCookie();

    cy.intercept('/api/plentymarkets/getFacet').as('getFacet');
    cy.intercept('/api/plentymarkets/getProduct').as('getProduct');
  });

  it(['happyPath', 'regression'], 'Should exist on single item page', function test() {
    page.home.visit();
    cy.get('[data-e2e*="app-header"]').eq(1).find('a').click();
    cy.wait('@getFacet');

    page.category.products.first().click();
    cy.wait('@getProduct');

    cy.get('[v-e2e="paypal-button"]').should('exist');
  });

  it(['happyPath', 'regression'], 'Should exist in cart preview', function test() {
    page.home.visit();
    page.home.addCartItem(1100, 1);

    page.product.header.openCart();
    cy.get('[v-e2e="paypal-button"]').should('exist');
  });
});

context('PayPal express checkout', () => {
  beforeEach(function init() {
    cy.setConsentCookie();

    cy.intercept('/api/plentymarkets/loadAddresses').as('loadAddresses');
    cy.intercept('/api/plentymarkets/getActiveShippingCountries').as('getActiveShippingCountries');
    cy.intercept('/api/plentymarkets/getPaymentProviders').as('getPaymentProviders');
    cy.intercept('/api/plentymarkets/getShippingProvider').as('getShippingProvider');

    cy.intercept('/api/plentymarkets/additionalInformation').as('additionalInformation');
    cy.intercept('/api/plentymarkets/preparePayment').as('preparePayment');
    cy.intercept('/api/plentymarkets/placeOrder').as('placeOrder');
    cy.intercept('/api/plentymarkets/executePayment').as('executePayment');
    cy.intercept('/api/plentymarkets/executePayPalOrder').as('executePayPalOrder');
    cy.intercept('/api/plentymarkets/getOrder').as('getOrder');

    page.home.visit();
    page.home.addCartItem(1100, 1);

    page.product.header.openCart();
  });


  it(['happyPath', 'regression'], 'Shpuld place an order from cart preview', function test() {
    cy.paypalFlow(Cypress.env('PAYPAL_EMAIL'), Cypress.env('PAYPAL_PASSWORD'))
    cy.paypalComplete()

    cy.wait(['@loadAddresses', '@getActiveShippingCountries', '@getPaymentProviders', '@getShippingProvider']);

    page.checkout.checkoutReadyOnly.terms.click();
    page.checkout.checkoutReadyOnly.makeOrderButton.click();

    cy.wait(['@additionalInformation', '@preparePayment', '@placeOrder', '@executePayment', '@executePayPalOrder', '@getOrder']);

    page.checkout.thankyou.validate();
  });
});
