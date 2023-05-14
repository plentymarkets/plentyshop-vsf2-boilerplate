import { el } from './utils/element';

class Category {
  get products(): Cypress.Chainable {
    return el('category-product-card', 'a');
  }

  get productToCartButton(): Cypress.Chainable {
    return cy.get('[v-e2e="category-product-card"]').first().within(() => {
      cy.get('[data-testid="product-add-icon"]').click();
    })
  }

  visit(category: string): Cypress.Chainable {
    return cy.visit(category);
  }
}

export default new Category();
