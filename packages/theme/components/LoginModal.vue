<template>
  <SfModal
    v-e2e="'login-modal'"
    :visible="isLoginModalOpen"
    class="modal"
    @close="closeModal"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar smartphone-only"
        :close="true"
        :title="$t(barTitle)"
        @click:close="closeModal"
      />
    </template>
    <transition
      name="sf-fade"
      mode="out-in"
    >
      <div v-if="currentScreen === SCREEN_LOGIN">
        <ValidationObserver
          v-slot="{ handleSubmit }"
          key="log-in"
        >
          <form
            class="form"
            @submit.prevent="handleSubmit(handleLogin)"
          >
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('LoginModal.Email')"
              rules="required|email"
            >
              <SfInput
                v-model="form.username"
                v-e2e="'login-modal-email'"
                :valid="!errors[0]"
                :error-message="errors[0]"
                name="email"
                :label="$t('LoginModal.Email')"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('LoginModal.Password')"
              rules="required"
            >
              <SfInput
                v-model="form.password"
                v-e2e="'login-modal-password'"
                :valid="!errors[0]"
                :error-message="errors[0]"
                name="password"
                :label="$t('LoginModal.Password')"
                type="password"
                class="form__element"
              />
            </ValidationProvider>
            <SfCheckbox
              v-model="rememberMe"
              v-e2e="'login-modal-remember-me'"
              name="remember-me"
              :label="$t('LoginModal.Remember me')"
              class="form__element checkbox"
            />
            <div v-if="error.login">
              {{ error.login }}
            </div>
            <SfButton
              v-e2e="'login-modal-submit'"
              type="submit"
              class="sf-button--full-width form__button min-h-12"
              :disabled="loading"
            >
              <SfLoader
                :class="{ loader: loading }"
                :loading="loading"
              >
                <div>{{ $t('LoginModal.Login') }}</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
        <div class="action">
          <SfButton
            class="sf-button--text"
            @click="setCurrentScreen(SCREEN_FORGOTTEN)"
          >
            {{ $t('LoginModal.Forgotten your password?') }}
          </SfButton>
        </div>
        <div class="bottom">
          <p class="bottom__paragraph">
            {{ $t("LoginModal.Do not have an account yet?") }}
          </p>
          <SfButton
            data-e2e="open-registration-form"
            class="sf-button--text"
            @click="setCurrentScreen(SCREEN_REGISTER)"
          >
            {{ $t('LoginModal.Register today') }}
          </SfButton>
        </div>
      </div>
      <div v-else-if="currentScreen === SCREEN_FORGOTTEN">
        <p>{{ $t('LoginModal.Forgot password') }}</p>
        <ValidationObserver
          v-slot="{ handleSubmit }"
          key="log-in"
        >
          <form
            class="form"
            @submit.prevent="handleSubmit(handleForgotten)"
          >
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('LoginModal.Email')"
              rules="required|email"
            >
              <SfInput
                v-model="form.username"
                v-e2e="'forgot-modal-email'"
                :valid="!errors[0]"
                :error-message="errors[0]"
                name="email"
                :label="$t('LoginModal.Email')"
                class="form__element"
              />
            </ValidationProvider>
            <div v-if="forgotPasswordError.request">
              {{ forgotPasswordError.request.message }}
            </div>
            <SfButton
              v-e2e="'forgot-modal-submit'"
              type="submit"
              class="sf-button--full-width form__button min-h-12"
              :disabled="forgotPasswordLoading"
            >
              <SfLoader
                :class="{ loader: forgotPasswordLoading }"
                :loading="forgotPasswordLoading"
              >
                <div>{{ $t('LoginModal.Reset Password') }}</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
      </div>
      <div
        v-else-if="currentScreen === SCREEN_THANK_YOU"
        class="thank-you"
      >
        <i18n
          tag="p"
          class="thank-you__paragraph"
          path="forgotPasswordConfirmation"
        >
          <span class="thank-you__paragraph--bold">{{ userEmail }}</span>
        </i18n>
        <p class="thank-you__paragraph">
          {{ $t('LoginModal.Thank you inbox') }}
        </p>
      </div>
      <div
        v-else
        class="form"
      >
        <ValidationObserver
          v-slot="{ handleSubmit }"
          key="sign-up"
        >
          <form
            class="form"
            autocomplete="off"
            @submit.prevent="handleSubmit(handleRegister)"
          >
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('LoginModal.Email')"
              rules="required|email"
            >
              <SfInput
                v-model="form.email"
                v-e2e="'login-modal-email'"
                :valid="!errors[0]"
                :error-message="errors[0]"
                name="email"
                :label="$t('LoginModal.Email')"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('LoginModal.Password')"
              rules="required"
            >
              <SfInput
                v-model="form.password"
                v-e2e="'login-modal-password'"
                :valid="!errors[0]"
                :error-message="errors[0]"
                name="password"
                :label="$t('LoginModal.Password')"
                type="password"
                class="form__element"
              />
            </ValidationProvider>
            <div v-if="error.register">
              {{ error.register }}
            </div>
            <SfButton
              type="submit"
              class="sf-button--full-width form__button min-h-12"
              :disabled="loading"
            >
              <SfLoader
                :class="{ loader: loading }"
                :loading="loading"
              >
                <div>{{ $t('LoginModal.Create an account') }}</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
        <div class="bottom top">
          <p class="bottom__paragraph">
            {{ $t("LoginModal.Already have an account?") }}
          </p>
          <SfButton
            data-e2e="open-login-form"
            class="sf-button--text"
            @click="setCurrentScreen(SCREEN_LOGIN)"
          >
            {{ $t('LoginModal.Log in now') }}
          </SfButton>
        </div>
      </div>
    </transition>
  </SfModal>
