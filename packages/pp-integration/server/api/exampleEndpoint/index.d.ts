import { PaypalIntegrationContext } from '../../types';
export declare function createOrder(context: PaypalIntegrationContext, fundingSource: string): Promise<any>;
export declare function getSession(context: PaypalIntegrationContext, initialRestCall: boolean): Promise<any>;
export default createOrder;
