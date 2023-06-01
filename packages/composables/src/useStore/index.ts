import { Store } from '@vue-storefront/plentymarkets-api';
import { Context, useStoreFactory } from '@vue-storefront/core';

export const useStore = useStoreFactory<Store>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load(context: Context, params) {
    // @TODO implement useStore.load
    return Promise.resolve({});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  change(context: Context, params) {
    // @TODO implement useStore.change
    return Promise.resolve({});
  }
});
