module.exports = {
  purge: [
    '**/components/**/*.{vue,js,ts}',
    '**/layouts/**/*.vue',
    '**/pages/**/*.vue',
    '**/composables/**/*.{js,ts}',
    '**/plugins/**/*.{js,ts}',
    '**/App.{js,ts,vue}',
    '**/app.{js,ts,vue}',
    '**/default.{js,ts,vue}',
    '**/Error.{js,ts,vue}',
    '**/error.{js,ts,vue}'
  ],
  important: true,
  darkMode: false,
  theme: {
    extend: {
      fontSize: {
        // 12px
        'sf-xs': 'var(--font-size--xs)',
        // 14px
        'sf-sm': 'var(--font-size--sm)',
        // 16px
        'sf-base': 'var(--font-size--base)',
        // 18px
        'sf-lg': 'var(--font-size--lg)',
        'sf-xl': 'var(--font-size--xl)'
      },
      fontWeight: {
        // 300
        'sf-light': 'var(--font-weight--light)',
        // 400
        'sf-normal': 'var(--font-weight--normal)',
        // 500
        'sf-medium': 'var(--font-weight--medium)',
        // 600
        'sf-semibold': 'var(--font-weight--semibold)',
        // 700
        'sf-bold': 'var(--font-weight--bold)'
      },
      colors: {
        // #1d1f22
        'sf-c-black': 'var(--c-black)',
        // #1d1f22
        'sf-c-black-base': 'var(--c-black-base)',
        // #292c30
        'sf-c-black-lighten': 'var(--c-black-lighten)',
        // #111214
        'sf-c-black-darken': 'var( --c-black-darken)',
        // #ffffff
        'sf-c-white': 'var(--c-white)',
        // #ffffff
        'sf-c-body': 'var(--c-body)',
        // #1d1f22
        'sf-c-text': 'var(--c-text)',
        // #72757E
        'sf-c-text-muted': 'var(--c-text-muted)',
        // #e0e0e1
        'sf-c-text-disabled': 'var(--c-text-disabled)',
        // #43464E
        'sf-c-link': 'var(--c-link)',
        // #1d1f22
        'sf-c-link-hover': 'var(--c-link-hover)',
        // #018937
        'sf-c-primary': 'var(--c-primary)',
        // #018937
        'sf-c-primary-base': 'var(--c-primary-base)',
        // #72d48b
        'sf-c-primary-lighten': 'var(--c-primary-lighten)',
        // #4ac86b
        'sf-c-primary-darken': 'var(--c-primary-darken)',
        // #9ee2b0
        'sf-c-primary-variant': 'var(--c-primary-variant)',
        // #ffffff
        'sf-c-on-primary': 'var(--c-on-primary)',
        // #1d1f22
        'sf-c-secondary': 'var( --c-secondary)',
        // #1d1f22
        'sf-c-secondary-base': 'var(--c-secondary-base)',
        // #292c30
        'sf-c-secondary-lighten': 'var(--c-secondary-lighten)',
        // #111214
        'sf-c-secondary-darken': 'var(--c-secondary-darken)',
        // #43464E
        'sf-c-secondary-variant': 'var(--c-secondary-variant)',
        // #ffffff
        'sf-c-on-secondary': 'var(--c-on-secondary)',
        // #f1f2f3
        'sf-c-light': 'var(--c-light)',
        // #f1f2f3
        'sf-c-light-base': 'var(--c-light-base)',
        // #ffffff
        'sf-c-light-lighten': 'var(--c-light-lighten)',
        // #e3e5e7
        'sf-c-light-darken': 'var(--c-light-darken)',
        // #ffffff
        'sf-c-light-variant': 'var(--c-light-variant)',
        'sf-c-light-primary-lighten': 'var(--_c-light-primary-lighten)',
        'sf-c-light-primary': 'var(--_c-light-primary)',
        // #1d1f22
        'sf-c-on-light': 'var(--c-on-light)',
        // #72757E
        'sf-c-gray': 'var(--c-gray)',
        // #72757E
        'sf-c-gray-base': 'var(--c-gray-base)',
        // #7f828b
        'sf-c-gray-lighten': 'var(--c-gray-lighten)',
        // #666971
        'sf-c-gray-darken': 'var(--c-gray-darken)',
        // #8D8F9A
        'sf-c-gray-variant': 'var(--c-gray-variant)',
        // #1d1f22
        'sf-c-on-gray': 'var(--c-on-gray)',
        // #1d1f22
        'sf-c-dark': 'var(--c-dark)',
        // #1d1f22
        'sf-c-dark-base': 'var(--c-dark-base)',
        // #292c30
        'sf-c-dark-lighten': 'var(--c-dark-lighten)',
        // #111214
        'sf-c-dark-darken': 'var(--c-dark-darken)',
        // #43464E
        'sf-c-dark-variant': 'var(--c-dark-variant)',
        // #ffffff
        'sf-c-on-dark': 'var(--c-on-dark)',
        // #0468DB
        'sf-c-info': 'var(--c-info)',
        // #0468DB
        'sf-c-info-base': 'var(--c-info-base)',
        // #0474f4
        'sf-c-info-lighten': 'var(--c-info-lighten)',
        // #045cc2
        'sf-c-info-darken': 'var(--c-info-darken)',
        // #e1f4fe
        'sf-c-info-variant': 'var(--c-info-variant)',
        // #ffffff
        'sf-c-on-info': 'var(--c-on-info)',
        // #018937
        'sf-c-success': 'var(--c-success)',
        // #018937
        'sf-c-success-base': 'var(--c-success-base)',
        // #72d48b
        'sf-c-success-lighten': 'var(--c-success-lighten)',
        // #4ac86b
        'sf-c-success-darken': 'var(--c-success-darken)',
        // #9ee2b0
        'sf-c-success-variant': 'var(--c-success-variant)',
        // #ffffff
        'sf-c-on-success': 'var(--c-on-success)',
        // #ecc713
        'sf-c-warning': 'var(--c-warning)',
        // #ecc713
        'sf-c-warning-base': 'var(--c-warning-base)',
        // #eecd2b
        'sf-c-warning-lighten': 'var(--c-warning-lighten)',
        // #d4b311
        'sf-c-warning-darken': 'var(--c-warning-darken)',
        // #f6e389
        'sf-c-warning-variant': 'var(--c-warning-variant)',
        // #ffffff
        'sf-c-on-warning': 'var(--c-on-warning)',
        // #d12727
        'sf-c-danger': 'var(--c-danger)',
        // #d12727
        'sf-c-danger-base': 'var(--c-danger-base)',
        // #da3838
        'sf-c-danger-lighten': 'var(--c-danger-lighten)',
        // #bc2323
        'sf-c-danger-darken': 'var(--c-danger-darken)',
        // #fcede8
        'sf-c-danger-variant': 'var(--c-danger-variant)',
        // #ffffff
        'sf-c-on-danger': 'var(--c-on-danger)'
      },
      spacing: {
        // 4px
        'sf-2xs': 'var(--spacer-2xs)',
        // 8px
        'sf-xs': 'var( --spacer-xs)',
        // 16px
        'sf-sm': 'var(--spacer-sm)',
        // 24px
        'sf-base': 'var(--spacer-base)',
        // 32px
        'sf-lg': 'var(--spacer-lg)',
        // 40px
        'sf-xl': 'var(--spacer-xl)',
        // 80px
        'sf-2xl': 'var(--spacer-2xl)',
        // 160px
        'sf-3xl': 'var(--spacer-3xl)'
      },
      fontFamily: {
        // "Roboto",serif
        'sf-primary': 'var(--font-family--primary)',
        // "Raleway",sans-serif
        'sf-secondary': 'var(--font-family--secondary)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
