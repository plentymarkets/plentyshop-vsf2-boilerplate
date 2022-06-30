<template>
  <div class="sf-header__navigation desktop" v-if="!isMobile">
    <SfHeaderNavigationItem
      v-for="(category, index) in categoryTree"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${category.slug}`"
      :label="category.label"
      :link="localePath(`/c/${category.slug}`)"
    />
  </div>
  <SfModal v-else :visible="isMobileMenuOpen">
    <SfHeaderNavigationItem
      v-for="(category, index) in categoryTree"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${category.slug}`"
    >
      <template #mobile-navigation-item>
        <SfMenuItem
          :label="category.label"
          class="sf-header-navigation-item__menu-item"
          :link="localePath(`/c/${category.slug}`)"
          @click="toggleMobileMenu"
        />
      </template>
    </SfHeaderNavigationItem>
  </SfModal>
</template>

<script>
import { SfMenuItem, SfModal } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { categoryGetters, useCategory } from '@vue-storefront/plentymarkets';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@nuxtjs/composition-api';

export default {
  name: 'HeaderNavigation',
  components: {
    SfMenuItem,
    SfModal
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    // eslint-disable-next-line prefer-const
    const { categories, search, loading } = useCategory('categories');
    const categoryTree = computed(() => loading && categories.value.map((cat) => categoryGetters.getTree(cat)));

    onSSR(async () => {
      await search({});
    });

    return {
      categoryTree,
      isMobileMenuOpen,
      toggleMobileMenu
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-header-navigation-item {
  ::v-deep &__item--mobile {
    display: block;
  }
}
.sf-modal {
  ::v-deep &__bar {
    display: none;
  }
  ::v-deep &__content {
    padding: var(--modal-content-padding, var(--spacer-base) 0);
  }
}
</style>