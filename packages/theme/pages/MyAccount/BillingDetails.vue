<template>
  <PsfAddressDetails
    v-if="billing"
    :shipping-tab-title="$t('Billing details')"
    :addresses="billing"
    :countries="countries"
    data-testid="shipping-details-tabs"
    @set-default-address="setDefaultAddress({address: $event })"
    @delete-address="deleteAddress({address: $event})"
    @update:shipping="addAddress({address: $event})"
  />
</template>
<script>
import PsfAddressDetails from '~/components/MyAccount/PsfAddressDetails';
import { useUserBilling, useActiveShippingCountries } from '@vue-storefront/plentymarkets';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'BillingDetails',
  components: {
    PsfAddressDetails
  },
  setup() {
    const { billing, load, addAddress, deleteAddress, setDefaultAddress } = useUserBilling();
    const { load: loadActiveShippingCountries, result: countries } = useActiveShippingCountries();

    onSSR(async () => {
      await load();
      await loadActiveShippingCountries();
    });

    return {
      billing,
      countries,
      addAddress,
      deleteAddress,
      setDefaultAddress
    };
  }
};
</script>

<style lang='scss' scoped>
</style>
