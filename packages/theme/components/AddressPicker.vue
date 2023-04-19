<template>
  <SfAddressPicker
    class="address-list"
    v-bind="{addresses, countries}"
    :selected="defaultAddressId"
    @change="setDefaultAddress($event)"
  >
    <SfAddress
      v-for="(address, key) in addresses"
      :key="userAddressGetters.getId(address)"
      :name="userAddressGetters.getId(address)"
    >
      <span>{{ userAddressGetters.getFirstName(address) }} {{ userAddressGetters.getLastName(address) }}</span>
      <span>{{ userAddressGetters.getStreetName(address) }} {{ userAddressGetters.getApartmentNumber(address) }}</span>
      <span>{{ userAddressGetters.getPostCode(address) }}</span>
      <span>{{ userAddressGetters.getCity(address) }}</span>
      <span>{{ getStateName(address) }} {{ getCountryName(address) }}</span>
      <span>{{ userAddressGetters.getPhone(address) }}</span>
      <a
        class="sf-link text-primary"
        @click="changeAddress(key)"
      >{{ $t('AddressPicker.Change') }}</a> <b>|</b>
      <a
        class="sf-link text-primary"
        @click="deleteAddress(address)"
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
import { countryGetters, userAddressGetters } from '@vue-storefront/plentymarkets';
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

    const getCountryName = (address) => {
      const country = countryGetters.getCountryById(props.countries, userAddressGetters.getCountryId(address));

      return countryGetters.getCountryName(country);
    };

    const getStateName = (address) => {
      const countryId = userAddressGetters.getCountryId(address);
      const country = countryGetters.getCountryById(props.countries, countryId);
      const stateId = userAddressGetters.getStateId(address);
      const state = countryGetters.getStateById(country, stateId);

      return countryGetters.getStateName(state) ? `${countryGetters.getStateName(state)}, ` : '';
    };

    const deleteAddress = (address) => {
      emit('delete-address', address);
    };

    const changeAddress = (address) => {
      emit('change-address', address);
    };

    const setDefaultAddress = (addressId) => {
      emit('set-default-address', addressId);
    };

    return {
      deleteAddress,
      changeAddress,
      setDefaultAddress,
      getCountryName,
      getStateName,
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
