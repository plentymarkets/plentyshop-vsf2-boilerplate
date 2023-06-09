<template>
  <div>
    <h1>Review your order</h1>
    <SfDivider class="mb-sf-xl" />
    <div class="flex opacity-80 pointer-events-none">
      <div class="flex-1">
        <div class="flex gap-sf-lg flex-col font-sf-secondary">
          <div>
            <h3 class="mb-3">Invoice to:</h3>
            <div class="flex flex-col">
              <span
                >{{ userAddressGetters.getFirstName(billing[0]) }}
                {{ userAddressGetters.getLastName(billing[0]) }}</span
              >
              <span
                >{{ userAddressGetters.getStreetName(billing[0]) }}
                {{
                  userAddressGetters.getApartmentNumber(billing[0])
                }}</span
              >
              <span>{{ userAddressGetters.getPostCode(billing[0]) }}</span>
              <span>{{ userAddressGetters.getCity(billing[0]) }}</span>
              <span
                >{{ getStateName(billing[0]) }}
                {{ getCountryName(billing[0]) }}</span
              >
              <span>{{ userAddressGetters.getPhone(billing[0]) }}</span>
            </div>
          </div>
          <div>
            <h3 class="mb-3">Shipping to:</h3>
            <div class="flex flex-col">
              <span
                >{{ userAddressGetters.getFirstName(defaultShipping) }}
                {{ userAddressGetters.getLastName(defaultShipping) }}</span
              >
              <span
                >{{ userAddressGetters.getStreetName(defaultShipping) }}
                {{
                  userAddressGetters.getApartmentNumber(defaultShipping)
                }}</span
              >
              <span>{{ userAddressGetters.getPostCode(defaultShipping) }}</span>
              <span>{{ userAddressGetters.getCity(defaultShipping) }}</span>
              <span
                >{{ getStateName(defaultShipping) }}
                a:
                {{ getCountryName(defaultShipping) }}</span
              >
              <span>{{ userAddressGetters.getPhone(defaultShipping) }}</span>
            </div>
          </div>

          <div v-if="paymentMethod">
            <h4>{{ $t('VsfPaymentProvider.Payment method') }}</h4>
            <div class="flex row mt-5">
              <img
                width="40px"
                :src="paymentProviderGetters.getIcon(paymentMethod)"
              />
              <div class="ml-2">
                {{ paymentProviderGetters.getName(paymentMethod) }}
              </div>
            </div>
          </div>
          <div v-else>No Payment Method Selected</div>

          <div v-if="shippingMethod">
            <h4>{{ $t('VsfShippingProvider.Shipping method') }}</h4>
            <div class="flex row mt-5">
              <img
                :src="
                  shippingProviderGetters.getShippingMethodImage(shippingMethod)
                "
                style="width: 60px"
              />
              <span class="mt-2 ml-2">
                {{
                  shippingProviderGetters.getShippingMethodName(shippingMethod)
                }}
              </span>
            </div>
          </div>
          <div v-else>No Shipping Method Selected</div>
        </div>
      </div>
      <div class="flex-1 bg-sf-c-light">
        <div class="p-5">
          <SfTable class="sf-table--bordered table">
            <SfTableRow
              v-for="(product, index) in products"
              :key="index"
              class="table__row"
            >
              <SfTableData class="table__image">
                <SfImage
                  :width="100"
                  :height="100"
                  :src="addBasePath(cartGetters.getItemImage(product))"
                  :alt="cartGetters.getItemName(product)"
                />
              </SfTableData>
              <SfTableData class="table__data table__description table__data">
                <div class="product-title">
                  {{ cartGetters.getItemName(product) }}
                </div>
                <div class="product-sku">
                  {{ cartGetters.getItemSku(product) }}
                </div>
              </SfTableData>
              <SfTableData
                v-for="(value, key) in cartGetters.getItemAttributes(product, [
                  'size',
                  'color',
                ])"
                :key="key"
                class="table__data"
              >
                {{ value }}
              </SfTableData>
              <SfTableData class="table__data">
                {{ cartGetters.getItemQty(product) }}
              </SfTableData>
              <SfTableData class="table__data price">
                <SfPrice
                  :regular="
                    $n(cartGetters.getRegularItemPrice(product), 'currency')
                  "
                  :special="
                    cartGetters.getSpecialItemPrice(product) &&
                    $n(cartGetters.getSpecialItemPrice(product), 'currency')
                  "
                  class="product-price"
                />
              </SfTableData>
            </SfTableRow>
          </SfTable>
          <div class="summary">
            <div class="summary__group">
              <CartTotals />
            </div>
          </div>
        </div>
        <div class="p-3">
          <SfCheckbox
            v-e2e="'terms'"
            name="terms"
            class="summary__terms my-sf-lg"
          >
            <template #label>
              <div class="sf-checkbox__label">
                {{ $t('Payment.I agree to') }}
                <SfLink link="#">
                  {{ $t('Payment.Terms and conditions') }}
                </SfLink>
              </div>
            </template>
          </SfCheckbox>
          <div class="my-2">
            <SfButton type="button" class="w-full color-primary" size="lg">
              Order now
            </SfButton>
          </div>
          <div>
            <SfButton class="w-full color-secondary"> cancel order </SfButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SfTable,
  SfButton,
  SfImage,
  SfPrice,
  SfCheckbox,
  SfDivider,
  SfLink,
} from '@storefront-ui/vue';
import { ref, computed, toRef } from '@nuxtjs/composition-api';
// import AddressPicker from '~/components/AddressPicker';
import {
  useCart,
  cartGetters,
  usePaymentProvider,
  userAddressGetters,
  paymentProviderGetters,
  useShippingProvider,
  useActiveShippingCountries,
  shippingProviderGetters,
  useUserShipping,
  useUserBilling,
  countryGetters
} from '@vue-storefront/plentymarkets';
import { addBasePath, onSSR } from '@vue-storefront/core';
import { keyBy } from 'lodash';
export default {
  name: 'ReviewOrder',
  components: {
    SfTable,
    SfButton,
    SfLink,
    SfImage,
    SfDivider,
    SfPrice,
    SfCheckbox,
    CartTotals: () => import('~/components/CartTotals'),
  },
  setup() {
    const { load: loadShipping, shipping } = useUserShipping();

    const shippingAddresses = computed(() =>
      userAddressGetters.getAddresses(shipping.value)
    );
    const defaultShipping = computed(() => {
      if (shippingAddresses.value.length > 0) {
        return (
          userAddressGetters.getDefault(shippingAddresses.value) ||
          userAddressGetters.getAddresses(shippingAddresses.value)[0]
        );
      }
      return null;
    });

    const { load: loadActiveShippingCountries, result: countries } =
      useActiveShippingCountries();

    const getStateName = (address) => {
      const countryId = userAddressGetters.getCountryId(address);
      const country = countryGetters.getCountryById(countries.value, countryId);
      const stateId = userAddressGetters.getStateId(address);
      const state = countryGetters.getStateById(country, stateId);

      return countryGetters.getStateName(state)
        ? `${countryGetters.getStateName(state)}, `
        : '';
    };

    const getCountryName = (address) => {
      const country = countryGetters.getCountryById(
        countries.value,
        userAddressGetters.getCountryId(address)
      );

      return countryGetters.getCountryName(country);
    };

    const { cart } = useCart();
    const { load: loadPaymentProviders, result: paymentProviders } =
      usePaymentProvider();
    const paymentMethodsById = computed(() =>
      keyBy(paymentProviders?.value?.list, 'id')
    );
    const paymentMethod = computed(
      () =>
        paymentMethodsById.value[
          paymentProviderGetters.getMethodOfPaymentId(cart.value)
        ]
    );

    const { load: loadShippingProvider, state: shippingProvider } =
      useShippingProvider();

    const shippingMethodsById = computed(() =>
      keyBy(
        shippingProviderGetters.getShippingProviders(shippingProvider.value),
        'parcelServicePresetId'
      )
    );

    const selectedMethodId = computed(() => {
      if (shippingProviderGetters.getShippingProfileId(cart?.value)) {
        return (selectedMethodId.value =
          shippingProviderGetters.getShippingProfileId(cart?.value));
      }
      return null;
    });

    const shippingMethod = computed(() =>
      selectedMethodId.value
        ? shippingMethodsById.value[selectedMethodId.value]
        : null
    );

    const { load: loadBilling, billing } = useUserBilling();

    onSSR(async () => {
      // should refactor how we handle default billing addreses
      await loadBilling();
      // user shipping address
      await loadShipping();
      await loadActiveShippingCountries();
      // payment method
      await loadPaymentProviders();
      // shipping method
      await loadShippingProvider();
    });

    return {
      billing,
      getStateName,
      getCountryName,
      defaultShipping,
      shippingAddresses,
      shippingMethod,
      userAddressGetters,
      paymentMethod,
      shippingProviderGetters,
      paymentProviderGetters,
      addBasePath,
      products: computed(() => cartGetters.getItems(cart.value)),
      totals: computed(() => cartGetters.getTotals(cart.value)),
      cartGetters
    };
  },
};
</script>
