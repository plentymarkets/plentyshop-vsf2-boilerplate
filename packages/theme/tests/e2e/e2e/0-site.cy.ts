import page from '../pages/factory';

/**
 * Compensates for https://github.com/cypress-io/cypress/issues/7062
 * 
 * Dummy test to check site availability on GitHub runner.
 * Without this test, the first visit regularly fails, forcing many repeat runs on a valid PR.
 */

context('Homepage', () => {
    beforeEach(function init () {
        cy.request({
            url: '/',
            timeout: 120000
        });
        console.log("Homepage is available")
    });
    
    it(['happyPath', 'regression'], 'Should access the homepage', function test() {
        page.home.visit();
    });
});