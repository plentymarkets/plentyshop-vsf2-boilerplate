import { SessionResult } from './../../types';
import { Context } from 'src/types';

export async function getSession(context: Context, initialRestCall: boolean): Promise<SessionResult> {
  const url: URL = new URL('/rest/storefront/session/', context.config.api.url);

  if (initialRestCall) {
    url.searchParams.set('initialRestCall', initialRestCall.toString());
  }
  const { data } = await context.client.get(url.href);

  return {
    user: data.data.customer || (data.data.guest ? { guestMail: data.data.guest } : null),
    basket: data.data.basket
  };
}
