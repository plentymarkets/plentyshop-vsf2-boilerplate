import { Ref } from '@nuxtjs/composition-api';
export interface cookie {
  name: string;
  accepted: boolean;
  Lifespan: string;
  script: string[];
}
export interface cookieGroup {
  name: string;
  accepted: boolean;
  showMore: boolean;
  description: string;
  cookies: cookie[];
}
export interface cookieGetter {
  cookieJson: Ref<cookieGroup[]>;
  bannerIsHidden: Ref<boolean>;
  convertAndSaveCookies: (setAllCookies: boolean, newStatus: boolean) => void;
  defaultCheckboxIndex: number;
  loadThirdPartyScripts: () => void;
}
export interface CookieGroupFromNuxtConfig {
  groups: cookieGroup[];
}

export interface cookieGroupInMem {
  groupKey: { cookieKey: boolean };
}

export interface appContext {
  get: (key: string) => cookieGroupInMem[];
}
