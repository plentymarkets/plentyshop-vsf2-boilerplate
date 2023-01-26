<template>
  <div id="shipping" v-if="!loading">
    <div class="spacer-top">
      <SfCheckbox
        v-model="sameAsShipping"
        v-e2e="'copy-address'"
        :label="$t('My billing and shipping address are the same')"
        name="copyShippingAddress"
        class="form__element"
      />
    </div>
    <div v-if="!sameAsShipping">
      <CheckoutAddressDetails
        ref="CheckoutAddressDetailsRef"
        class="spacer-top"
        :addresses="shipping"
        :countries="countries"
        :type="'shipping'"
        @set-default-address="setDefaultAddress({ address: $event })"
        @delete-address="deleteAddress({ address: $event })"
        @update-address="addAddress({ address: $event })"
      />
    </div>
    <div class="spacer-top buttons">
          <SfButton
            class="sf-button color-secondary form__back-button"
            type="button"
            @click="router.push(localePath({ name: 'billing' }))"
          >
            {{ $t('Go back') }}
          </SfButton>
          <SfButton
            data-e2e="continue-to-payment"
            class="form__action-button"
            @click="continueToNextStep"
            :disabled="shipping.length <= 0 && !sameAsShipping"
          >
            {{ $t('Continue to payment') }}
          </SfButton>
      </div>
  </div>
</template>

<script>
import { onSSR } from '@vue-storefront/core';
import { SfButton, SfCheckbox } from '@storefront-ui/vue';
import { ref, useRouter, computed } from '@nuxtjs/composition-api';
import {
  useActiveShippingCountries,
  useUserShipping
} from '@vue-storefront/plentymarkets';
import CheckoutAddressDetails from '~/components/Checkout/CheckoutAddressDetails';

export default {
  name: 'Shipping',
  components: {
    SfButton,
    SfCheckbox,
    CheckoutAddressDetails
  },
  setup() {
    const CheckoutAddressDetailsRef = ref(null);
    const sameAsShipping = ref(false);
    const router = useRouter();
    const { load, loading: loadingBilling, shipping, setDefaultAddress, deleteAddress, addAddress } = useUserShipping();
    const { load: loadActiveShippingCountries, loading: loadingCountries, result: countries } = useActiveShippingCountries();

    const loading = computed(() => {
      return loadingBilling.value && loadingCountries.value;
    });

    onSSR(async () => {
      await load();
      await loadActiveShippingCountries();
    });

    const continueToNextStep = async () => {

      if (sameAsShipping.value) {
        await addAddress({address: false});
        router.push('/checkout/payment');
      }

      if (CheckoutAddressDetailsRef.value.inCreateState) {
        CheckoutAddressDetailsRef.value.submit('/checkout/payment');
      } else {
        router.push('/checkout/payment');
      }
    };

    return {
      CheckoutAddressDetailsRef,
      continueToNextStep,
      sameAsShipping,
      setDefaultAddress,
      deleteAddress,
      addAddress,
      router,
      shipping,
      countries,
      loading
    };
  }
};
</script>

<style lang="scss" scoped>
.spacer-top {
  margin-top: var(--spacer-lg);
}
.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
