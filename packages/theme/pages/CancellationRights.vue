<template>
  <div v-if='cancellationRights'>
<h1>Cancellation rights</h1>
    {{ cancellationRights }}
  </div>
</template>

<script>
import { useLegalInformation, legalGetters } from '@vue-storefront/plentymarkets';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@nuxtjs/composition-api';

export default {
  name: 'CancellationRights',
  setup() {
    const {result, search} = useLegalInformation();
    onSSR(async () => {
      await search('CancellationRights');
    });
    const cancellationRights = computed(() => {
      return legalGetters.getHtml(result.value);
    });
    return { cancellationRights, legalGetters };
  }
};
</script>

<style scoped>

</style>
