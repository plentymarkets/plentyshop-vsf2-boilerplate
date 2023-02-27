<template>
  <div v-html="privacyPolicy" />
</template>

<script>
import { useLegalInformation, legalGetters } from '@vue-storefront/plentymarkets';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@nuxtjs/composition-api';
export default {
  name: 'PrivacyPolicy',
  setup() {
    const { result, load } = useLegalInformation('PrivacyPolicy');

    const privacyPolicy = computed(() => {
      return legalGetters.getHtml(result.value);
    });

    onSSR(async () => {
      await load('PrivacyPolicy');
    });

    return { privacyPolicy };
  }
};
</script>

<style scoped>

</style>
