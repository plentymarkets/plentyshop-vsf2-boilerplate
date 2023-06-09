import page from '../pages/factory';

context('Order placement', () => {
  beforeEach(function init() {
    cy.fixture('customer').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });

    cy.intercept('/api/plentymarkets/addCartItem').as('addCartItem');
    cy.intercept('/api/plentymarkets/additionalInformation').as('additionalInformation');
    cy.intercept('/api/plentymarkets/deleteCart').as('deleteCart');
    cy.intercept('/api/plentymarkets/executePayment').as('executePayment');
    cy.intercept('/api/plentymarkets/getActiveShippingCountries').as('getActiveShippingCountries');
    cy.intercept('/api/plentymarkets/getFacet').as('getFacet');
    cy.intercept('/api/plentymarkets/getPaymentProviders').as('getPaymentProviders');
    cy.intercept('/api/plentymarkets/getProduct').as('getProduct');
    cy.intercept('/api/plentymarkets/getShippingProvider').as('getShippingProvider');
    cy.intercept('/api/plentymarkets/loadAddresses').as('loadAddresses');
    cy.intercept('/api/plentymarkets/placeOrder').as('placeOrder');
    cy.intercept('/api/plentymarkets/preparePayment').as('preparePayment');
    cy.intercept('/api/plentymarkets/saveAddress').as('saveAddress');
    cy.intercept('/api/plentymarkets/registerUser').as('registerUser');

    page.home.visit();
  });

  it(['happyPath', 'regression'], 'Should successfully place an order as a guest user', function test () {
    const data = this.fixtures.data;

    // With the current data, the first category does not have items. Therefore, we need to replace the
    // following selector: page.home.header.categories.first().click();
    cy.get('[v-e2e*="app-header"]').eq(1).find('a').click();
    cy.wait('@getFacet');

    page.category.products.first().click();
    cy.wait('@getProduct');

    page.product.addToCartButton.click();
    cy.wait('@addCartItem');

    page.product.header.openCart();
    cy.get('[v-e2e="collected-product"]').should('exist');
    page.cart.goToCheckoutButton.click();

    page.checkout.checkoutlogin.continueAsUser(data.customer);
    cy.wait(['@registerUser', '@getActiveShippingCountries']);

    page.checkout.billing.fillForm(data.customer);
    page.checkout.billing.continueToShipping.click();
    cy.wait(['@saveAddress', '@loadAddresses', '@getActiveShippingCountries']);

    cy.get('[v-e2e*="copy-address"]').click();
    cy.wait('@loadAddresses');

    page.checkout.shipping.continueToPaymentButton.click();
    cy.wait(['@saveAddress', '@loadAddresses', '@getShippingProvider', '@getPaymentProviders']);
    cy.get('[v-e2e*="shipping-method"]').should('exist');
    cy.get('[v-e2e*="payment-method"]').should('exist');

    page.checkout.payment.paymentMethods.first().click();
    page.checkout.payment.terms.click();
    page.checkout.payment.makeAnOrderButton.click();
    cy.wait(['@additionalInformation', '@preparePayment', '@placeOrder', '@executePayment', '@deleteCart']);

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

    // TODO: #40624
    // cy.reload()
    // page.product.header.openCart();
    // Assert that cart is empty
  });
});

context('Check Thank You Page', () => {
  beforeEach(function init() {
    cy.fixture('order').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });
  it(['happyPath', 'regression'], 'Should successfully see order items data in thank you page', function test() {
    cy.intercept('/api/plentymarkets/getOrder', { fixture: 'order.json' }).as('getOrder');

    page.checkout.thankyou.visit('', '', '');

    cy.wait('@getOrder');

    page.checkout.thankyou.itemsTable.should('be.visible');
    cy.get('[data-e2e*="order-item-product-name"]').should('be.visible');

    page.checkout.thankyou.documentsList.should('be.visible');
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


