<template>
  <div class="flex flex-col items-center mb-40">
    <template v-if="errorType === 'login'">
      <h3 class="mb-10">
        Login to access your order
      </h3>

      <LoginForm @submit="$emit('submit')" />
    </template>

    <template v-else-if="errorType === 'fullName' || errorType === 'postcode'">
      <form>
        <div
          v-if="errorType === 'postcode'"
        >
          <h3 class="mb-6">
            Enter your delivery address postcode to access your order
          </h3>
          <SfInput
            v-model="internalData.postcode"
            :label="$t('Postcode')"
            name="postcode"
            class="form__element"
          />
        </div>

        <div
          v-else-if="errorType === 'fullName'"
        >
          <h3 class="mb-6">
            Enter your delivery address lastname to access your order
          </h3>
          <SfInput
            v-model="internalData.fullName"
            :label="$t('Full Name')"
            name="full_name"
            class="form__element"
          />
        </div>

        <SfButton
          class="sf-button--full-width form__button"
          @click="$emit('submit', internalData)"
        >
          {{ $t('Submit') }}
        </SfButton>
      </form>
    </template>
  </div>
</template>

<script>
import { SfButton, SfInput } from '@storefront-ui/vue';
import { ref } from '@nuxtjs/composition-api';
import LoginForm from '~/components/LoginForm.vue';
import { computed } from '@nuxtjs/composition-api';

export default {
  components: { LoginForm, SfButton, SfInput },
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },

  setup(props) {
    const internalData = ref({
      postcode: '',
      fullName: ''
    });

    const errorType = computed(() => {
      return props.error?.load?.data?.authType || '';
    });

    return {
      internalData,
      errorType
    };
  }
};
</script>

<style>

</style>
