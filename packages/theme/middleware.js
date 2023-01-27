// middleware.js
const { createServer } = require('@vue-storefront/middleware');
const { integrations } = require('./middleware.config');

(async () => {
  const app = await createServer({ integrations });

  app.listen(80, () => {
    console.log('Middleware started');
  });
})();
