<template>
  <SfTopBar class="topbar">
    <template #left>
      <SfButton class="sf-button--text">
        {{ $t('TopBar.Help & FAQs') }}
      </SfButton>
    </template>
    <template #center>
      <p>{{ $t('TopBar.Download') }}</p>
      <SfButton class="topbar__button sf-button--text">
        {{ $t('TopBar.Find out more') }}
      </SfButton>
    </template>
    <template #right>
      <LocaleSelector />
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';
import LocaleSelector from './LocaleSelector';

export default {
  components: {
    SfTopBar,
    SfButton,
    LocaleSelector
  }
};

</script>
  <style lang="scss" scoped>
  .topbar {
    position: relative;
    z-index: 20;
    &__button {
      margin: 0 0 0 var(--spacer-xs);
    }
  }
  </style>
