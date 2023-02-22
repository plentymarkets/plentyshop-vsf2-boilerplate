export function el(selector: string, children?: string): Cypress.Chainable<JQuery<HTMLElement>> {
  return children ? cy.get(`[data-e2e="${selector}"] ${children}`) : cy.get(`[data-e2e="${selector}"]`);
}

/**
 * Generate a unique email address to use with a new account. Adding +<something> after your
 * username in your plenty/google email will ensure that you receive the email in your original
 * email account.
 */
export function uniquePlentyMarketsEmail (email: string): string {
  const parts = email.split('@');

  /*  if (parts[1] !== 'plentymarkets.com') {
    throw new Error('You must use a plentymarkets.com email address.');
  } */
  return `${parts[0].split('+')[0]}+${new Date().getTime()}@${parts[1]}`;
}

export function register (email: string, password = 'Testuser1234'): void {
  cy.request(
    'POST',
    '/api/plentymarkets/registerUser',
    {
      email: email,
      firstName: '',
      lastName: '',
      password: password
    }
  );
}

export function addCartItem (productId: number, quantity: number): void {
  cy.request(
    'POST',
    '/api/plentymarkets/addCartItem',
    {
      productId: productId,
      quantity: quantity
    }
  ).then(() => {
    cy.reload();
  });
}
