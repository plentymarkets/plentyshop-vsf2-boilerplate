import {
  Context,
  useMakeOrderFactory,
  UseMakeOrderFactoryParams
} from '@vue-storefront/core';
import type { CreateOrderResponse, Order } from '@vue-storefront/plentymarkets-api';

const factoryParams: UseMakeOrderFactoryParams<Order> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  make: async (context: Context, params: any): Promise<Order> => {
    await context.$plentymarkets.api.additionalInformation({
      orderContactWish: null,
      orderCustomerSign: null,
      shippingPrivacyHintAccepted: false,
      templateType: 'checkout'
    });

    const preparePaymentResponse = await context.$plentymarkets.api.preparePayment();

    const paymentType = preparePaymentResponse.type || 'errorCode';
    const paymentValue = preparePaymentResponse.value || '""';
    switch (paymentType) {
      case 'continue':
        const order: CreateOrderResponse = await context.$plentymarkets.api.placeOrder();
        await context.$plentymarkets.api.executePayment(order.data.order.id, params.paymentId);
        await context.$plentymarkets.api.deleteCart(context);

        return order.data;
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
