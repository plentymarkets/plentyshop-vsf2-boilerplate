import page from '../pages/factory';

const PAYPAL_EMAIL = 'sb-fiqc015598959@personal.example.com';
const PAYPAL_PASSWORD = 'CA2Oo&y7';

context('PayPal buttons rendering', () => {
  beforeEach(function init() {
    cy.setConsentCookie();
  });

  it(['happyPath', 'regression'], 'Single item page', function test() {
    cy.intercept('/api/plentymarkets/getFacet').as('getFacet');
    cy.intercept('/api/plentymarkets/getProduct').as('getProduct');

    page.home.visit();
    cy.get('[data-e2e*="app-header"]').eq(1).find('a').click();
    cy.wait('@getFacet');

    page.category.products.first().click();
    cy.wait('@getProduct');

    cy.get('[data-e2e="paypal-button"]').should('exist');
  });

  it(['happyPath', 'regression'], 'Cart preview', function test() {
    page.home.visit();
    page.home.addCartItem(1100, 1);

    page.product.header.openCart();
    cy.get('[data-e2e="paypal-button"]').should('exist');
  });
});

context('PayPal express checkout', () => {
  beforeEach(function init() {
    cy.setConsentCookie();

    page.home.visit();
    page.home.addCartItem(1100, 1);

    page.product.header.openCart();
  });


  it(['happyPath', 'regression'], 'Single item page', function test() {
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

    cy.paypalFlow(PAYPAL_EMAIL, PAYPAL_PASSWORD)
    cy.paypalComplete()

    cy.wait(['@loadAddresses', '@getActiveShippingCountries', '@getPaymentProviders', '@getShippingProvider']);

    page.checkout.checkoutReadyOnly.terms.click();
    page.checkout.checkoutReadyOnly.makeOrderButton.click();

    cy.wait(['@additionalInformation', '@preparePayment', '@placeOrder', '@executePayment', '@executePayPalOrder', '@getOrder']);

    page.checkout.thankyou.heading.should('be.visible');

    page.checkout.thankyou.itemsTable.should('be.visible');
    cy.get('[data-e2e*="order-item-product-name"]').should('be.visible');

    page.checkout.thankyou.orderSummary.should('be.visible');
    page.checkout.thankyou.paymentSummary.should('be.visible');
    page.checkout.thankyou.shippingSummary.should('be.visible');
    page.checkout.thankyou.orderTotals.should('be.visible');

    cy.get('head meta[name="robots"]').should(
      'have.attr',
      'content',
      'noindex'
    );
  });
});
