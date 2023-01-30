<template>
  <div id="billing" v-if="!loading">
    <CheckoutAddressDetails
      :type="'billing'"
      ref="CheckoutAddressDetailsRef"
      :addresses="billing"
      :countries="countries"
      :headingTitle="$t('Billing details')"
      :headingTitleLevel="2"
      @set-default-address="setDefaultAddress({address: $event })"
      @delete-address="deleteAddress({address: $event})"
      @update-address="addAddress({address: $event})"
    />
    <div class="spacer-top buttons">
      <SfButton
        data-e2e="continue-to-shipping"
        class="form__action-button"
        @click="continueToNextStep"
      >
        {{ $t('Billing.Continue to shipping') }}
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
import { computed, useRouter } from '@nuxtjs/composition-api';
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
  setup(props, {refs, root}) {
    const router = useRouter();
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
      if (refs.CheckoutAddressDetailsRef.isFormOpen) {
        refs.CheckoutAddressDetailsRef.submit('/checkout/shipping');
      } else {
        router.push(root.localePath({name: 'shipping'}));
      }
    };

    return {
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
