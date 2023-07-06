module.exports = {
  setupFiles: ['./jest.init.js'],
  modulePathIgnorePatterns: ['tests/e2e/', '_theme'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!@storefront-ui)/'
  ],
  transform: {
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.vue$': '@vue/vue2-jest',
    '^.+\\js$': 'babel-jest'
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node']
};
