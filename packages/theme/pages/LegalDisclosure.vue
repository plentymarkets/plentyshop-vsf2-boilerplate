<template>
  <div v-html="legalDisclosure" />
</template>

<script>
import { useLegalInformation, legalGetters } from '@vue-storefront/plentymarkets';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@nuxtjs/composition-api';
export default {
  name: 'LegalDisclosure',
  setup() {
    const { result, load } = useLegalInformation('LegalDisclosure');

    const legalDisclosure = computed(() => {
      return legalGetters.getHtml(result.value);
    });

    onSSR(async () => {
      await load('LegalDisclosure');
    });

    return { legalDisclosure };
  }
};
</script>

<style scoped>

</style>
