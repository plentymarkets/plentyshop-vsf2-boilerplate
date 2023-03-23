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

## How to start if you want to contribute?

Want to contribute? Ping us on the `plentymarkets` channel on [our Discord](https://discord.vuestorefront.io)!

Also, before getting started, check out to the [contribution guide](./CONTRIBUTING.md).

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

If you have any questions about this integration we will be happy to answer them on `plentymarkets` channel on [our Discord](discord.vuestorefront.io).

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


--------------------




## Storefront Components
### When do we customize storefront components and how?
There are 2 types of customization:
1. Changing the style of the component (e.g., change colors)
  - Check the Storefront documentation, as many elements have customizable styles: [https://docs.storefrontui.io/v1/?path=/story/welcome--page](https://docs.storefrontui.io/v1/?path=/story/welcome--page)
  - Add the desired CSS classes to the line where you include the component. For example:
    ```html
    <SfButton class="your-desired-tailwind-class" />
    ```

2. Changing the logic of the component (e.g., remove/data, change logic)
  - For a different logic/behavior/style, we recommend creating a new component; we should not modify the internals of the Storefront components. You can find examples in `packages/theme/components`.
  - First, check the Vue Storefront documentation for each component to see if it has props or settings that can achieve your desired functionality: [https://docs.storefrontui.io/v1/?path=/story/welcome--page](https://docs.storefrontui.io/v1/?path=/story/welcome--page)

### What is essential to know to get started building a component?
- Understand what functionality you already have ready to use and what should be implemented.
- Decide on what to do and understand the steps needed to implement.

### When to use yarn build
We run `yarn build` only for updates inside the `packages/api-client` folder.

### Example of a task with Storefront
**Display some JSON information in a Vue component**

If the JSON information is available in the client API (the Nuxt middleware method is defined), follow Step A.

**Step A:**
- Create a composable or use an existing one.
- Define the method that calls the fetch from the Nuxt middleware.
- After that, you can consume the information in two ways:
  1. Use the fetch method in the composable, call it from the Vue component and await for the response, then use the response (Vue component -> composable -> Nuxt API client -> backend API).
  2. Use the fetch method but update a property in the composable and use that property in the Vue component (this is the recommended way).

Note: You may opt for creating your own composable or extending an existing one. If you choose the second option, keep in mind that you need to respect the TypeScript interfaces. In both cases, you need to create interfaces and build the API client (`packages/api`). Both cases require importing interfaces from `@vue-storefront/plentymarkets-api`. When you execute `yarn && yarn build`, interfaces defined in `api-client/src` get compiled in `@vue-storefront/plentymarkets-api` and are ready to be used.

If the JSON information is not available in the client API, follow Step B.

**Step B:**
- Create an API in `packages/api`: [https://docs.vuestorefront.io/v2/integrate/integration-guide.html](https://docs.vuestorefront.io/v2/integrate/integration-guide.html)
  - Proceed with Step A.

**Note:** If the new interface is not recognized by the IDE in the composable, try reopening the file or the IDE.
