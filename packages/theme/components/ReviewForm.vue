<template>
  <form @submit.prevent="submitReview" class="w-3/4 m-auto">
    <div v-if="formHasErrors" class="text-red">There are some errors in you input, please fix it!</div>
    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        Leave a review
      </h2>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label
            for="first-name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >First name</label
          >
          <div class="mt-2">
            <input
              ref="nameInput"
              type="text"
              name="first-name"
              id="first-name"
              autocomplete="given-name"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-3">
          <label
            for="last-name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Last name</label
          >
          <div class="mt-2">
            <input
              ref="surnameInput"
              type="text"
              name="last-name"
              id="last-name"
              autocomplete="family-name"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="col-span-full">
          <label
            for="about"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Comment</label
          >
          <div class="mt-2">
            <textarea
              ref="review"
              id="about"
              name="about"
              rows="3"
              class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Stars</label>
          <div class="mt-2">
            <select ref="stars" id="country" name="country" autocomplete="country-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { defineComponent, ref, computed } from '@vue/composition-api';
import { useReviewFeedback } from '@vue-storefront/plentymarkets';
import { useRoute } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const route = useRoute();
    const nameInput = ref(null);
    const surnameInput = ref(null);
    const review = ref(null);
    const stars = ref(null);
    const formHasErrors = ref(false);
    const { postReview } = useReviewFeedback()
    const authorName = computed(() => nameInput.value.value + " " + surnameInput.value.value);
    async function submitReview() {

      if(nameInput.value.value == '' || surnameInput.value.value == '' || review.value.value == '') {
        formHasErrors.value = true;

        return
      }

      formHasErrors.value = false;

      const params = {
        type: 'review',
        authorName: authorName.value,
        title: 'Review',
        message: review.value.value,
        targetId: route.value.params.id
      };

      console.log('params', params);
      await postReview(params);

      nameInput.value.value = '';
      surnameInput.value.value = '';
      review.value.value = '';
      stars.value.value = '';
    }

    return {
      nameInput,
      surnameInput,
      review,
      stars,
      submitReview,
      formHasErrors
    }
  },
});
</script>
