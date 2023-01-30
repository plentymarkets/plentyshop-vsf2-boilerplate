<template>
  <div id="shipping" v-if="!loading">
    <div class="spacer-top">
      <SfCheckbox
        v-model="sameAsShipping"
        v-e2e="'copy-address'"
        :label="$t('Shipping.My billing and shipping address are the same')"
        name="copyShippingAddress"
        class="form__element"
      />
    </div>
    <div v-if="!sameAsShipping">
      <CheckoutAddressDetails
        ref="CheckoutAddressDetailsRef"
        class="spacer-top"
        :type="'shipping'"
        :addresses="shippingAddresses"
        :countries="countries"
        :headingTitle="$t('Shipping details')"
        :headingTitleLevel="2"
        @set-default-address="setDefaultAddress({ address: $event })"
        @delete-address="deleteAddress({ address: $event })"
        @update-address="addAddress({ address: $event })"
      />
    </div>

    <div v-if="sameAsShipping">
      <SfHeading
        :title="$t('Shipping details')"
        :level="2"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <AddressInputForm
          ref="SameAsShippingFormRef"
          :form="sameAsShippingForm"
          :type="'shipping'"
          :countries="countries"
        ></AddressInputForm>
    </div>
    <div class="spacer-top buttons">
          <SfButton
            class="sf-button color-secondary form__back-button"
            type="button"
            @click="router.push(localePath({ name: 'billing' }))"
          >
            {{ $t('Shipping.Go back') }}
          </SfButton>
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
    const sameAsShipping = ref(false);
    const router = useRouter();
    const { load, loading: loadingShipping, shipping, setDefaultAddress, deleteAddress, addAddress } = useUserShipping();
    const { load: loadActiveShippingCountries, loading: loadingCountries, result: countries } = useActiveShippingCountries();
    const { load: loadBilling, loading: loadingBilling, billing } = useUserBilling();
    const shippingAddresses = computed(() => userAddressGetters.getAddresses(shipping.value));

    const sameAsShippingForm = computed(() => {
      if (!userAddressGetters.getAddresses(billing.value).length) {
        return {};
      }
      return userAddressGetters.getDefault(billing.value) || userAddressGetters.getAddresses(billing.value)[0];
    });

    const loading = computed(() => {
      return loadingBilling.value || loadingCountries.value || loadingShipping.value;
    });

    onSSR(async () => {
      await load();
      await loadActiveShippingCountries();
    });

    watch(sameAsShipping, async () => {
      if (sameAsShipping) {
        await loadBilling();
      }
    });

    const continueToNextStep = async () => {

      if (sameAsShipping.value) {
        const valid = await refs.SameAsShippingFormRef.validate();
        if (valid) {
          await addAddress({address: sameAsShippingForm.value });
          router.push(root.localePath({name: 'payment' }));
        }
        return;
      }

      if (refs.CheckoutAddressDetailsRef.inCreateOrEditState) {
        refs.CheckoutAddressDetailsRef.submit('/checkout/payment');
      } else {
        router.push(root.localePath({name: 'payment' }));
      }
    };

    return {
      shippingAddresses,
      sameAsShippingForm,
      continueToNextStep,
      sameAsShipping,
      setDefaultAddress,
      deleteAddress,
      addAddress,
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
