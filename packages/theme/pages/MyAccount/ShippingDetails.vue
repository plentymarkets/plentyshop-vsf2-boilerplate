<template>
  <PsfAddressDetails
    v-if="!loading"
    :shipping-tab-title="$t('Shipping details')"
    :addresses="shipping"
    :countries="countries"
    data-testid="shipping-details-tabs"
    @set-default-address="setDefaultAddress({ address: $event })"
    @delete-address="deleteAddress({ address: $event })"
    @update:shipping="addAddress({ address: $event })"
  />
</template>
<script>
import PsfAddressDetails from '~/components/MyAccount/PsfAddressDetails';
import {
  useUserShipping,
  useActiveShippingCountries
} from '@vue-storefront/plentymarkets';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'ShippingDetails',
  components: {
    PsfAddressDetails
  },
  setup() {
    const { shipping, loading, load, addAddress, deleteAddress, setDefaultAddress } = useUserShipping();
    const { load: loadActiveShippingCountries, result: countries } = useActiveShippingCountries();

    onSSR(async () => {
      await load();
      await loadActiveShippingCountries();
    });

    return {
      loading,
      shipping,
      countries,
      addAddress,
      deleteAddress,
      setDefaultAddress
    };
  }
};
</script>

<style lang="scss" scoped></style>
