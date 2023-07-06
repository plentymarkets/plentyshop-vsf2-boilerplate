import { ref, onMounted } from '@nuxtjs/composition-api';
import { sharedRef } from '@vue-storefront/core';
import type {
  cookieGetter,
  appContext,
  CookieGroupFromNuxtConfig
} from '@vue-storefront/plentymarkets-api';

function checkIfScriptIsExternal(scriptName): boolean {
  return scriptName.startsWith('http');
}

export const useCookieBar = (
  appContext: appContext,
  defaultCookieKey: string,
  initCheckboxIndex: number,
  initialCookieJsonFromConfig: CookieGroupFromNuxtConfig
): cookieGetter => {
  const bannerIsHidden = sharedRef('bannerIsHidden', false);
  const defaultCheckboxIndex = initCheckboxIndex;
  const cookieJsonFromConfig = initialCookieJsonFromConfig;
  const appCookies = appContext;
  const cookieJson = ref(
    initialCookieJsonFromConfig.groups.map((group) => ({
      name: group.name,
      accepted: false,
      showMore: false,
      description: group.description,
      cookies: group.cookies.map((cookie) => ({
        ...cookie,
        accepted: false,
        name: cookie.name
      }))
    }))
  );
  const existingCookieInMemory = appContext.get(defaultCookieKey);

  function loadThirdPartyScripts(): void {
    if (!process.server) {
      cookieJson.value.forEach((cookieGroup, groupIndex) => {
        cookieGroup.cookies.forEach((cookie, cookieIndex) => {
          if (cookie.accepted) {
            const scripts =
              cookieJsonFromConfig.groups[groupIndex].cookies[cookieIndex]
                .script;

            if (scripts && scripts.length) {
              scripts.forEach((script) => {
                try {
                  if (checkIfScriptIsExternal(script)) {
                    fetch(script, {
                      method: 'GET',
                      mode: 'no-cors',
                      credentials: 'same-origin'
                    })
                      .then((response) => response.text())
                      .then((text) => (0, eval)(text));
                  } else {
                    (0, eval)(script);
                  }
                } catch (error) {
                  // @TODO error handling
                }
              });
            }
          }
        });
      });
    }
  }
  function getMinimumLifeSpan(): number {
    // expected minimum lifetime span to be in days
    const convertToDays = (daysInString): number => {
      return parseInt(daysInString.split(' ')[0]);
    };

    let minimum = 100000;

    cookieJsonFromConfig.groups.forEach((group) => {
      group.cookies.forEach((cookie) => {
        if (minimum > convertToDays(cookie.Lifespan)) {
          minimum = convertToDays(cookie.Lifespan);
        }
      });
    });
    return minimum;
  }
  function saveCookies(key, cookieValue, cookieContextObject): void {
    const minimumOfAllMinimums = 60 * 60 * 24 * getMinimumLifeSpan();

    cookieContextObject.set(key, cookieValue, {
      path: '/',
      maxAge: minimumOfAllMinimums
    });
  }
  function convertToSaveableJson(jsonList): Array<string> {
    let toSave = [];

    toSave = jsonList.map((group) => ({
      [group.name]: group.cookies.map((cookie) => ({
        [cookie.name]: cookie.accepted
      }))
    }));
    return toSave;
  }
  function convertAndSaveCookies(
    setAllCookies: boolean,
    newStatus: boolean
  ): void {
    if (setAllCookies) {
      // accept all or reject all case (update cookieJson and checkboxes from ui)
      cookieJson.value.forEach((group, index) => {
        if (index !== defaultCheckboxIndex) {
          group.accepted = newStatus;
          group.cookies.forEach((cookie) => {
            cookie.accepted = newStatus;
          });
        }
      });
    }
    const toSave = convertToSaveableJson(cookieJson.value);

    saveCookies('consent-cookie', toSave, appCookies);
    bannerIsHidden.value = true;
    loadThirdPartyScripts();
  }
  // initiate cookieJson based from previouly saved cookies
  if (existingCookieInMemory) {
    existingCookieInMemory.forEach((group, index) => {
      const cookieGroupFromMemory = Object.values(group)[0];
      let atLeastOneIsTrue = false;

      cookieGroupFromMemory.forEach((cookie, index2) => {
        if (Object.values(cookie)[0]) {
          cookieJson.value[index].cookies[index2].accepted = true;
        }
        atLeastOneIsTrue = Object.values(cookie)[0] ? true : atLeastOneIsTrue;
      });

      cookieJson.value[index].accepted = atLeastOneIsTrue;
      bannerIsHidden.value = atLeastOneIsTrue
        ? atLeastOneIsTrue
        : bannerIsHidden.value;
    });
  }
  // Mark default checkbox group as true
  cookieJson.value[defaultCheckboxIndex].accepted = true;
  cookieJson.value[defaultCheckboxIndex].cookies =
    cookieJson.value[0].cookies.map((cookie) => ({
      ...cookie,
      accepted: true
    }));

  onMounted(() => {
    loadThirdPartyScripts();
  });

  return {
    cookieJson,
    bannerIsHidden,
    convertAndSaveCookies,
    loadThirdPartyScripts,
    defaultCheckboxIndex
  };
};
