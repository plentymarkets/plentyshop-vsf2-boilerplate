import type { User, UserRegisterParams } from '@vue-storefront/plentymarkets-api';
import { useCart } from 'src/useCart';
import { useWishlist } from 'src/useWishlist';
import {sharedRef, useVSFContext} from '@vue-storefront/core';
import {computed, Ref} from '@nuxtjs/composition-api';

interface useUserInterface {
  load: () => Promise<User|null>
  login: ({ username, password }) => Promise<User>
  logout: () => Promise<void>
  register: (params: UserRegisterParams) => Promise<User>
  changePassword: (params) => Promise<User>
  loading: Ref<boolean>
  error: Ref<object>
  user: Ref<User>
  isGuest: Ref<boolean>
  isAuthenticated: Ref<boolean>
}

export const useUser = (): useUserInterface => {
  const context = useVSFContext();
  const { setWishlist } = useWishlist();
  const { setCart } = useCart();

  const user = sharedRef<User>(null, 'useUser-user');
  const isGuest = sharedRef(false, 'useUser-isGuest');
  const isAuthenticated = sharedRef(false, 'useUser-isAuthenticated');
  const error = sharedRef({
    login: null,
    register: null,
    changePassword: null
  }, 'useUser-error');
  const loading = sharedRef(false, 'useUser-loading');

  const resetErrors = (): void => {
    error.value.login = null;
    error.value.register = null;
    error.value.changePassword = null;
  };

  const load = async (): Promise<User|null> => {
    const data = await context.$plentymarkets.api.getSession(true);

    if (data.user && data.user.guestMail) {
      isGuest.value = true;
      return null;
    } else if (data.user) {
      isGuest.value = false;
      isAuthenticated.value = true;
    }

    user.value = data.user;

    return data.user;
  };

  const login = async ({ username, password }): Promise<User> => {
    loading.value = true;
    resetErrors();

    try {
      await context.$plentymarkets.api.loginUser(username, password);

      const wishlist = await context.$plentymarkets.api.getWishlist();
      const cart = await context.$plentymarkets.api.getCart();

      setWishlist(wishlist);
      setCart(cart);
    } catch (e) {
      error.value.login = e.message;
    }

    // TODO: remove this when events are implemented
    const data = await context.$plentymarkets.api.getSession(true);

    user.value = data.user;
    isGuest.value = false;
    isAuthenticated.value = Boolean(data.user);
    loading.value = false;

    return data.user;
  };

  const logout = async (): Promise<void> => {
    await context.$plentymarkets.api.logoutUser();

    user.value = null;
    setWishlist({ items: [] });
  };

  const register = async (params: UserRegisterParams): Promise<User> => {
    loading.value = true;
    resetErrors();

    if (!params.password || params.password.length === 0) {
      await context.$plentymarkets.api.loginAsGuest(params.email);
      isAuthenticated.value = false;
      isGuest.value = true;
      loading.value = false;

      return null;
    } else {
      try {
        const data = await context.$plentymarkets.api.registerUser(params);

        // catch 226 email already exists
        if (data.status && data.status !== 200) {
          error.value.register = data.message;
          loading.value = false;
          return null;
        }

        isGuest.value = false;
        isAuthenticated.value = true;
        user.value = data.data;

        const wishlist = await context.$plentymarkets.api.getWishlist();
        const cart = await context.$plentymarkets.api.getCart();

        setWishlist(wishlist);
        setCart(cart);

        return data.data || null;
      } catch (e) {
        error.value.register = e;
      } finally {
        loading.value = false;
      }
    }
  };

  const changePassword = async (params): Promise<User> => {
    resetErrors();
    loading.value = true;

    try {
      await context.$plentymarkets.api.changePassword(params.current, params.new);
    } catch (e) {
      error.value.changePassword = e;
    }

    const data = await context.$plentymarkets.api.getSession(false);

    loading.value = false;
    return data.user;
  };

  return {
    load,
    login,
    logout,
    user: computed(() => user.value),
    loading: computed(() => loading.value),
    register,
    changePassword,
    error: computed(() => error.value),
    isGuest: computed(() => isGuest.value),
    isAuthenticated: computed(() => isAuthenticated.value)
  };
};
