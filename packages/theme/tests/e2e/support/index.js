/* eslint-disable no-undef */
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands.js';
import 'cypress-pipe';
import '@cypress/code-coverage/support';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import addContext from 'mochawesome/addContext';
import failOnConsoleError from 'cypress-fail-on-console-error';

const config = {

  /**
   * consoleMessages ignores messages that match a string or pattern
   * Use only when dealing with messages we have no control over
   */
  consoleMessages: [/.*useUser\/login.*/, /.*paypal.*/],
  consoleTypes: ['error'],
  debug: false
};

failOnConsoleError(config);

Cypress.on('uncaught:exception', (err) => {
  if (err.stack.indexOf('paypal'))
    return false;
});

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshot = `assets/screenshots/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;

    addContext({test}, {
      title: 'Screenshot',
      value: screenshot
    });
  }
});
