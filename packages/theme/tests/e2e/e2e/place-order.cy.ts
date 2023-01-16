import page from '../pages/factory';

context('Order placement', () => {
  beforeEach(function init () {
    cy.fixture('test-data/e2e-place-order').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });

    page.home.visit();
  });

  it(['happyPath', 'regression'], 'Should successfully place an order as a guest user', function test () {
    const data = this.fixtures.data;

    cy.intercept('/api/plentymarkets/addCartItem').as('addCartItem');
    cy.intercept('/api/plentymarkets/additionalInformation').as('additionalInformation');
    cy.intercept('/api/plentymarkets/executePayment').as('executePayment');
    cy.intercept('/api/plentymarkets/getProduct').as('getProduct');
    cy.intercept('/api/plentymarkets/getShippingProvider').as('getShippingProvider');
    cy.intercept('/api/plentymarkets/loadAddresses').as('loadAddresses');
    cy.intercept('/api/plentymarkets/placeOrder').as('placeOrder');
    cy.intercept('/api/plentymarkets/preparePayment').as('preparePayment');
    cy.intercept('/api/plentymarkets/saveAddress').as('saveAddress');
    cy.intercept('/api/plentymarkets/saveBillingIsShipping').as('saveBillingIsShipping');

    // With the current data, the first category does not have items. Therefore, we need to replace the
    // following selector: page.home.header.categories.first().click();
    cy.get('[data-e2e*="app-header"]').eq(1).find('a').click();
    page.category.products.first().click().wait('@getProduct');

    page.product.addToCartButton.click();
    cy.wait('@addCartItem');

    page.product.header.openCart();
    page.cart.goToCheckoutButton.click();

    page.checkout.checkoutlogin.continueAsUser(data.customer);

    page.checkout.billing.url();
    page.checkout.billing.fillForm(data.customer);
    page.checkout.billing.createAddress.click();
    cy.wait(['@saveAddress', '@loadAddresses']);
    page.checkout.billing.continueToShipping.click();

    cy.get('[data-e2e*="copy-address"]').click();

    page.checkout.shipping.continueToPaymentButton.click();

    cy.wait(['@loadAddresses', '@getShippingProvider']);
    page.checkout.payment.paymentMethods.first().click();
    page.checkout.payment.terms.click();
    page.checkout.payment.makeAnOrderButton.click();
    cy.wait(['@additionalInformation', '@preparePayment', '@placeOrder', '@executePayment']);

    page.checkout.thankyou.heading.should('be.visible');

    // TODO: #40624
    // cy.reload()
    // page.product.header.openCart();
    // Assert that cart is empty
  });
});
