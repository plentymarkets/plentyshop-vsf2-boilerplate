<template>
  <img v-if="propertyGetters.isImage(property)" :src="'https://cdn02.plentymarkets.com/kmqpidx3aw6i/propertyItems/'+propertyGetters.getPropertyValue(property)" alt="" >
  <video v-else-if="propertyGetters.isMP4File(property)" controls>
    <source :src="'https://cdn02.plentymarkets.com/kmqpidx3aw6i/propertyItems/'+propertyGetters.getPropertyValue(property)" type="video/mp4">
  </video>
  <div v-else-if="propertyGetters.isHTML(property)"></div>
  <SfProperty
    v-else-if="propertyGetters.isText(property)"
    :name="propertyGetters.getPropertyName(property)"
    :value="propertyGetters.getPropertyValue(property)"
    class="product__property"
  ></SfProperty>
</template>

<script>
  import {
    SfProperty
  } from '@storefront-ui/vue';

  import {
    propertyGetters
  } from '@vue-storefront/plentymarkets';

  export default {
    name: 'Property',
    components: {
      SfProperty
    },
    setup() {
      return {
        propertyGetters
      }
    },
    props: {
      property: {
        type: Object,
        default: null
      }
    }
  };
</script>

<style scoped>

</style>
