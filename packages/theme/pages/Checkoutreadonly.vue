<template>
  <div class="p-3 lg:p-0">
    <h2 class="mb-8">{{ $t('Checkoutreadonly.Review your order') }}</h2>
    <SfDivider class="sm:mb-sf-xl" />
    <div class="flex p-2 flex-wrap opacity-80 pointer-events-none">
      <div class="sm:w-1/2">
        <div class="flex gap-sf-lg flex-col font-sf-secondary">
          <div>
            <div class="mb-3 text-2xl">
              {{ $t('Checkoutreadonly.Invoice to') }}
            </div>
            <div class="flex pl-2 flex-col">
              <span>{{ userAddressGetters.getFirstName(defaultBilling) }}
              </span>
              <span>
                {{ userAddressGetters.getLastName(defaultBilling) }}
              </span>
              <span>{{
                userAddressGetters.getStreetName(defaultBilling)
              }}</span>
              <span>
                {{ userAddressGetters.getApartmentNumber(defaultBilling) }}
              </span>
              <span>{{ userAddressGetters.getPostCode(defaultBilling) }}</span>
              <span>{{ userAddressGetters.getCity(defaultBilling) }}</span>
              <span>{{ getStateName(defaultBilling) }}</span>
              <span>
                {{ getCountryName(defaultBilling) }}
              </span>
              <span>{{ userAddressGetters.getPhone(defaultBilling) }}</span>
            </div>
          </div>
          <div>
            <div class="mb-3 text-2xl">
              {{ $t('Checkoutreadonly.Shipping to') }}
            </div>
            <div class="flex pl-2 flex-col">
              <span>{{ userAddressGetters.getFirstName(defaultShipping) }}
              </span>
              <span>{{ userAddressGetters.getStreetName(defaultShipping) }}
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
            <div class="text-2xl">
              {{ $t('VsfPaymentProvider.Payment method') }}
            </div>
            <div class="flex row mt-5">
              <img
                style="width: 60px"
                :src="paymentProviderGetters.getIcon(paymentMethod)"
              >
              <div class="ml-2 mt-2">
                {{ paymentProviderGetters.getName(paymentMethod) }}
              </div>
            </div>
          </div>
          <div v-else>
            {{ $t('Checkoutreadonly.No payment method selected') }}
          </div>

          <div v-if="shippingMethod">
            <div class="text-2xl">
              {{ $t('VsfShippingProvider.Shipping method') }}
            </div>
            <div class="flex row mt-5">
              <img
                :src="
                  shippingProviderGetters.getShippingMethodImage(shippingMethod)
                "
                style="width: 60px"
              >
              <span class="mt-2 ml-2">
                {{
                  shippingProviderGetters.getShippingMethodName(shippingMethod)
                }}
              </span>
            </div>
          </div>
          <div v-else>
            {{ $t('Checkoutreadonly.No shipping method selected') }}
          </div>
        </div>
      </div>

      <div class="sm:w-1/2 mt-3 lg:mt-5">
        <div class="pt-5 sm:pt-0">
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
      <ValidationObserver
        key="submitOrder"
        v-slot="{ handleSubmit }"
      >
        <form @submit.prevent="handleSubmit(makeOrder)">
          <ValidationProvider
            v-slot="{ errors }"
            :rules="{ required: { allowFalse: false } }"
            :name="$t('Payment.Terms and conditions')"
            class="mt-4 mb-3"
            tag="div"
          >
            <SfCheckbox
              v-model="terms"
              v-e2e="'terms'"
              name="terms"
              class="summary__terms my-sf-lg"
              :valid="!errors[0]"
              :error-message="errors[0]"
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
          </ValidationProvider>
          <div class="my-2">
            <SfButton
              type="submit"
              class="w-full color-primary"
              size="lg"
              :disabled="loading"
              @click="checkout"
            >
              {{ $t('Payment.Make an order') }}
            </SfButton>
          </div>
          <div>
            <SfButton class="w-full color-secondary">
              {{
                $t('Payment.Cancel Order')
              }}
            </SfButton>
          </div>
        </form>
      </ValidationObserver>
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
  SfLink
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
  countryGetters,
  useMakeOrder,
  usePayPal
} from '@vue-storefront/plentymarkets';
import { addBasePath, onSSR } from '@vue-storefront/core';
import { computed, ref, useRoute } from '@nuxtjs/composition-api';
import { keyBy } from 'lodash';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

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
    ValidationProvider,
    ValidationObserver,
    CartTotals: () => import('~/components/CartTotals')
  },
  setup() {
    const terms = ref(false);
    const { load: loadShipping, shipping } = useUserShipping();
    const { cart } = useCart();
    const { make } = useMakeOrder();
    const { captureOrder } = usePayPal();
    const route = useRoute();
    const loading = sharedRef(false, 'useCheckout-loading');

    const checkout = async () => {
      loading.value = true;

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

    const defaultBilling = computed(() => {
      if (shippingAddresses.value.length > 0) {
        return (
          userAddressGetters.getDefault(billing.value) ||
          userAddressGetters.getAddresses(billing.value)[0]
        );
      }
      return null;
    });

    onSSR(async () => {
      await loadBilling();
      await loadShipping();
      await loadActiveShippingCountries();
      await loadPaymentProviders();
      await loadShippingProvider();
    });

    const makeOrder = async () => {
      await make({
        paymentId: 6001,
        shippingPrivacyHintAccepted: true
      });

      await executePayPalOrder('paypal', parseInt(orderGetters.getId(order.value)), route.value.query.orderId ?? '', 'N94FCPY5FXPMC');

      const thankYouPath = { name: 'thank-you',
        query: {
          orderId: orderGetters.getId(order.value),
          accessKey: orderGetters.getAccessKey(order.value)
        }};

      router.push(context.root.localePath(thankYouPath));
      setCart({items: []});

      loading.value = false;
    };

    return {
      checkout,
      getStateName,
      getCountryName,
      addBasePath,
      loading: computed(() => loading.value),
      makeOrder,
      billing,
      terms,
      defaultBilling,
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
  }};
</script>
