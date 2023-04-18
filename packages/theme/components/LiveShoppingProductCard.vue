<template>
  <div
    v-if="quantityLeft > 0"
    class="sf-product-card relative"
    :class="{ 'has-colors': colors.length }"
    data-testid="product-card"
  >
    <div class="sf-product-card__image-wrapper">
      <slot
        name="image"
        v-bind="{
          image,
          title,
          link,
          imageHeight,
          imageWidth,
          imageTag,
          nuxtImgConfig,
        }"
      >
        <SfButton
          :link="link"
          class="sf-button--pure sf-product-card__link"
          data-testid="product-link"
          :aria-label="'Go To Product'"
          v-on="$listeners"
        >
          <img :src="image"
            class="sf-product-card__image h-64"
            :alt="title"
          />
        </SfButton>
      </slot>
    </div>
    <slot name="title" v-bind="{ title, link }">
      <SfButton
        :link="link"
        class="sf-button--pure sf-product-card__link"
        data-testid="product-link"
        v-on="$listeners"
      >
        <span class="sf-product-card__title">
          {{ title }}
        </span>
      </SfButton>
    </slot>
    <slot name="price" v-bind="{ specialPrice, regularPrice }">
      <SfPrice
        :class="{ 'display-none': !regularPrice }"
        class="sf-product-card__price"
        :regular="regularPrice"
        :special="specialPrice"
      />
    </slot>
    <div v-if="quantityLeft" class="flex justify-end top-4 left-4 absolute">
      <span  class="inline-flex items-center rounded-md bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 ">
        Only <span class="font-extrabold pl-1 pr-1">{{ quantityLeft }}</span> left
      </span>
    </div>
    <div class="flex flex-center flex-col">
      <h4 class="text-center font-bold">Time Left:</h4>
      <div class="w-full timer-box gap-2 grid grid-cols-4">
          <div class="p-4 text-white font-bold text-center bg-sf-c-primary">
            {{ counterTime.days }}  
          </div>
          <div class="p-4 text-white font-bold text-center bg-sf-c-primary">
            {{ counterTime.hours }}  
          </div>
          <div class="p-4 text-white font-bold text-center bg-sf-c-primary">
            {{ counterTime.minutes }}  
          </div>
          <div class="p-4 text-white font-bold text-center bg-sf-c-primary">
            {{ counterTime.seconds }}  
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  computed,
} from '@vue/composition-api';
import { colorsValues as SF_COLORS } from '@storefront-ui/shared/variables/colors';
import SfIcon from '@storefront-ui/vue/src/components/atoms/SfIcon/SfIcon.vue';
import SfPrice from '@storefront-ui/vue/src/components/atoms/SfPrice/SfPrice.vue';
import SfRating from '@storefront-ui/vue/src/components/atoms/SfRating/SfRating.vue';
import SfImage from '@storefront-ui/vue/src/components/atoms/SfImage/SfImage.vue';
import SfCircleIcon from '@storefront-ui/vue/src/components/atoms/SfCircleIcon/SfCircleIcon.vue';
import SfBadge from '@storefront-ui/vue/src/components/atoms/SfBadge/SfBadge.vue';
import SfButton from '@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue';
import SfColorPicker from '@storefront-ui/vue/src/components/molecules/SfColorPicker/SfColorPicker.vue';
import SfColor from '@storefront-ui/vue/src/components/atoms/SfColor/SfColor.vue';

export default defineComponent({
  components: {
    SfPrice,
    SfRating,
    SfIcon,
    SfImage,
    SfCircleIcon,
    SfBadge,
    SfButton,
    SfColorPicker,
    SfColor,
  },
  props: {
    image: {
      type: [Array, Object, String],
      default: '',
    },
    imageWidth: {
      type: [Number, String],
      default: null,
    },
    imageHeight: {
      type: [Number, String],
      default: null,
    },
    badgeLabel: {
      type: String,
      default: '',
    },
    badgeColor: {
      type: String,
      default: '',
    },
    colors: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    link: {
      type: [String, Object],
      default: null,
    },
    /**
     * Link element tag
     * @deprecated will be removed in 1.0.0 use slot to replace content
     */
    linkTag: {
      type: String,
      default: undefined,
    },
    scoreRating: {
      type: [Number, Boolean],
      default: false,
    },
    reviewsCount: {
      type: [Number, Boolean],
      default: false,
    },
    maxRating: {
      type: [Number, String],
      default: 5,
    },
    regularPrice: {
      type: [Number, String],
      default: null,
    },
    specialPrice: {
      type: [Number, String],
      default: null,
    },
    wishlistIcon: {
      type: [String, Array, Boolean],
      default: 'heart',
    },
    isInWishlistIcon: {
      type: [String, Array],
      default: 'heart_fill',
    },
    isInWishlist: {
      type: Boolean,
      default: false,
    },
    showAddToCartButton: {
      type: Boolean,
      default: false,
    },
    isAddedToCart: {
      type: Boolean,
      deafult: false,
    },
    addToCartDisabled: {
      type: Boolean,
      default: false,
    },
    imageTag: {
      type: String,
      default: '',
    },
    nuxtImgConfig: {
      type: Object,
      default: () => ({}),
    },
    quantityLeft: {
      type: Number,
      default: null,
    },
    timeLeft: {
      type: Number,
      default: null,
    },
    item: {
      type: Object,
      default: null,
    },
    rrpPrice: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isAddingToCart: false,
      openColorPicker: false,
    };
  },
  setup(props) {
    const counterTime = reactive({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    let timerCount = props.timeLeft * 1000;

    onMounted(() => {
      setInterval(function () {
        let now = new Date().getTime();
        let distance = timerCount - now;

        counterTime.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        counterTime.hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        counterTime.minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        counterTime.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }, 1000);
    });

    const showCounter = computed(() => {
      return days.value || hours.value || minutes.value || seconds.value;
    });
    return {
      showCounter,
      counterTime,
    };
  },
});
</script>