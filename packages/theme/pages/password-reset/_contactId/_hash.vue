<template>
    <div class="main">
        <div class="form md:form2">
            <p class="reset-password">{{ $t('LoginModal.Reset password') }} </p>
            <div class="my-5">
                <p>Enter new password for {{ email }}</p>
            </div>

            <SfInput v-model="form.password" name="password" :label="$t('LoginModal.Enter new password')"
                class="form__element" />
            <SfInput v-model="form.password2" name="password" :label="$t('LoginModal.Confirm new password')"
                class="form__element" />
            <SfButton class="sf-button--full-width" @click="resetPassword()">
                {{ $t('LoginModal.Save new password') }}
            </SfButton>
            <div class="mt-5 login-text">
                {{ $t('LoginModal.Remember your password') }}?
                <SfButton class="sf-button--text login" @click="toggleLoginModal()">
                    Login
                </SfButton>
            </div>
        </div>
    </div>
</template>
<script>
import {
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
    SfBar
} from '@storefront-ui/vue';
import {
    useRouter,
    useRoute,
    useContext,
    onMounted
} from '@nuxtjs/composition-api';
import { useForgotPassword } from '@vue-storefront/plentymarkets';
import { ref } from '@nuxtjs/composition-api';
import { useUiNotification, useUiState } from '~/composables';
export default {
    name: 'LoginModal',
    components: {
        SfInput,
        SfButton,
        SfCheckbox,
        SfLoader,
        SfBar
    },
    setup() {
        const { app } = useContext();
        const { send } = useUiNotification();
        const route = useRoute();
        const router = useRouter();
        const { toggleLoginModal } = useUiState();
        const {
            setNewPassword,
            verifyHash
        } = useForgotPassword();

        const form = ref({
            hash: route.value.params.hash,
            contactId: route.value.params.contactId,
            password: '',
            password2: ''
        })

        const resetPassword = () => {
            setNewPassword(form.value.hash, form.value.password, form.value.password2, form.value.contactId)
            send({ message: app.i18n.t('LoginModal.Your new password was saved'), type: 'success' });
            router.push('/')
            toggleLoginModal()
        }

        let email = ref('oldmail@gmail.com')

        // fetch email based on contactId and hash and check if hash is valid
        onMounted(async () => {
            try {
                email.value = await verifyHash(route.value.params.contactId, route.value.params.hash)
                if (!email) {
                    router.push('/')
                    send({ message: app.i18n.t('LoginModal.Your hash has expired!'), type: 'danger' });
                    toggleLoginModal()
                }
            } catch (error) {
                
            }

        })
        return { form, resetPassword, email, toggleLoginModal }
    }
}
</script>
<style lang="scss" scoped>
.reset-password {
    color: var(--_c-blue-primary);
    font-size: var(--h3-font-size);
    font-weight: var(--font-weight--semibold);
    font-family: var(--font-family--secondary);
}

.main {
    justify-content: center;
    align-items: center;
    display: flex;
}

.form {
    margin-top: var(--spacer-sm);
    width: 50%;
    @include for-mobile {
        width: 90%;
      }
    &__element {
        margin: 0 0 var(--spacer-xl) 0;
    }
}

.form2 {
    margin-top: var(--spacer-sm);
    width: 50%;

    &__element {
        margin: 0 0 var(--spacer-xl) 0;
    }
}
.login-text {
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
}
.login {
    color: var(--c-primary);
}
</style>