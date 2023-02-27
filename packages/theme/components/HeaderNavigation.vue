<template>
  <div>
    <div class="sf-header__navigation desktop-only">
      <SfHeaderNavigationItem
        v-for="(category, index) in categoryTree"
        :key="index"
        class="nav-item"
        :data-e2e="`app-header-url_${category.slug}`"
        :label="category.label"
        :link="localePath(`/c/${category.slug}`)"
      />
    </div>
    <SfModal
      class="smartphone-only"
      :visible="isMobileMenuOpen"
    >
      <SfHeaderNavigationItem
        v-for="(category, index) in categoryTree"
        :key="index"
        class="nav-item"
        :data-e2e="`app-header-url_${category.slug}`"
      >
        <template #mobile-navigation-item>
          <SfMenuItem
            :label="category.label"
            class="sf-header-navigation-item__menu-item"
            @click="routeToCategory(category)"
          />
        </template>
      </SfHeaderNavigationItem>
    </SfModal>
  </div>
</template>

<script>
import { SfMenuItem, SfModal } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { categoryGetters, useCategory } from '@vue-storefront/plentymarkets';
import { onSSR } from '@vue-storefront/core';
import { computed, useRouter } from '@nuxtjs/composition-api';

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
  setup(props, context) {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const router = useRouter();
    // eslint-disable-next-line prefer-const
    const { categories, search, loading } = useCategory('categories');
    const categoryTree = computed(() => loading && categories.value.map((cat) => categoryGetters.getTree(cat)));

    onSSR(async () => {
      await search();
    });
    const routeToCategory = (category) => {
      router.push(context.root.localePath(`/c/${category.slug}`));
      toggleMobileMenu();
    };

    return {
      categoryTree,
      isMobileMenuOpen,
      toggleMobileMenu,
      routeToCategory
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
