import {Cart, Context} from '../../types';

export async function getCart(context: Context): Promise<Cart> {
  const url: URL = new URL('/rest/storefront/session/', context.config.api.url);
  const { data } = await context.client.get(url.href);
  const cart = { ...data.cart, items: data.cartItems };

  return cart;
}

export async function addItem(context: Context, params: { productId: number, quantity?: number }): Promise<Cart> {
  const url: URL = new URL('/rest/storefront/cart/items/', context.config.api.url);
  const { data } = await context.client.post(url.href, { variationId: params.productId, quantity: params.quantity ?? 1 });

  console.log(data);

  return { ...data.events.AfterBasketChanged.basket, items: data.events.AfterBasketChanged.basketItems };
}

export async function removeItem(context: Context, cartItemId: number): Promise<Cart> {
  const url: URL = new URL(`/rest/storefront/cart/items/${cartItemId}/`, context.config.api.url);
  const { data } = await context.client.delete(url.href);

  return { ...data.events.AfterBasketChanged.basket, items: data.events.AfterBasketChanged.basketItems };
}

export async function updateItemQty(context: Context, params: { productId: number, cartItemId: number, quantity: number }): Promise<Cart> {
  const url: URL = new URL(`/rest/storefront/cart/items/${params.cartItemId}`, context.config.api.url);
  const { data } = await context.client.put(url.href, { variationId: params.productId, quantity: params.quantity ?? 1, id: params.cartItemId});

  return { ...data.events.AfterBasketChanged.basket, items: data.events.AfterBasketChanged.basketItems };
}

export async function clearCart(context: Context): Promise<Cart> {
  const url: URL = new URL('/rest/storefront/cart/items/', context.config.api.url);
  const { data } = await context.client.delete(url.href);

  return { ...data.events.AfterBasketChanged.basket, items: data.events.AfterBasketChanged.basketItems };
}

export async function deleteCart(context: Context): Promise<Cart> {
  const url: URL = new URL('/rest/storefront/cart/', context.config.api.url);
  const { data } = await context.client.delete(url.href);

  return { ...data.events.AfterBasketChanged.basket, items: data.events.AfterBasketChanged.basketItems };
}
