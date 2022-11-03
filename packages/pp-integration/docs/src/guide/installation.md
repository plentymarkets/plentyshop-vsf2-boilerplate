# Installation

To install PayPal integration for the plentymarkets module in your Vue Storefront application, use the following command:

<code-group>
  <code-block title="YARN">
  ```bash
  yarn add @vsf-enterprise/pp-plentymarkets
  ```
  </code-block>

  <code-block title="NPM">
  ```bash
  npm install @vsf-enterprise/pp-plentymarkets --save
  ```
  </code-block>
</code-group>

## Setup

Add `@vsf-enterprise/pp-plentymarkets` to `dev` and `prod` arrays in `useRawSource` object:

```javascript{11,16}
// nuxt.config.js

export default {
  buildModules: [
    ['@vue-storefront/nuxt', {
      coreDevelopment: true,
      useRawSource: {
        dev: [
          '@vue-storefront/plentymarkets',
          '@vue-storefront/core',
          '@vsf-enterprise/pp-plentymarkets'
        ],
        prod: [
          '@vue-storefront/plentymarkets',
          '@vue-storefront/core',
          '@vsf-enterprise/pp-plentymarkets'
        ]
      }
    }]
  ]
};
```

Register the `@vsf-enterprise/pp-plentymarkets/nuxt` module with the following configuration:

```javascript
// nuxt.config.js

export default {
  modules: [
    ['@vsf-enterprise/pp-plentymarkets/nuxt', {}]
  ]
};
```

:::tip
If you are also using the `nuxt-i18n` module, you must register both packages in the proper order. You can read more about it [here](https://docs.vuestorefront.io/v2/reference/migrate/2.5.0/overview.html#changes-in-the-internal-internationalization-logic).

Generally, we recommend placing the `@vsf-enterprise/pp-plentymarkets/nuxt` module at the very top of the array.
:::

TODO: Describe additional configuration inside `nuxt.config.js`.

Add `@vsf-enterprise/pp-plentymarkets/server` integration to the middleware with the following configuration:

```javascript
// middleware.config.js

module.exports = {
  integrations: {
    // ...
    pp: {
      location: '@vsf-enterprise/pp-plentymarkets/server',
      configuration: {
        // TODO
      }
    }
  }
}
```

TODO: Describe additional configuration inside `middleware.config.js`.

## Usage on the frontend

Add `PaymentPaypalProvider.vue` components to the last step of the checkout process.

```vue{3-5,10,14}
<template>
  <div>
    <PaymentPaypalProvider
      :afterPay="afterPayAndOrder"
    />
  </div>
</template>

<script>
import PaymentPaypalProvider from '@vsf-enterprise/pp-plentymarkets/src/components/PaymentPaypalProvider';

export default {
  components: {
    PaymentPaypalProvider
  }
};
</script>
```

`afterPay` props expect a callback function called after authorizing the payment is authorized and placing an order. You can redirect the user to the order confirmation page and clear the cart inside this callback.

```vue
<script>
export default {
  setup() {
    const afterPayAndOrder = ({ order }) => {
      router.push({ path: localePath(`/checkout/thank-you?order=${order.id}`) });
      setCart(null);
    };

    return {
      afterPayAndOrder
    };
  }
};
</script>
```

`afterPay` signature:
```ts
(params: TODO) => TODO;
```

## Placing an order

The integration will place an order in plentymarkets and add the `order` object to the response if the transaction is authorized. It only makes one request from the client to finalize/authorize payment and make an order.

## Webhook

In PayPal's dashboard, add a webhook with the following configuration:

* Webhook URL: `https://<your_vsf2_app_domain>/api/pp/webhook`,

TODO: Add details

## Testing webhook locally

If you want to check if webhook works during local development, use the [`ngrok`](https://ngrok.com/) or [`localtunnel`](https://github.com/localtunnel/localtunnel#quickstart) tools and set Sandbox Webhook URL to generated tunnel's URL.
