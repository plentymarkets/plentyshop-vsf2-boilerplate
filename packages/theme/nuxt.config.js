import webpack from 'webpack';
import theme from './themeConfig';

const appPort = process.env.PORT || 80;
const appIP = process.env.IP || 'localhost';

const config = {
  server: {
    port: appPort,
    host: '0.0.0.0'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Vue Storefront',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap'
      }
    ]
  },

  loading: {color: '#fff'},

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api-cookies'
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // to core
    '@nuxtjs/composition-api/module',
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    ['@vue-storefront/nuxt', {
      // @core-development-only-start
      coreDevelopment: true,
      // @core-development-only-end
      useRawSource: {
        dev: [
          '@vue-storefront/plentymarkets',
          '@vue-storefront/core'
        ],
        prod: [
          '@vue-storefront/plentymarkets',
          '@vue-storefront/core'
        ]
      }
    }],
    // @core-development-only-start
    ['@vue-storefront/nuxt-theme', {
      generate: {
        replace: {
          apiClient: '@vue-storefront/plentymarkets-api',
          composables: '@vue-storefront/plentymarkets'
        }
      }
    }],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    ['@vue-storefront/plentymarkets/nuxt', {}]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['nuxt-i18n', {
      baseUrl: process.env.BASE_URL || `http://localhost:${appPort}`
    }],
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@vue-storefront/middleware/nuxt'
  ],

  i18n: {
    currency: 'USD',
    country: 'US',
    countries: [
      {name: 'US', label: 'United States', states: ['California', 'Nevada']},
      {name: 'AT', label: 'Austria'},
      {name: 'DE', label: 'Germany'},
      {name: 'NL', label: 'Netherlands'}
    ],
    currencies: [
      {name: 'EUR', label: 'Euro'},
      {name: 'USD', label: 'Dollar'}
    ],
    locales: [
      {code: 'en', label: 'English', file: 'en.js', iso: 'en'},
      {code: 'de', label: 'German', file: 'de.js', iso: 'de'}
    ],
    defaultLocale: 'en',
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      numberFormats: {
        en: {
          currency: {
            style: 'currency', currency: 'USD', currencyDisplay: 'symbol'
          }
        },
        de: {
          currency: {
            style: 'currency', currency: 'EUR', currencyDisplay: 'symbol'
          }
        }
      }
    },
    detectBrowserLanguage: false
  },

  styleResources: {
    scss: [require.resolve('@storefront-ui/shared/styles/_helpers.scss', {paths: [process.cwd()]})]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ],
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.find(route => route.path === '/Checkout').children.push(
        {
          path: 'login',
          name: 'login',
          component: resolve(__dirname, '_theme/pages/Checkout/Login.vue'),
        },
      )
    },
    middleware: ['checkout']
  },

  publicRuntimeConfig: {
    middlewareUrl: process.env.MIDDLEWARE_URL || `http://${appIP}:${appPort}/api/`,
    theme
  },

  pwa: {
    meta: {
      theme_color: '#5ECE7B'
    }
  }
};

if (process.env.MIDDLEWARE_URL) {
  config.privateRuntimeConfig = {
    middlewareUrl: `http://localhost:${appPort}/api/`
  }
}

export default config;
