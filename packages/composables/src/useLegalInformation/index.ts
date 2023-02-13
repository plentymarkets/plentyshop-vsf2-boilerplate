import { computed, ref } from '@nuxtjs/composition-api';
import { useVSFContext } from '@vue-storefront/core';

export const useLegalInformation = (): any => {

  const context = useVSFContext();
  const result = ref();
  const loading = ref();
  const error = ref({
    search: null
  });
  const search = async (type: string) => {

    try {
      loading.value = true;
      result.value = await context.$plentymarkets.api.getLegalInformation(type);
      console.log('RESULT:', result.value);
      error.value.search = null;
    } catch (err) {
      error.value.search = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    search,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
