<template>
  <SfSection
    :title-heading="title"
    class="section"
  >
    <SfLoader
      :class="{ loading }"
      :loading="loading"
    >
      <SfCarousel
        :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }"
        class="carousel"
      >
        <SfCarouselItem
          v-for="(product, i) in products"
          :key="i"
          class="carousel__item"
        >
          <SfProductCard
            :title="productGetters.getName(product)"
            :image="addBasePath(productGetters.getMiddleImage(product))"
            :regular-price="$n(productGetters.getFormattedPrice(productGetters.getRegularPrice(product)), 'currency')"
            :special-price="productGetters.getSpecialPrice(product) && $n(productGetters.getSpecialPrice(product), 'currency')"
            :max-rating="5"
            :score-rating="productGetters.getAverageRating(product)"
            :show-add-to-cart-button="true"
            :is-in-wishlist="isInWishlist({ product })"
            :is-added-to-cart="isInCart({ product })"
            :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
            class="product-card"
            :image-width="100"
            :image-height="100"
            @click:wishlist="!isInWishlist({ product }) ? addItemToWishlist({ product }) : removeProductFromWishlist(product)"
            @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
          />
        </SfCarouselItem>
      </SfCarousel>
    </SfLoader>
  </SfSection>
</template>

<script>
import {
  SfCarousel,
  SfProductCard,
  SfSection,
  SfLoader
} from '@storefront-ui/vue';
import { productGetters, useWishlist, wishlistGetters, useCart } from '@vue-storefront/plentymarkets';
import { computed } from '@vue/composition-api';
import { addBasePath } from '@vue-storefront/core';

export default {
  name: 'RelatedProducts',
  components: {
    SfCarousel,
    SfProductCard,
    SfSection,
    SfLoader
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean
    }
  },
  setup() {
    const { addItem: addItemToCart, isInCart } = useCart();
    const { addItem: addItemToWishlist, isInWishlist, removeItem: removeItemFromWishlist, wishlist } = useWishlist();
    const removeProductFromWishlist = (productItem) => {
      const productsInWishlist = computed(() => wishlistGetters.getItems(wishlist.value));
      const product = productsInWishlist.value.find(wishlistProduct => wishlistGetters.getId(wishlistProduct) === productGetters.getId(productItem));

      removeItemFromWishlist({ product });
    };

    return {
      productGetters,
      addItemToWishlist,
      isInWishlist,
      removeProductFromWishlist,
      addItemToCart,
      isInCart,
      addBasePath
    };
  }
};
</script>

<style lang="scss" scoped>
.section {
  margin-top: var(--spacer-base);
}

.carousel {
    margin: 0 calc(0 - var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.9375rem 0 2.4375rem 0;
  }
}

</style>
