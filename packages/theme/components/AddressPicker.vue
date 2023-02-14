<template>
  <SfAddressPicker class="address-list" v-bind="{addresses, countries}" @change="setDefaultAddress($event)" :selected="defaultAddressId">
    <SfAddress v-for="(address, key) in addresses" :key="userAddressGetters.getId(address).toString()"  :name="userAddressGetters.getId(address).toString()">
      <span>{{ userAddressGetters.getFirstName(address) }} {{ userAddressGetters.getLastName(address) }}</span>
      <span>{{ userAddressGetters.getStreetName(address) }} {{ userAddressGetters.getApartmentNumber(address) }}</span>
      <span>{{ userAddressGetters.getPostCode(address) }}</span>
      <span>{{ userAddressGetters.getCity(address) }}</span>
      <span>{{ getStateName(address) }} {{ getCountryName(address) }}</span>
      <span>{{ userAddressGetters.getPhone(address) }}</span>
      <a class="sf-link text-primary" @click="changeAddress(key)">{{ $t('AddressPicker.Change') }}</a> <b>|</b>
      <a class="sf-link text-primary" @click="deleteAddress(address)">{{ $t('AddressPicker.Delete') }}</a>
      <b v-if="!userAddressGetters.isDefault(address)">|</b>
      <a class="sf-link text-primary" v-if="!userAddressGetters.isDefault(address)"
                                      @click="userAddressGetters.getId(address).toString()">
                                      {{ $t('AddressPicker.Make default') }}
      </a>
    </SfAddress>
  </SfAddressPicker>
</template>

<script>
import { SfButton, SfIcon, SfAddressPicker } from '@storefront-ui/vue';
import { countryGetters, userAddressGetters } from '@vue-storefront/plentymarkets';
import { ref, onUpdated } from '@nuxtjs/composition-api';

export default {
  name: 'AddressPicker',
  components: {SfButton, SfIcon, SfAddressPicker},
  props: {
    addresses: {
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
        const defaultAddress = userAddressGetters.getDefault(props.addresses);
        if (defaultAddress) {
          defaultAddressId.value = userAddressGetters.getId(defaultAddress);
        }
      }
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
      const stateId = userAddressGetters.getStateId(address);
      const countryId = userAddressGetters.getCountryId(address);
      const country = countryGetters.getCountryById(props.countries, countryId);
      const state = countryGetters.getStateById(country, stateId);
      return `${countryGetters.getStateName(state)}, `;
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
