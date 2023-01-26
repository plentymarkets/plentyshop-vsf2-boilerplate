<template>
  <div>
    <PsfPersonalDetails
      ref="PersonalDetails"
      :value="{}"
      :buttonText="$t('Log into your account')"
      :logInInfo="$t('or fill the details below')"
      :headingTitle="$t('Personal details')"
      :headingTitleLevel="2"
      :inputsLabels="[$t('First name'),$t('Last name'),$t('Your email')]"
      :additionalDetails="$t('Enjoy your free account')"
      :characteristics='[{"description":"Faster checkout","icon":"clock","size":"24px"},{"description":"Earn credits with every purchase","icon":"credits","size":"24px"},{"description":"Full rewards program benefits","icon":"rewards","size":"24px"},{"description":"Manage your wishlist","icon":"heart","size":"24px"}]'
      transition="sf-fade"
      :createAccountCheckboxLabel="$t('I want to create an account')"
      :createAccountInputLabel="$t('Create Password')"
      @input="logInput($event)"
      @create-account='updateCheckbox($event)'
      @log-in="toggleLoginModal()"
    />
    <SfButton
        type="button"
        class="sf-button color-primary summary__back-button"
        data-e2e="continue-to-billing"
        @click="goToBilling"
        v-if='!createAccountCheckbox'
      >
      {{ $t('Order as guest') }}
    </SfButton>
    <SfButton
      type="button"
      class="sf-button color-primary summary__back-button"
      data-e2e="continue-to-billing"
      @click="goToBilling"
      v-if='createAccountCheckbox'
    >
      {{ $t('Register and Continue') }}
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
    const { isAuthenticated, register } = useUser();
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

        if (isAuthenticated) {
          router.push(root.localePath('billing'));
        }
      }
    };

    return {
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
