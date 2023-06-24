<template>
  <SfLoader
    :class="{ loading, 'mt-10': loading }"
    :loading="loading"
  >
    <div
      v-if="!loading"
      id="billing"
    >
      <CheckoutAddressDetails
        ref="CheckoutAddressDetailsRef"
        :type="'billing'"
        :addresses="billing"
        :countries="countries"
        :heading-title="$t('Billing.Billing details')"
        :heading-title-level="2"
        @set-default-address="setDefaultAddress({address: $event })"
        @delete-address="deleteAddress({address: $event})"
        @update-address="saveAddress({address: $event})"
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
  </SfLoader>
</template>

<script>
import {
  SfButton,
  SfLoader
} from '@storefront-ui/vue';
import { computed, useRouter, useContext } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useActiveShippingCountries, useUserBilling } from '@vue-storefront/plentymarkets';
import CheckoutAddressDetails from '~/components/Checkout/CheckoutAddressDetails';

export default {
  name: 'Billing',
  components: {
    SfLoader,
    SfButton,
    CheckoutAddressDetails
  },
  setup({refs}) {
    const router = useRouter();
    const { load, loading: loadingBilling, billing, setDefaultAddress, deleteAddress, addAddress } = useUserBilling();
    const { load: loadActiveShippingCountries, loading: loadingCountry, result: countries } = useActiveShippingCountries();
    const { app } = useContext();
    const loading = computed(() => {
      return loadingBilling.value && loadingCountry.value;
    });

    onSSR(async () => {
      await load();
      await loadActiveShippingCountries();
    });

    const saveAddress = async (address) => {
      await addAddress(address);
      router.push(app.localePath({name: 'shipping'}));
    };

    const continueToNextStep = () => {
      if (refs.CheckoutAddressDetailsRef.isFormOpen) {
        refs.CheckoutAddressDetailsRef.submit();
      } else {
        router.push(app.localePath({name: 'shipping'}));
      }
    };

    return {
      continueToNextStep,
      setDefaultAddress,
      deleteAddress,
      saveAddress,
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
