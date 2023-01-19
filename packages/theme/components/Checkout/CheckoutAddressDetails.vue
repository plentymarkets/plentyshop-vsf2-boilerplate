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
            v-if="inEditState"
            type="submit"
            @click.prevent="submit()"
            class="action-button"
            data-e2e="update-address-button"
          >
            <template v-if="inEditState">{{
              $t('Update the address')
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
import { toRef, useRouter, computed } from '@nuxtjs/composition-api';
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
      closeForm
    } = useAddressForm(toRef(props, 'addresses'));

    const router = useRouter();
    const setDefaultAddress = (address) => {
      emit('set-default-address', address);
    };

    const submit = async (path = '/checkout/billing') => {
      const addressForm = await refs.addressForm.validate();

      if (addressForm) {
        form.value = addressForm.value;
        closeForm();
        await emit('update-address', { ...form.value });
        router.push(path);
      }
    };

    const deleteAddress = (address) => {
      resetForm(address);
      emit('delete-address', address);
    };
    const inEditState = computed(() => editedAddress.value > -1);
    const inCreateState = computed(() => editedAddress.value === -1);

    return {
      form,
      inCreateState,
      inEditState,
      editAddress,
      addressList,
      editedAddress,
      submit,
      setDefaultAddress,
      changeAddress,
      deleteAddress,
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
</style>
