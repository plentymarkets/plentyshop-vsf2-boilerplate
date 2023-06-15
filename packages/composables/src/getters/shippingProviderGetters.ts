import {
  Cart,
  ShippingMethod,
  ShippingPrivacyInformation,
  ShippingProvider,
  ShippingProviderGetters
} from '@vue-storefront/plentymarkets-api';

function getShippingProviders(shippingProvider: ShippingProvider): ShippingMethod[] {
  return shippingProvider?.list ?? [];
}

function getShippingMethodName(shippingMethod: ShippingMethod): string {
  return `${shippingMethod?.parcelServiceName} - ${shippingMethod?.parcelServicePresetName}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingMethodImage(shippingMethod: ShippingMethod): string {
  // TODO: Shipping method should contain brand image!
  return 'https://placehold.co/60x60';
}

function getShippingPrivacyInformation(shippingMethod: ShippingMethod): ShippingPrivacyInformation {
  return shippingMethod?.shippingPrivacyInformation[0];
}

function getDataPrivacyAgreementHint(shippingMethod: ShippingMethod): boolean {
  return shippingMethod?.shippingPrivacyInformation[0]?.showDataPrivacyAgreementHint;
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
  getShippingMethodImage,
  getShippingPrivacyInformation,
  getDataPrivacyAgreementHint,
  getShippingAmount,
  getShippingProviders,
  getParcelServicePresetId,
  getValue,
  getShippingProfileId
};
