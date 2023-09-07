# This repository is deprecated
### Use https://github.com/plentymarkets/plentyshop-pwa instead
---
<div align="center">
  <img src="https://user-images.githubusercontent.com/1626923/137092657-fb398d20-b592-4661-a1f9-4135db0b61d5.png" alt="Vue Storefront" height="80px" />

  <img src="https://cdn01.plentymarkets.com/avw8j9fg70hi/frontend/website_plentycom/plenty_Logos/plentymarkets/plentymarkets_Claim_RGB.png" alt="plentymarkets logo" height="160px" />
</div>

# Vue Storefront 2 integration with plentymarkets

This project is a plentymarkets integration for Vue Storefront 2. The project takes a monorepo approach and contains all packages required to run the application.

## Stay connected

[![GitHub Repo stars](https://img.shields.io/github/stars/vuestorefront/vue-storefront?style=social)](https://github.com/vuestorefront/vue-storefront)
[![Twitter Follow](https://img.shields.io/twitter/follow/vuestorefront?style=social)](https://twitter.com/vuestorefront)
[![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UCkm1F3Cglty3CE1QwKQUhhg?style=social)](https://www.youtube.com/c/VueStorefront)
[![Discord](https://img.shields.io/discord/770285988244750366?label=join%20discord&logo=Discord&logoColor=white)](https://discord.vuestorefront.io)

------

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Getting started

This section walks you through the first steps of working with the app.

### Requirements

* [Download NodeJS v14](https://nodejs.org/en/download/releases). If some of your projects require other NodeJS versions, use a node version manager like [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to quicky switch between the different versions.
* [Install the Yarn package manager](https://yarnpkg.com/getting-started/install).

### Installation

1. Fork the repository.
2. Clone your fork.
3. To install the project dependencies, run `yarn`.
4. To build the project, run `yarn build`.
5. To start the project in development mode, run `yarn dev`.

### Configuration

* To connect the app to your plentymarkets system, open `packages/theme/middleware.config.js` and edit the `url`.
* To update your theme, edit the following files:
  * `packages/theme/assets/scss/theme.scss` for [global variables](https://docs.storefrontui.io/v1/?path=/docs/getting-started-development-guide-css-customization--page#global-variables)
  * `packages/theme/tailwind.config.js` for utility classes
  * `packages/theme/themeConfig.js` for media files
* To update the available locales and currencies, open `packages/theme/nuxt.config.js` and edit `i18n`. Note that when editing internationalisation, you also have to configure your plentymarkets system accordingly. When adding languages, you also have to add new translations in `packages/theme/lang`.
* To update cookie groups and decide when to load additional scripts, edit `packages/theme/cookieConfig.js`.

### Integrations

- Paypal
    - Add this to your `packages/theme/integration.config.js`

    ```
    payment: {
      paypal: {
        paymentId: backendPaymentId,
        clientId: 'PaypalClientId',
        merchantId: 'PaypalMerchantId'
      }
    }
    ```
  

<!-- ### Publishing the project (TBA) -->

## Project overview

This project extends Vue Storefront. This means it relies on Nuxt 2, VueJS 2 and TypeScript.

> :notebook: Vue components use the composition API.

### Package structure

| Package | Responsibilities |
|---------|------------------|
| api-client | Queries data from external systems, for example to exchange data with the connected plentymarkets system. |
| composables | Handles the app state and all major app logic. By default, most composables extend core storefront functionality. |
| theme | Contains the presentation of the app. |

For further information on each package, refer to that package's README.

### Workflow

This section provides an overview of how to use the packages when adding new functionality. For example, imagine you want to display information from `https://petstore.swagger.io/v2/pet/findByStatus?status=available`.

1. Create a new API in `packages/api-client`.
2. Create a new inteface for the API.
3. Build the api-client package with `yarn build`.
4. Create a new composable in `packages/composables`.
5. In the composable, create a method that uses the API to fetch information.
6. In the composable, create a property that stores the fetched information.
7. Import the property in a Vue component in `packages/theme`.

## How to start if you want to contribute?

Want to contribute? Ping us on the `plentymarkets` channel on [our Discord](https://discord.vuestorefront.io)!

Also, before getting started, check out to the [contribution guide](https://github.com/plentymarkets/plentyshop-pwa/blob/main/.github/CONTRIBUTING.md).

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

## Support

If you have any questions about this integration we will be happy to answer them on `plentymarkets` channel on [our Discord](https://discord.vuestorefront.io/).

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
