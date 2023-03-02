export function acceptCookies(): void {
  cy.setCookie('plenty-shop-cookie', '%5B%7B%22Essentials%22%3A%5B%7B%22Session%22%3Atrue%7D%2C%7B%22Consent%22%3Atrue%7D%2C%7B%22Session2%22%3Atrue%7D%5D%7D%2C%7B%22External%20Media%22%3A%5B%7B%22Session%22%3Afalse%7D%2C%7B%22Consent%22%3Afalse%7D%2C%7B%22Session2%22%3Afalse%7D%5D%7D%2C%7B%22Functional%22%3A%5B%7B%22Session%22%3Afalse%7D%2C%7B%22Consent%22%3Afalse%7D%2C%7B%22Session2%22%3Afalse%7D%5D%7D%2C%7B%22Marketing%22%3A%5B%7B%22Session%22%3Afalse%7D%2C%7B%22Consent%22%3Afalse%7D%2C%7B%22Session2%22%3Afalse%7D%5D%7D%5D');
}
