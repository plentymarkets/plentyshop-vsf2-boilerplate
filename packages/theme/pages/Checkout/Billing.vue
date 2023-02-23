<template>
  <div
    v-if="!loading"
    id="billing"
    class="bg-blue-300"
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
    <div class="mt-lg flex justify-between">
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
  SfButton
} from '@storefront-ui/vue';
import { computed, useRouter } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useActiveShippingCountries, useUserBilling } from '@vue-storefront/plentymarkets';
import CheckoutAddressDetails from '~/components/Checkout/CheckoutAddressDetails';

export default {
  name: 'Billing',
  components: {
    SfButton,
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

    const saveAddress = async (address) => {
      await addAddress(address);
      router.push(root.localePath({name: 'shipping'}));
    };

    const continueToNextStep = () => {
      if (refs.CheckoutAddressDetailsRef.isFormOpen) {
        refs.CheckoutAddressDetailsRef.submit();
      } else {
        router.push(root.localePath({name: 'shipping'}));
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
