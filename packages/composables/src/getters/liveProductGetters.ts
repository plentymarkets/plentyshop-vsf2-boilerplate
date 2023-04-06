import type { LiveProductResponse } from '@vue-storefront/plentymarkets-api';

function getName(item: LiveProductResponse): string {
  return item?.item?.texts?.name1 ?? '';
}

export const liveProductGetters = {
  getName,
};
