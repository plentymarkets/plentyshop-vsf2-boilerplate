<template>
  <div>
    <PsfPersonalDetails
      ref="PersonalDetails"
      :value="{}"
      :button-text="$t('Login.Log in now')"
      :log-in-info="$t('Login.or fill in the details below')"
      :heading-title="$t('Login.User data')"
      :heading-title-level="2"
      :inputs-labels="[$t('Login.First name'),$t('Login.Last name'),$t('Login.Email')]"
      :additional-details="$t('Login.Enjoy your free account')"
      transition="sf-fade"
      :create-account-checkbox-label="$t('Login.I want to create an account')"
      :create-account-input-label="$t('Login.Create password')"
      @input="logInput($event)"
      @create-account="updateCheckbox($event)"
      @log-in="toggleLoginModal()"
    />
    <SfButton
      v-if="!createAccountCheckbox"
      type="button"
      class="sf-button color-primary summary__back-button"
      data-e2e="continue-to-billing"
      @click="goToBilling"
    >
      {{ $t('Login.Order as guest') }}
    </SfButton>
    <SfButton
      v-if="createAccountCheckbox"
      type="button"
      class="sf-button color-primary summary__back-button"
      data-e2e="continue-to-billing"
      @click="goToBilling"
    >
      {{ $t('Login.Register and continue') }}
    </SfButton>
  </div>
</template>
<script>
import { useRouter, watch, ref } from '@nuxtjs/composition-api';
import { SfButton } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useUser } from '@vue-storefront/plentymarkets';
import PsfPersonalDetails from '~/components/Checkout/PsfPersonalDetails';

export default {
  name: 'Login',
  components: {
    SfButton,
    PsfPersonalDetails
  },
  setup(props, {refs, root}) {

    const { isLoginModalOpen, toggleLoginModal } = useUiState();
    const router = useRouter();
    const { isAuthenticated, isGuest, register } = useUser();
    const createAccountCheckbox = ref(false);

    let user = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    };

    watch(isAuthenticated, () => {
      if (isAuthenticated) {
        router.push(root.localePath('billing'));
      }
    });

    watch(isGuest, () => {
      if (isGuest) {
        router.push(root.localePath('billing'));
      }
    });

    const logInput = (event) => {
      user = event;
    };
    const updateCheckbox = (value) => {
      createAccountCheckbox.value = value;
    };
    const goToBilling = async () => {
      const { isValid } = await refs.PersonalDetails.validate();

      if (isValid) {
        await register({ user });

        if (isAuthenticated || isGuest) {
          router.push(root.localePath('billing'));
        }
      }
    };

    return {
      user,
      router,
      isAuthenticated,
      isLoginModalOpen,
      toggleLoginModal,
      logInput,
      goToBilling,
      createAccountCheckbox,
      updateCheckbox
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}

.customer-text {
  margin: var(--spacer-lg) 0 var(--spacer-lg) 0;
}
</style>
