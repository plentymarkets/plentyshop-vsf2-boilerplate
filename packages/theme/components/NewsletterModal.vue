<template>
  <SfModal
    :visible="isNewsletterModalOpen"
    class="modal"
    @close="closeModal"
  >
    <template #modal-bar>
      <SfBar
        class="modal__title smartphone-only"
        :close="true"
        :title="$t('NewsletterModal.Subscribe to our newsletter')"
        @click:close="closeModal"
      />
    </template>
    <transition
      name="sf-fade"
      mode="out-in"
    >
      <div>
        <SfHeading
          :level="3"
          :title="$t('NewsletterModal.Subscribe to our newsletter')"
          class="modal__title desktop-only"
        />
        <NewsletterSubscribeForm @onSubscribed="closeModal" />
      </div>
    </transition>
  </SfModal>
</template>
<script>
import { SfModal, SfHeading, SfBar } from '@storefront-ui/vue';
import NewsletterSubscribeForm from '~/components/MyAccount/NewsletterSubscribeForm.vue';
import { ref } from '@nuxtjs/composition-api';
import { useUiState } from '~/composables';

export default {
  name: 'NewsletterModal',
  components: {
    SfModal,
    SfHeading,
    SfBar,
    NewsletterSubscribeForm
  },
  setup() {
    const { isNewsletterModalOpen, toggleNewsletterModal } = useUiState();

    const isHidden = ref(true);
    const emailAddress = ref('');

    const closeModal = () => {
      toggleNewsletterModal();
    };

    return {
      isNewsletterModalOpen,
      toggleNewsletterModal,
      isHidden,
      emailAddress,
      closeModal
    };
  }
};
</script>

  <style lang="scss" scoped>

  .modal {
    display: flex;
    justify-content: center;
    --modal-index: 30;
    --overlay-z-index: 30;
    --modal-content-padding: var(--spacer-xl);
    &__input,
    .sf-input__label {
      --input-font-size: var(--font-size--base);
      --input-label-font-size: var(--font-size--base);
    }
    &__button {
      margin: 0 auto;
    }
    &__content {
      font-size: var(--font-size--sm);
      font-weight: var(--font-weight--light);
    }
    .sf-scrollable__view-all.sf-button {
      font-weight: var(--font-weight--light);
    }
    .sf-heading__title{
      text-align: left;
    }
  }

  </style>
