<template>
  <div id="home">
    <LazyHydrate when-idle>
      <SfHero class="hero">
        <SfHeroItem
          v-for="(hero, i) in heroes"
          :key="i"
          :title="heroesGetters.getTitle(hero)"
          :subtitle="heroesGetters.getSubTitle(hero)"
          :background="heroesGetters.getBackground(hero)"
          :image="heroesGetters.getImage(hero)"
          :class="heroesGetters.getClassName(hero)"
        />
      </SfHero>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfBannerGrid :banner-grid="1" class="banner-grid">
        <template v-for="item in banners" #[bannerGetters.getSlot(item)]>
          <SfBanner
            :key="bannerGetters.getSlot(item)"
            :title="bannerGetters.getTitle(item)"
            :subtitle="bannerGetters.getSubTitle(item)"
            :description="bannerGetters.getDescription(item)"
            :button-text="bannerGetters.getButtonText(item)"
            :link="localePath(bannerGetters.getLink(item))"
            :image="bannerGetters.getImage(item)"
            :class="bannerGetters.getClass(item)"
          />
        </template>
      </SfBannerGrid>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <div class="similar-products">
        <SfHeading title="Match with it" :level="2" />
        <nuxt-link :to="localePath('/c/women')" class="smartphone-only">
          {{ $t('Home.See all') }}
        </nuxt-link>
      </div>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfCarousel
        class="carousel"
        :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }"
      >
        <template #prev="{ go }">
          <SfArrow
            aria-label="prev"
            class="sf-arrow--left sf-arrow--long"
            @click="go('prev')"
          />
        </template>
        <template #next="{ go }">
          <SfArrow
            aria-label="next"
            class="sf-arrow--right sf-arrow--long"
            @click="go('next')"
          />
        </template>
        <!-- <SfCarouselItem
          v-for="(product, i) in products"
          :key="i"
          class="carousel__item"
        >
          <SfProductCard
            :data-e2e="'category-product-card'"
            :title="productGetters.getName(product)"
            :image-width="100"
            :image-height="100"
            :image="addBasePath(productGetters.getCoverImage(product))"
            :regular-price="
              $n(productGetters.getRegularPrice(product), 'currency')
            "
            :special-price="
              productGetters.getSpecialPrice(product) &&
              $n(productGetters.getSpecialPrice(product), 'currency')
            "
            :max-rating="productGetters.getMaxRating(product)"
            :score-rating="productGetters.getAverageRating(product)"
            :show-add-to-cart-button="true"
            :link="localePath({ name: 'home' })"
            class="carousel__item__product"
            @click:wishlist="toggleWishlist(i)"
          />
        </SfCarouselItem> -->

        <SfCarouselItem
          v-for="(item, i) in result"
          :key="i"
          class="carousel__item"
        >
          <SfProductCard
            :data-e2e="'category-product-card'"
            :title="liveProductGetters.getName(item)"
            :image-width="100"
            :image-height="100"
            :image="addBasePath(productGetters.getCoverImage(products[0]))"
            :regular-price="$n(productGetters.getRegularPrice(products[0]), 'currency')"
            :special-price="productGetters.getSpecialPrice(products[0]) && $n(productGetters.getSpecialPrice(products[0]), 'currency')"
            :max-rating="productGetters.getMaxRating(products[0])"
            :score-rating="productGetters.getAverageRating(products[0])"
            :show-add-to-cart-button="true"
            :link="localePath({ name: 'home' })"
            class="carousel__item__product"
            @click:wishlist="toggleWishlist(i)"
          />
        </SfCarouselItem>
      </SfCarousel>
    </LazyHydrate>

    <h1 class="text-center">Special Offers!</h1>
    <LazyHydrate when-visible>
      <div v-if="result.length" class="flex justify-center flex-wrap gap-10">
          <LiveShoppingProductCard
            v-for="(product, i) in result"
            :key="i"
            :item="product"
            :data-e2e="'category-product-card'"
            :title="liveProductGetters.getName(product)"
            :image-width="100"
            :image-height="100"
            :image="liveProductGetters.getCoverImage(product)"
            :regular-price="liveProductGetters.getRegularPrice(product)"
            :link="localePath(`/p/${liveProductGetters.getId(product)}/${liveProductGetters.getSlug(product)}`)"
            :quantityLeft="liveProductGetters.getQuantityLeft(product)"
            :timeLeft = "liveProductGetters.getTimeLeft(product)"
            class="carousel__item__product"
          />
      </div>
      <div v-else>No Data</div>
  </LazyHydrate>

    <LazyHydrate when-visible>
      <SfCallToAction
        title="Subscribe to Newsletters"
        button-text="Subscribe"
        :description="$t('Home.Special gifts and events')"
        :image="addBasePath('/homepage/newsletter.webp')"
        class="call-to-action"
      >
        <template #button>
          <SfButton
            class="sf-call-to-action__button"
            data-testid="cta-button"
            @click="toggleNewsletterModal"
          >
            {{ $t('Home.Subscribe') }}
          </SfButton>
        </template>
      </SfCallToAction>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <NewsletterModal @email-submitted="onSubscribe" />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate>
  </div>
