import type {Plugin} from '@nuxt/types';

/**
 * Plugin that passes the set cookie headers received during ssr process to the client.
 * @param app
 */
const plugin: Plugin = ({ app }) => {
  const isSSR: boolean = process.server;
  if (isSSR) {
    app.$vsf.$plentymarkets.client.interceptors.response.use((response) => {
      if (response.headers) {
        const setCookie = Array.isArray(response.headers['set-cookie']) ? response.headers['set-cookie'][0] : response.headers['set-cookie'];
        if (setCookie) {
          app.context.res.setHeader('set-cookie', setCookie);
          app.$vsf.$plentymarkets.config.cookies = setCookie;
        }
      }
      return response;
    });

    app.$vsf.$plentymarkets.client.interceptors.request.use((request) => {
      let reqCookies = '';
      // if multiple requests were sent by the middleware, it uses the config.cookies object to receive the latest cookie
      if (app.$vsf.$plentymarkets.config.cookies) {
        // make sure that the locale is always send to the browser
        reqCookies = app.$vsf.$plentymarkets.config.cookies + ';';
        reqCookies = reqCookies + `vsf-locale=${app.$cookies.get('vsf-locale')};`;
      } else {
        // Use the cookies send by the browser
        Object.entries(app.$cookies.getAll()).forEach(([key, val]) => {
          reqCookies += `${key}=${val}; `;
        });
      }
      request.headers.cookie = reqCookies;
      return request;
    });
  }
};

export default plugin;
