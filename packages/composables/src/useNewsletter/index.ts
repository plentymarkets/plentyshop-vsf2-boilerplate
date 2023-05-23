import {useVSFContext, sharedRef} from '@vue-storefront/core';
import {computed, Ref} from '@nuxtjs/composition-api';

export interface UseNewsletterResponse {
  subscribeNewsletter: (email: string, firstName: string, lastName: string) => Promise<void>
  loading: Ref<boolean>
  error: Ref<object>
}

export const useNewsletter = () : UseNewsletterResponse => {
  const context = useVSFContext();

  const loading = sharedRef(false, 'useNewsletter-loading');

  const error = sharedRef({
    subscribe: null
  }, 'useNewsletter-error');

  const subscribeNewsletter = async (email: string, firstName: string, lastName: string): Promise<void> => {
    try {
      loading.value = true;
      await context.$plentymarkets.api.subscribeNewsletter({
        email: email,
        firstName: firstName,
        lastName: lastName,
        emailFolder: '10'
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
