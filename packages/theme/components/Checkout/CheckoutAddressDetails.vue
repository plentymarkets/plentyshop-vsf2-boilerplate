<template>
  <div class="sf-shipping-details">
    <slot
      name="heading"
      v-bind="{ headingTitle, headingTitleLevel }"
    >
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
        />
        <div class="buttons">
          <SfButton
            v-if="inEditState"
            type="submit"
            class="action-button update-button"
            data-e2e="update-address-button"
            @click.prevent="submit()"
          >
            <template v-if="inEditState">
              {{
                $t('CheckoutAddressDetails.Update address')
              }}
            </template>
          </SfButton>
          <SfButton
            v-if="(userAddressGetters.getAddressesLength(addressList) > 0)"
            type="button"
            class="action-button color-secondary"
            data-e2e="close-address-button"
            @click="closeForm"
          >
            {{ $t('CheckoutAddressDetails.Cancel') }}
          </SfButton>
        </div>
      </div>
      <div v-else>
        <slot name="shipping-list">
          <AddressPicker
            :countries="countries"
            :addresses="addressList"
            @set-default-address="setDefaultAddress($event)"
            @change-address="changeAddress($event)"
            @delete-address="deleteAddress($event)"
          />
        </slot>
        <SfButton
          class="action-button"
          data-testid="add-new-address"
          @click="changeAddress(-1)"
        >
          {{ $t('CheckoutAddressDetails.Add new address') }}
        </SfButton>
      </div>
    </transition>
  </div>
</template>
<script>
import { toRef } from '@nuxtjs/composition-api';
import { useAddressForm, userAddressGetters } from '@vue-storefront/plentymarkets';
import AddressInputForm from '~/components/AddressInputForm';
import AddressPicker from '~/components/AddressPicker';
import {
  SfButton,
  SfHeading
} from '@storefront-ui/vue';

export default {
  name: 'CheckoutAddressDetails',
  components: {
    SfButton,
    AddressInputForm,
    AddressPicker,
    SfHeading
  },
  props: {
    addresses: {
      // eslint-disable-next-line vue/require-prop-type-constructor
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
      type: String,
      default: ''
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

    const setDefaultAddress = (addressId) => {
      const address = addressList.value.find((_address) => Number(_address.id) === Number(addressId));
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
