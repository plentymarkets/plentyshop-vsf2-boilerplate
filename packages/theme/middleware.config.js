module.exports = {
  integrations: {
    plentymarkets: {
      location: '@vue-storefront/plentymarkets-api/server',
      configuration: {
        api: {
          url: 'https://mevofvd5omld.c01-14.plentymarkets.com'
        }
      },
      extensions: extensions => [...extensions]
    },
    pp: {
      location: '@vue-storefront/pp-plentymarkets/server',
      configuration: {
        api: {
          url: 'https://mevofvd5omld.c01-14.plentymarkets.com'
        }
      }
    }
  }
};
