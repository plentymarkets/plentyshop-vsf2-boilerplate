import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import type {
  Cart,
  CartItem,
  Product
} from '@vue-storefront/plentymarkets-api';

const migrateVariationData = (oldCart: Cart, newCart: Cart) => {
  if (!oldCart && !oldCart.items && !newCart && !newCart.items) {
    return newCart;
  }

  newCart.items.forEach((newCartItem) => {
    if (newCartItem.variation) {
      return;
    }

    const oldCartItemData = oldCart.items.find(oldCartItem => oldCartItem.id === newCartItem.id);
    if (!oldCartItemData?.variation) {
      return;
    }

    newCartItem.variation = oldCartItemData.variation;
  });

  return newCart;
};

const params: UseCartFactoryParams<Cart, CartItem, Product> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    const cart = await context.$plentymarkets.api.getCart();
    return cart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentCart, product, quantity }) => {
    let cart = await context.$plentymarkets.api.addCartItem({ productId: product.variation.id, quantity });
    cart.items.find((cartItem) => cartItem.variationId === product.variation.id).variation = product;
    cart = migrateVariationData(currentCart, cart);
    return cart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentCart, product, customQuery }) => {
    let cart = await context.$plentymarkets.api.removeCartItem(product.id);
    cart = migrateVariationData(currentCart, cart);
    return cart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    let cart = await context.$plentymarkets.api.updateCartItemQty({ productId: product.variationId, cartItemId: product.id, quantity });
    cart = migrateVariationData(currentCart, cart);
    return cart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    let cart = await context.$plentymarkets.api.clear();
    cart = migrateVariationData(currentCart, cart);
    return cart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Mocked: useCart.applyCoupon');
    return {
      updatedCart: currentCart,
      updatedCoupon: {}
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Mocked: useCart.removeCoupon');
    return {
      updatedCart: currentCart
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInCart: (context: Context, { currentCart, product }) => {
    return Boolean(currentCart?.items?.find(cartItem => cartItem.variationId === product?.variation?.id));
  }
};

export const useCart = useCartFactory<Cart, CartItem, Product>(params);
