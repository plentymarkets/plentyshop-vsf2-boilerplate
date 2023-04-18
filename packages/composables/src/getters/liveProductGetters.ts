import type { LiveProductResponse } from '@vue-storefront/plentymarkets-api';

function getName(item: LiveProductResponse): string {
  return item?.item?.texts?.name1 ?? '';
}

function getCoverImage(item: LiveProductResponse): string {
  return item?.item?.images?.all[0].urlMiddle ?? '';
}

function getRegularPrice(item: LiveProductResponse): string {
  return item?.item?.prices?.default?.price?.formatted ?? '';
}

function getQuantityLeft(item: LiveProductResponse): number {
  return item?.liveShopping?.quantityMax - item?.liveShopping?.quantitySold;
}

function getTimeLeft(item: LiveProductResponse): number {
  return Number(item?.liveShopping?.toTime);
}

function getRrpPrice(item: LiveProductResponse): string {
  return item?.item?.prices?.rrp?.price?.formatted ?? '';
}

function getId(item: LiveProductResponse): number {
  return Number(item?.item?.variation?.id);
}
function getSlug(item: LiveProductResponse): string {
  return item?.item?.texts?.name1.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');;
}
// http://192.168.0.169:3000/p/1001/
export const liveProductGetters = {
  getName,
  getCoverImage,
  getRegularPrice,
  getQuantityLeft,
  getTimeLeft,
  getSlug,
  getId,
  getRrpPrice,
};
