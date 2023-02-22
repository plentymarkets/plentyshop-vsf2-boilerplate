<template>
  <div id="product">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="product">
      <LazyHydrate when-idle>
        <SfGallery
          :image-width="100"
          :image-height="100"
          :images="productGallery"
          class="product__gallery"
        />
      </LazyHydrate>

      <div class="product__info">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="3"
            class="sf-heading--no-underline sf-heading--left"
          />
          <SfIcon
            icon="drag"
            size="xxl"
            color="var(--c-text-disabled)"
            class="product__drag-icon smartphone-only"
          />
        </div>
        <div class="product__price-and-rating">
          <SfPrice
            :regular="$n(productGetters.getPrice(product).regular, 'currency')"
            :special="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
          />
          <div>
            <div class="product__rating">
              <SfRating
                :score="averageRating"
                :max="5"
              />
              <a
                v-if="!!totalReviews"
                href="#"
                class="product__count"
              >
                ({{ totalReviews }})
              </a>
            </div>
            <SfButton class="sf-button--text">
              {{ $t('Product.Read all reviews') }}
            </SfButton>
          </div>
        </div>
        <div>
          <div
            class="product__description desktop-only"
            v-html="productGetters.getShortDescription(product)"
          />
          <SfButton class="sf-button--text desktop-only product__guide">
            {{ $t('Product.Size guide') }}
          </SfButton>

          <AttributeSelection @selection-changed="attributeSelectionChanged($event)" />

          <SfAddToCart
            v-model="qty"
            :data-e2e="'product_add-to-cart'"
            :stock="stock"
            :disabled="loading || !isAttributeSelectionValid"
            :can-add-to-cart="stock > 0"
            class="product__add-to-cart"
            @click="addItem({ product, quantity: parseInt(qty) })"
          />
        </div>

        <LazyHydrate when-idle>
          <SfTabs
            :open-tab="1"
            class="product__tabs"
          >
            <SfTab :title="$t('Product.Description')">
              <div
                class="product__description"
                v-html="productGetters.getDescription(product)"
              />
              <SfProperty
                v-for="(property, i) in properties"
                :key="i"
                :name="property.name"
                :value="property.value"
                class="product__property"
              >
                <template
                  v-if="property.name === 'Category'"
                  #value
                >
                  <SfButton class="product__property__button sf-button--text">
                    {{ property.value }}
                  </SfButton>
                </template>
              </SfProperty>
            </SfTab>
            <SfTab :title="$t('Product.Read reviews')">
              <SfReview
                v-for="review in reviews"
                :key="reviewGetters.getReviewId(review)"
                :author="reviewGetters.getReviewAuthor(review)"
                :date="reviewGetters.getReviewDate(review)"
                :message="reviewGetters.getReviewMessage(review)"
                :max-rating="5"
                :rating="reviewGetters.getReviewRating(review)"
                :char-limit="250"
                read-more-text="Read more"
                hide-full-text="Read less"
                class="product__review"
              />
            </SfTab>
            <SfTab
              :title="$t('Product.Additional information')"
              class="product__additional-info"
            >
              <div
                class="product__additional-info"
                v-html="productGetters.getTechnicalData(product)"
              />
            </SfTab>
          </SfTabs>
        </LazyHydrate>
      </div>
    </div>

    <LazyHydrate when-visible>
      <RelatedProducts
        :products="relatedProducts"
        :loading="relatedLoading"
        :title="$t('Product.Match it with')"
      />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate>
  </div>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfIcon,
  SfReview,
  SfBreadcrumbs,
  SfButton
} from '@storefront-ui/vue';

import AttributeSelection from '~/components/AttributeSelection.vue';
import InstagramFeed from '~/components/InstagramFeed.vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import { ref, computed, useRoute } from '@nuxtjs/composition-api';
import { useProduct, useCart, productGetters, useReview, reviewGetters, useCategory } from '@vue-storefront/plentymarkets';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import { addBasePath } from '@vue-storefront/core';
import { useUiHelpers } from '~/composables';

export default {
  name: 'Product',
  components: {
    SfProperty,
    SfHeading,
    SfPrice,
    SfRating,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    RelatedProducts,
    LazyHydrate,
    AttributeSelection
  },
  transition: 'fade',
  setup() {
    const qty = ref(1);
    const route = useRoute();
    const th = useUiHelpers();
    const { products, search } = useProduct('products');
    const { products: relatedProducts, search: searchRelatedProducts, loading: relatedLoading } = useProduct('relatedProducts');
    const { addItem, loading } = useCart();
    const { reviews: productReviews, search: searchReviews } = useReview('productReviews');
    const { categories: breadcrumbCategories } = useCategory('categories');

    const id = computed(() => route.value.params.id);
    const product = computed(() => productGetters.getFiltered(products.value, { master: true, attributes: route.value.query })[0]);
    const categories = computed(() => productGetters.getCategoryIds(product.value));
    const reviews = computed(() => reviewGetters.getItems(productReviews.value));

    // TODO: Breadcrumbs are temporary disabled because productGetters return undefined. We have a mocks in data
    const breadcrumbs = computed(() => productGetters.getBreadcrumbs(product.value, breadcrumbCategories.value));
    const productGallery = computed(() => productGetters.getGallery(product.value).map(img => ({
      mobile: { url: addBasePath(img.small) },
      desktop: { url: addBasePath(img.normal) },
      big: { url: addBasePath(img.big) },
      alt: productGetters.getName(product.value)
    })));

    const isAttributeSelectionValid = ref(true);
    const attributeSelectionChanged = (value) => {
      if (value) {
        isAttributeSelectionValid.value = true;
        th.changeAttributeSelection(value);
      } else {
        isAttributeSelectionValid.value = false;
      }
    };

    onSSR(async () => {
      await search({ id: id.value });

      await searchRelatedProducts({ catId: [categories.value[0]], limit: 8 });
      await searchReviews({ productId: productGetters.getItemId(product.value) });
    });

    return {
      product,
      reviews,
      reviewGetters,
      averageRating: computed(() => productGetters.getAverageRating(product.value)),
      totalReviews: computed(() => productGetters.getTotalReviews(product.value)),
      relatedProducts: computed(() => productGetters.getFiltered(relatedProducts.value, { master: true })),
      relatedLoading,
      qty,
      addItem,
      loading,
      productGetters,
      productGallery,
      breadcrumbs,
      attributeSelectionChanged,
      isAttributeSelectionValid
    };
  },
  data() {
    return {
      stock: 5,
      properties: [
        {
          name: 'Product Code',
          value: '578902-00'
        },
        {
          name: 'Category',
          value: 'Pants'
        },
        {
          name: 'Material',
          value: 'Cotton'
        },
        {
          name: 'Country',
          value: 'Germany'
        }
      ],
      description: 'Find stunning women cocktail and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.',
      detailsIsActive: false,
      brand:
          'Brand name is the perfect pairing of quality and design. This label creates major everyday vibes with its collection of modern brooches, silver and gold jewellery, or clips it back with hair accessories in geo styles.',
      careInstructions: 'Do not wash!'
    };
  }
};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}
.product {
  @include for-desktop {
    display: flex;
  }
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
