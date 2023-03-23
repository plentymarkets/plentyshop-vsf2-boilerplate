# Getting Started

## Prerequisites
- Yarn
- Node v14

## Installation
1. Clone the repository from GitHub
2. Run `yarn` to install the project dependencies
3. Run `yarn build` to build the project

## Running the Project
- Run `yarn dev` to start the project

## Configuration
- Middleware → Endpoint
   - In `Middleware.config.js`, we set the endpoint for the back-end
- Theme
   - In `themeConfig.js`, we set the media files
   - In `theme.scss`, we set the primary color
- Cookies
   - In `cookieConfig.js`, we set all cookie names and descriptions
- Display languages/currency
   - In `nuxt.config.js`, we set all the locale data and currency

## Project Information
### Package Structure

| Package      | Responsibilities                                                                                      |
|--------------|-------------------------------------------------------------------------------------------------------|
| api-client   | In this space, we handle all the API calls. In the `api/` folder, the pattern is `use*Name*`. In `types`, we declare the type of each property. All changes here must be built with the `yarn build` command. |
| composables  | In this space, we handle all the states of the app. In most use cases, we extend the "storefront" functionality. We prefer to separate most of the logic from the component to be handled by the composables.  |
| theme        | In this space, we have all the front-end pages, components, styles, and scripts.                       |


## External Documentation
- Vue: [https://vuejs.org/guide/introduction.html](https://vuejs.org/guide/introduction.html)
- Nuxt: [https://nuxt.com/docs](https://nuxt.com/docs)
- Storefront UI Library: [https://docs.storefrontui.io/v1/?path=/docs/welcome--page](https://docs.storefrontui.io/v1/?path=/docs/welcome--page)
- Vue Storefront Integration: [https://docs.vuestorefront.io/v2/getting-started/introduction.html](https://docs.vuestorefront.io/v2/getting-started/introduction.html)
- Vue Storefront Boilerplate: [https://github.com/vuestorefront/ecommerce-integration-boilerplate](https://github.com/vuestorefront/ecommerce-integration-boilerplate)
- HTTP Toolkit: [https://httptoolkit.tech](https://httptoolkit.tech)
- NVM (node versioning): [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

## Guideline Suggestions
- If you have a property that is a number and you need a string in the template, create another getter with the name `IdAsString`.
- Don't use getters for props or local computed properties that are always defined (we use getters with TypeScript to avoid undefined errors and SSR errors that make the app crash). When using local computed properties, the responsibility of avoiding errors should lie within the local computed property in the component or the external getters used in the local computed property.
- Don't try to extend Vue Storefront/core interfaces/composables if it's not absolutely necessary. Prefer creating new ones for the required scope.
- If you need to extend basic functionality like login (for example, using third-party authentication) and want to use existing composables (`useUser`), keep in mind that you need to also respect TypeScript interfaces and are limited to the specific methods Storefront Core provides in the interfaces.
- In TypeScript, explicitly set a type whenever possible.
- Prefer Tailwind classes for styling over SCSS. Refer to the Tailwind config for extended variables.
- For state management, you need to use composables.

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
