/**
 * Sets vsf-locale cookie
 */
Cypress.Commands.add('setLocaleCookie', (locale: string = 'en') => {
  cy.setCookie('vsf-locale', locale);
})


/**
 * Sets the consent-cookie to dont show the cookie bar
 */
Cypress.Commands.add('setConsentCookie', () => {
  cy.setCookie('consent-cookie', '[{"Essentials":[{"Session":true},{"Consent":true},{"Session2":true}]},{"External Media":[{"Session":false},{"Consent":false},{"Session2":false}]},{"Functional":[{"Session":false},{"Consent":false},{"Session2":false}]},{"Marketing":[{"Session":false},{"Consent":false},{"Session2":false}]}]');
})
