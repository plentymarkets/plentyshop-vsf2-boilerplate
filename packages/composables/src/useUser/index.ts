import type { User, UserRegisterParams } from '@vue-storefront/plentymarkets-api';
import { useCart } from 'src/useCart';
import { useWishlist } from 'src/useWishlist';

import type {
  UseUserUpdateParams as UpdateParams,
  UseUserRegisterParams as RegisterParams
} from '../types';
import {Context, sharedRef, useVSFContext} from "@vue-storefront/core";
import {computed, ref} from "@nuxtjs/composition-api";

export const useUser = (): any => {
  const context = useVSFContext();
  const { setWishlist } = useWishlist();
  const { setCart } = useCart();

  const user = sharedRef<User>(null, 'useUser-user');
  const isGuest = sharedRef(false, 'useUser-isGuest');
  const isAuthenticated = sharedRef(false, 'useUser-isAuthenticated');
  const error = sharedRef({
    login: null,
    register: null
  }, 'useUser-error');
  const loading = ref(false);

  const load = async () => {
    const data = await context.$plentymarkets.api.getSession(true);

    if (data.user && data.user.guestMail) {
      isGuest.value = true;
      return null;
    }
    else
    {
      if (data.user) {
        isGuest.value = false;
        isAuthenticated.value = true;
      }
    }

    user.value = data.user;

    return data.user;
  };

  const login = async ({ username, password }) => {
    loading.value = true;

    try {
      await context.$plentymarkets.api.loginUser(username, password);

      const wishlist = await context.$plentymarkets.api.getWishlist();
      const cart = await context.$plentymarkets.api.getCart();

      setWishlist(wishlist);
      setCart(cart);
      error.value.login = null;
    }
    catch (e) {
      error.value.login = e;
    }

    // TODO: remove this when events are implemented
    const data = await context.$plentymarkets.api.getSession(true);

    user.value = data.user;
    isGuest.value = false;
    isAuthenticated.value = !!data.user;
    loading.value = false;

    return data.user;
  };

  const logout = async () => {
    await context.$plentymarkets.api.logoutUser();

    user.value = null;
    setWishlist({ items: [] });
    // @ts-ignore
    setCart({ items: [] });
  };

  const updateUser = async ({ currentUser, updatedUserData }) => {
    // @TODO implement useUser.updateUser
    return {};
  };

  const register = async (params: UserRegisterParams): Promise<User> => {
    let data;
    loading.value = true;

    if (!params.password || params.password.length === 0) {
      await context.$plentymarkets.api.loginAsGuest(params.email);
      isAuthenticated.value = false;
      isGuest.value = true;

      return null;
    } else {
      try {
        data = await context.$plentymarkets.api.registerUser(params);
        const wishlist = await context.$plentymarkets.api.getWishlist();
        const cart = await context.$plentymarkets.api.getCart();

        setWishlist(wishlist);
        setCart(cart);

        isGuest.value = false;
        isAuthenticated.value = !!data.data;
        error.value.register = null;
      }
      catch (e) {
        error.value.register = e;
      }

      loading.value = false;
      user.value = data.data;

      return data.data || null;
    }
  };

  const changePassword = async ({ currentPassword, newPassword }) => {
    await context.$plentymarkets.api.changePassword(currentPassword, newPassword);
    const data = await context.$plentymarkets.api.getSession(false);

    return data.user;
  }

  return {
    load,
    login,
    logout,
    user: computed(() => user.value),
    loading: computed(() => loading.value),
    updateUser,
    register,
    changePassword,
    error: computed(() => error.value),
    isGuest: computed(() => isGuest.value),
    isAuthenticated: computed(() => isAuthenticated.value)
  }
}