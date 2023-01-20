<template>
  <div class="sf-shipping-details">
    <transition :name="transition">
      <div v-if="editAddress || addressList.length <= 0">
        <AddressInputForm
          ref="addressForm"
          :form="form"
          :type="type"
          :countries="countries"
        ></AddressInputForm>
        <div class="buttons">
          <SfButton
            type="submit"
            @click.prevent="submit()"
            class="action-button"
            data-e2e="update-address-button"
          >
            <template v-if="createOrUpdateLabel">{{
              $t('Update the address')
            }}</template>
            <template v-if="!createOrUpdateLabel">{{
              $t('Create address')
            }}</template>
          </SfButton>
          <SfButton
            v-if="(addressList.length > 0)"
            type="button"
            class="action-button color-secondary cancel-button"
            data-e2e="close-address-button"
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
                            :key="address.id"
                            :address="address"
                            :countries="countries"
                            @set-default-address="setDefaultAddress(address)"
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
import { SfButton } from '@storefront-ui/vue';
import { toRef } from '@nuxtjs/composition-api';
import { useAddressForm } from '@vue-storefront/plentymarkets';
import AddressInputForm from '~/components/AddressInputForm';
import AddressCard from '~/components/AddressCard';

export default {
  name: 'CheckoutAddressDetails',
  components: {
    SfButton,
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
    transition: {
      type: String,
      default: 'sf-fade'
    },
    type: {
      type: String,
      default: () => 'shipping'
    }
  },

  setup(props, { emit, refs }) {
    const {
      form,
      addresses: addressList,
      editAddress,
      editedAddress,
      changeAddress,
      resetForm,
      closeForm,
      createOrUpdateLabel
    } = useAddressForm(toRef(props, 'addresses'));

    const setDefaultAddress = (address) => {
      emit('set-default-address', address);
    };

    const submit = async () => {
      const addressForm = await refs.addressForm.validate();

      if (addressForm) {
        form.value = addressForm.value;
        closeForm();
        emit('update-address', { ...form.value });
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
      closeForm,
      createOrUpdateLabel
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
</style>
