export default {
  currency: 'GBP',
  country: 'UK',
  countries: [
    {name: 'UK', label: 'United Kingdom'},
    {name: 'AT', label: 'Austria'},
    {name: 'DE', label: 'Germany'},
    {name: 'NL', label: 'Netherlands'}
  ],
  currencies: [
    {name: 'EUR', label: 'Euro'},
    {name: 'GBP', label: 'Pounds'}
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
          style: 'currency', currency: 'GBP', currencyDisplay: 'symbol'
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
