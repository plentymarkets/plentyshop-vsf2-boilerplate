// import { sharedRef } from '@vue-storefront/core';
import { ref, Ref, computed } from '@nuxtjs/composition-api';
import { Address } from '@vue-storefront/plentymarkets-api';

export const useAddressForm = (addresses: Ref<Address[]>): any => {

  const editAddress = ref(false);
  const editedAddress = ref(-1);

  const formModel: Address = {
    firstName: '',
    lastName: '',
    streetName: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: ''
  };

  const form: Ref<Address> = ref({...formModel});

  if (addresses.value?.length <= 0) {
    editAddress.value = true;
  }

  const changeAddress = (index) => {
    const address = addresses.value[index];
    if (index > -1) {
      form.value = { ...address };
      editedAddress.value = index;
    } else {
      form.value = { ...formModel };
      editedAddress.value = index;
    }
    editAddress.value = true;
  };

  const resetForm = () => {
    form.value = {...formModel};
  };

  const closeForm = () => {
    editAddress.value = false;
  };
  const isFormOpen = computed(() => editAddress.value || addresses?.value.length <= 0);
  const inEditState = computed(() => editedAddress.value > -1);
  const inCreateState = computed(() => editedAddress.value === -1);

  return {
    editAddress,
    editedAddress,
    addresses,
    form,
    closeForm,
    resetForm,
    changeAddress,
    isFormOpen,
    inEditState,
    inCreateState
  };
};
