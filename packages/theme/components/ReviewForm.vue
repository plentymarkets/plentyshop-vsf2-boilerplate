<template>
  <div class="submit-review-form">
    <div class="sf-rating my-3">
      <template v-for="index in max">
        <SfButton
          :id="'rating_value_'+index"
          class="sf-button--pure"
          @click="ratingValue = index"
        >
          <SfIcon
            :key="'feedback_rating_'+index"
            size="30px"
            :icon="icon"
            :color="getColor(ratingValue, index)"
          />
        </SfButton>
      </template>
    </div>
    <SfInput
      v-model="title"
      label="Title"
      name="review-title"
      type="text"
      required
    />
    <SfTextarea
      v-model="message"
      label="Comment"
      name="review-comment"
      required
      class="w-full"
      rows="3"
    />
    <div class="submit-review-btn">
      <slot name="submit-review-btn">
        <SfButton
          class="sf-submit-review__button"
          @click="addReview({productId, title, message, ratingValue, authorName})"
        >
          Submit Review
        </SfButton>
      </slot>
    </div>
    <hr class="sf-divider my-4" />
  </div>
</template>
<script>
import {
  SfInput,
  SfButton,
  SfTextarea,
  SfIcon,
} from '@storefront-ui/vue';
import { useReview } from '@vue-storefront/plentymarkets';
import { ref } from '@nuxtjs/composition-api';

export default {
  name: 'ReviewForm',
  components: {
    SfInput,
    SfButton,
    SfTextarea,
    SfIcon,
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    max: {
      type: Number,
      default: 5,
    },
    icon: {
      type: String,
      default: "star",
    },
    productId:{
      type: String,
      default: "0",
    },
  },
  setup(props) {
    const { addReview, loading } = useReview();
    const message = ref(props.form?.value?.message);
    const authorName = ref(props.form?.value?.authorName);
    const ratingValue = ref(props.form?.value?.ratingValue);
    const title = ref(props.form?.value?.title);
    const getColor = (ratingValue, value) => {
      if (ratingValue >= value) {
        return 'yellow-primary';
      } else {
        return 'gray-primary';
      }
    };
    return {
      message,
      title,
      authorName,
      ratingValue,
      addReview,
      loading,
      getColor,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
