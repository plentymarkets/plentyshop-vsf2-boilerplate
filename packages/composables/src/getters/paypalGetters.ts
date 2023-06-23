import {useContext} from '@nuxtjs/composition-api';
import {PayPalConfig} from '@vue-storefront/plentymarkets-api';

function getConfig(): PayPalConfig|null {
  const { $config } = useContext();

  return $config?.integrationConfig?.payment?.paypal;
}

function getClientId(): string|null {
  const config = getConfig();

  return config?.clientId;
}

function getMerchantId(): string|null {
  const config = getConfig();

  return config?.merchantId;
}

function getPaymentId(): number {
  const config = getConfig();

  return config?.paymentId ?? -1;
}

export const paypalGetters = {
  getConfig,
  getClientId,
  getMerchantId,
  getPaymentId
};
