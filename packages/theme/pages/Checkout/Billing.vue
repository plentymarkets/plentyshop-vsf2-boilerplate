<template>
  <div id="billing" v-if="!loading">
    <CheckoutAddressDetails
      class="spacer-top"
      :type="'billing'"
      ref="CheckoutAddressDetailsRef"
      :addresses="billing"
      :countries="countries"
      @set-default-address="setDefaultAddress({address: $event })"
      @delete-address="deleteAddress({address: $event})"
      @update-address="addAddress({address: $event})"
    />
    <div class="spacer-top buttons">
      <SfButton
        class="sf-button color-secondary form__back-button"
        type="button"
        @click="router.push(localePath({ name: 'login' }))"
      >
        {{ $t('Go back') }}
      </SfButton>
      <SfButton
        data-e2e="continue-to-shipping"
        class="form__action-button"
        @click="continueToNextStep"
      >
        {{ $t('Continue to shipping') }}
      </SfButton>
    </div>
  </div>
</template>

<script>
import {
  SfHeading,
  SfButton,
  SfCheckbox,
  SfIcon
} from '@storefront-ui/vue';
import { computed, useRouter, ref } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useActiveShippingCountries, useUserBilling } from '@vue-storefront/plentymarkets';
import CheckoutAddressDetails from '~/components/Checkout/CheckoutAddressDetails';

export default {
  name: 'Billing',
  components: {
    SfHeading,
    SfButton,
    SfIcon,
    SfCheckbox,
    CheckoutAddressDetails
  },
  setup(props, {root}) {
    const router = useRouter();
    const CheckoutAddressDetailsRef = ref(null);
    const { load, loading: loadingBilling, billing, setDefaultAddress, deleteAddress, addAddress } = useUserBilling();
    const { load: loadActiveShippingCountries, loading: loadingCountry, result: countries } = useActiveShippingCountries();

    const loading = computed(() => {
      return loadingBilling.value && loadingCountry.value;
    });

    onSSR(async () => {
      await load();
      await loadActiveShippingCountries();
    });

    const continueToNextStep = () => {
      if (CheckoutAddressDetailsRef.value.inCreateState) {
        CheckoutAddressDetailsRef.value.submit('/checkout/shipping');
      } else {
        router.push(root.localePath({name: 'shipping'}));
      }
    };

    return {
      CheckoutAddressDetailsRef,
      continueToNextStep,
      setDefaultAddress,
      deleteAddress,
      addAddress,
      router,
      billing,
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
