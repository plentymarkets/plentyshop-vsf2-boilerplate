import { AxiosInstance } from 'axios';
import { Request, Response } from 'express';
export declare type PlentymarketsClient = AxiosInstance;
export declare type PaypalClient = AxiosInstance;
export interface PaypalIntegrationContext {
    config: PaypalServerConfig;
    client: {
        plentymarkets: PlentymarketsClient;
        pp: PaypalClient;
    };
    req: Request;
    res: Response;
}
export interface ApiClientRequestParams {
    uri: string;
    method?: string;
    body?: any;
    headers?: Record<string, string>;
}
export interface VSFContext {
    $plentymarkets: {
        config: any;
    };
    $pp: {
        config: PaypalClientConfig;
        api: ApiEndpoints;
    };
}
export declare type ApiEndpoints = {
    getSession(initialRestCall: boolean): Promise<any>;
    createOrder(foundingSource: string): Promise<any>;
};
export declare type PaypalClientConfig = any;
export declare type PaypalServerConfig = {
    api: {
        url: string;
    };
};
export declare type WebhookClient = any;