</template>
<script>
import {
  ref,
  watch,
  reactive,
  computed,
  useContext
} from '@nuxtjs/composition-api';
import {
  SfModal,
  SfInput,
  SfButton,
  SfCheckbox,
  SfLoader,
  SfBar
} from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { useUser, useForgotPassword } from '@vue-storefront/plentymarkets';
import { useUiState, useUiNotification } from '~/composables';

extend('email', {
  ...email
});

extend('required', {
  ...required
});

export default {
  name: 'LoginModal',
  components: {
    SfModal,
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
    ValidationProvider,
    ValidationObserver,
    SfBar
  },
  setup() {
    const SCREEN_LOGIN = 'login';
    const SCREEN_REGISTER = 'register';
    const SCREEN_THANK_YOU = 'thankYouAfterForgotten';
    const SCREEN_FORGOTTEN = 'forgottenPassword';

    const { isLoginModalOpen, toggleLoginModal } = useUiState();
    const form = ref({});
    const userEmail = ref('');
    const rememberMe = ref(false);
    const { register, login, loading, error: userError } = useUser();
    const {
      request,
      error: forgotPasswordError,
      loading: forgotPasswordLoading
    } = useForgotPassword();
    const { send } = useUiNotification();
    const { app } = useContext();

    const currentScreen = ref(SCREEN_LOGIN);

    const error = reactive({
      login: null,
      register: null
    });

    const resetErrorValues = () => {
      error.login = null;
      error.register = null;
    };

    const barTitle = computed(() => {
      switch (currentScreen.value) {
        case SCREEN_LOGIN:
          return 'LoginModal.Sign in';
        case SCREEN_REGISTER:
          return 'LoginModal.Register';
        default:
          return 'LoginModal.Reset password';
      }
    });

    watch(isLoginModalOpen, () => {
      if (isLoginModalOpen) {
        form.value = {};
        resetErrorValues();
      }
    });

    const setCurrentScreen = (screenName) => {
      resetErrorValues();
      currentScreen.value = screenName;
    };

    const handleForm = (fn) => async () => {
      resetErrorValues();
      await fn({ user: form.value });

      error.login = userError.value.login;
      error.register = userError.value.register;

      if (error.login) {
        send({
          message: app.i18n.t('An error occurred while logging in'),
          type: 'danger',
          persist: true
        });
        send({ message: error.login, type: 'danger', persist: true });
        return;
      }

      if (error.register) {
        send({
          message: app.i18n.t('An error occurred during the registration'),
          type: 'danger',
          persist: true
        });
        send({ message: error.register, type: 'danger', persist: true });
        return;
      }

      send({ message: app.i18n.t('LoginModal.Login successful'), type: 'success' });
      toggleLoginModal();
    };

    const closeModal = () => {
      resetErrorValues();
      toggleLoginModal();
    };

    const handleRegister = async () => handleForm(register)();

    const handleLogin = async () => handleForm(login)();

    const handleForgotten = async () => {
      userEmail.value = form.value.username;
      await request({ email: userEmail.value });

      if (!forgotPasswordError.value.request) {
        setCurrentScreen(SCREEN_THANK_YOU);
      }
    };

    return {
      form,
      error,
      userError,
      loading,
      rememberMe,
      isLoginModalOpen,
      toggleLoginModal,
      handleLogin,
      handleRegister,
      forgotPasswordError,
      forgotPasswordLoading,
      handleForgotten,
      closeModal,
      userEmail,
      barTitle,
      currentScreen,
      setCurrentScreen,
      SCREEN_LOGIN,
      SCREEN_REGISTER,
      SCREEN_THANK_YOU,
      SCREEN_FORGOTTEN
    };
  }
};
</script>

<style lang="scss" scoped>
.customer-text {
  margin: var(--spacer-sm) 0 var(--spacer-sm) 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  --modal-index: 30;
  --overlay-z-index: 30;
}
.form {
  margin-top: var(--spacer-sm);
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
  }
}
.action {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6
  var(--font-family--secondary);
  & > * {
    margin: 0 0 0 var(--spacer-xs);
  }
}
.action {
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
}
.checkbox {
  margin-bottom: var(--spacer-2xl);
}
.bottom {
  text-align: center;
  margin-bottom: var(--spacer-lg);
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight--semibold);
  font-family: var(--font-family--secondary);
  &__paragraph {
    color: var(--c-primary);
    margin: 0 0 var(--spacer-base) 0;
    @include for-desktop {
      margin: 0;
    }
  }
}
.top {
  margin-top: var(--spacer-lg);
}
.thank-you {
  &__paragraph {
    &--bold {
      font-weight: var(--font-weight--semibold);
    }
  }
}
.signin {
  margin-bottom: 20px;
  cursor: pointer;
}
.signin-link {
  text-decoration: none;
}
.signin-now {
  margin-bottom: 10px;
  color: green;
}
</style>
