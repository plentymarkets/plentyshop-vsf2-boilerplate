## Cookies
    For customization of the cookiebar the developer can use the CookieBar component.
    For customization of the default values we can use the cookieConfig.js file.
    The Cookiebar component is based on the useCookie composable, which uses  Cookie-universal-nuxt Library to fetch and store cookies.

# Example:
    const { cookieJson, bannerIsHidden, convertAndSaveCookies, defaultCheckboxIndex } = useCookie(
        NuxtContext,
        nuxtCookieConfig,
        cookieName,
        defaultCheckbox
    );
# UseCookie composable must recive 4 params:
    NuxtContext
        The Nuxt context is needed for interacting with the Cookie-universal-nuxt library
        Cookie-universal-nuxt is used to set, get and remove cookies in both client and server side nuxt apps. 
        https://www.npmjs.com/package/cookie-universal-nuxt 

    NuxtCookieConfig 
        The developer can define new values in cookieConifg.js.
        The variables from cookieConfig are very readable and self-explanatory.
        (barTitle, barDescription, groups.. )

    CookieName
        The name of the cookie used in the browser, plentystore default cookie name is 'plenty-shop'

    DefaultCheckbox
        Default Cookie Group index (Universal cookies) that is disabled by default.
# Test functionality
    To test that the cookiebar works, the developer can customise the cookieConfig script field and refresh the page.
    By default, the first cookie of the "external media" has a test script
        'console.log(`Loaded cookie script example1`);',
    
    The cookie javascript can be a local or remote script that is evaluated on the client side using eval.
