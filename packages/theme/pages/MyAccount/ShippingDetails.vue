<template>
  <MyAccountAddressDetails
    v-if="!loading"
    :tab-title="$t('ShippingDetails.Shipping details')"
    :addresses="shipping"
    :countries="countries"
    :type="'shipping'"
    @set-default-address="setDefaultAddress({ address: $event })"
    @delete-address="deleteAddress({ address: $event })"
    @update-address="addAddress({ address: $event })"
  />
</template>
<script>
import MyAccountAddressDetails from '~/components/MyAccount/MyAccountAddressDetails';
import {
  useUserShipping,
  useActiveShippingCountries
} from '@vue-storefront/plentymarkets';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'ShippingDetails',
  components: {
    MyAccountAddressDetails
  },
  setup() {
    const { shipping, loading, load, addAddress, deleteAddress, setDefaultAddress } = useUserShipping();
    const { load: loadActiveShippingCountries, result: countries } = useActiveShippingCountries();

    onSSR(async () => {
      await load();
      await loadActiveShippingCountries();
    });

    return {
      shipping,
      countries,
      loading,
      addAddress,
      deleteAddress,
      setDefaultAddress
    };
  }
};
</script>

<style lang="scss" scoped></style>
