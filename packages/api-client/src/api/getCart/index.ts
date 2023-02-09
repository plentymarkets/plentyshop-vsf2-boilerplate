import {Cart, Context} from '../../types';

export async function getCart(context: Context): Promise<Cart> {
  const url: URL = new URL('/rest/io/session/', context.config.api.url);
  const { data } = await context.client.get(url.href);
  const mappedBasketItems = data.data.basketItems.map(basketItem => {
    basketItem.variation = basketItem.variation.data;
    return basketItem;
  });
  const cart = { ...data.data.basket, items: mappedBasketItems };
  return cart;
}

export async function addItem(context: Context, params: { productId: number, quantity?: number }): Promise<Cart> {
  const url: URL = new URL('/rest/io/basket/items/', context.config.api.url);
  const { data } = await context.client.post(url.href, { variationId: params.productId, quantity: params.quantity ?? 1 });
  return { ...data.events.AfterBasketChanged.basket, items: data.events.AfterBasketChanged.basketItems };
}

export async function removeItem(context: Context, cartItemId: number): Promise<Cart> {
  const url: URL = new URL(`/rest/io/basket/items/${cartItemId}/`, context.config.api.url);
  const { data } = await context.client.delete(url.href);
  return { ...data.events.AfterBasketChanged.basket, items: data.events.AfterBasketChanged.basketItems };
}

export async function updateItemQty(context: Context, params: { productId: number, cartItemId: number, quantity: number }): Promise<Cart> {
  const url: URL = new URL(`/rest/io/basket/items/${params.cartItemId}`, context.config.api.url);
  const { data } = await context.client.put(url.href, { variationId: params.productId, quantity: params.quantity ?? 1, id: params.cartItemId});
  return { ...data.events.AfterBasketChanged.basket, items: data.events.AfterBasketChanged.basketItems };
}

export async function clear(context: Context): Promise<Cart> {
  const url: URL = new URL('/rest/storefront/cart/items/', context.config.api.url);
  const { data } = await context.client.delete(url.href);
  return { ...data.events.AfterBasketChanged.basket, items: data.events.AfterBasketChanged.basketItems };
}
