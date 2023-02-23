/* eslint-disable @typescript-eslint/no-unused-vars */
import {Context} from '../../types';
import { Wishlist } from '../../types/wishlist';

export async function getWishlist(context: Context): Promise<Wishlist> {
  const url: URL = new URL('/rest/io/itemWishList/', context.config.api.url);
  const { data } = await context.client.get(url.href);
  const items = data.data.documents.map((wishListItem) => wishListItem.data);
  return { items };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function addWishlistItem(context: Context, productId: number): Promise<boolean> {
  const url: URL = new URL('/rest/io/itemWishList', context.config.api.url);

  const { data } = await context.client.post(url.href, { variationId: productId });
  return data;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function removeWishlistItem(context: Context, productId: number): Promise<boolean> {
  const url: URL = new URL(`/rest/io/itemWishList/${productId}`, context.config.api.url);
  const { data } = await context.client.delete(url.href);

  return Boolean(data.data);
}