</template>
<script>
import {
  SfHero,
  SfBanner,
  SfCallToAction,
  SfCarousel,
  SfProductCard,
  SfBannerGrid,
  SfHeading,
  SfArrow,
  SfButton,
} from '@storefront-ui/vue';
import { ref, useContext, computed } from '@nuxtjs/composition-api';
import InstagramFeed from '~/components/InstagramFeed.vue';
import NewsletterModal from '~/components/NewsletterModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import { useUiState } from '../composables';
import { addBasePath, onSSR, sharedRef } from '@vue-storefront/core';
import {
  productGetters,
  bannerGetters,
  heroesGetters,
  useLiveProducts,
  liveProductGetters,
} from '@vue-storefront/plentymarkets';
import LiveShoppingProductCard from '~/components/LiveShoppingProductCard.vue';

export default {
  name: 'Home',
  components: {
    InstagramFeed,
    SfHero,
    SfBanner,
    SfCallToAction,
    SfCarousel,
    SfProductCard,
    SfBannerGrid,
    SfHeading,
    SfArrow,
    SfButton,
    NewsletterModal,
    LazyHydrate,
    LiveShoppingProductCard,
  },
  setup() {
    const { $config, app } = useContext();
    const { toggleNewsletterModal } = useUiState();
    const products = ref([
      {
        images: {
          all: [
            {
              names: [],
              path: 'S3:154:gear-drone-01.png',
              position: 0,
              urlMiddle: '/homepage/productA.webp',
              cleanImageName: 'gear-drone-01.png',
            },
          ],
          variation: [],
        },
        item: {
          id: 154,
          storeSpecial: null,
          manufacturerId: 0,
          itemType: 'default',
          manufacturer: [],
          rebate: 0,
          salableVariationCount: 1,
          customsTariffNumber: '',
          producingCountry: { names: [] },
          condition: { names: [] },
        },
        texts: {
          lang: 'de',
          name2: '',
          name3: '',
          urlPath: 'gear/drone-omega',
          name1: app.i18n.t('Home.Cream Beach Bag'),
        },
        defaultCategories: [
          {
            id: 73,
            parentCategoryId: null,
            level: 1,
            type: 'item',
            linklist: true,
            right: 'all',
            sitemap: true,
            updatedAt: '2022-04-27T18:12:56+02:00',
            manually: true,
            plentyId: 60796,
          },
        ],
        variation: {
          itemId: 154,
          availabilityId: 1,
          maximumOrderQuantity: null,
          minimumOrderQuantity: 1,
          intervalOrderQuantity: 1,
          releasedAt: null,
          name: '',
          vatId: 0,
          bundleType: null,
          mayShowUnitPrice: false,
          availability: {
            id: 1,
            icon: 'av1.gif',
            averageDays: 2,
            createdAt: '2022-06-27 09:20:16',
            updatedAt: '2022-06-27 09:20:16',
            names: {
              id: 41,
              availabilityId: 1,
              lang: 'de',
              name: 'Sofort versandfertig, Lieferzeit 48h',
              createdAt: '2022-06-27 09:20:16',
              updatedAt: '2022-06-27 09:20:16',
            },
          },
          id: 1097,
          availabilityUpdatedAt: '2022-02-15T16:55:59+01:00',
          model: '',
        },
        filter: {
          isSalable: true,
          isSalableAndActive: true,
          hasActiveChildren: false,
          hasChildren: true,
        },
        unit: {
          names: { unitId: 1, lang: 'de', name: 'Stück' },
          unitOfMeasurement: 'C62',
          content: 1,
        },
        properties: [],
        hasOrderProperties: false,
        hasRequiredOrderProperty: false,
        groupedAttributes: [],
        prices: {
          default: {
            price: { value: 650, formatted: '650,00 EUR' },
            unitPrice: { value: 650, formatted: '650,00 EUR' },
            basePrice: '',
            baseLot: null,
            baseUnit: null,
            baseSinglePrice: null,
            minimumOrderQuantity: 1,
            contactClassDiscount: { percent: 0, amount: 0 },
            categoryDiscount: { percent: 0, amount: 0 },
            currency: 'EUR',
            lowestPrice: { value: null, formatted: '' },
            vat: { id: 0, value: 19 },
            isNet: false,
            data: {
              salesPriceId: 1,
              price: 650,
              priceNet: 546.21848739496,
              basePrice: 650,
              basePriceNet: 546.21848739496,
              unitPrice: 650,
              unitPriceNet: 546.21848739496,
              lowestPrice: null,
              lowestPriceNet: null,
              customerClassDiscountPercent: 0,
              customerClassDiscount: 0,
              customerClassDiscountNet: 0,
              categoryDiscountPercent: 0,
              categoryDiscount: 0,
              categoryDiscountNet: 0,
              vatId: 0,
              vatValue: 19,
              currency: 'EUR',
              interval: 'none',
              conversionFactor: 1,
              minimumOrderQuantity: '1.00',
              updatedAt: '2022-02-15 16:56:11',
              type: 'default',
            },
          },
          rrp: {
            price: { value: 999.99, formatted: '999,99 EUR' },
            unitPrice: { value: 999.99, formatted: '999,99 EUR' },
            basePrice: '',
            baseLot: null,
            baseUnit: null,
            baseSinglePrice: null,
            minimumOrderQuantity: 0,
            contactClassDiscount: { percent: 0, amount: 0 },
            categoryDiscount: { percent: 0, amount: 0 },
            currency: 'EUR',
            lowestPrice: { value: null, formatted: '' },
            vat: { id: 0, value: 19 },
            isNet: false,
            data: {
              salesPriceId: 2,
              price: 999.99,
              priceNet: 840.32773109244,
              basePrice: 999.99,
              basePriceNet: 840.32773109244,
              unitPrice: 999.99,
              unitPriceNet: 840.32773109244,
              lowestPrice: null,
              lowestPriceNet: null,
              customerClassDiscountPercent: 0,
              customerClassDiscount: 0,
              customerClassDiscountNet: 0,
              categoryDiscountPercent: 0,
              categoryDiscount: 0,
              categoryDiscountNet: 0,
              vatId: 0,
              vatValue: 19,
              currency: 'EUR',
              interval: 'none',
              conversionFactor: 1,
              minimumOrderQuantity: '0.00',
              updatedAt: '2023-01-26 16:29:12',
              type: 'rrp',
            },
          },
          set: null,
          specialOffer: null,
          graduatedPrices: [
            {
              price: { value: 650, formatted: '650,00 EUR' },
              unitPrice: { value: 650, formatted: '650,00 EUR' },
              basePrice: '',
              baseLot: null,
              baseUnit: null,
              baseSinglePrice: null,
              minimumOrderQuantity: 1,
              contactClassDiscount: { percent: 0, amount: 0 },
              categoryDiscount: { percent: 0, amount: 0 },
              currency: 'EUR',
              lowestPrice: { value: null, formatted: '' },
              vat: { id: 0, value: 19 },
              isNet: false,
              data: {
                salesPriceId: 1,
                price: 650,
                priceNet: 546.21848739496,
                basePrice: 650,
                basePriceNet: 546.21848739496,
                unitPrice: 650,
                unitPriceNet: 546.21848739496,
                lowestPrice: null,
                lowestPriceNet: null,
                customerClassDiscountPercent: 0,
                customerClassDiscount: 0,
                customerClassDiscountNet: 0,
                categoryDiscountPercent: 0,
                categoryDiscount: 0,
                categoryDiscountNet: 0,
                vatId: 0,
                vatValue: 19,
                currency: 'EUR',
                interval: 'none',
                conversionFactor: 1,
                minimumOrderQuantity: '1.00',
                updatedAt: '2022-02-15 16:56:11',
                type: 'default',
              },
            },
          ],
        },
        facets: [],
        attributes: [],
      },
      {
        images: {
          all: [
            {
              names: [],
              path: 'S3:154:gear-drone-01.png',
              position: 0,
              urlMiddle: '/homepage/productB.webp',
              cleanImageName: 'gear-drone-01.png',
            },
          ],
          variation: [],
        },
        item: {
          id: 154,
          storeSpecial: null,
          manufacturerId: 0,
          itemType: 'default',
          manufacturer: [],
          rebate: 0,
          salableVariationCount: 1,
          customsTariffNumber: '',
          producingCountry: { names: [] },
          condition: { names: [] },
        },
        texts: {
          lang: 'de',
          name2: '',
          name3: '',
          urlPath: 'gear/drone-omega',
          name1: app.i18n.t('Home.Cream Beach Bag 2'),
        },
        defaultCategories: [
          {
            id: 73,
            parentCategoryId: null,
            level: 1,
            type: 'item',
            linklist: true,
            right: 'all',
            sitemap: true,
            updatedAt: '2022-04-27T18:12:56+02:00',
            manually: true,
            plentyId: 60796,
          },
        ],
        variation: {
          itemId: 154,
          availabilityId: 1,
          maximumOrderQuantity: null,
          minimumOrderQuantity: 1,
          intervalOrderQuantity: 1,
          releasedAt: null,
          name: '',
          vatId: 0,
          bundleType: null,
          mayShowUnitPrice: false,
          availability: {
            id: 1,
            icon: 'av1.gif',
            averageDays: 2,
            createdAt: '2022-06-27 09:20:16',
            updatedAt: '2022-06-27 09:20:16',
            names: {
              id: 41,
              availabilityId: 1,
              lang: 'de',
              name: 'Sofort versandfertig, Lieferzeit 48h',
              createdAt: '2022-06-27 09:20:16',
              updatedAt: '2022-06-27 09:20:16',
            },
          },
          id: 1097,
          availabilityUpdatedAt: '2022-02-15T16:55:59+01:00',
          model: '',
        },
        filter: {
          isSalable: true,
          isSalableAndActive: true,
          hasActiveChildren: false,
          hasChildren: true,
        },
        unit: {
          names: { unitId: 1, lang: 'de', name: 'Stück' },
          unitOfMeasurement: 'C62',
          content: 1,
        },
        properties: [],
        hasOrderProperties: false,
        hasRequiredOrderProperty: false,
        groupedAttributes: [],
        prices: {
          default: {
            price: { value: 650, formatted: '650,00 EUR' },
            unitPrice: { value: 650, formatted: '650,00 EUR' },
            basePrice: '',
            baseLot: null,
            baseUnit: null,
            baseSinglePrice: null,
            minimumOrderQuantity: 1,
            contactClassDiscount: { percent: 0, amount: 0 },
            categoryDiscount: { percent: 0, amount: 0 },
            currency: 'EUR',
            lowestPrice: { value: null, formatted: '' },
            vat: { id: 0, value: 19 },
            isNet: false,
            data: {
              salesPriceId: 1,
              price: 650,
              priceNet: 546.21848739496,
              basePrice: 650,
              basePriceNet: 546.21848739496,
              unitPrice: 650,
              unitPriceNet: 546.21848739496,
              lowestPrice: null,
              lowestPriceNet: null,
              customerClassDiscountPercent: 0,
              customerClassDiscount: 0,
              customerClassDiscountNet: 0,
              categoryDiscountPercent: 0,
              categoryDiscount: 0,
              categoryDiscountNet: 0,
              vatId: 0,
              vatValue: 19,
              currency: 'EUR',
              interval: 'none',
              conversionFactor: 1,
              minimumOrderQuantity: '1.00',
              updatedAt: '2022-02-15 16:56:11',
              type: 'default',
            },
          },
          rrp: {
            price: { value: 999.99, formatted: '999,99 EUR' },
            unitPrice: { value: 999.99, formatted: '999,99 EUR' },
            basePrice: '',
            baseLot: null,
            baseUnit: null,
            baseSinglePrice: null,
            minimumOrderQuantity: 0,
            contactClassDiscount: { percent: 0, amount: 0 },
            categoryDiscount: { percent: 0, amount: 0 },
            currency: 'EUR',
            lowestPrice: { value: null, formatted: '' },
            vat: { id: 0, value: 19 },
            isNet: false,
            data: {
              salesPriceId: 2,
              price: 999.99,
              priceNet: 840.32773109244,
              basePrice: 999.99,
              basePriceNet: 840.32773109244,
              unitPrice: 999.99,
              unitPriceNet: 840.32773109244,
              lowestPrice: null,
              lowestPriceNet: null,
              customerClassDiscountPercent: 0,
              customerClassDiscount: 0,
              customerClassDiscountNet: 0,
              categoryDiscountPercent: 0,
              categoryDiscount: 0,
              categoryDiscountNet: 0,
              vatId: 0,
              vatValue: 19,
              currency: 'EUR',
              interval: 'none',
              conversionFactor: 1,
              minimumOrderQuantity: '0.00',
              updatedAt: '2023-01-26 16:29:12',
              type: 'rrp',
            },
          },
          set: null,
          specialOffer: null,
          graduatedPrices: [
            {
              price: { value: 650, formatted: '650,00 EUR' },
              unitPrice: { value: 650, formatted: '650,00 EUR' },
              basePrice: '',
              baseLot: null,
              baseUnit: null,
              baseSinglePrice: null,
              minimumOrderQuantity: 1,
              contactClassDiscount: { percent: 0, amount: 0 },
              categoryDiscount: { percent: 0, amount: 0 },
              currency: 'EUR',
              lowestPrice: { value: null, formatted: '' },
              vat: { id: 0, value: 19 },
              isNet: false,
              data: {
                salesPriceId: 1,
                price: 650,
                priceNet: 546.21848739496,
                basePrice: 650,
                basePriceNet: 546.21848739496,
                unitPrice: 650,
                unitPriceNet: 546.21848739496,
                lowestPrice: null,
                lowestPriceNet: null,
                customerClassDiscountPercent: 0,
                customerClassDiscount: 0,
                customerClassDiscountNet: 0,
                categoryDiscountPercent: 0,
                categoryDiscount: 0,
                categoryDiscountNet: 0,
                vatId: 0,
                vatValue: 19,
                currency: 'EUR',
                interval: 'none',
                conversionFactor: 1,
                minimumOrderQuantity: '1.00',
                updatedAt: '2022-02-15 16:56:11',
                type: 'default',
              },
            },
          ],
        },
        facets: [],
        attributes: [],
      },
      {
        images: {
          all: [
            {
              names: [],
              path: 'S3:154:gear-drone-01.png',
              position: 0,
              urlMiddle: '/homepage/productC.webp',
              cleanImageName: 'gear-drone-01.png',
            },
          ],
          variation: [],
        },
        item: {
          id: 154,
          storeSpecial: null,
          manufacturerId: 0,
          itemType: 'default',
          manufacturer: [],
          rebate: 0,
          salableVariationCount: 1,
          customsTariffNumber: '',
          producingCountry: { names: [] },
          condition: { names: [] },
        },
        texts: {
          lang: 'de',
          name2: '',
          name3: '',
          urlPath: 'gear/drone-omega',
          name1: app.i18n.t('Home.Cream Beach Bag'),
        },
        defaultCategories: [
          {
            id: 73,
            parentCategoryId: null,
            level: 1,
            type: 'item',
            linklist: true,
            right: 'all',
            sitemap: true,
            updatedAt: '2022-04-27T18:12:56+02:00',
            manually: true,
            plentyId: 60796,
          },
        ],
        variation: {
          itemId: 154,
          availabilityId: 1,
          maximumOrderQuantity: null,
          minimumOrderQuantity: 1,
          intervalOrderQuantity: 1,
          releasedAt: null,
          name: '',
          vatId: 0,
          bundleType: null,
          mayShowUnitPrice: false,
          availability: {
            id: 1,
            icon: 'av1.gif',
            averageDays: 2,
            createdAt: '2022-06-27 09:20:16',
            updatedAt: '2022-06-27 09:20:16',
            names: {
              id: 41,
              availabilityId: 1,
              lang: 'de',
              name: 'Sofort versandfertig, Lieferzeit 48h',
              createdAt: '2022-06-27 09:20:16',
              updatedAt: '2022-06-27 09:20:16',
            },
          },
          id: 1097,
          availabilityUpdatedAt: '2022-02-15T16:55:59+01:00',
          model: '',
        },
        filter: {
          isSalable: true,
          isSalableAndActive: true,
          hasActiveChildren: false,
          hasChildren: true,
        },
        unit: {
          names: { unitId: 1, lang: 'de', name: 'Stück' },
          unitOfMeasurement: 'C62',
          content: 1,
        },
        properties: [],
        hasOrderProperties: false,
        hasRequiredOrderProperty: false,
        groupedAttributes: [],
        prices: {
          default: {
            price: { value: 650, formatted: '650,00 EUR' },
            unitPrice: { value: 650, formatted: '650,00 EUR' },
            basePrice: '',
            baseLot: null,
            baseUnit: null,
            baseSinglePrice: null,
            minimumOrderQuantity: 1,
            contactClassDiscount: { percent: 0, amount: 0 },
            categoryDiscount: { percent: 0, amount: 0 },
            currency: 'EUR',
            lowestPrice: { value: null, formatted: '' },
            vat: { id: 0, value: 19 },
            isNet: false,
            data: {
              salesPriceId: 1,
              price: 650,
              priceNet: 546.21848739496,
              basePrice: 650,
              basePriceNet: 546.21848739496,
              unitPrice: 650,
              unitPriceNet: 546.21848739496,
              lowestPrice: null,
              lowestPriceNet: null,
              customerClassDiscountPercent: 0,
              customerClassDiscount: 0,
              customerClassDiscountNet: 0,
              categoryDiscountPercent: 0,
              categoryDiscount: 0,
              categoryDiscountNet: 0,
              vatId: 0,
              vatValue: 19,
              currency: 'EUR',
              interval: 'none',
              conversionFactor: 1,
              minimumOrderQuantity: '1.00',
              updatedAt: '2022-02-15 16:56:11',
              type: 'default',
            },
          },
          rrp: {
            price: { value: 999.99, formatted: '999,99 EUR' },
            unitPrice: { value: 999.99, formatted: '999,99 EUR' },
            basePrice: '',
            baseLot: null,
            baseUnit: null,
            baseSinglePrice: null,
            minimumOrderQuantity: 0,
            contactClassDiscount: { percent: 0, amount: 0 },
            categoryDiscount: { percent: 0, amount: 0 },
            currency: 'EUR',
            lowestPrice: { value: null, formatted: '' },
            vat: { id: 0, value: 19 },
            isNet: false,
            data: {
              salesPriceId: 2,
              price: 999.99,
              priceNet: 840.32773109244,
              basePrice: 999.99,
              basePriceNet: 840.32773109244,
              unitPrice: 999.99,
              unitPriceNet: 840.32773109244,
              lowestPrice: null,
              lowestPriceNet: null,
              customerClassDiscountPercent: 0,
              customerClassDiscount: 0,
              customerClassDiscountNet: 0,
              categoryDiscountPercent: 0,
              categoryDiscount: 0,
              categoryDiscountNet: 0,
              vatId: 0,
              vatValue: 19,
              currency: 'EUR',
              interval: 'none',
              conversionFactor: 1,
              minimumOrderQuantity: '0.00',
              updatedAt: '2023-01-26 16:29:12',
              type: 'rrp',
            },
          },
          set: null,
          specialOffer: null,
          graduatedPrices: [
            {
              price: { value: 650, formatted: '650,00 EUR' },
              unitPrice: { value: 650, formatted: '650,00 EUR' },
              basePrice: '',
              baseLot: null,
              baseUnit: null,
              baseSinglePrice: null,
              minimumOrderQuantity: 1,
              contactClassDiscount: { percent: 0, amount: 0 },
              categoryDiscount: { percent: 0, amount: 0 },
              currency: 'EUR',
              lowestPrice: { value: null, formatted: '' },
              vat: { id: 0, value: 19 },
              isNet: false,
              data: {
                salesPriceId: 1,
                price: 650,
                priceNet: 546.21848739496,
                basePrice: 650,
                basePriceNet: 546.21848739496,
                unitPrice: 650,
                unitPriceNet: 546.21848739496,
                lowestPrice: null,
                lowestPriceNet: null,
                customerClassDiscountPercent: 0,
                customerClassDiscount: 0,
                customerClassDiscountNet: 0,
                categoryDiscountPercent: 0,
                categoryDiscount: 0,
                categoryDiscountNet: 0,
                vatId: 0,
                vatValue: 19,
                currency: 'EUR',
                interval: 'none',
                conversionFactor: 1,
                minimumOrderQuantity: '1.00',
                updatedAt: '2022-02-15 16:56:11',
                type: 'default',
              },
            },
          ],
        },
        facets: [],
        attributes: [],
      },
      {
        images: {
          all: [
            {
              names: [],
              path: 'S3:154:gear-drone-01.png',
              position: 0,
              urlMiddle: '/homepage/productA.webp',
              cleanImageName: 'gear-drone-01.png',
            },
          ],
          variation: [],
        },
        item: {
          id: 154,
          storeSpecial: null,
          manufacturerId: 0,
          itemType: 'default',
          manufacturer: [],
          rebate: 0,
          salableVariationCount: 1,
          customsTariffNumber: '',
          producingCountry: { names: [] },
          condition: { names: [] },
        },
        texts: {
          lang: 'de',
          name2: '',
          name3: '',
          urlPath: 'gear/drone-omega',
          name1: app.i18n.t('Home.Cream Beach Bag'),
        },
        defaultCategories: [
          {
            id: 73,
            parentCategoryId: null,
            level: 1,
            type: 'item',
            linklist: true,
            right: 'all',
            sitemap: true,
            updatedAt: '2022-04-27T18:12:56+02:00',
            manually: true,
            plentyId: 60796,
          },
        ],
        variation: {
          itemId: 154,
          availabilityId: 1,
          maximumOrderQuantity: null,
          minimumOrderQuantity: 1,
          intervalOrderQuantity: 1,
          releasedAt: null,
          name: '',
          vatId: 0,
          bundleType: null,
          mayShowUnitPrice: false,
          availability: {
            id: 1,
            icon: 'av1.gif',
            averageDays: 2,
            createdAt: '2022-06-27 09:20:16',
            updatedAt: '2022-06-27 09:20:16',
            names: {
              id: 41,
              availabilityId: 1,
              lang: 'de',
              name: 'Sofort versandfertig, Lieferzeit 48h',
              createdAt: '2022-06-27 09:20:16',
              updatedAt: '2022-06-27 09:20:16',
            },
          },
          id: 1097,
          availabilityUpdatedAt: '2022-02-15T16:55:59+01:00',
          model: '',
        },
        filter: {
          isSalable: true,
          isSalableAndActive: true,
          hasActiveChildren: false,
          hasChildren: true,
        },
        unit: {
          names: { unitId: 1, lang: 'de', name: 'Stück' },
          unitOfMeasurement: 'C62',
          content: 1,
        },
        properties: [],
        hasOrderProperties: false,
        hasRequiredOrderProperty: false,
        groupedAttributes: [],
        prices: {
          default: {
            price: { value: 650, formatted: '650,00 EUR' },
            unitPrice: { value: 650, formatted: '650,00 EUR' },
            basePrice: '',
            baseLot: null,
            baseUnit: null,
            baseSinglePrice: null,
            minimumOrderQuantity: 1,
            contactClassDiscount: { percent: 0, amount: 0 },
            categoryDiscount: { percent: 0, amount: 0 },
            currency: 'EUR',
            lowestPrice: { value: null, formatted: '' },
            vat: { id: 0, value: 19 },
            isNet: false,
            data: {
              salesPriceId: 1,
              price: 650,
              priceNet: 546.21848739496,
              basePrice: 650,
              basePriceNet: 546.21848739496,
              unitPrice: 650,
              unitPriceNet: 546.21848739496,
              lowestPrice: null,
              lowestPriceNet: null,
              customerClassDiscountPercent: 0,
              customerClassDiscount: 0,
              customerClassDiscountNet: 0,
              categoryDiscountPercent: 0,
              categoryDiscount: 0,
              categoryDiscountNet: 0,
              vatId: 0,
              vatValue: 19,
              currency: 'EUR',
              interval: 'none',
              conversionFactor: 1,
              minimumOrderQuantity: '1.00',
              updatedAt: '2022-02-15 16:56:11',
              type: 'default',
            },
          },
          rrp: {
            price: { value: 999.99, formatted: '999,99 EUR' },
            unitPrice: { value: 999.99, formatted: '999,99 EUR' },
            basePrice: '',
            baseLot: null,
            baseUnit: null,
            baseSinglePrice: null,
            minimumOrderQuantity: 0,
            contactClassDiscount: { percent: 0, amount: 0 },
            categoryDiscount: { percent: 0, amount: 0 },
            currency: 'EUR',
            lowestPrice: { value: null, formatted: '' },
            vat: { id: 0, value: 19 },
            isNet: false,
            data: {
              salesPriceId: 2,
              price: 999.99,
              priceNet: 840.32773109244,
              basePrice: 999.99,
              basePriceNet: 840.32773109244,
              unitPrice: 999.99,
              unitPriceNet: 840.32773109244,
              lowestPrice: null,
              lowestPriceNet: null,
              customerClassDiscountPercent: 0,
              customerClassDiscount: 0,
              customerClassDiscountNet: 0,
              categoryDiscountPercent: 0,
              categoryDiscount: 0,
              categoryDiscountNet: 0,
              vatId: 0,
              vatValue: 19,
              currency: 'EUR',
              interval: 'none',
              conversionFactor: 1,
              minimumOrderQuantity: '0.00',
              updatedAt: '2023-01-26 16:29:12',
              type: 'rrp',
            },
          },
          set: null,
          specialOffer: null,
          graduatedPrices: [
            {
              price: { value: 650, formatted: '650,00 EUR' },
              unitPrice: { value: 650, formatted: '650,00 EUR' },
              basePrice: '',
              baseLot: null,
              baseUnit: null,
              baseSinglePrice: null,
              minimumOrderQuantity: 1,
              contactClassDiscount: { percent: 0, amount: 0 },
              categoryDiscount: { percent: 0, amount: 0 },
              currency: 'EUR',
              lowestPrice: { value: null, formatted: '' },
              vat: { id: 0, value: 19 },
              isNet: false,
              data: {
                salesPriceId: 1,
                price: 650,
                priceNet: 546.21848739496,
                basePrice: 650,
                basePriceNet: 546.21848739496,
                unitPrice: 650,
                unitPriceNet: 546.21848739496,
                lowestPrice: null,
                lowestPriceNet: null,
                customerClassDiscountPercent: 0,
                customerClassDiscount: 0,
                customerClassDiscountNet: 0,
                categoryDiscountPercent: 0,
                categoryDiscount: 0,
                categoryDiscountNet: 0,
                vatId: 0,
                vatValue: 19,
                currency: 'EUR',
                interval: 'none',
                conversionFactor: 1,
                minimumOrderQuantity: '1.00',
                updatedAt: '2022-02-15 16:56:11',
                type: 'default',
              },
            },
          ],
        },
        facets: [],
        attributes: [],
      },
    ]);
    const heroes = [
      {
        title: app.i18n.t('Home.Colorful summer dresses are already in store'),
        subtitle: app.i18n.t('Home.SUMMER COLLECTION 2019'),
        background: '#eceff1',
        image: addBasePath('/homepage/bannerH.webp'),
      },
      {
        title: app.i18n.t('Home.Colorful summer dresses are already in store'),
        subtitle: app.i18n.t('Home.SUMMER COLLECTION 2019'),
        background: '#efebe9',
        image: addBasePath('/homepage/bannerA.webp'),
        className:
          'sf-hero-item--position-bg-top-left sf-hero-item--align-right',
      },
      {
        title: app.i18n.t('Home.Colorful summer dresses are already in store'),
        subtitle: app.i18n.t('Home.SUMMER COLLECTION 2019'),
        background: '#fce4ec',
        image: addBasePath('/homepage/bannerB.webp'),
      },
    ];
    const banners = [
      {
        slot: 'banner-A',
        subtitle: app.i18n.t('Home.Dresses'),
        title: app.i18n.t('Home.Cocktail & Party'),
        description: app.i18n.t('Home.Cocktail dresses and party dresses'),
        buttonText: app.i18n.t('Home.Shop now'),
        image: {
          mobile: addBasePath($config.theme.home.bannerA.image.mobile),
          desktop: addBasePath($config.theme.home.bannerA.image.desktop),
        },
        class: 'sf-banner--slim desktop-only',
        link: $config.theme.home.bannerA.link,
      },
      {
        slot: 'banner-B',
        subtitle: app.i18n.t('Home.Dresses'),
        title: app.i18n.t('Home.Linen Dresses'),
        description: app.i18n.t('Home.Cocktail dresses and party dresses'),
        buttonText: app.i18n.t('Home.Shop now'),
        image: addBasePath($config.theme.home.bannerB.image),
        class: 'sf-banner--slim banner-central desktop-only',
        link: $config.theme.home.bannerB.link,
      },
      {
        slot: 'banner-C',
        subtitle: app.i18n.t('Home.T-Shirts'),
        title: app.i18n.t('Home.The Office Life'),
        image: addBasePath($config.theme.home.bannerC.image),
        class: 'sf-banner--slim banner__tshirt',
        link: $config.theme.home.bannerC.link,
      },
      {
        slot: 'banner-D',
        subtitle: app.i18n.t('Home.Summer Sandals'),
        title: app.i18n.t('Home.Eco Sandals'),
        image: addBasePath($config.theme.home.bannerD.image),
        class: 'sf-banner--slim',
        link: $config.theme.home.bannerD.link,
      },
    ];

    const onSubscribe = (emailAddress) => {
      console.log(`Email ${emailAddress} was added to newsletter.`);
      toggleNewsletterModal();
    };

    const toggleWishlist = (index) => {
      products.value[index].isInWishlist = !products.value[index].isInWishlist;
    };

    const { search, result } = useLiveProducts();
    onSSR(async () => {
      await search();
    });
    return {
      liveProductGetters,
      productGetters,
      bannerGetters,
      heroesGetters,
      toggleWishlist,
      toggleNewsletterModal,
      onSubscribe,
      addBasePath,
      banners,
      heroes,
      products,
      result,
      liveProductGetters
    };
  },
};
</script>

  <style lang="scss" scoped>
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        ::v-deep .sf-hero-item__subtitle,
        ::v-deep .sf-hero-item__title {
          text-align: right;
          width: 100%;
          padding-left: var(--spacer-sm);
        }
      }
    }
  }
  ::v-deep .sf-hero__control {
    &--right,
    &--left {
      display: none;
    }
  }
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
      text-decoration: none;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }
  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}

.carousel {
  margin: 0 calc(0 - var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }
    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
  ::v-deep .sf-arrow--long .sf-arrow--right {
    --arrow-icon-transform: rotate(180deg);
    -webkit-transform-origin: center;
    transform-origin: center;
  }
}
</style>
