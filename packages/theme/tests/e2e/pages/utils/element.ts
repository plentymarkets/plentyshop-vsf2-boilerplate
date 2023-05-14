const baseUrl = Cypress.config('baseUrl');

export function el(selector: string, children?: string): Cypress.Chainable<JQuery<HTMLElement>> {
  return children ? cy.get(`[v-e2e="${selector}"] ${children}`) : cy.get(`[v-e2e="${selector}"]`);
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
  /*
  cy.request(
    'POST',
    `${baseUrl}/api/plentymarkets/registerUser`,
    {
      email: email,
      firstName: '',
      lastName: '',
      password: password
    }
  );
   */

  cy.getCookies().then((cookies) => {
    const cookieString = cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');

    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/plentymarkets/registerUser`,
      headers: {
        'Cookie': cookieString
      },
      body: {
        email: email,
          firstName: '',
          lastName: '',
          password: password
      }
    });
  });
}

export function addCartItem (productId: number, quantity: number): void {
  cy.getCookies().then((cookies) => {
    const cookieString = cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');

    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/plentymarkets/addCartItem`,
      headers: {
        'Cookie': cookieString
      },
      body: {
        productId: productId,
        quantity: quantity
      }
    });
  })
  ;

  /*
  cy.request(
    'POST',
    `${baseUrl}/api/plentymarkets/addCartItem`,
    {
      productId: productId,
      quantity: quantity
    }
  ).then(() => {
    cy.reload();
  });
   */
}
