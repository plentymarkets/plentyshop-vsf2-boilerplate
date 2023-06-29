/**
 * Returns an iframe content
 */
Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
  const data = new Cypress.Promise(resolve => {
    $iframe.ready(function () {
      resolve($iframe.contents().find('body'));
    });
  });

  return data;
});

// Used to keep the reference to the popup window
const state = {
  popup: null
}

/**
 * Intercepts calls to window.open() to keep a reference to the new window
 */
Cypress.Commands.add('capturePopup', () => {
  cy.window().then((win) => {
    const open = win.open
    cy
      .stub(win, 'open')
      .callsFake((...params) => {
        state.popup = open(...params)
        return state.popup
      })
  })
})

/**
 * Returns a wrapped body of a captured popup
 */
Cypress.Commands.add('popup', (): any => {
  const popup = Cypress.$(state.popup.document)
  return cy.wrap(popup.contents().find('body'))
})

/**
 * Clicks on PayPal button and signs in
 */
Cypress.Commands.add('paypalFlow', (email: string, password: string) => {
  cy.intercept('/api/plentymarkets/createOrder').as('createOrder');

  cy.capturePopup()
  cy.get('iframe').iframe().find('div[data-funding-source="paypal"]').click()
  // It will first inject a loader, wait until it changes to the real content
  cy.wait('@createOrder');

  cy
    .popup()
    .find('div')
    .should('not.exist')
    .wait(5000) // Not recommended, but the only way I found to wait for the real content
  cy
    .popup()
    .then($body => {
      cy
        .popup()
        .find('input#email')
        .clear()
        .type(email)
      cy.popup()
        .find('button:visible')
        .first()
        .click()
      cy.wait(5000);
      cy.popup()
        .find('input#password')
        .clear()
        .type(password)
      cy.popup()
        .find('button[name="btnLogin"]', {
        timeout: 5000
      })
        .click()
    })
  cy
    .popup()
    .find('button[name="btnLogin"]', {
      timeout: 5000
    })
    .should('not.exist')
  cy.wait(30000)
})

/**
 * Returns the price shown in PayPal's summary
 */
Cypress.Commands.add('paypalPrice', () => {
  return cy.popup().find('span#totalWrapper')
})

/**
 * Completes PayPal flow
 */
Cypress.Commands.add('paypalComplete', () => {
  cy.intercept('/api/plentymarkets/approveOrder').as('approveOrder');

  cy
    .popup()
    .find('ul.charges')
    .should('not.to.be.empty')
  cy.wait(1000);
  cy
    .popup()
    .find('button#payment-submit-btn', {
      timeout: 10000
    })
    .click()

  cy.wait('@approveOrder');
})
