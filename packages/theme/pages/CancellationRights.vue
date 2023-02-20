<template>
  <div v-html='cancellationRights'>

  </div>
</template>

<script>
import { useLegalInformation, legalGetters } from '@vue-storefront/plentymarkets';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@nuxtjs/composition-api';

export default {
  name: 'CancellationRights',
  setup() {
    const { result, load } = useLegalInformation('CancellationRights');

    const cancellationRights = computed(() => {
      return legalGetters.getHtml(result.value);
    });

    onSSR(async () => {
      await load('CancellationRights');
    });

    return { cancellationRights };
  }
};
</script>

<style scoped>

</style>
