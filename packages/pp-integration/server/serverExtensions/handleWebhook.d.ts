import { Request, Response } from 'express';
import { WebhookClient } from 'src/types';
declare const handleWebhook: (client: WebhookClient, config: any /** TODO */) => (request: Request, response: Response) => Promise<Response<any, Record<string, any>>>;
export default handleWebhook;
