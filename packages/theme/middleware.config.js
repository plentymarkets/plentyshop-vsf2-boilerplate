module.exports = {
  integrations: {
    plentymarkets: {
      location: '@vue-storefront/plentymarkets-api/server',
      configuration: {
        api: {
          url: process.env.API_ENDPOINT || 'https://hashtages-dev1.plentymarkets-cloud02.com'
        }
      },
      extensions: extensions => [...extensions]
    }
  }
};
