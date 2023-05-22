/* eslint-disable spaced-comment */
///  <reference types='cypress-tags' />
///  <reference types='cypress-pipe' />

declare namespace Cypress {
  interface Chainable {
    fixtures?: any;
    login(email: string, password: string, isRememberChecked?: boolean): void;
  }
}
