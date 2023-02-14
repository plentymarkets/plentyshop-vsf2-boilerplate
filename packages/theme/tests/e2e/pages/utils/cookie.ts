export function acceptCookies(): void {
  cy.setCookie('decided', 'true');
}
