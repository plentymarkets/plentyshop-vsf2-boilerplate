<template>
  <div class="sf-shipping-details">
    <transition :name="transition">
      <SfTabs
        v-if="editAddress || addressList.length <= 0"
        key="edit-address"
        :open-tab="1"
        class="tab-orphan"
        :v-e2e="'shipping-details-tabs'"
      >
        <SfTab
          :title="
            editedAddress > -1 ? $t('MyAccountAddressDetails.Change address') : $t('MyAccountAddressDetails.Create address')
          "
        >
          <slot name="change-address-description">
            <p class="message">
              {{ changeAddressDescription }}
            </p>
          </slot>
          <AddressInputForm
            ref="addressForm"
            :form="form"
            :countries="countries"
            :type="type"
          />
          <div class="buttons">
            <SfButton
              type="submit"
              class="action-button"
              :v-e2e="'update-address-button'"
              @click.prevent="submit()"
            >
              <template v-if="inEditState">
                {{
                  $t('MyAccountAddressDetails.Update address')
                }}
              </template>
              <template v-if="inCreateState">
                {{
                  $t('MyAccountAddressDetails.Create address')
                }}
              </template>
            </SfButton>
            <SfButton
              type="button"
              class="action-button color-secondary cancel-button"
              :v-e2e="'update-address-button'"
              @click="closeForm"
            >
              {{ $t('MyAccountAddressDetails.Cancel') }}
            </SfButton>
          </div>
        </SfTab>
      </SfTabs>
      <SfTabs
        v-else
        key="address-list"
        :open-tab="1"
        class="tab-orphan"
      >
        <SfTab :title="$t('MyAccountAddressDetails.Shipping details')">
          <slot name="shipping-tab-description">
            <p class="message">
              {{ shipingTabDescription }}
            </p>
          </slot>
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
            :v-e2e="'add-new-address'"
            @click="changeAddress(-1)"
          >
            {{ $t('MyAccountAddressDetails.Add new address') }}
          </SfButton>
        </SfTab>
      </SfTabs>
    </transition>
  </div>
</template>
<script>
import { SfTabs, SfButton } from '@storefront-ui/vue';
import { useAddressForm } from '@vue-storefront/plentymarkets';
import AddressInputForm from '~/components/AddressInputForm';
import AddressPicker from '~/components/AddressPicker';
import { toRef } from '@nuxtjs/composition-api';

export default {
  name: 'MyAccountAddressDetails',
  components: {
    SfTabs,
    SfButton,
    AddressInputForm,
    AddressPicker
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
    type: {
      type: String,
      default: () => 'shipping'
    },
    transition: {
      type: String,
      default: 'sf-fade'
    },
    changeAddressDescription: {
      type: String,
      default: ''
    },
    shipingTabDescription: {
      type: String,
      default: ''
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
      inEditState,
      inCreateState
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
      editAddress,
      addressList,
      editedAddress,
      submit,
      setDefaultAddress,
      changeAddress,
      deleteAddress,
      closeForm,
      inEditState,
      inCreateState
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
