<template>
  <ValidationObserver
    key="subscribe-newsletter"
    v-slot="{ handleSubmit }"
  >
    <form
      class="form-modal"
      @submit.prevent="handleSubmit(submit)"
    >
      <p class="message mb-2">
        {{ $t('NewsletterUnubscribeForm.unsubscribeFromNewsletterContent') }}
      </p>
      <ValidationProvider
        v-slot="{ errors }"
        :name="$t('NewsletterUnubscribeForm.Email address')"
        rules="required|email"
        class="mt-4 mb-3"
        tag="div"
      >
        <SfInput
          v-model="emailAddress"
          type="email"
          :name="emailAddress"
          :label="$t('NewsletterUnubscribeForm.Email address')"
          class="modal__input"
          :valid="!errors[0]"
          :error-message="errors[0]"
        />
      </ValidationProvider>
      <SfButton
        class="sf-button--full-width form__button"
        type="submit"
        :disabled="loading"
      >
        <SfLoader
          :class="{ loader: loading }"
          :loading="loading"
        >
          <div>{{ $t('MyNewsletter.Unsubscribe') }}</div>
        </SfLoader>
      </SfButton>
    </form>
  </ValidationObserver>
</template>
<script>
import { SfInput, SfButton, SfLoader } from '@storefront-ui/vue';
import { required, email } from 'vee-validate/dist/rules';
import {ref, useContext} from '@nuxtjs/composition-api';
import { useNewsletter, useUser } from '@vue-storefront/plentymarkets';
import { useUiNotification } from '~/composables';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';

extend('email', {
  ...email
});

extend('required', {
  ...required
});

export default {
  name: 'NewsletterSubscribeForm',
  components: {
    SfInput,
    SfButton,
    SfLoader,
    ValidationProvider,
    ValidationObserver
  },
  setup(props, { emit }) {
    const { unsubscribeNewsletter, error, loading } = useNewsletter();
    const { send } = useUiNotification();
    const { app } = useContext();
    const { user } = useUser();

    const emailPlaceholder = user ? user.value?.email ?? '' : '';
    const emailAddress = ref(emailPlaceholder);

    const submit = async () => {
      const result = await unsubscribeNewsletter({
        email: emailAddress.value,
        firstName: '',
        lastName: '',
        emailFolder: 10 });

      if (result.data === true) {
        send({ message: app.i18n.t('NewsletterUnubscribeForm.Unsubscribe successful'), type: 'success' });
      } else {
        send({
          message: app.i18n.t('NewsletterUnubscribeForm.Email address not found'), type: 'danger', persist: false });
      }
      if (error.value.unsubscribe) {
        send({ message: error.value.unsubscribe, type: 'danger', persist: false });
        return;
      }
      emit('onSubscribed');
    };

    return {
      emailAddress,
      loading,
      submit
    };
  }
};
</script>

<style scoped>

</style>
