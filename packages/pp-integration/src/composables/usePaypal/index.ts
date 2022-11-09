import { useVSFContext, sharedRef, Logger } from '@vue-storefront/core';
import { VSFContext } from '../../types';
import { useCart } from '@vue-storefront/plentymarkets';
import { computed } from '@nuxtjs/composition-api';
import { LOGGER_PREFIX } from '../../consts';

interface UsePaypalErrors {
  exampleEndpoint: Error
}

const usePaypal = () => {
  const error = sharedRef<UsePaypalErrors>({
    exampleEndpoint: null
  }, 'usePaypal-error');
  const loading = sharedRef(false, 'usePaypal-loading');
  const paymentObject = sharedRef(null, 'usePaypal-paymentObject');

  const { $pp: { api }} = useVSFContext() as VSFContext;
  const { load: loadCart } = useCart();

  const exampleEndpoint = async (/** TODO */): Promise<any> => {
    try {
      console.log('pp exampleEndpoint composable');
      error.value.exampleEndpoint = null;
      loading.value = true;

      await loadCart();
      const response = await api.getSession(false);
      paymentObject.value = response;
    } catch (err) {
      Logger.error(`${LOGGER_PREFIX} ${err.message}`);
      error.value.exampleEndpoint = _getError(err);
    } finally {
      loading.value = false;
    }
  };

  const setPaymentObject = (newPaymentObject: string) => {
    paymentObject.value = newPaymentObject;
  };

  return {
    error: computed<UsePaypalErrors>(() => error.value),
    loading: computed<boolean>(() => loading.value),
    paymentObject: computed<any>(() => paymentObject.value),

    exampleEndpoint,
    setPaymentObject
  };
};

export default usePaypal;

const _getError = (err) => err.response || err.data || err;
