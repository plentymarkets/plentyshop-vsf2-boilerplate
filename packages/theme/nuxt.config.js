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
    '@nuxtjs/google-fonts',
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
    theme,
    cookieGroups: {
      barTitle: 'We value your privacy',
      barDescription:
        'We use cookies and similar technologies on our website and process personal data of visitors to our website (e.g. IP address), e.g. to personalise content and advertisements, to integrate media from third-party providers or to analyse access to our website. Data processing only takes place when cookies are set. We share this data with third parties that we name in the settings.Data processing may be carried out with consent or on the basis of a legitimate interest. Consent can be given or refused. There is a right not to consent and to change or withdraw consent at a later date. We provide more information about the use of personal data and the services in our',
      groups: [
        {
          id: 0,
          name: 'Essentials',
          accepted: false,
          description:
            'Essential cookies enable basic functions and are necessary for the proper functioning of the website.',
          cookies: [
            {
              name: 'Session',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy': '/PrivacyPolicy',
              Lifespan: '1 days'
            },
            {
              name: 'Consent',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':'/PrivacyPolicy',
              Lifespan: '100 days'
            },
            {
              name: 'Session2',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy': '/PrivacyPolicy',
              Lifespan: '100 days'
            }
          ],
          showMore: false
        },
        {
          id: 1,
          name: 'External Media',
          accepted: false,
          description:
            'Content by video platforms and social media platforms are blocked by default. If you accept cookies by external media, access to these contents requires no further consent.',
          cookies: [
            {
              name: 'Session',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':'/PrivacyPolicy',
              Lifespan: '100 days'
            },
            {
              name: 'Consent',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':'/PrivacyPolicy',
              Lifespan: '100 days'
            },
            {
              name: 'Session2',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':'/PrivacyPolicy',
              Lifespan: '100 days'
            }
          ],
          showMore: false
        },
        {
          id: 2,
          name: 'Functional',
          accepted: false,
          description:
            'Marketing cookies are used by third parties and publishers to display personalised advertisements by following users across websites.',
          cookies: [
            {
              name: 'Session',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':'/PrivacyPolicy',
              Lifespan: '100 days'
            },
            {
              name: 'Consent',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':'/PrivacyPolicy',
              Lifespan: '100 days'
            },
            {
              name: 'Session2',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':'/PrivacyPolicy',
              Lifespan: '100 days'
            }
          ],
          showMore: false
        },
        {
          id: 3,
          name: 'Marketing',
          accepted: false,
          description:
            'Marketing cookies are used by third parties and publishers to display personalised advertisements by following users across websites.',
          cookies: [
            {
              name: 'Session',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':'/PrivacyPolicy',
              Lifespan: '100 days'
            },
            {
              name: 'Consent',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':'/PrivacyPolicy',
              Lifespan: '100 days'
            },
            {
              name: 'Session2',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':'/PrivacyPolicy',
              Lifespan: '100 days'
            }
          ],
          showMore: false
        }
      ],
    }
  },

  pwa: {
    meta: {
      theme_color: '#5ECE7B'
    }
  },
  googleFonts: {
    families: {
      Raleway: {
        wght: [300, 400, 500, 600, 700],
        ital: [400]
      },
      Roboto: {
        wght: [300, 400, 500, 700],
        ital: [300, 400]
      }
    },
    display: 'swap',
    download: true,
    base64: false,
    fontsPath: '../fonts'
  },
};

if (process.env.MIDDLEWARE_URL) {
  config.privateRuntimeConfig = {
    middlewareUrl: `http://localhost:${appPort}/api/`
  }
}

export default config;
