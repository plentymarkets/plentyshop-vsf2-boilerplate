<template>
  <div class="custom-container">
    <SfButton @click="isLangModalOpen = !isLangModalOpen">
      <SfImage
        :src="addBasePath(`/icons/langs/${locale}.webp`)"
        height="20"
        width="20"
        alt="Flag"
      />
    </SfButton>
    <SfBottomModal
      :is-open="isLangModalOpen"
      title="Choose language"
      @click:close="isLangModalOpen = !isLangModalOpen"
    >
      <SfList>
        <SfListItem
          v-for="lang in availableLocales"
          :key="lang.code"
        >
          <a
            class="cursor-pointer"
            @click="switchLocale(lang.code)"
          >
            <SfCharacteristic class="language">
              <template #title>
                <span>{{ lang.label }}</span>
              </template>
              <template #icon>
                <SfImage
                  :src="addBasePath(`/icons/langs/${lang.code}.webp`)"
                  height="20"
                  width="20"
                  alt="Flag"
                  class="language__flag"
                />
              </template>
            </SfCharacteristic>
          </a>
        </SfListItem>
      </SfList>
    </SfBottomModal>
  </div>
</template>

<script>
import {
  SfImage,
  SfButton,
  SfList,
  SfBottomModal,
  SfCharacteristic
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  useRouter,
  useRoute,
  useContext
} from '@nuxtjs/composition-api';
import { addBasePath } from '@vue-storefront/core';
import { useFacet, useProduct } from '@vue-storefront/plentymarkets';

export default {
  components: {
    SfImage,
    SfButton,
    SfList,
    SfBottomModal,
    SfCharacteristic
  },
  setup() {
    const { app } = useContext();
    const { locales, locale } = app.i18n;

    const route = useRoute();
    const router = useRouter();
    const isLangModalOpen = ref(false);
    const availableLocales = computed(() =>
      locales.filter((i) => i.code !== locale)
    );
    const { result: facet } = useFacet();
    const { products: product } = useProduct('products');

    /** Systems can be configured to append a slash at the end of the url.
     *   This will crash the method that gets the category by slug. Thats why we remove the ending slash if there is one.
     */
    const removeTrailingSlashFromUrl = (url) => {
      return url.slice(-1) === '/' ? url.slice(0, -1) : url;
    };

    /**
     * Redirect to correct category or item url after locale change.
     * @param lang
     */
    const redirectToRoute = (lang) => {
      const prefix = app.i18n.defaultLocale !== lang ? `/${lang}` : '';

      if (facet.value && route.value.name.startsWith('category')) {
        const url = removeTrailingSlashFromUrl(
          facet.value.data?.languageUrls[lang]
        );

        router.push(`${prefix}/c${url}`);
      } else if (product.value && route.value.name.startsWith('product')) {
        const url = product?.value[0].data?.languageUrls[lang];

        if (url) {
          router.push(`${prefix}/p/${url}`);
          return;
        }
        router.push(app.switchLocalePath(lang));
      } else {
        router.push(app.switchLocalePath(lang));
      }
    };

    const switchLocale = (lang) => {
      app.i18n.setLocaleCookie(lang);
      redirectToRoute(lang);
    };

    return {
      availableLocales,
      locale,
      isLangModalOpen,
      addBasePath,
      switchLocale
    };
  }
};
</script>

<style lang="scss" scoped>
.custom-container {
  margin: 0 -5px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;

  .sf-bottom-modal {
    z-index: 2;
    left: 0;
    @include for-desktop {
      --bottom-modal-height: 100vh;
    }
  }
  .sf-bottom-modal::v-deep .sf-bottom-modal__close {
    position: var(--circle-icon-position, absolute);
    top: var(--spacer-xs);
    right: var(--spacer-xs);
  }

  .sf-button {
    --button-box-shadow-opacity: 0;
    --button-background: trasnparent;
  }
  .sf-list {
    .language {
      padding: var(--spacer-sm);
      &__flag {
        margin-right: var(--spacer-sm);
      }
    }
    @include for-desktop {
      display: flex;
    }
  }
  &__lang {
    width: 20px;
    --button-box-shadow: none;
    background: none;
    padding: 0 5px;
    display: flex;
    align-items: center;
    opacity: 0.5;
    border: none;
  }
}
</style>
