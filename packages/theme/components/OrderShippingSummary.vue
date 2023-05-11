<template>
  <div class="shipping-summary">
    <SfHeading
      :title="$t('ThankYou.Shipping Summary')"
      class="mb-10 order__heading heading sf-heading--left order-summary-title"
      :level="3"
    />

    <p class="font-bold">
      {{ $t('ThankYou.Ship To') }}
    </p>

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
import { SfButton } from '@storefront-ui/vue';

export default {
  name: 'OrderShippingSummary',
  components: { SfButton },
  props: {
    address: {
      type: Array,
      default: () => []
    }
  },

  setup() {


  }
};
</script>

<style scoped>

</style>
