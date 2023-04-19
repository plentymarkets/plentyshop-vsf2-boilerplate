import { Facet } from '@vue-storefront/plentymarkets-api';
import { Ref, useRouter } from '@nuxtjs/composition-api';
import { useVSFContext } from '@vue-storefront/core';

export interface LocaleSwitchHelper {
  routeToCategory: (facet: Ref<{data: Facet}>, language: string) => void
}

export const useLocaleSwitchHelper = (): LocaleSwitchHelper => {

  const context = useVSFContext();
  const router = useRouter();

  /** Systems can be configured to append a slash at the end of the url.
  *   This will crash the method that gets the category by slug. Thats why we remove the ending slash if there is one.
  */
  const removeTrailingSlashFromUrl = (url: string): string => {
    return url.slice(-1) === '/' ? url.slice(0, -1) : url;
  };

  const getLanguagePrefix = (language: string): string => {
    return context.app.i18n.defaultLocale !== language ? `/${language}` : '';
  };

  const routeToCategory = (facet: Ref<{data: Facet}>, language: string): void => {
    const url = removeTrailingSlashFromUrl(facet.value?.data.languageUrls[language]);

    router.push(`${getLanguagePrefix(language)}/c${url}`);
  };

  /* const routeToProduct = (product: Ref<Product>, language: string): void => {
    const url = product?.value.urls[language];
    if (url) {
      router.push(`${getLanguagePrefix(language)}/p/${url}`);
      return;
    }
    router.push(context.app.switchLocalePath(language));
  }; */

  return {
    routeToCategory
  };
};
