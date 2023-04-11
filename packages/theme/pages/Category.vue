<template>
  <div id="category">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="navbar section">
      <div class="navbar__aside desktop-only">
        <LazyHydrate never>
          <SfHeading
            :level="3"
            :title="$t('Category.Categories')"
            class="navbar__title"
          />
        </LazyHydrate>
      </div>
      <CategoryPageHeader :pagination="pagination" />
    </div>

    <div class="main section">
      <div class="sidebar desktop-only">
        <LazyHydrate when-idle>
          <SfLoader
            :class="{ 'loading--categories': loading }"
            :loading="loading"
          >
            <SfAccordion
              v-e2e="'categories-accordion'"
              :open="activeCategory"
              :show-chevron="true"
            >
              <SfAccordionItem
                v-for="(cat, i) in categoryTree && categoryGetters.getTreeItems(categoryTree)"
                :key="i"
                :header="categoryGetters.getLabel(cat)"
              >
                <SfList class="list">
                  <SfListItem class="list__item">
                    <SfMenuItem
                      :count="categoryGetters.getCount(cat)"
                      :label="categoryGetters.getLabel(cat)"
                    >
                      <template #label>
                        <nuxt-link
                          :to="localePath(th.getCatLink(cat))"
                          :class="cat.isCurrent ? 'sidebar--cat-selected' : ''"
                        >
                          All
                        </nuxt-link>
                      </template>
                    </SfMenuItem>
                  </SfListItem>
                  <SfListItem
                    v-for="(subCat, j) in categoryGetters.getItems(cat)"
                    :key="j"
                    class="list__item"
                  >
                    <SfMenuItem
                      :count="categoryGetters.getCount(subCat)"
                      :label="categoryGetters.getLabel(subCat)"
                    >
                      <template #label="{ label }">
                        <nuxt-link
                          :to="localePath(th.getCatLink(subCat))"
                          :class="subCat.isCurrent ? 'sidebar--cat-selected' : ''"
                        >
                          {{ label }}
                        </nuxt-link>
                      </template>
                    </SfMenuItem>
                  </SfListItem>
                </SfList>
              </SfAccordionItem>
            </SfAccordion>
          </SfLoader>
        </LazyHydrate>
      </div>
      <SfLoader
        :class="{ loading }"
        :loading="loading"
      >
        <div
          v-if="!loading"
          class="products"
        >
          <transition-group
            v-if="isCategoryGridView"
            appear
            name="products__slide"
            tag="div"
            class="products__grid"
          >
            <SfProductCard
              v-for="(product, i) in products"
              :key="productGetters.getSlug(product)"
              :data-e2e="'category-product-card'"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :image-width="100"
              :image-height="100"
              :image="addBasePath(productGetters.getCoverImage(product))"
              :regular-price="$n(productGetters.getRegularPrice(product), 'currency')"
              :special-price="productGetters.getSpecialPrice(product) && $n(productGetters.getSpecialPrice(product), 'currency')"
              :max-rating="5"
              :score-rating="productGetters.getAverageRating(product)"
              :show-add-to-cart-button="true"
              :is-in-wishlist="isInWishlist({ product })"
              :is-added-to-cart="isInCart({ product })"
              :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              class="products__product-card"
              @click:wishlist="!isInWishlist({ product }) ? addItemToWishlist({ product }) : removeProductFromWishlist(product)"
              @click:add-to-cart="addToCart({ product, quantity: 1 })"
            />
          </transition-group>
          <transition-group
            v-else
            appear
            name="products__slide"
            tag="div"
            class="products__list"
          >
            <SfProductCardHorizontal
              v-for="(product, i) in products"
              :key="productGetters.getSlug(product)"
              :data-e2e="'category-product-card'"
              class="products__product-card-horizontal"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :image-width="100"
              :image-height="100"
              :description="productGetters.getDescription(product)"
              :image="addBasePath(productGetters.getCoverImage(product))"
              :regular-price="$n(productGetters.getRegularPrice(product), 'currency')"
              :special-price="productGetters.getSpecialPrice(product) && $n(productGetters.getSpecialPrice(product), 'currency')"
              :max-rating="5"
              :score-rating="3"
              :qty="1"
              :is-in-wishlist="isInWishlist({ product })"
              :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              @input="productsQuantity[product._id] = $event"
              @click:wishlist="!isInWishlist({ product }) ? addItemToWishlist({ product }) : removeProductFromWishlist(product)"
              @click:add-to-cart="addToCart({ product, quantity: Number(productsQuantity[product._id]) })"
            >
              <template #configuration>
                <SfProperty
                  class="desktop-only"
                  name="Size"
                  value="XS"
                  style="margin: 0 0 1rem 0;"
                />
                <SfProperty
                  class="desktop-only"
                  name="Color"
                  value="white"
                />
              </template>
              <template #actions>
                <SfButton
                  class="sf-button--text desktop-only"
                  style="margin: 0 0 1rem auto; display: block;"
                  @click="() => {}"
                >
                  {{ $t('Category.Save for later') }}
                </SfButton>
              </template>
            </SfProductCardHorizontal>
          </transition-group>

          <LazyHydrate on-interaction>
            <SfLoader
              :class="{ loading }"
              :loading="loading"
            >
              <SfPagination
                v-if="!loading"
                v-show="paginationGetters.getTotalPages(pagination) > 1"
                class="products__pagination desktop-only"
                :current="pagination.currentPage"
                :total="paginationGetters.getTotalPages(pagination)"
                :visible="5"
              />
            </SfLoader>
          </LazyHydrate>

          <div
            v-show="paginationGetters.getTotalPages(pagination) > 1"
            class="products__show-on-page"
          >
            <span class="products__show-on-page__label">{{ $t('Category.Show on page') }}</span>
            <LazyHydrate on-interaction>
              <SfSelect
                :value="paginationGetters.getItemsPerPageAsString(pagination)"
                class="products__items-per-page"
                @input="th.changeItemsPerPage"
              >
                <SfSelectOption
                  v-for="option in pagination.pageOptions"
                  :key="option"
                  :value="option"
                  class="products__items-per-page__option"
                >
                  {{ option }}
                </SfSelectOption>
              </SfSelect>
            </LazyHydrate>
          </div>
        </div>
      </SfLoader>
    </div>
  </div>
