<template>
  <div class="sf-personal-details">
    <slot
      name="heading"
      v-bind="{ headingTitleLevel }"
    >
      <SfHeading
        :title="$t('PsfPersonalDetails.User data')"
        :level="headingTitleLevel"
        class="sf-heading--left sf-heading--no-underline title"
      />
    </slot>
    <div class="form">
      <slot
        name="form"
      >
        <ValidationObserver ref="validationObserver">
          <form
            class="form-width"
            @submit.prevent
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|email"
              :name="$t('PsfPersonalDetails.Email')"
              slim
            >
              <SfInput
                v-model="personalDetails.email"
                v-e2e="'register-mail-input'"
                :label="$t('PsfPersonalDetails.Email')"
                name="registerMail"
                class="form__element"
                required
                :valid="!errors[0]"
                :error-message="errors[0]"
                @input="updateField('email', $event)"
              />
            </ValidationProvider>
            <transition :name="transition">
              <ValidationProvider
                v-if="createAccount"
                v-slot="{ errors }"
                rules="required|min:8"
                :name="$t('PsfPersonalDetails.Password')"
                slim
              >
                <SfInput
                  v-model="personalDetails.password"
                  :has-show-password="true"
                  name="registerPassword"
                  type="password"
                  :label="$t('PsfPersonalDetails.Password')"
                  class="form__element"
                  required
                  data-e2e="create-password-input"
                  :valid="!errors[0]"
                  :error-message="errors[0]"
                  @input="updateField('password', $event)"
                />
              </ValidationProvider>
            </transition>
            <slot
              name="create-account"
              v-bind="{
                transition,
              }"
            >
              <SfCheckbox
                v-model="createAccount"
                name="createAccount"
                :label="$t('PsfPersonalDetails.I want to create an account')"
                class="form__checkbox"
                data-e2e="create-account-checkbox"
                @change="$emit('create-account', createAccount)"
              />
            </slot>
            <div class="signin">
              <a
                data-testid="login-button"
                @click="toggleLoginModal()"
              >
                {{ $t('PsfPersonalDetails.Already have an account?') }}
                <span class="sf-link text-primary">
                  {{ $t('PsfPersonalDetails.Log in now') }}
                </span>
              </a>
            </div>
          </form>
        </ValidationObserver>
      </slot>
    </div>
  </div>
</template>
<script>
import {
  SfInput,
  SfCheckbox,
  SfHeading
} from '@storefront-ui/vue';
import { ref, watch} from '@nuxtjs/composition-api';
import { useUiState } from '~/composables';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min } from 'vee-validate/dist/rules';

export default {
  name: 'SfPersonalDetails',
  components: {
    SfInput,
    SfCheckbox,
    SfHeading,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    headingTitleLevel: {
      type: Number,
      default: 2
    },
    transition: {
      type: String,
      default: 'sf-fade'
    }
  },
  setup(props, context) {
    extend('required', {
      ...required
    });
    extend('min', {
      ...min
    });
    const { toggleLoginModal } = useUiState();

    const personalDetails = ref({
      email: '',
      password: ''
    });

    const createAccount = ref(false);

    const validate = async () => {
      return context.refs.validationObserver.validateWithInfo();
    };
    const updateField = () => {
      context.emit('input', personalDetails.value);
    };

    watch(
      createAccount,
      value => {
        if (!value) {
          personalDetails.value.password = '';
          updateField();
        }
      }
    );

    return {
      toggleLoginModal,
      personalDetails,
      createAccount,
      validate,
      updateField
    };
  }
};
</script>
<style lang="scss" scoped>
  @import "~@storefront-ui/shared/styles/components/templates/SfPersonalDetails.scss";
  .signin {
    margin-bottom: var(--spacer-lg);
    .sf-link{
      cursor: pointer;
    }
  }
  @include for-desktop {
    .form-width {
      // width comes from /shared/styles/components/templates/SfPersonalDetails.scss
      width: 37.5rem;
    }
  }
</style>
