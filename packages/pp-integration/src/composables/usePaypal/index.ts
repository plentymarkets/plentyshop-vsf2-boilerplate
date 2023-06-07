import { sharedRef} from '@vue-storefront/core';
import { useCart } from '@vue-storefront/plentymarkets';
import { computed } from '@nuxtjs/composition-api';
import { loadScript as loadPayPalScript, PayPalNamespace } from '@paypal/paypal-js';

interface UsePaypalErrors {
  exampleEndpoint: Error
}

const usePaypal = () => {
  const error = sharedRef<UsePaypalErrors>({
    exampleEndpoint: null
  }, 'usePaypal-error');
  const loading = sharedRef(false, 'usePaypal-loading');
  const paymentObject = sharedRef(null, 'usePaypal-paymentObject');
  const paypal = sharedRef<PayPalNamespace>(null, 'usePaypal-paypalsdk');

  // const { $pp: { api }} = useVSFContext() as VSFContext;
  const { cart } = useCart();

  // const exampleEndpoint = async (/** TODO */): Promise<any> => {
  //   try {
  //     console.log('pp exampleEndpoint composable');
  //     error.value.exampleEndpoint = null;
  //     loading.value = true;

  //     await loadCart();
  //     const response = await api.getSession(false);
  //     paymentObject.value = response;
  //   } catch (err) {
  //     Logger.error(`${LOGGER_PREFIX} ${err.message}`);
  //     error.value.exampleEndpoint = _getError(err);
  //   } finally {
  //     loading.value = false;
  //   }
  // };

  const exampleEndpoint = async (): Promise<void> => {
    console.log('pp load cart: ', cart);
  };

  const setPaymentObject = (newPaymentObject: string) => {
    paymentObject.value = newPaymentObject;
  };

  const loadScript = async (currency: string): Promise<PayPalNamespace> => {
    if (paypal.value) {
      return paypal.value;
    }

    try {
      // TODO get client id somehow
      paypal.value = await loadPayPalScript({ 'client-id': 'Ab_wQoMAfzuqCrl4gVfYvkNHmBS_s_rQKMafFJrArKJ4GZU8nbSIn53v4Q8ZZfoHR01kxnjkDF4yVLAv', currency: currency });
      return paypal.value;
    } catch (error) {
      console.error('failed to load the PayPal JS SDK script', error);
    }
  };

  return {
    error: computed<UsePaypalErrors>(() => error.value),
    loading: computed<boolean>(() => loading.value),
    paymentObject: computed<unknown>(() => paymentObject.value),

    exampleEndpoint,
    setPaymentObject,
    loadScript
  };
};

export default usePaypal;

// const _getError = (err) => err.response || err.data || err;