</template>

<script>
import {
  SfButton,
  SfList,
  SfHeading,
  SfMenuItem,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfSelect,
  SfBreadcrumbs,
  SfLoader,
  SfProperty
} from '@storefront-ui/vue';
import { computed, ref } from '@nuxtjs/composition-api';
import { useCart, useWishlist, useCategory, productGetters, categoryGetters, paginationGetters, useFacet, facetGetters, wishlistGetters } from '@vue-storefront/plentymarkets';
import { useUiHelpers, useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import CategoryPageHeader from '~/components/CategoryPageHeader';
import { addBasePath } from '@vue-storefront/core';

// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default {
  components: {
    CategoryPageHeader,
    SfButton,
    SfList,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfSelect,
    SfBreadcrumbs,
    SfLoader,
    SfHeading,
    SfProperty,
    LazyHydrate
  },
  transition: 'fade',
  setup(props, context) {
    const th = useUiHelpers();
    const uiState = useUiState();
    const { addItem: addItemToCart, isInCart } = useCart();
    const { result, search, loading, error } = useFacet();
    const { addItem: addItemToWishlist, isInWishlist, removeItem: removeItemFromWishlist, wishlist } = useWishlist();
    const { categories } = useCategory('categories');

    const productsQuantity = ref({});
    const products = computed(() => facetGetters.getProducts(result.value));
    const categoryTree = computed(() => facetGetters.getCategoryTree(result.value));
    const breadcrumbs = computed(() => facetGetters.getBreadcrumbs(result.value, categories.value));
    const pagination = computed(() => facetGetters.getPagination(result.value));
    const activeCategory = computed(() => {
      const items = categoryTree.value.items;

      if (!items || !items.length) {
        return '';
      }

      const category = items.find(({ isCurrent, items }) => isCurrent || items.find(({ isCurrent }) => isCurrent));

      return category?.label || items[0].label;
    });

    const removeProductFromWishlist = (productItem) => {
      const productsInWhishlist = computed(() => wishlistGetters.getItems(wishlist.value));
      const product = productsInWhishlist.value.find(wishlistProduct => wishlistGetters.getId(wishlistProduct) === productGetters.getId(productItem));

      removeItemFromWishlist({ product });
    };

    const addToCart = ({ product, quantity }) => {
      addItemToCart({
        // TODO only pass needed attrs?
        product,
        quantity
      });
    };

    onSSR(async () => {
      await search(th.getFacetsFromURL());
      if (error?.value?.search) context.root.$nuxt.error({ statusCode: 404 });
    });

    return {
      ...uiState,
      th,
      products,
      categoryTree,
      loading,
      paginationGetters,
      categoryGetters,
      productGetters,
      pagination,
      activeCategory,
      breadcrumbs,
      addItemToWishlist,
      removeProductFromWishlist,
      isInWishlist,
      addToCart,
      isInCart,
      productsQuantity,
      addBasePath
    };
  }
};
</script>

<style lang="scss" scoped>
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}

@include for-mobile {
  ::v-deep .sf-image--placeholder {
    width: 5.3125rem;
    height: 7.0625rem;
  }
}

.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }
  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }
}
.main {
  display: flex;
}
.list {
  --menu-item-font-size: var(--font-size--sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }
    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid {
    justify-content: center;
    @include for-desktop {
      justify-content: flex-start;
    }
  }
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__product-card {
    --product-card-title-margin: var(--spacer-base) 0 0 0;
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 0 0;
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }
  &__product-card-horizontal {
    flex: 0 0 100%;
    @include for-mobile {
      ::v-deep .sf-image {
        --image-width: 5.3125rem;
        --image-height: 7.0625rem;
      }
    }
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  @include for-desktop {
    &__grid {
      margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    }
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}
.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }
  &--categories {
    @include for-desktop {
      margin-top: 3.75rem;
    }
  }
}
</style>
