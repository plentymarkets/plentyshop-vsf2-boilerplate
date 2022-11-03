import handleWebhook from './handleWebhook';
import { Express } from 'express';
import { API_WEBHOOK_ENDPOINT } from '../consts';
import { 
  buildApiClient, // TODO: Creates plentymarkets API client
  buildPaymentApiClient // TODO: Creates pp API client
} from '../api/_utils';

export const endpointsExtension = {
  name: 'endpointsExtension',

  extendApp: (ctx: { app: Express, configuration: any }) => {
    const config = ctx.configuration;

    ctx.app.post(`/pp/${API_WEBHOOK_ENDPOINT}`, handleWebhook({
      // Client might be different in your specific case
      plentymarkets: buildApiClient(config),
      pp: buildPaymentApiClient(config)
    }, config));
  }
};
