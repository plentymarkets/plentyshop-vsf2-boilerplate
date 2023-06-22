/* eslint-disable spaced-comment */
///  <reference types='cypress-tags' />
///  <reference types='cypress-pipe' />

declare namespace Cypress {
  interface Chainable {
    fixtures?: any;
    login(email: string, password: string, isRememberChecked?: boolean): void;
    iframe(): unknown;
    capturePopup(): void;
    popup(): unknown;
    paypalFlow(email: string, password: string): void;
    paypalPrice(): unknown;
    paypalComplete(): void;
    setConsentCookie(): void;
    setLocaleCookie(locale: string): void;
  }
}
