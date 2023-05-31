import {useVSFContext, sharedRef} from '@vue-storefront/core';
import {computed, Ref} from '@nuxtjs/composition-api';
import {NewsletterParams} from '@vue-storefront/plentymarkets-api';

export interface UseNewsletterResponse {
  subscribeNewsletter: (params: NewsletterParams) => Promise<void>
  loading: Ref<boolean>
  error: Ref<object>
}

export const useNewsletter = () : UseNewsletterResponse => {
  const context = useVSFContext();

  const loading = sharedRef(false, 'useNewsletter-loading');

  const error = sharedRef({
    subscribe: null
  }, 'useNewsletter-error');

  const subscribeNewsletter = async (params: NewsletterParams): Promise<void> => {
    try {
      loading.value = true;
      await context.$plentymarkets.api.subscribeNewsletter({
        email: params.email,
        firstName: params.firstName,
        lastName: params.lastName,
        emailFolder: params.emailFolder
      });
      error.value.subscribe = null;
    } catch (err) {
      error.value.subscribe = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    subscribeNewsletter,
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
