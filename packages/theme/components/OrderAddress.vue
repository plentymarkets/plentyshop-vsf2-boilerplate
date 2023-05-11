<template>
  <div class="address-summary">
    <div class="font-light">
      {{ address.name1 }}
      {{ address.name2 }}
      {{ address.name3 }}
      {{ address.name4 }}
    </div>
    <div class="font-light">
      {{ address.address1 }}
      {{ address.address2 }}
      {{ address.address3 }}
      {{ address.address4 }},
      {{ address.postalCode }}
    </div>
    <div class="font-light">
      {{ address.town }} {{ address.countryId }}
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api';
import { orderGetters, useOrder } from '@vue-storefront/plentymarkets';

export default {
  name: 'OrderAddress',

  props: {
    type: {
      type: String,
      default: () => 'shipping'
    }
  },

  setup(props) {
    const { order } = useOrder();

    const shippingAddress = () => {
      return orderGetters.getShippingAddress(order.value);
    };

    const billingAddress = () => {
      return orderGetters.getBillingAddress(order.value);
    };

    const address = computed(() => {
      return props.type === 'shipping' ? shippingAddress() : billingAddress();
    });

    return {
      address
    };

  }
};
</script>
