<template>
  <div v-html='termsConditions'>
  </div>
</template>

<script>
import { useLegalInformation, legalGetters } from '@vue-storefront/plentymarkets';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@nuxtjs/composition-api';
export default {
  name: 'TermsAndConditions',
  setup() {
    const { result, load } = useLegalInformation('TermsConditions');

    const termsConditions = computed(() => {
      return legalGetters.getHtml(result.value);
    });

    onSSR(async () => {
      await load('TermsConditions');
    });

    return { termsConditions };
  }
};
</script>

<style scoped>

</style>
