import page from '../pages/factory';

context('Homepage', () => {
    beforeEach(function init () {
        cy.request({
            url: '/',
            timeout: 60000
        });
    });
    console.log("Homepage is available")
});

it(['happyPath', 'regression'], 'Should access the homepage', function test() {
    page.home.visit();
});