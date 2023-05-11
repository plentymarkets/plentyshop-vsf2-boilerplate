module.exports = {
  integrations: {
    plentymarkets: {
      location: '@vue-storefront/plentymarkets-api/server',
      configuration: {
        api: {
          // url: process.env.API_ENDPOINT || 'https://mevofvd5omld.c01-14.plentymarkets.com'
          url: process.env.API_ENDPOINT || 'https://msql6u6bz7bl.c14-01.plentymarkets.com'
        }
      },
      extensions: extensions => [...extensions]
    }
  }
};
