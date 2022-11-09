import { AxiosInstance } from 'axios';
import { Request, Response } from 'express';

export type PlentymarketsClient = AxiosInstance;
export type PaypalClient = AxiosInstance;

export interface PaypalIntegrationContext {
  config: PaypalServerConfig,
  client: {
    plentymarkets: PlentymarketsClient,
    pp: PaypalClient
  },
  req: Request,
  res: Response
}

export interface ApiClientRequestParams {
  uri: string,
  method?: string,
  body?: any,
  headers?: Record<string, string>
}

export interface VSFContext {
  $plentymarkets: {
    config: any
  },
  $pp: {
    config: PaypalClientConfig,
    api: ApiEndpoints
  }
}

export type ApiEndpoints = {
  getSession(initialRestCall: boolean): Promise<any>
}; // TODO

export type PaypalClientConfig = any; // TODO

// TODO: middleware.config.js
export type PaypalServerConfig = {
  api: {
    url: string
  }
};

export type WebhookClient = any; // TODO
