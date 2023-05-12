<template>
    <div id="checkout">
        <div class="checkout">
            <div>
                <p class="forgot-password">{{ $t('LoginModal.Forgot password') }} </p>
                <p>Enter new password for {{ email }}</p>
                <!-- <SfInput v-model="form.hash" name="hash" label="hash" class="form__element" /> -->
                <!-- <SfInput v-model="form.contactId" name="contactId" label="contactId" class="form__element" /> -->
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
            send({ message: app.i18n.t('Password was changed succesfully'), type: 'success' });
            router.push('/')
            toggleLoginModal()
        }
       
        let email = ref('oldmail@gmail.com')
        
        // fetch email based on contactId and hash and check if hash is valid
        onMounted(async () =>{
            email.value = await verifyHash(route.value.params.contactId, route.value.params.hash)
            if(!email) {
                router.push('/')
                 send({ message: app.i18n.t('Your hash has expired! Please try again'), type: 'danger' });
                router.push('/?loginmodal=true')
                }
                
            })
        return { form, resetPassword, email  }
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