import { Request, Response } from 'express';

export type PlentymarketsClient = any; // TODO
export type PaypalClient = any; // TODO

export interface PaypalIntegrationContext {
  config: PaypalServerConfig,
  client: {
    plentymarkets: PlentymarketsClient,
    pp: PaypalClient
  },
  req: Request,
  res: Response
};

export interface ApiClientRequestParams {
  uri: string,
  method?: string,
  body?: any,
  headers?: Record<string, string>
};

export interface VSFContext {
  $plentymarkets: {
    config: any
  },
  $pp: {
    config: PaypalClientConfig,
    api: ApiEndpoints
  }
};

export type ApiEndpoints = any; // TODO

export type PaypalClientConfig = any; // TODO

export type PaypalServerConfig = any; // TODO: middleware.config.js

export type WebhookClient = any; // TODO
