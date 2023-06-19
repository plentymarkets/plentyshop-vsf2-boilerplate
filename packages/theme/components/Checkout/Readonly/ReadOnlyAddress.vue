<template>
  <div
    v-if="address"
    class="flex flex-col"
  >
    <span>{{ userAddressGetters.getFirstName(address) }}
    </span>
    <span>
      {{ userAddressGetters.getLastName(address) }}
    </span>
    <span>{{
      userAddressGetters.getStreetName(address)
    }}</span>
    <span>
      {{ userAddressGetters.getApartmentNumber(address) }}
    </span>
    <span>{{ userAddressGetters.getPostCode(address) }}</span>
    <span>{{ userAddressGetters.getCity(address) }}</span>
    <span>{{ userAddressGetters.getStateName(address, countries) }}</span>
    <span>
      {{ userAddressGetters.getCountryName(address, countries) }}
    </span>
    <span>{{ userAddressGetters.getPhone(address) }}</span>
  </div>
</template>

<script>
import { userAddressGetters } from '@vue-storefront/plentymarkets';
export default {
  name: 'ReadOnlyAddress',
  props: {
    address: {
      type: Object,
      required: true
    },
    countries: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {
      userAddressGetters
    };
  }
};
</script>

<style>

</style>
