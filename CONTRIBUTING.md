# Contributing

Thank you for contributing to @vuestorefront/plentymarkets! To smoothen everyone's experience involved with the project, please take note of the following guidelines and rules.

## Contribution guidelines

We welcome contributions from the community. Please follow these guidelines when contributing:

1. Fork the repository.
2. Create a new branch for your changes.
3. Run `yarn lint` to check for linting errors. `yarn lint --fix` resolves a subset of errors automatically.
4. Make your changes and commit them.
5. Push your changes to your fork.
6. Open a pull request from your branch to the main repository's `main` branch.
7. Create a draft pull request and make sure all checks pass before requesting a review.
8. Once approved, the pull request will be merged into the `main` branch.

## Coding rules

To keep the code base of @vuestorefront/plentymarkets neat and tidy, the following rules apply to every change:

### Automated checks

- The change passes all end-to-end tests. Also, if you extend the test suite to cover your change, we'll appreciate it.
- The change doesn't contain `eslint` errors.
- If the change introduces `eslint` warnings, please describe why you believe it's the best solution regardless.

### Presentation

- Use Tailwind classes instead of SCSS. For additional variables, refer to the [Tailwind configuration](./packages/theme/tailwind.config.js).

### Logic

- To manage the app state, use composables.
- Only extend `@vuestorefront/core` composables or interfaces if it's absolutely necessary. Otherwise, create new composables and interfaces for your scope.
- If you want to extend basic functionality with existing composables (for example to create a login with third-party authentication in `useUser`), respect existing TypeScript interfaces. In this case you're limited to the methods `@vuestorefront/core` provides.
- In TypeScript, explicitly set a type whenever possible.
- To cast properties to a different type, create a new getter. Use the naming convention `propertyAsNewtype`.
- Don't use getters for props or local computed properties that are always defined (we use getters with TypeScript to avoid undefined errors and SSR errors that make the app crash). When using local computed properties, the responsibility of avoiding errors should lie within the local computed property in the component or the external getters used in the local computed property.

### Dependencies

- Favor micro libraries over swiss army knives (e.g. rimraf, ncp vs. fs-extra).
