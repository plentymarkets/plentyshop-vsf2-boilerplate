<template>
  <ValidationObserver
    v-slot="{ handleSubmit }"
    key="log-in"
    class="w-6/12"
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
          :v-e2e="'login-modal-email'"
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
          :v-e2e="'login-modal-password'"
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
        :v-e2e="'login-modal-remember-me'"
        name="remember-me"
        :label="$t('LoginModal.Remember me')"
        class="form__element checkbox mb-10"
      />
      <div v-if="error.login">
        {{ error.login }}
      </div>
      <SfButton
        :v-e2e="'login-modal-submit'"
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
</template>

<script>
import { SfButton, SfCheckbox, SfInput, SfLoader } from '@storefront-ui/vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { reactive, ref, useContext } from '@nuxtjs/composition-api';
import { useUiNotification } from '~/composables';
import { useUser } from '@vue-storefront/plentymarkets';

export default {
  name: 'LoginForm',
  components: {
    ValidationObserver,
    SfLoader,
    ValidationProvider,
    SfInput,
    SfButton,
    SfCheckbox
  },

  setup(props, {emit}) {
    const { send } = useUiNotification();
    const form = ref({});
    const rememberMe = ref(false);
    const { login, loading, error: userError } = useUser();
    const { app } = useContext();

    const error = reactive({
      login: null,
      register: null
    });

    const resetErrorValues = () => {
      error.login = null;
      error.register = null;
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

      send({ message: app.i18n.t('LoginModal.Login successful'), type: 'success' });

      emit('submit');
    };

    const handleLogin = async () => handleForm(login)();

    return {
      error,
      handleLogin,
      loading,
      rememberMe,
      form
    };
  }
};
</script>

<style scoped>

</style>
