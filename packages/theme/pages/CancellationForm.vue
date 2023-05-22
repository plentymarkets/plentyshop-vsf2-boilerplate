<template>
  <div v-html="withdrawalForm" />
</template>

<script>
import { useLegalInformation, legalGetters } from '@vue-storefront/plentymarkets';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@nuxtjs/composition-api';
export default {
  name: 'CancellationForm',
  setup() {
    const { result, load } = useLegalInformation('WithdrawalForm');

    const withdrawalForm = computed(() => {
      return legalGetters.getHtml(result.value);
    });

    onSSR(async () => {
      await load('WithdrawalForm');
    });

    return { withdrawalForm };
  }
};
</script>

<style scoped>

</style>
