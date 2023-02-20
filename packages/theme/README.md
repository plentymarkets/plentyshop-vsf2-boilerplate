# Vue Storefront 2

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

For detailed explanation on how things work, check out the [documentation](https://docs.vuestorefront.io/v2/).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

## E2e testing with Cypress

We are currently using the default BE api and not mocking anything.

- Please remember to create your `.env` file in `./tests/e2e`, based on the `.env.example` file;
- When adding new values in the env file, remember to update `./tests/e2e/cypress.config.js`

For mobile testing, you can specify a resolution with the tests command. E.g.

- `yarn test:e2e --config viewportWidth=1280,viewportHeight=720`

More information:

- [https://docs.cypress.io/api/commands/viewport#Syntax](https://docs.cypress.io/api/commands/viewport#Syntax);
- [https://docs.cypress.io/guides/references/configuration#Configuration-File](https://docs.cypress.io/guides/references/configuration#Configuration-File).

### Temporary necessary checkout.js fix

Please remember that `./packages/theme/middleware/checkout.js` needs to have the following code commented in order for the tests to work:

```javascript
if (!cart.customerInvoiceAddressId) {
  redirectWithLocalePath('billing');
}
```

This is a quick hack which needs to be addressed soon, in [https://dev.azure.com/plentymarkets/plentymarkets/\_workitems/edit/35747](https://dev.azure.com/plentymarkets/plentymarkets/_workitems/edit/35747). :)

### Todo

- Ensure we are using english for the tests;
- Refactor the page object approach to use it only for common parts of the app.
