<template>
  <div>
    <div class="sf-header__navigation desktop-only">
      <SfHeaderNavigationItem
        v-for="(category, index) in categoryTree"
        :key="index"
        class="nav-item"
        :data-e2e="`app-header-url_${categoryTreeGetters.getSlug(category)}`"
        :label="categoryTreeGetters.getLabel(category)"
        :link="localePath(`/c/${categoryTreeGetters.getSlug(category)}`)"
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
        :data-e2e="`app-header-url_${categoryTreeGetters.getSlug(category)}`"
      >
        <template #mobile-navigation-item>
          <SfMenuItem
            :label="categoryTreeGetters.getLabel(category)"
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
import { categoryTreeGetters, useCategory } from '@vue-storefront/plentymarkets';
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
    const categoryTree = computed(() => loading && categories.value.map((cat) => categoryTreeGetters.getTree(cat)));

    onSSR(async () => {
      await search();
    });
    const routeToCategory = (category) => {
      router.push(context.root.localePath(`/c/${category.slug}`));
      toggleMobileMenu();
    };

    return {
      categoryTreeGetters,
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
