import { Ref, ref } from '@nuxtjs/composition-api';
import axios from 'axios';
interface cookie {
  name: string;
  accepted: boolean;
  Lifespan: string;
  script: string;
}
interface cookieGroup {
  name: string;
  accepted: boolean;
  showMore: boolean;
  description: string;
  cookies: cookie[];
}
interface cookieGetter {
  cookieJson: Ref<cookieGroup[]>;
  bannerIsHidden: Ref<boolean>;
  convertAndSaveCookies: (setAllCookies: boolean, newStatus: boolean) => void;
  defaultCheckboxIndex: number;
  loadScriptsForCookieJson: () => void;
}
interface CookieGroupFromNuxtConfig {
  groups: cookieGroup[];
}

interface cookieGroupInMem {
  groupKey: { cookieKey: boolean };
}

interface appContext {
  get: (key: string) => cookieGroupInMem[];
}

export const useCookie = (
  appContext: appContext,
  initialCookieJsonFromConfig: CookieGroupFromNuxtConfig,
  defaultCookieKey: string,
  initCheckboxIndex: number
): cookieGetter => {
  function loadScriptsForCookieJson() {
    cookieJson.value.forEach((cookieGroup, groupIndex) => {
      cookieGroup.cookies.forEach((cookie, cookieIndex) => {
        if (cookie.accepted) {
          const scripts =
            cookieJsonFromConfig.groups[groupIndex].cookies[cookieIndex].script;
          if (scripts && scripts.length) {
            scripts.forEach((script) => {
              try {
                eval(script);
              } catch (error) {
                console.log('Error trying to load script');
              }
            });
          }
        }
      });
    });
  }
  function getMinimumLifeSpan() {
    // expected minimum lifetime span to be in days
    const convertToDays = (daysInString) => {
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
  function saveCookies(key, cookieValue, cookieContextObject) {
    const minimumOfAllMinimums = 60 * 60 * 24 * getMinimumLifeSpan();
    cookieContextObject.set(key, cookieValue, {
      path: '/',
      maxAge: minimumOfAllMinimums,
    });
  }
  function convertToSaveableJson(jsonList) {
    let toSave = [];
    toSave = jsonList.map((group) => ({
      [group.name]: group.cookies.map((cookie) => ({
        [cookie.name]: cookie.accepted,
      })),
    }));
    return toSave;
  }
  function convertAndSaveCookies(setAllCookies: boolean, newStatus: boolean) {
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
    saveCookies('plenty-shop-cookie', toSave, appCookies);
    bannerIsHidden.value = true;
  }
  const bannerIsHidden = ref(false);
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
        name: cookie.name,
      })),
    }))
  );
  const existingCookieInMemory = appContext.get(defaultCookieKey);
  // initiate cookieJson based on previouly saved cookies
  if (existingCookieInMemory) {
    existingCookieInMemory.forEach((group, index) => {
      const cookiesFromMem = Object.values(group)[0];
      let atLeastOneIsTrue = false;
      cookiesFromMem.forEach((cookie, index2) => {
        if (Object.values(cookie)[0]) {
          cookieJson.value[index].cookies[index2].accepted = true;
        }
        atLeastOneIsTrue = Object.values(cookie)[0] ? true : atLeastOneIsTrue;
      });

      cookieJson.value[index].accepted = atLeastOneIsTrue;
    });
  }
  // Mark default checkbox group as true
  cookieJson.value[defaultCheckboxIndex].accepted = true;
  cookieJson.value[defaultCheckboxIndex].cookies =
    cookieJson.value[0].cookies.map((cookie) => ({
      ...cookie,
      accepted: true,
    }));
  loadScriptsForCookieJson();
  return {
    cookieJson,
    bannerIsHidden,
    convertAndSaveCookies,
    loadScriptsForCookieJson,
    defaultCheckboxIndex,
  };
};
