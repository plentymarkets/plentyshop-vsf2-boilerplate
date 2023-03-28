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
          If you want to change the password to access your account, enter the
          following information:<br>
          Your current email address is
          <span class="message__label">{{ userGetters.getEmailAddress(account) }}</span>
        </p>
      </slot>
      <div class="form">
        <slot
          name="password-change-form"
        >
          <SfInput
            v-model="currentPassword"
            type="password"
            name="currentPassword"
            :label="$t('PsfMyProfile.Current password')"
            required
            class="form__element"
          />
          <SfInput
            v-model="newPassword"
            type="password"
            name="newPassword"
            :label="$t('PsfMyProfile.New password')"
            required
            class="form__element form__element--half"
          />
          <SfInput
            v-model="repeatPassword"
            type="password"
            name="repeatPassword"
            :label="$t('PsfMyProfile.Repeat password')"
            required
            class="form__element form__element--half form__element--half-even"
          />
          <SfButton
            class="form__button"
            data-testid="update-password-button"
            @click="updatePassword"
          >
            {{ $t('PsfMyProfile.Update password') }}
          </SfButton>
        </slot>
      </div>
    </SfTab>
  </SfTabs>
</template>
<script>
import { SfTabs, SfInput, SfButton } from '@storefront-ui/vue';
import { userGetters } from '@vue-storefront/plentymarkets';
export default {
  name: 'PsfMyProfile',
  components: {
    SfTabs,
    SfInput,
    SfButton
  },
  props: {
    account: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    return {
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

      // TODO: add notification for error and success
      if (this.newPassword !== this.repeatPassword) {
        console.error('Passwords dont match');
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
</style>
