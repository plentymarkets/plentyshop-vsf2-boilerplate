module.exports = {
  integrations: {
    plentymarkets: {
      location: '@vue-storefront/plentymarkets-api/server',
      configuration: {
        api: {
          url: process.env.API_ENDPOINT || 'https://xc7qv0z6ycdf.c14-01.plentymarkets.com'
        }
      },
      extensions: extensions => [...extensions]
    }
  }
};
