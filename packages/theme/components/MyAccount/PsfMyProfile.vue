<template>
  <SfTabs
    class="sf-my-profile"
    :open-tab="1"
  >
    <SfTab :title="$t('PsfMyProfile.Personal data')">
      <slot
        name="personal-data-description"
      >
        <p class="message">
          {{ $t('PsfMyProfile.Feel free to edit any of your details below so your account is always up to date') }}
        </p>
      </slot>
      <div class="form">
        <slot name="personal-data-form">
          <SfInput
            v-model="firstName"
            name="firstName"
            :label="$t('PsfMyProfile.First name')"
            required
            disabled
            class="form__element form__element--half"
          />
          <SfInput
            v-model="lastName"
            name="lastName"
            :label="$t('PsfMyProfile.Last name')"
            required
            disabled
            class="form__element form__element--half form__element--half-even"
          />
          <SfInput
            v-model="email"
            type="email"
            name="email"
            :label="$t('PsfMyProfile.Email')"
            required
            disabled
            class="form__element"
          />
          <SfButton
            class="form__button"
            disabled
            data-testid="save-changes-button"
            @click="updatePersonal"
          >
            {{ $t('PsfMyProfile.Save changes') }}
          </SfButton>
        </slot>
      </div>
      <slot name="personal-data-notice">
        <p class="notice">
          At Brand name, we attach great importance to privacy issues and are
          committed to protecting the personal data of our users. Learn more
          about how we care and use your personal data in the
          <a href="">Privacy Policy.</a>
        </p>
      </slot>
    </SfTab>
    <SfTab :title="$t('PsfMyProfile.Change password')">
      <slot name="password-change-description">
        <p class="message">
          {{ $t('PsfMyProfile.If you want to change the password to access your account') }}<br>
          {{ $t('PsfMyProfile.Your current email is', { email: userGetters.getEmailAddress(account) }) }}
        </p>
      </slot>
      <div class="form">
        <slot
          name="password-change-form"
        >
          <ValidationObserver
            ref="validationObserver"
            v-slot="{ handleSubmit }"
            class="w-full"
          >
            <form
              class="form-width"
              @submit.prevent="handleSubmit(updatePassword)"
            >
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:1"
                :name="$t('PsfMyProfile.Current password')"
              >
                <SfInput
                  v-model="currentPassword"
                  type="password"
                  name="currentPassword"
                  :label="$t('PsfMyProfile.Current password')"
                  required
                  class="form__element"
                  :valid="!errors[0]"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
              <div class="flex-passwords flex w-full">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|min:8|regex"
                  :name="$t('PsfMyProfile.New password')"
                  class="form__element--half"
                >
                  <SfInput
                    v-model="newPassword"
                    type="password"
                    name="newPassword"
                    :label="$t('PsfMyProfile.New password')"
                    required
                    class="new-password form__element form__element--half m-0"
                    :valid="!errors[0]"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|min:8|regex"
                  :name="$t('PsfMyProfile.Repeat password')"
                  class="form__element--half form__element--half-even"
                >
                  <SfInput
                    v-model="repeatPassword"
                    type="password"
                    name="repeatPassword"
                    :label="$t('PsfMyProfile.Repeat password')"
                    required
                    class="form__element m-0"
                    :valid="!errors[0]"
                    :error-message="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <small>* {{ $t('PsfMyProfile.Password requirements') }}</small>
              <SfButton
                class="sf-button form__button mb-3 min-h-12 mt-3"
                data-testid="update-password-button"
                type="submit"
                :disabled="loading"
              >
                <SfLoader
                  :class="{ loader: loading }"
                  :loading="loading"
                >
                  <div>{{ $t('PsfMyProfile.Update password') }}</div>
                </SfLoader>
              </SfButton>
            </form>
          </ValidationObserver>
        </slot>
      </div>
    </SfTab>
  </SfTabs>
</template>
<script>
import { SfTabs, SfInput, SfButton, SfLoader } from '@storefront-ui/vue';
import { userGetters, useUser } from '@vue-storefront/plentymarkets';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import {required, min} from 'vee-validate/dist/rules';
import { useUiNotification } from '~/composables';
import {useContext} from '@nuxtjs/composition-api';

extend('min', {
  ...min
});

extend('required', {
  ...required
});

extend('regex', {
  validate(value) {
    const tester = /^(?=.*[A-Za-z])(?=.*\d)\S{8,}$/;

    return tester.test(String(value));
  }
});

export default {
  name: 'PsfMyProfile',
  components: {
    SfTabs,
    SfInput,
    SfButton,
    SfLoader,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    account: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const { app } = useContext();
    const { loading } = useUser();
    const { send } = useUiNotification();

    return {
      app,
      loading,
      send,
      userGetters
    };
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      repeatPassword: ''
    };
  },
  watch: {
    account: {
      handler(value) {
        this.firstName = value?.firstName;
        this.lastName = value?.lastName;
        this.email = value?.email;
      },
      immediate: true
    }
  },
  methods: {
    updatePersonal() {
      const personal = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
      };

      this.$emit('update:personal', personal);
    },
    updatePassword() {
      if (this.newPassword !== this.repeatPassword) {
        this.send({ message: this.app.i18n.t('PsfMyProfile.The passwords do not match'), type: 'danger' });
        return;
      }

      const password = {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        repeatPassword: this.repeatPassword
      };

      this.$emit('update:password', password);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/templates/SfMyProfile.scss";

@include for-mobile {
  .flex-passwords {
    flex-direction: column !important;
  }
  .new-password {
    margin-bottom: 0.5rem !important;
  }
}
</style>
