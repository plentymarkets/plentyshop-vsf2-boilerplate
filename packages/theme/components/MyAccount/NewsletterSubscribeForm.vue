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
        {{ $t('NewsletterSubscribeForm.subscribeToNewsletterContent') }}
      </p>
      <ValidationProvider
        v-slot="{ errors }"
        :name="$t('NewsletterSubscribeForm.Email address')"
        rules="required|email"
        class="mt-4 mb-3"
        tag="div"
      >
        <SfInput
          v-model="emailAddress"
          type="email"
          :name="$t('NewsletterSubscribeForm.Email address')"
          :label="$t('NewsletterSubscribeForm.Email address')"
          class="modal__input"
          :valid="!errors[0]"
          :error-message="errors[0]"
        />
      </ValidationProvider>
      <!-- <div class="flex-names flex w-full gap-30">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('NewsletterSubscribeForm.First name')"
          rules="required"
          class="w-full mb-3"
          tag="div"
        >
          <SfInput
            v-model="firstName"
            type="text"
            :name="$t('NewsletterSubscribeForm.First name')"
            :label="$t('NewsletterSubscribeForm.First name')"
            class="modal__input--w-full"
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('NewsletterSubscribeForm.Last name')"
          rules="required"
          class="w-full mb-3"
          tag="div"
        >
          <SfInput
            v-model="lastName"
            type="text"
            :name="$t('NewsletterSubscribeForm.Last name')"
            :label="$t('NewsletterSubscribeForm.Last name')"
            class="modal__input--w-full"
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
      </div> -->

      <SfButton
        class="sf-button form__button mb-3"
        type="submit"
        :disabled="loading"
      >
        <SfLoader
          :class="{ loader: loading }"
          :loading="loading"
        >
          <div>{{ $t('NewsletterSubscribeForm.Subscribe') }}</div>
        </SfLoader>
      </SfButton>
      <SfCheckbox
        v-model="formConfirmation"
        name="form-confirmation"
        class="form__element checkbox"
      >
        <template #label>
          <div
            class="sf-checkbox__label"
            v-html="$t('NewsletterSubscribeForm.FormConfirmation', { 'url': '#' })"
          />
        </template>
      </SfCheckbox>
    </form>
  </ValidationObserver>
</template>
<script>
import { SfInput, SfButton, SfCheckbox, SfLoader } from '@storefront-ui/vue';
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
    SfCheckbox,
    SfLoader,
    ValidationProvider,
    ValidationObserver
  },
  setup(props, { emit }) {
    const { subscribeNewsletter, error, loading } = useNewsletter();
    const { send } = useUiNotification();
    const { app } = useContext();
    const { user } = useUser();

    const emailPlaceholder = user ? user.value?.email ?? '' : '';
    const emailAddress = ref(emailPlaceholder);
    const firstName = ref('');
    const lastName = ref('');
    const formConfirmation = ref(false);

    const submit = async () => {
      if (!formConfirmation.value) {
        send({ message: app.i18n.t('NewsletterSubscribeForm.Need to accept the privacy policy'), type: 'danger', persist: true });
        return;
      }
      await subscribeNewsletter({
        email: emailAddress.value,
        firstName: firstName.value,
        lastName: lastName.value,
        emailFolder: 10 });
      if (error.value.subscribe) {
        send({ message: error.value.subscribe, type: 'danger', persist: true });
        return;
      }

      send({ message: app.i18n.t('NewsletterSubscribeForm.Subscribe successful'), type: 'success' });
      emit('onSubscribed');
    };

    return {
      emailAddress,
      firstName,
      lastName,
      formConfirmation,
      loading,
      submit
    };
  }
};
</script>

<style lang="scss" scoped>

.sf-button{
  min-width: 300px;
}

.modal {
  .flex-names{
    flex-direction: column;
    gap: 0 !important;
  }
  .sf-button{
    width: 100%;
  }
}
</style>
