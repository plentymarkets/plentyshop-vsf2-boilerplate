<template>
  <div
    v-if="!loading"
    id="shipping"
  >
    <div class="spacer-top">
      <SfCheckbox
        v-model="sameAsBilling"
        v-e2e="'copy-address'"
        :label="$t('Shipping.My billing and shipping address are the same')"
        name="copyShippingAddress"
        class="form__element"
      />
    </div>
    <div v-if="!sameAsBilling">
      <CheckoutAddressDetails
        ref="CheckoutAddressDetailsRef"
        :type="'shipping'"
        :addresses="shippingAddresses"
        :countries="countries"
        :heading-title="$t('Shipping.Shipping details')"
        :heading-title-level="2"
        @set-default-address="setDefaultAddress({ address: $event })"
        @delete-address="deleteAddress({ address: $event })"
        @update-address="saveAddress({ address: $event })"
      />
    </div>

    <div v-if="sameAsBilling">
      <SfHeading
        :title="$t('Shipping details')"
        :level="2"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <AddressInputForm
        ref="sameAsBillingFormRef"
        :form="sameAsBillingForm"
        :type="'shipping'"
        :countries="countries"
      />
    </div>
    <div class="spacer-top buttons">
      <SfButton
        data-e2e="continue-to-payment"
        class="form__action-button"
        @click="continueToNextStep"
      >
        {{ $t('Shipping.Continue to payment') }}
      </SfButton>
    </div>
  </div>
</template>

<script>
import { onSSR } from '@vue-storefront/core';
import { SfButton, SfCheckbox, SfHeading} from '@storefront-ui/vue';
import { ref, useRouter, computed, watch } from '@nuxtjs/composition-api';
import {
  useActiveShippingCountries,
  useUserShipping,
  useUserBilling,
  userAddressGetters
} from '@vue-storefront/plentymarkets';
import CheckoutAddressDetails from '~/components/Checkout/CheckoutAddressDetails';
import AddressInputForm from '~/components/AddressInputForm';

export default {
  name: 'Shipping',
  components: {
    SfButton,
    SfCheckbox,
    CheckoutAddressDetails,
    AddressInputForm,
    SfHeading
  },
  setup(props, {root, refs}) {
    const sameAsBilling = ref(false);
    const router = useRouter();
    const { load, loading: loadingShipping, shipping, setDefaultAddress, deleteAddress, addAddress } = useUserShipping();
    const { load: loadActiveShippingCountries, loading: loadingCountries, result: countries } = useActiveShippingCountries();
    const { load: loadBilling, loading: loadingBilling, billing } = useUserBilling();
    const shippingAddresses = computed(() => userAddressGetters.getAddresses(shipping.value));

    const sameAsBillingForm = computed(() => {
      const newAddress = userAddressGetters.getDefault(userAddressGetters.getAddresses(billing.value)) || userAddressGetters.getAddresses(billing.value)[0];

      return userAddressGetters.getAddressWithoutId(newAddress);
    });

    const loading = computed(() => {
      return loadingBilling.value || loadingCountries.value || loadingShipping.value;
    });

    onSSR(async () => {
      await load();
      await loadActiveShippingCountries();
    });

    const saveAddress = async (address) => {
      await addAddress(address);
      router.push(root.localePath({name: 'payment'}));
    };

    watch(sameAsBilling, async () => {
      if (sameAsBilling) {
        await loadBilling();
      }
    });

    const continueToNextStep = async () => {

      if (sameAsBilling.value) {
        const valid = await refs.sameAsBillingFormRef.validate();

        if (valid) {
          await saveAddress({address: sameAsBillingForm.value });
          router.push(root.localePath({name: 'payment' }));
        }
        return;
      }

      if (refs.CheckoutAddressDetailsRef.isFormOpen) {
        refs.CheckoutAddressDetailsRef.submit();
      } else {
        router.push(root.localePath({name: 'payment' }));
      }
    };

    return {
      shippingAddresses,
      sameAsBillingForm,
      continueToNextStep,
      sameAsBilling,
      setDefaultAddress,
      deleteAddress,
      saveAddress,
      router,
      countries,
      loading
    };
  }
};
</script>

<style lang="scss" scoped>
.spacer-top {
  margin-top: var(--spacer-lg);
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.title {
  --heading-padding: var(--spacer-xl) 0 var(--spacer-base);
  --heading-title-font-weight: var(--font-weight--bold);
  --heading-title-font-size: var(--h3-font-size);
}
</style>
