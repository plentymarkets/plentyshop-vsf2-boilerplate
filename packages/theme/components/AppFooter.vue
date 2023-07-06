<template>
  <SfFooter
    :column="4"
    multiple
    class="footer"
  >
    <SfFooterColumn :title="$t('AppFooter.Departments')">
      <SfList>
        <SfListItem
          v-for="(category, index) in categoryTree.slice(0, 5)"
          :key="index"
        >
          <SfMenuItem
            :label="categoryTreeGetters.getLabel(category)"
            class="sf-header-navigation-item__menu-item"
            :link="localePath(`/c/${categoryTreeGetters.getSlug(category)}`)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn title="Legal">
      <SfList>
        <SfListItem
          v-for="item in legal"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
            :link="localePath(legalPaths[item])"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
  </SfFooter>
</template>

<script>
import { SfFooter, SfList, SfMenuItem } from '@storefront-ui/vue';
import { addBasePath } from '@vue-storefront/core';
import { computed, useRouter } from '@nuxtjs/composition-api';
import { categoryTreeGetters, useCategory } from '@vue-storefront/plentymarkets';

export default {
  components: {
    SfFooter,
    SfList,
    SfMenuItem
  },
  setup() {
    const router = useRouter();
    const { categories, loading } = useCategory('categories');
    const categoryTree = computed(() => loading && categories.value.map((cat) => categoryTreeGetters.getTree(cat)));

    return {
      router,
      addBasePath,
      categoryTreeGetters,
      categoryTree
    };
  },
  data() {
    return {
      departments: ['AppFooter.Women fashion', 'AppFooter.Men fashion', 'AppFooter.Kidswear', 'AppFooter.Home'],
      legal: ['AppFooter.CancellationRights', 'AppFooter.CancellationForm', 'AppFooter.LegalDisclosure',
        'AppFooter.PrivacyPolicy', 'AppFooter.TermsAndConditions', 'AppFooter.Unsubscribe'],
      legalPaths: {
        'AppFooter.CancellationRights': 'CancellationRights',
        'AppFooter.CancellationForm': 'CancellationForm',
        'AppFooter.LegalDisclosure': 'LegalDisclosure',
        'AppFooter.PrivacyPolicy': 'PrivacyPolicy',
        'AppFooter.TermsAndConditions': 'TermsAndConditions',
        'AppFooter.Unsubscribe': 'Unsubscribe'
      },
      isMobile: false,
      desktopMin: 1024
    };
  }
};
</script>

<style lang="scss">
.footer {
  margin-bottom: 3.75rem;

  .sf-link:hover {
    .sf-menu-item__label{
      color: var(--c-white) !important;
      text-decoration: underline;
    }
  }

  @include for-desktop {
    margin-bottom: 0;
  }
}

.sf-footer {
  @include for-desktop {
    border-top: var(--spacer-xs) solid var(--c-primary);
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }

  &__container {
    margin: var(--spacer-sm);

    @include for-desktop {
      max-width: 69rem;
      margin: 0 auto;
    }
  }
}
</style>
