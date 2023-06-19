class Cart {
  get goToCheckoutButton(): Cypress.Chainable {
    return cy.get('[v-e2e="go-to-checkout"]')
  }
}

export default new Cart();
