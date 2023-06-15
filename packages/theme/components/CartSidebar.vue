<template>
  <div id="cart">
    <SfSidebar
      :data-e2e="'sidebar-cart'"
      :visible="isCartSidebarOpen"
      :title="$t('CartSidebar.My cart')"
      class="sf-sidebar--right"
      @close="toggleCartSidebar"
    >
      <template #content-top>
        <div
          v-if="totalItems"
          class="sf-sidebar__top__summary desktop-only"
        >
          <SfProperty
            class="sf-property--large cart-summary"
            name="Total items"
            :value="totalItems"
          />
          <SfButton
            class="sf-button--text"
            :data-e2e="'clear-cart'"
            @click="clear()"
          >
            {{ $t('CartSidebar.Clear') }}
          </SfButton>
        </div>
      </template>
      <transition
        name="sf-fade"
        mode="out-in"
      >
        <div
          v-if="totalItems"
          key="my-cart"
          class="my-cart"
        >
          <div class="collected-product-list">
            <transition-group
              name="sf-fade"
              tag="div"
            >
              <SfCollectedProduct
                v-for="product in products"
                :key="cartGetters.getItemId(product)"
                :data-e2e="'collected-product'"
                :image="addBasePath(cartGetters.getItemImage(product))"
                :image-width="100"
                :image-height="100"
                :title="cartGetters.getItemName(product)"
                :regular-price="$n(cartGetters.getRegularItemPrice(product), 'currency')"
                :special-price="cartGetters.getSpecialItemPrice(product) && $n(cartGetters.getSpecialItemPrice(product), 'currency')"
                :stock="99999"
                class="collected-product"
                @click:remove="removeItem({ product: { id: cartGetters.getItemId(product) } })"
              >
                <template #configuration>
                  <div class="collected-product__properties">
                    <!-- TODO -->
                    <!-- <SfProperty -->
                    <!--   v-for="(attribute, key) in cartGetters.getItemAttributes(product, ['color', 'size'])" -->
                    <!--   :key="key" -->
                    <!--   :name="key" -->
                    <!--   :value="attribute" -->
                    <!-- /> -->
                  </div>
                </template>
                <template #input>
                  <div class="sf-collected-product__quantity-wrapper relative pt-0">
                    <SfQuantitySelector
                      :disabled="loading"
                      :qty="cartGetters.getItemQty(product)"
                      class="sf-collected-product__quantity-selector"
                      @input="updateQuantity({ product: { id: cartGetters.getItemId(product), variationId: cartGetters.getVariationId(product) }, quantity: Number($event) })"
                    />
                  </div>
                </template>
                <!-- @TODO: remove if https://github.com/vuestorefront/storefront-ui/issues/2022 is done -->
                <template #more-actions>
                  {{ }}
                </template>
              </SfCollectedProduct>
            </transition-group>
          </div>
        </div>
        <div
          v-else
          key="empty-cart"
          class="empty-cart"
        >
          <div class="empty-cart__banner">
            <SfImage
              :width="100"
              :height="100"
              alt="Empty bag"
              class="empty-cart__image"
              :src="addBasePath('/icons/empty-cart.svg')"
            />
            <SfHeading
              :title="$t('CartSidebar.Your cart is empty')"
              :level="2"
              class="empty-cart__heading"
              :description="$t('CartSidebar.Fill in bag')"
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="sf-fade">
          <div v-if="totalItems">
            <CartTotals />
            <nuxt-link :to="isAuthenticated ? localePath(`billing`) : localePath({ name: 'login' })">
              <SfButton
                :data-e2e="'go-to-checkout'"
                class="sf-button--full-width color-secondary"
                @click="toggleCartSidebar"
              >
                {{ $t('CartSidebar.Go to checkout') }}
              </SfButton>
            </nuxt-link>
            <CartExpressButton
              :uuid="uuid"
              class="mt-2"
            />
          </div>
          <div v-else>
            <SfButton
              class="sf-button--full-width color-primary"
              @click="toggleCartSidebar"
            >
              {{ $t('CartSidebar.Go back shopping') }}
            </SfButton>
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfProperty,
  SfCollectedProduct,
  SfImage,
  SfQuantitySelector
} from '@storefront-ui/vue';
import { computed } from '@nuxtjs/composition-api';
import { useCart, cartGetters, useUser } from '@vue-storefront/plentymarkets';
import { useUiState } from '~/composables';
import debounce from 'lodash.debounce';
import { addBasePath } from '@vue-storefront/core';
import CartExpressButton from '~/components/PayPal/CartExpressButton';
import { v4 } from 'uuid';

export default {
  name: 'CartSidebar',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfProperty,
    SfCollectedProduct,
    SfImage,
    SfQuantitySelector,
    CartExpressButton,
    CartTotals: () => import('~/components/CartTotals')
  },
  setup() {
    const { isAuthenticated } = useUser();
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const { cart, removeItem, updateItemQty, clear, loading } = useCart();
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const uuid = v4();

    const updateQuantity = debounce(async ({ product, quantity }) => {
      await updateItemQty({ product, quantity });
    }, 200);

    return {
      isAuthenticated,
      addBasePath,
      updateQuantity,
      loading,
      products,
      removeItem,
      clear,
      isCartSidebarOpen,
      toggleCartSidebar,
      totals,
      totalItems,
      cartGetters,
      uuid
    };
  }
};
</script>

<style lang="scss" scoped>
#cart {
  --sidebar-z-index: 30;
  --overlay-z-index: 30;
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
}
.sf-sidebar__top__summary {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.cart-summary {
  margin-top: var(--spacer-xl);
}
.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    margin: 0;
  }
  &__total-price {
    --price-font-size: var(--font-size--xl);
    --price-font-weight: var(--font-weight--medium);
    margin: 0 0 var(--spacer-base) 0;
  }
}
.empty-cart {
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  &__heading {
    padding: 0 var(--spacer-base);
  }
  &__image {
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }
  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
}
.collected-product-list {
  flex: 1;
}
.collected-product {
  margin: 0 0 var(--spacer-sm) 0;
  &__properties {
    margin: var(--spacer-xs) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
    &:first-child {
      margin-bottom: 8px;
    }
  }
  &__actions {
    transition: opacity 150ms ease-in-out;
  }
  &__save,
  &__compare {
    --button-padding: 0;
    &:focus {
      --cp-save-opacity: 1;
      --cp-compare-opacity: 1;
    }
  }
  &__save {
    opacity: var(--cp-save-opacity, 0);
  }
  &__compare {
    opacity: var(--cp-compare-opacity, 0);
  }
  &:hover {
    --cp-save-opacity: 1;
    --cp-compare-opacity: 1;
    @include for-desktop {
      .collected-product__properties {
        display: none;
      }
    }
  }
}
::v-deep .sf-collected-product__image {
  background: var(--c-light--variant);
}
</style>
