<template>
  <div class="shipping" @click="setDefaultAddress(address)">
    <div class="shipping__content">
      <slot name="shipping-details">
        <p class="shipping__address">
          <span class="shipping__client-name"
            >{{ userAddressGetters.getFirstName(address) }} {{ userAddressGetters.getLastName(address) }}</span
          ><br />
          {{ userAddressGetters.getStreetName(address) }} {{ userAddressGetters.getStreetNumber(address) }}<br />{{
            userAddressGetters.getPostCode(address)
          }}
          {{ userAddressGetters.getCity(address) }},<br />{{ userAddressGetters.getCountry(countries, address.country) }}
        </p>
        <p class="shipping__address">
          {{ userAddressGetters.getPhone(address) }}
        </p>
        <template v-if="userAddressGetters.isDefault(address)"
          ><span class="color-secondary sf-badge">{{
            $t('AddressCard.Selected address')
          }}</span></template
        >
      </slot>
    </div>
    <div class="shipping__actions">
      <SfIcon
        icon="cross"
        color="gray"
        size="14px"
        role="button"
        class="smartphone-only"
        @click="deleteAddress(address)"
      />
      <SfButton
        data-testid="change-address"
        @click="changeAddress(address)"
      >
        {{ $t('AddressCard.Change') }}
      </SfButton>
      <SfButton
        class="shipping__button-delete desktop-only"
        data-testid="delete-address"
        @click="deleteAddress(address)"
      >
        {{ $t('AddressCard.Delete') }}
      </SfButton>
    </div>
  </div>
</template>

<script>
import { SfButton, SfIcon } from '@storefront-ui/vue';
import { userAddressGetters } from '@vue-storefront/plentymarkets';

export default {
  name: 'AddressCard',
  components: {SfButton, SfIcon},
  props: {
    address: {
      type: Object,
      default: () => {}
    },
    countries: {
      type: Array,
      default: () => []
    }
  },

  setup(props, {emit}) {

    const deleteAddress = (address) => {
      emit('delete-address', address);
    };

    const changeAddress = (address) => {
      emit('change-address', address);
    };

    const setDefaultAddress = (address) => {
      if (!address.primary) {
        emit('set-default-address', address);
      }
    };

    return {
      deleteAddress,
      changeAddress,
      setDefaultAddress,
      userAddressGetters
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/shared/styles/components/templates/SfShippingDetails.scss';
.shipping {
  cursor: pointer;
}
</style>
