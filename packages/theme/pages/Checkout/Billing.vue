<template>
  <div
    v-if="!loading"
    id="billing"
  >
    <CheckoutAddressDetails
      ref="CheckoutAddressDetailsRef"
      :type="'billing'"
      :addresses="billing"
      :countries="countries"
      :heading-title="$t('Billing.Billing details')"
      :heading-title-level="2"
      @set-default-address="setDefaultAddress({address: $event })"
      @delete-address="deleteAddress({address: $event})"
      @update-address="saveAddress({address: $event})"
    />

    <div class="spacer-top">
      <SfCheckbox
        v-model="isShippingDifferentInput"
        :label="$t('Shipping.Use different shipping address')"
        name="copyShippingAddress"
        class="form__element"
        @change="toggleShippingDifferent"
      />
    </div>
    <div class="spacer-top buttons">
      <div v-if="isShippingDifferent">
        <SfButton
          data-e2e="continue-to-shipping"
          class="form__action-button"
          @click="continueToNextStep"
        >
          {{ $t('Billing.Continue to shipping') }}
        </SfButton>
      </div>
      <div v-else>
        <SfButton
          data-e2e="continue-to-payment"
          class="form__action-button"
          @click="continueToNextStep"
        >
          {{ $t('Shipping.Continue to payment') }}
        </SfButton>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SfButton, SfCheckbox
} from '@storefront-ui/vue';
import { computed, ref, useRouter, watch } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useActiveShippingCountries, useUserBilling } from '@vue-storefront/plentymarkets';
import CheckoutAddressDetails from '~/components/Checkout/CheckoutAddressDetails';
import { useUiHelpers } from '~/composables';

export default {
  name: 'Billing',
  components: {
    SfButton,
    CheckoutAddressDetails,
    SfCheckbox
  },
  setup(props, {refs, root}) {
    const router = useRouter();
    const { load, loading: loadingBilling, billing, setDefaultAddress, deleteAddress, addAddress } = useUserBilling();
    const { load: loadActiveShippingCountries, loading: loadingCountry, result: countries } = useActiveShippingCountries();
    const { isShippingAddressDifferent } = useUiHelpers();
    const isShippingDifferent = ref(isShippingAddressDifferent());
    const isShippingDifferentInput = ref(false);

    const toggleShippingDifferent = () => {
      isShippingDifferent.value = !isShippingDifferent.value;
    };

    watch(isShippingDifferent, (newValue) => {
      isShippingDifferentInput.value = newValue;
    });

    watch(isShippingDifferentInput, (newValue) => {
      isShippingDifferent.value = newValue;
    });

    const loading = computed(() => {
      return loadingBilling.value && loadingCountry.value;
    });

    onSSR(async () => {
      await load();
      await loadActiveShippingCountries();
    });

    const saveAddress = async (address) => {
      await addAddress(address);
      router.push(root.localePath({name: 'shipping'}));
    };

    watch(isShippingDifferent, async () => {
      console.log('IS:');
      console.log(isShippingDifferent.value);
      // Emit event?
    });

    const continueToNextStep = () => {
      if (refs.CheckoutAddressDetailsRef.isFormOpen) {
        refs.CheckoutAddressDetailsRef.submit();
      } else if (isShippingDifferent.value) {
        router.push(root.localePath({name: 'shipping'}));
      } else {
        router.push(root.localePath({name: 'payment' }));
      }
    };

    return {
      continueToNextStep,
      setDefaultAddress,
      deleteAddress,
      saveAddress,
      router,
      billing,
      countries,
      loading,
      isShippingDifferent,
      isShippingDifferentInput,
      toggleShippingDifferent
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
</style>
