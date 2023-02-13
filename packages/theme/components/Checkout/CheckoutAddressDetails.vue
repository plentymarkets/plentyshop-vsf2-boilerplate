<template>
  <div class="sf-shipping-details">
    <slot name="heading" v-bind="{ headingTitle, headingTitleLevel }">
      <SfHeading
        :title="headingTitle"
        :level="headingTitleLevel"
        class="sf-heading--left sf-heading--no-underline title"
      />
    </slot>
    <transition :name="transition">
      <div v-if="isFormOpen">
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
            class="action-button update-button"
            data-e2e="update-address-button"
          >
            <template v-if="inEditState">{{
              $t('CheckoutAddressDetails.Update address')
            }}</template>
          </SfButton>
          <SfButton
            v-if="(addressList.length > 0)"
            type="button"
            class="action-button color-secondary"
            data-e2e="close-address-button"
            @click="closeForm"
          >
            {{ $t('CheckoutAddressDetails.Cancel') }}</SfButton
          >
        </div>
      </div>
      <div v-else>
          <slot name="shipping-list">
            <SfAddressPicker v-bind="{addressList, countries}">
              <SfAddress v-for="(address, key) in addressList" :key="address.id.toString()"  :name="address.id.toString()">
                <span>{{ userAddressGetters.getFirstName(address) }} {{ userAddressGetters.getLastName(address) }}</span>
                <span>{{ userAddressGetters.getStreetName(address) }} {{ userAddressGetters.getApartmentNumber(address) }}</span>
                <span>{{ userAddressGetters.getPostCode(address) }}</span>
                <span>{{ userAddressGetters.getCity(address) }}</span>
                <span>{{ userAddressGetters.getCountry(countries,userAddressGetters.getCountryId(address)) }}</span>
                <span>{{ userAddressGetters.getPhone(address) }}</span>
                <a class="sf-link text-primary" @click="changeAddress(key)">Edit</a> | <a class="sf-link text-primary" @click="deleteAddress(address)">Delete</a> | <a class="sf-link text-primary" @click="setDefaultAddress(address)">Make default</a>
              </SfAddress>
            </SfAddressPicker>
            <!-- <AddressCard v-for="(address, key) in addressList"
              class="shipping"
              :key="address.id"
              :address="address"
              :countries="countries"
              @set-default-address="setDefaultAddress(address)"
              @change-address="changeAddress(key)"
              @delete-address="deleteAddress(address)">
              </AddressCard> -->
          </slot>
        <SfButton
          class="action-button"
          data-testid="add-new-address"
          @click="changeAddress(-1)"
        >
          {{ $t('CheckoutAddressDetails.Add new address') }}</SfButton
        >
      </div>
    </transition>
  </div>
</template>
<script>
import { toRef } from '@nuxtjs/composition-api';
import { useAddressForm, userAddressGetters } from '@vue-storefront/plentymarkets';
import AddressInputForm from '~/components/AddressInputForm';
import AddressCard from '~/components/AddressCard';
import {
  SfButton,
  SfHeading,
  SfAddressPicker,
  SfLink
} from '@storefront-ui/vue';

export default {
  name: 'CheckoutAddressDetails',
  components: {
    SfButton,
    AddressInputForm,
    AddressCard,
    SfHeading,
    SfAddressPicker,
    SfLink
  },
  props: {
    addresses: {
      type: Array | Object,
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
    },
    headingTitle: {
      type: String
    },
    headingTitleLevel: {
      type: Number,
      default: 2
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
      isFormOpen,
      inEditState
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
      inEditState,
      editAddress,
      isFormOpen,
      addressList,
      editedAddress,
      submit,
      setDefaultAddress,
      changeAddress,
      deleteAddress,
      closeForm,
      userAddressGetters
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
.update-button {
  margin-right: var(--spacer-sm);
}
.title {
  --heading-padding: var(--spacer-xl) 0 var(--spacer-base);
  --heading-title-font-weight: var(--font-weight--bold);
  --heading-title-font-size: var(--h3-font-size);
}
</style>
