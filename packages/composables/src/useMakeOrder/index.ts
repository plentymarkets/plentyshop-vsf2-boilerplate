import {
  Context,
  useMakeOrderFactory,
  UseMakeOrderFactoryParams
} from '@vue-storefront/core';
import type { Order, MakeOrderParams } from '@vue-storefront/plentymarkets-api';

const factoryParams: UseMakeOrderFactoryParams<Order> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  make: async (context: Context, params: MakeOrderParams): Promise<Order> => {
    await context.$plentymarkets.api.additionalInformation({
      orderContactWish: null,
      orderCustomerSign: null,
      shippingPrivacyHintAccepted: params.shippingPrivacyHintAccepted,
      templateType: 'checkout'
    });

    const preparePaymentResponse = await context.$plentymarkets.api.preparePayment();

    const paymentType = preparePaymentResponse.type || 'errorCode';
    const paymentValue = preparePaymentResponse.value || '""';

    switch (paymentType) {
      case 'continue':
        const data: Order = await context.$plentymarkets.api.placeOrder();

        await context.$plentymarkets.api.executePayment(data.order.id, params.paymentId);

        // await context.$plentymarkets.api.deleteCart(context);
        return data;
      case 'redirectUrl':
        // redirect to given payment provider
        window.location.assign(paymentValue);
        break;
      case 'externalContentUrl':
        // show external content in iframe
        break;
      case 'htmlContent':
        break;

      case 'errorCode':
        // NotificationService.error(paymentValue);
        break;
      default:
        // NotificationService.error("Unknown response from payment provider: " + paymentType);
        break;
    }
  }
};

export const useMakeOrder = useMakeOrderFactory<Order>(factoryParams);
