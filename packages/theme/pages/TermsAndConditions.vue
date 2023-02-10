<template>
  <h1>Terms and conditions</h1>
</template>

<script>
import { useRouter } from '@nuxtjs/composition-api';

export default {
  name: 'TermsAndConditions',

  setup() {
    const router = useRouter();
    return {
      router
    };
  }
};
</script>

<style scoped>

</style>
