const { defineConfig } = require('cypress');

// Please remember that if you change config variable values, you will have to re-run the cypress command
require('dotenv').config();

module.exports = defineConfig({
  fixturesFolder: 'tests/e2e/fixtures',
  viewportHeight: 1080,
  viewportWidth: 1920,
  pageLoadTimeout: 180000,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'tests/e2e/report/assets/screenshots',
  video: false,
  reporter: '../../../node_modules/mochawesome',
  reporterOptions: {
    reportDir: 'tests/e2e/report',
    reportFilename: 'report',
    overwrite: false,
    html: false
  },
  retries: {
    runMode: 2,
    openMode: 0
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('~/tests/e2e/plugins/index.ts')(on, config);
    },
    baseUrl: process.env.CYPRESS_DEFAULT_DEV_URL,
    specPattern: 'e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'support/index.js'
  },

  env: {
    CYPRESS_DEFAULT_ACCOUNT_EMAIL: process.env.CYPRESS_DEFAULT_ACCOUNT_EMAIL,
    CYPRESS_DEFAULT_ACCOUNT_PASSWORD: process.env.CYPRESS_DEFAULT_ACCOUNT_PASSWORD
  }
});
