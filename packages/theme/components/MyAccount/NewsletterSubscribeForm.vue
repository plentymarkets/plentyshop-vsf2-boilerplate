<template>
  <ValidationObserver
    key="subscribe-newsletter"
    v-slot="{ handleSubmit }"
  >
    <form
      class="form-modal"
      @submit.prevent="handleSubmit(submit)"
    >
      <p class="message m-b-10">
        After signing up for the newsletter, you will receive special offers and messages from us via email.
      </p>
      <ValidationProvider
        v-slot="{ errors }"
        :name="$t('NewsletterSubscribeForm.Email address')"
        rules="required|email"
        class="m-b-10"
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
      <!--
      <div class="flex-names">
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('NewsletterSubscribeForm.First name')"
          rules="required"
          class="full-width m-b-10"
          tag="div"
        >
          <SfInput
            v-model="firstName"
            type="text"
            :name="$t('NewsletterSubscribeForm.First name')"
            :label="$t('NewsletterSubscribeForm.First name')"
            class="modal__input--full-width"
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          :name="$t('NewsletterSubscribeForm.Last name')"
          rules="required"
          class="full-width m-b-10"
          tag="div"
        >
          <SfInput
            v-model="lastName"
            type="text"
            :name="$t('NewsletterSubscribeForm.Last name')"
            :label="$t('NewsletterSubscribeForm.Last name')"
            class="modal__input--full-width"
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
      </div>
      -->
      <SfButton
        class="sf-button form__button"
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
            v-html="$t('NewsletterSubscribeForm.FormConfirmation', { policy: policyTag })"
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
import { useNewsletter } from '@vue-storefront/plentymarkets';
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
    const policyTag = '<a style="text-decoration: underline;" href="#">privacy policy</a>';

    const emailAddress = ref('');
    const firstName = ref('');
    const lastName = ref('');
    const formConfirmation = ref(false);

    console.log(app.i18n.t('NewsletterSubscribeForm.FormConfirmation', { policy: 'Policy' }));

    const submit = async () => {
      if (!formConfirmation.value) {
        send({ message: 'Häkchen muss gesetzt sein', type: 'danger', persist: true });
        return;
      }
      await subscribeNewsletter(emailAddress.value, firstName.value, lastName.value);
      if (error.value.subscribe) {
        send({ message: error.value.subscribe, type: 'danger', persist: true });
        return;
      }

      send({ message: app.i18n.t('LoginModal.Login successful'), type: 'success' });
      emit('onSubscribed');
    };

    return {
      policyTag,
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
.checkbox{
  margin-top: 20px;
}

.m-b-10{
  margin-bottom: 15px;
}

.flex-names{
  display: flex;
  flex-direction: row;
  width: 100%;
  column-gap: 30px;
}

.full-width {
  width: 100%;
}

.sf-button{
  min-width: 300px;
}

.policy_link {
  text-decoration: underline !important;
  font-weight: bold;
}

.modal {
  .flex-names{
    flex-direction: column;
  }
  .sf-button{
    width: 100%;
  }
}
</style>
