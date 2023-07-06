<template>
  <SfAddressPicker
    class="address-list"
    v-bind="{addresses, countries}"
    :selected="defaultAddressId"
    @change="handleSetDefaultAddress($event)"
  >
    <SfAddress
      v-for="(address, key) in addresses"
      :key="userAddressGetters.getId(address)"
      class="w-80"
      :name="userAddressGetters.getId(address)"
    >
      <span>{{ userAddressGetters.getFirstName(address) }} {{ userAddressGetters.getLastName(address) }}</span>
      <span>{{ userAddressGetters.getStreetName(address) }} {{ userAddressGetters.getApartmentNumber(address) }}</span>
      <span>{{ userAddressGetters.getPostCode(address) }}</span>
      <span>{{ userAddressGetters.getCity(address) }}</span>
      <span>{{ userAddressGetters.getStateName(address, countries) }} {{ userAddressGetters.getCountryName(address, countries) }}</span>
      <span>{{ userAddressGetters.getPhone(address) }}</span>
      <a
        class="sf-link text-primary"
        @click="handleChangeAddress(key)"
      >{{ $t('AddressPicker.Change') }}</a> <b>|</b>
      <a
        :v-e2e="'deleteAddress'"
        class="sf-link text-primary"
        @click="handleDeleteAddress(address)"
      >{{ $t('AddressPicker.Delete') }}</a>
      <b v-if="!isDefaultAddress(address)">|</b>
      <a
        v-if="!isDefaultAddress(address)"
        class="sf-link text-primary"
        @click="userAddressGetters.getId(address)"
      >
        {{ $t('AddressPicker.Make default') }}
      </a>
    </SfAddress>
  </SfAddressPicker>
</template>

<script>
import { SfAddressPicker } from '@storefront-ui/vue';
import { userAddressGetters } from '@vue-storefront/plentymarkets';
import { ref, onUpdated } from '@nuxtjs/composition-api';

export default {
  name: 'AddressPicker',
  components: {SfAddressPicker},
  props: {
    addresses: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Array | Object,
      default: () => []
    },
    countries: {
      type: Array,
      default: () => []
    }
  },
  emits: ['delete-address', 'change-address', 'set-default-address'],

  setup(props, {emit}) {

    const defaultAddressId = ref('');
    const getDefaultAddress = () => {
      if (props.addresses.length > 0) {
        const defaultAddress = userAddressGetters.getDefault(props.addresses) || userAddressGetters.getAddresses(props.addresses)[0];

        if (defaultAddress) {
          defaultAddressId.value = userAddressGetters.getId(defaultAddress);
        }
      }
    };

    const isDefaultAddress = (address) => {
      return userAddressGetters.isDefault(address) || props.addresses.length === 1;
    };

    getDefaultAddress();
    onUpdated(() => {
      getDefaultAddress();
    });

    const handleDeleteAddress = (address) => {
      emit('delete-address', address);
    };

    const handleChangeAddress = (address) => {
      emit('change-address', address);
    };

    const handleSetDefaultAddress = (addressId) => {
      emit('set-default-address', addressId);
    };

    return {
      handleDeleteAddress,
      handleChangeAddress,
      handleSetDefaultAddress,
      isDefaultAddress,
      userAddressGetters,
      defaultAddressId
    };
  }
};
</script>

<style lang="scss" scoped>
.address-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--spacer-sm);
  width: 100%;
  margin-bottom: var(--spacer-lg);
}
</style>
