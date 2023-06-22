/* eslint-disable spaced-comment */
///  <reference types='cypress-tags' />
///  <reference types='cypress-pipe' />

declare namespace Cypress {
  interface Chainable {
    fixtures?: any;
    login(email: string, password: string, isRememberChecked?: boolean): void;
    iframe(): any;
    capturePopup(): void;
    popup(): any;
    paypalFlow(email: string, password: string): void;
    paypalPrice(): any;
    paypalComplete(): void;
    setConsentCookie(): void;
    setLocaleCookie(locale: string): void;
  }
}
