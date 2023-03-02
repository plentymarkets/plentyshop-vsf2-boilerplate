import { Cart, ShippingMethod, ShippingProvider, ShippingProviderGetters } from '@vue-storefront/plentymarkets-api';

function getShippingProviders(shippingProvider: ShippingProvider): ShippingMethod[] {
  return shippingProvider?.list ?? [];
}

function getShippingMethodName(shippingMethod: ShippingMethod): string {
  return `${shippingMethod?.parcelServiceName} - ${shippingMethod?.parcelServicePresetName}`;
}

function getShippingMethodsLength(shippingMethods: ShippingMethod[] ): number {
  return shippingMethods.length;
}

function getShippingAmount(shippingMethod: ShippingMethod): string {
  return shippingMethod?.shippingAmount?.toString() ?? '0';
}

function getValue(shippingMethod: ShippingMethod): ShippingMethod {
  return shippingMethod;
}

function getParcelServicePresetId(shippingMethod: ShippingMethod): string {
  return shippingMethod?.parcelServicePresetId?.toString() ?? '0';
}

function getShippingProfileId(cart: Cart): string {
  return cart?.shippingProfileId?.toString();
}

export const shippingProviderGetters: ShippingProviderGetters = {
  getShippingMethodName,
  getShippingAmount,
  getShippingProviders,
  getParcelServicePresetId,
  getValue,
  getShippingProfileId,
  getShippingMethodsLength
};