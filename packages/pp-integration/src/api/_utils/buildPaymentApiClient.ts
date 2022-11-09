import axios from 'axios';
import { PaypalServerConfig } from 'src/types';

export function buildPaymentApiClient(config: PaypalServerConfig) {
  const client = axios.create({
    baseURL: config.api.url,
    withCredentials: true
  });

  return client;
}
