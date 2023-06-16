<template>
  <div class="p-3 lg:p-0">
    <h2 class="mb-8">
      {{ $t('Checkoutreadonly.Review your order') }}
    </h2>
    <SfDivider class="sm:mb-sf-xl" />
    <div class="flex p-2 flex-wrap opacity-80 pointer-events-none">
      <div class="sm:w-1/2">
        <div class="flex gap-sf-lg flex-col font-sf-secondary">
          <div>
            <div class="mb-3 text-2xl">
              {{ $t('Checkoutreadonly.Invoice to') }}
            </div>
            <readonly-address
              v-if="defaultBilling"
              class="pl-2"
              :address="defaultBilling"
              :countries="countries"
            />
          </div>
          <div>
            <div class="mb-3 text-2xl">
              {{ $t('Checkoutreadonly.Shipping to') }}
            </div>
            <readonly-address
              v-if="defaultShipping"
              class="pl-2"
              :address="defaultShipping"
              :countries="countries"
            />
          </div>
          <div v-if="paymentMethod">
            <div class="text-2xl">
              {{ $t('VsfPaymentProvider.Payment method') }}
            </div>
            <div class="flex items-center gap-sf-xs row mt-5 pl-2">
              <img
                style="width: 60px"
                :src="paymentProviderGetters.getIcon(paymentMethod)"
              >
              <div>
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
            <div class="flex items-center gap-sf-xs row mt-5 pl-2">
              <img
                :src="
                  shippingProviderGetters.getShippingMethodImage(shippingMethod)
                "
                style="width: 60px"
              >
              <span>
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
              class="w-full color-primary min-h-12"
              size="lg"
              :disabled="loading || invalidCheckoutData"
            >
              <SfLoader
                :class="{ loader: loading }"
                :loading="loading"
              >
                <div>{{ $t('Payment.Make an order') }}</div>
              </SfLoader>
            </SfButton>
          </div>
          <div>
            <SfButton class="w-full color-secondary">
              {{ $t('Payment.Cancel Order') }}
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
  SfLink,
  SfLoader
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
  useMakeOrder,
  usePayPal,
  orderGetters
} from '@vue-storefront/plentymarkets';
import { addBasePath, onSSR } from '@vue-storefront/core';
import {
  computed,
  ref, useContext,
  useRoute,
  useRouter
} from '@nuxtjs/composition-api';
import { keyBy } from 'lodash';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'CheckoutReadonly',
  components: {
    SfTable,
    SfButton,
    SfLink,
    SfImage,
    SfDivider,
    SfPrice,
    SfCheckbox,
    SfLoader,
    ValidationProvider,
    ValidationObserver,
    CartTotals: () => import('~/components/CartTotals'),
    ReadonlyAddress: () => import('~/components/Checkout/Readonly/ReadOnlyAddress')
  },
  setup(props, context) {
    const { $config } = useContext();
    const terms = ref(false);
    const { load: loadShipping, shipping } = useUserShipping();
    const { cart, setCart, load: loadCart} = useCart();
    const { make, order } = useMakeOrder();
    const { executePayPalOrder } = usePayPal();
    const { load: loadBilling, billing } = useUserBilling();
    const route = useRoute();
    const makeOrderLoading = ref(false);
    const router = useRouter();
    const { load: loadShippingProvider, state: shippingProvider } =
      useShippingProvider();
    const { load: loadActiveShippingCountries, result: countries } =
      useActiveShippingCountries();
    const { load: loadPaymentProviders, result: paymentProviders } =
      usePaymentProvider();

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

    const paymentMethod = computed(
      () => {
        return paymentProviders?.value?.list.find((method) => {
          return method.id === Number(paymentProviderGetters.getMethodOfPaymentId(cart?.value));
        });
      });

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

    const defaultBilling = computed(() => {
      if (shippingAddresses.value.length > 0) {
        return (
          userAddressGetters.getDefault(billing.value) ||
          userAddressGetters.getAddresses(billing.value)[0]
        );
      }
      return null;
    });

    const invalidCheckoutData = computed(() => {
      return !defaultBilling.value || !defaultShipping.value || !cartGetters.getItems(cart.value).length ||
          !paymentMethod.value || !shippingMethod.value || !route.value.query.orderId;
    });

    onSSR(async () => {
      setCart(null);
      await loadCart();
      await loadBilling();
      await loadShipping();
      await loadActiveShippingCountries();
      await loadPaymentProviders();
      await loadShippingProvider();
    });

    const makeOrder = async () => {
      makeOrderLoading.value = true;
      await make({
        paymentId: $config.integrationConfig.payment.paypal.paymentId,
        shippingPrivacyHintAccepted: true
      });

      await executePayPalOrder(
        'paypal',
        parseInt(orderGetters.getId(order.value)),
        route.value.query.orderId ?? '',
        $config.integrationConfig.payment.paypal.merchantId
      );

      const thankYouPath = {
        name: 'thank-you',
        query: {
          orderId: orderGetters.getId(order.value),
          accessKey: orderGetters.getAccessKey(order.value)
        }
      };

      router.push(context.root.localePath(thankYouPath));
      setCart({ items: [] });

      makeOrderLoading.value = false;
    };

    return {
      addBasePath,
      billing,
      cartGetters,
      countries,
      defaultBilling,
      defaultShipping,
      invalidCheckoutData,
      loading: computed(() => makeOrderLoading.value),
      makeOrder,
      paymentMethod,
      paymentProviderGetters,
      products: computed(() => cartGetters.getItems(cart.value)),
      shippingAddresses,
      shippingMethod,
      shippingProviderGetters,
      terms,
      totals: computed(() => cartGetters.getTotals(cart.value)),
      userAddressGetters
    };
  }
};
</script>
