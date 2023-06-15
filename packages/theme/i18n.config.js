export default {
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
};
