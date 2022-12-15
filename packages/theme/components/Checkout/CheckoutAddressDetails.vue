<template>
  <div class="sf-shipping-details">
    <transition :name="transition">
      <div v-if="editAddress || addressList.length <= 0">
        <AddressInputForm
          ref="addressForm"
          :form="form"
          :countries="countries"
        ></AddressInputForm>
        <div class="buttons">
          <SfButton
            type="submit"
            @click.prevent="submit()"
            class="action-button"
            data-testid="update-address-button"
          >
            <template v-if="editedAddress > -1">{{
              $t('Update the address')
            }}</template>
            <template v-if="editedAddress === -1">{{
              $t('Create address')
            }}</template>
          </SfButton>
          <SfButton
            v-if="(addressList.length > 0)"
            type="button"
            class="action-button color-secondary cancel-button"
            data-testid="update-address-button"
            @click="closeForm"
          >
            {{ $t('Cancel') }}</SfButton
          >
        </div>
      </div>
      <div v-else>
        <transition-group tag="div" :name="transition" class="shipping-list">
          <slot name="shipping-list">
            <AddressCard v-for="(address, key) in addressList"
                            class="shipping"
                            :class="{ primaryAaddress: address.primary === 1 }"
                            :key="address.id"
                            :address="address"
                            :countries="countries"
                            @change-address="changeAddress(key)"
                            @delete-address="deleteAddress(address)">
              </AddressCard>
          </slot>
        </transition-group>
        <SfButton
          class="action-button"
          data-testid="add-new-address"
          @click="changeAddress(-1)"
        >
          {{ $t('Add new address') }}</SfButton
        >
      </div>
    </transition>
  </div>
</template>
<script>
import { SfButton, SfIcon } from '@storefront-ui/vue';
import { toRef } from '@nuxtjs/composition-api';
import { useAddressForm } from '@vue-storefront/plentymarkets';
import AddressInputForm from '~/components/AddressInputForm';
import AddressCard from '~/components/addressCard';

export default {
  name: 'CheckoutAddressDetails',
  components: {
    SfButton,
    SfIcon,
    AddressInputForm,
    AddressCard
  },
  props: {
    addresses: {
      type: Array,
      default: () => []
    },
    countries: {
      type: Array,
      default: () => []
    },
    shippingTabTitle: {
      type: String,
      default: 'Shipping details'
    },
    transition: {
      type: String,
      default: 'sf-fade'
    }
  },

  setup(props, { emit, refs }) {
    const {
      form,
      addresses: addressList,
      getCountryName,
      editAddress,
      editedAddress,
      changeAddress,
      resetForm,
      closeForm
    } = useAddressForm(toRef(props, 'addresses'));

    const setDefaultAddress = (shipping) => {
      emit('set-default-address', shipping);
    };

    const submit = async () => {
      const addressForm = await refs.addressForm.validate();

      if (addressForm) {
        form.value = addressForm.value;
        closeForm();
        emit('update:shipping', { ...form.value });
      }
    };

    const deleteAddress = (address) => {
      resetForm(address);
      emit('delete-address', address);
    };

    return {
      form,
      editAddress,
      addressList,
      editedAddress,
      submit,
      setDefaultAddress,
      changeAddress,
      deleteAddress,
      getCountryName,
      closeForm
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/shared/styles/components/templates/SfShippingDetails.scss';
.shipping-list {
  max-height: 40vh;
  overflow-y: auto;
}
.buttons {
  display: flex;
}
.shipping {
  cursor: pointer;
}
</style>