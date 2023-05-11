<template>
    <div id="checkout">
        <div class="checkout">
            <div>
                <p class="forgot-password">{{ $t('LoginModal.Forgot password') }} </p>
                <p>Enter new password for {{ email }}</p>
                <SfInput v-model="form.hash" name="hash" label="hash" class="form__element" />
                <SfInput v-model="form.contactId" name="contactId" label="contactId" class="form__element" />
                <SfInput v-model="form.password" name="password" :label="$t('LoginModal.Enter new password')" class="form__element" />
                <SfInput v-model="form.password2" name="password" :label="$t('LoginModal.Confirm new password')" class="form__element" />
                <SfButton @click="resetPassword()">
                    {{ $t('LoginModal.Save new password') }}
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
} from '@nuxtjs/composition-api';
import { useForgotPassword } from '@vue-storefront/plentymarkets';
import { ref } from '@nuxtjs/composition-api';
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
        const route = useRoute();
        const router = useRouter();
        const {
            setNewPassword,
        } = useForgotPassword();
        console.log(route.value.params.contactId)
        const form = ref({
            hash: route.value.params.hash,
            contactId: route.value.params.contactId,
            password: '',
            password2: ''
        })
        const SCREEN_REGISTER = 'register';
        const resetPassword = () => {
            setNewPassword(form.value.hash, form.value.password, form.value.password2, form.value.contactId)
            alert('Password was updated')
            router.push('/')
        }
        const email = 'oldemail@gmail.com'

        return { form, resetPassword,email, route, router  }
    }
}
</script>
<style>
.forgot-password {
  color: var(--_c-blue-primary);
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight--semibold);
  font-family: var(--font-family--secondary);
}
</style>