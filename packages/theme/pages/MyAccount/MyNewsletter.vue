<template>
  <SfTabs
    :open-tab="1"
    class="tab-orphan"
  >
    <SfTab :title="$t('MyNewsletter.Unsubscribe')">
      <NewsletterUnsubscribeForm />
    </SfTab>
    <SfTab :title="$t('MyNewsletter.My newsletter')">
      <NewsletterSubscribeForm />
    </SfTab>
  </SfTabs>
</template>

<script>
import { SfTabs } from '@storefront-ui/vue';
import NewsletterSubscribeForm from '~/components/MyAccount/NewsletterSubscribeForm.vue';
import NewsletterUnsubscribeForm from '~/components/MyAccount/NewsletterUnsubscribeForm.vue';

export default {
  name: 'MyNewsletter',
  components: {
    SfTabs,
    NewsletterSubscribeForm,
    NewsletterUnsubscribeForm
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      newsletter: []
    };
  },
  created() {
  }
};
</script>

<style lang='scss' scoped>
.tab-orphan {
  @include for-mobile {
    --tabs-title-display: none;
    --tabs-content-padding: 0;
    --tabs-conent-border-width: 0;
  }
}
.form {
  &__element {
    margin: 0 0 var(--spacer-base) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__checkbox-group {
    margin: 0 0 var(--spacer-xl) 0;
  }
  &__title {
    margin: 0 0 var(--spacer-base) 0;
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 17.5rem;
    }
  }
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-dark-variant);
}
.notice {
  margin: var(--spacer-base) 0 0 0;
  font-size: var(--font-size--xs);
  &__link {
  color: var(--c-primary);
  text-decoration: none;
    &:hover {
      color: var(--c-text);
    }
  }
}

</style>
