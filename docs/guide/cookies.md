## Cookies
For cookie consent costumization users can change the content of nuxtConfig.js in the publicRuntimeConfig/cookieGroups section.

For interacting with the cookiebar the external developer has the useCookie composable.

Example of ussage cand be found in the CookieBar component.

const { cookieJson, bannerIsHidden, convertAndSaveCookies, defaultCheckboxIndex } = useCookie(
    context,
    nuxtCookieConfig,
    cookieName,
    defaultCheckbox
);

context = the context for interacting with the nuxt universal cookie library
nuxtCookieConfig = the initial values defined in config
cookieName = the name of the cookie used in the browser
defaultCheckbox = default Cookie that is disabled.