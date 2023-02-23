import { ApiClientExtension, apiClientFactory } from '@vue-storefront/core';
import axios, { AxiosInstance } from 'axios';
import { getProduct } from './api/getProduct';
import { getCategory } from './api/getCategory';
import { getFacet } from './api/getFacet';
import { getReview } from './api/getReview';
import { addWishlistItem, getWishlist, removeWishlistItem } from './api/getWishlist';
import { getSearch } from './api/getSearch';
import { deleteAddress, loadAddresses, saveAddress, setAddressAsDefault } from './api/getAddress';
import {
  addItem as addCartItem,
  getCart,
  removeItem as removeCartItem,
  updateItemQty as updateCartItemQty,
  clearCart,
  deleteCart
} from './api/getCart';
import { getSession } from './api/getSession';
import { getShippingProvider, selectShippingProvider } from './api/getShippingProvider';
import { changePassword, loginAsGuest, loginUser, logoutUser, registerUser } from './api/getUser';
import { getActiveShippingCountries } from './api/getActiveShippingCountries';
import { getPaymentProviders, setPaymentProvider } from './api/getPaymentProvider';
import { additionalInformation, executePayment, placeOrder, preparePayment } from './api/getOrder';
import { getOrders } from './api/getOrders';
import { getLegalInformation } from './api/getLegal';
import { Settings } from './types/apiMethods';
type Endpoints = unknown;
type onCreateResponse = {
  config: Settings,
  client: AxiosInstance
}

/**
 * Event flow
 * 1. cookieExtension     => beforeCreate  | before the call to the middleware is handled
 * 2. client.interceptors => request       | on axios client rest call
 * 3. client.interceptors => response      | after axios client rest call is done
 * 4. cookieExtension     => afterCall     | after the call to the middleware has finished
 */

let cookies: string | string[] = '';

const cookieBlacklist = ['domain', 'secure', 'httponly'];

// Filter list of cookie names that should be removed
const filterCookies = (cookies: string): string => {
  cookieBlacklist.forEach((blacklistedCookie) => {
    if (cookies.includes(blacklistedCookie)) {
      const start = cookies.indexOf(blacklistedCookie);
      const end = cookies.indexOf(';', start) + 1;
      cookies = cookies.replace(cookies.slice(start, end), '');
    }
  });
  return cookies;
};

function onCreate(settings: Settings): onCreateResponse {
  const client = axios.create({
    baseURL: settings.api.url,
    withCredentials: true,
    validateStatus: (status) => {
      return status >= 200 && status < 400 && status !== 226;
    }
  });

  // Add a response interceptor
  // Triggered after middleware gets a response from connected apis
  client.interceptors.response.use((response) => {
    const headers = response.headers['set-cookie'];
    if (headers && headers?.length > 0) {
      cookies = filterCookies(headers[0]);
    }
    return response;
  }, (error) => {
    return Promise.reject(error);
  });

  // Triggered before middleware executes a request
  client.interceptors.request.use((request) => {
    if (request.headers) {
      request.headers.cookie = Array.isArray(cookies) ? cookies[0] : cookies;
    }
    return request;
  }, (error) => {
    return Promise.reject(error);
  });

  return {
    config: settings,
    client
  };
}

const cookieExtension: ApiClientExtension = {
  name: 'cookieExtension',
  hooks: (req, res) => ({
    beforeCreate: ({ configuration }): unknown => {
      cookies = req.headers.cookie ?? '';
      return configuration;
    },
    afterCall: ({ response }): unknown => {
      res.set('set-cookie', cookies);
      cookies = '';
      return response;
    }
  })
};

const { createApiClient } = apiClientFactory<Settings, Endpoints>({
  onCreate,
  api: {
    getProduct,
    getCategory,
    getFacet,
    getReview,
    getWishlist,
    addWishlistItem,
    removeWishlistItem,
    getSearch,
    getCart,
    addCartItem,
    removeCartItem,
    updateCartItemQty,
    clearCart,
    deleteCart,
    getSession,
    loginUser,
    registerUser,
    logoutUser,
    changePassword,
    getShippingProvider,
    loginAsGuest,
    loadAddresses,
    saveAddress,
    deleteAddress,
    setAddressAsDefault,
    getActiveShippingCountries,
    getPaymentProviders,
    selectShippingProvider,
    setPaymentProvider,
    additionalInformation,
    preparePayment,
    placeOrder,
    getOrders,
    executePayment,
    getLegalInformation
  },
  extensions: [cookieExtension]
});

export {
  createApiClient
};
