module.exports = {
  integrations: {
    plentymarkets: {
      location: '@vue-storefront/plentymarkets-api/server',
      configuration: {
        api: {
          url: process.env.API_ENDPOINT || 'https://mevofvd5omld.c01-14.plentymarkets.com'
        }
      },
      extensions: extensions => [...extensions]
    }
  }
};
