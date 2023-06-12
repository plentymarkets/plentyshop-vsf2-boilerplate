<template>
  <div>
    <h1>Review your order</h1>
    <SfDivider class="sm:mb-sf-xl" />
    <div class="flex p-2 flex-wrap opacity-80 pointer-events-none">
      <div class="sm:w-1/2">
        <div class="flex gap-sf-lg flex-col font-sf-secondary">
          <div>
            <div class="mb-3 text-2xl">Invoice to:</div>
            <div class="flex pl-2 flex-col">
              <span>{{ userAddressGetters.getFirstName(billing[0]) }} </span>
              <span>
                {{ userAddressGetters.getLastName(billing[0]) }}
              </span>
              <span>{{ userAddressGetters.getStreetName(billing[0]) }}</span>
              <span>
                {{ userAddressGetters.getApartmentNumber(billing[0]) }}
              </span>
              <span>{{ userAddressGetters.getPostCode(billing[0]) }}</span>
              <span>{{ userAddressGetters.getCity(billing[0]) }}</span>
              <span>{{ getStateName(billing[0]) }}</span>
              <span>
                {{ getCountryName(billing[0]) }}
              </span>
              <span>{{ userAddressGetters.getPhone(billing[0]) }}</span>
            </div>
          </div>
          <div>
            <div class="mb-3 text-2xl">Shipping to:</div>
            <div class="flex pl-2 flex-col">
              <span
                >{{ userAddressGetters.getFirstName(defaultShipping) }}
              </span>
              <span
                >{{ userAddressGetters.getStreetName(defaultShipping) }}
              </span>
              <span>
                {{ userAddressGetters.getApartmentNumber(defaultShipping) }}
              </span>
              <span>{{ userAddressGetters.getPostCode(defaultShipping) }}</span>
              <span>{{ userAddressGetters.getCity(defaultShipping) }}</span>
              <span>{{ getStateName(defaultShipping) }}</span>
              <span>
                {{ getCountryName(defaultShipping) }}
              </span>
              <span>{{ userAddressGetters.getPhone(defaultShipping) }}</span>
            </div>
          </div>
          <div v-if="paymentMethod">
            <div class="text-2xl">{{ $t('VsfPaymentProvider.Payment method') }}</div>
            <div class="flex row mt-5 pl-2 sm:pl-0">
              <img
                style="width: 60px"
                :src="paymentProviderGetters.getIcon(paymentMethod)"
              />
              <div class="ml-2">
                {{ paymentProviderGetters.getName(paymentMethod) }}
              </div>
            </div>
          </div>
          <div v-else>No Payment Method Selected</div>

          <div v-if="shippingMethod">
            <div class="text-2xl">{{ $t('VsfShippingProvider.Shipping method') }}</div>
            <div class="flex row mt-5 pl-2 sm:pl-0">
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

      <div class="sm:w-1/2">
        <div class="px-5 pt-5 sm:pt-0">
          <SfTable class="sf-table--bordered table">
            <SfTableRow
              v-for="(product, index) in products"
              :key="index"
              class="table__row"
            >
              <SfTableData>
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
      </div>
    </div>
    <div class="p-3">
      <SfCheckbox v-model="terms" v-e2e="'terms'" name="terms" class="summary__terms my-sf-lg">
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
        <SfButton :disabled="!terms" type="button" class="w-full color-primary" size="lg">
          {{ $t('Payment.Make an order') }}
        </SfButton>
      </div>
      <div>
        <SfButton class="w-full color-secondary">{{ $t('Payment.Cancel Order') }}</SfButton>
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
import { computed, ref } from '@nuxtjs/composition-api';
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
    const terms = ref(false);
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
        return shippingProviderGetters.getShippingProfileId(cart?.value);
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
      await loadBilling();
      await loadShipping();
      await loadActiveShippingCountries();
      await loadPaymentProviders();
      await loadShippingProvider();
    });

    return {
      getStateName,
      getCountryName,
      addBasePath,
      billing,
      terms,
      userAddressGetters,
      defaultShipping,
      shippingAddresses,
      shippingMethod,
      shippingProviderGetters,
      paymentMethod,
      paymentProviderGetters,
      cartGetters,
      products: computed(() => cartGetters.getItems(cart.value)),
      totals: computed(() => cartGetters.getTotals(cart.value))
    };
  }
};
</script>
