<div align="center">
  <img src="https://user-images.githubusercontent.com/1626923/137092657-fb398d20-b592-4661-a1f9-4135db0b61d5.png" alt="Vue Storefront" height="80px" />

  <img src="https://cdn01.plentymarkets.com/avw8j9fg70hi/frontend/website_plentycom/plenty_Logos/plentymarkets/plentymarkets_Claim_RGB.png" alt="plentymarkets logo" height="160px" />
</div>

# Vue Storefront 2 integration with plentymarkets

This package contains the presentation of the app.

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

For mobile testing, you can specify a resolution with the tests command, for example `yarn test:e2e --config viewportWidth=1280,viewportHeight=720`.

More information:

- [https://docs.cypress.io/api/commands/viewport#Syntax](https://docs.cypress.io/api/commands/viewport#Syntax);
- [https://docs.cypress.io/guides/references/configuration#Configuration-File](https://docs.cypress.io/guides/references/configuration#Configuration-File).

## Cookies

* To customise cookie values, edit `cookieConfig.js`.
* To customise the cookiebar itself, edit the CookieBar component.
* The CookieBar component uses the useCookieBar composable. The composable depends on [cookie-universal-nuxt](https://www.npmjs.com/package/cookie-universal-nuxt) to fetch and store cookies.

##### cookiebar.vue
```js
const { cookieJson, bannerIsHidden, convertAndSaveCookies, defaultCheckboxIndex } = useCookieBar(
    NuxtContext,
    cookieName,
    defaultCheckbox
    nuxtCookieConfig
);
```

| Parameter | Description |
| `NuxtContext`  | Required for interacting with [cookie-universal-nuxt](https://www.npmjs.com/package/cookie-universal-nuxt). cookie-universal-nuxt gets, sets and removes cookies in client and server side Nuxt apps. |
| `CookieName` | The name of the cookie used in the browser. Default: `plenty-shop` |
| `DefaultCheckbox` | Default cookie group index. Disabled by default. |
| `nuxtCookieConfig` | Consent groups defined in `cookieConfig.js`. |

## Resources

Vue Storefront:

<!-- * [plentymarkets integration Documentation](https://docs.vuestorefront.io/plentymarkets) -->
* [Vue Storefront Documentation](https://docs.vuestorefront.io/v2/)
* [Vue Storefront Boilerplate](https://github.com/vuestorefront/ecommerce-integration-boilerplate)
* [Storefront UI Library](https://docs.storefrontui.io/v1/?path=/docs/welcome--page)

General:

* [Nuxt Documentation](https://nuxtjs.org/docs/get-started/installation)
* [Introduction to Vue](https://vuejs.org/guide/introduction.html) | [Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html)
* [HTTP Toolkit](https://httptoolkit.tech)
