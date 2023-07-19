import {useVSFContext, sharedRef} from '@vue-storefront/core';
import {computed, Ref} from '@nuxtjs/composition-api';
import {
  NewsletterParams,
  SubscribeNewsletterResponse,
  UnsubscribeNewsletterResponse
} from '@vue-storefront/plentymarkets-api';

export interface UseNewsletterResponse {
  subscribeNewsletter: (params: NewsletterParams) => Promise<SubscribeNewsletterResponse>
  unsubscribeNewsletter: (params: NewsletterParams) => Promise<UnsubscribeNewsletterResponse>
  loading: Ref<boolean>
  error: Ref<object>
}

export const useNewsletter = () : UseNewsletterResponse => {
  const context = useVSFContext();

  const loading = sharedRef(false, 'useNewsletter-loading');

  const error = sharedRef({
    subscribe: null,
    unsubscribe: null
  }, 'useNewsletter-error');

  const subscribeNewsletter = async (params: NewsletterParams): Promise<SubscribeNewsletterResponse> => {
    try {
      loading.value = true;
      const data = await context.$plentymarkets.api.subscribeNewsletter({
        email: params.email,
        firstName: params.firstName,
        lastName: params.lastName,
        emailFolder: params.emailFolder
      });
      error.value.subscribe = null;

      return data;
    } catch (err) {
      error.value.subscribe = err.message;
    } finally {
      loading.value = false;
    }
  };

  const unsubscribeNewsletter = async (params: NewsletterParams): Promise<UnsubscribeNewsletterResponse> => {
    try {
      loading.value = true;

      const data = await context.$plentymarkets.api.unsubscribeNewsletter({
        email: params.email,
        firstName: '',
        lastName: '',
        emailFolder: params.emailFolder
      });

      error.value.unsubscribe = null;
      return data;
    } catch (err) {
      error.value.unsubscribe = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    subscribeNewsletter,
    unsubscribeNewsletter,
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
