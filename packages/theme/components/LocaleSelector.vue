<template>
  <div>
    <SfButton @click="toggleLangModal()">
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
      class="left-0 z-10"
      @click:close="toggleLangModal()"
    >
      <SfList class="md:lg:flex">
        <SfListItem
          v-for="lang in availableLocales"
          :key="localesGetters.getCode(lang)"
        >
          <a
            class="cursor-pointer"
            @click="switchLocale(localesGetters.getCode(lang))"
          >
            <SfCharacteristic class="p-sf-sm">
              <template #title>
                <span>{{ localesGetters.getLabel(lang) }}</span>
              </template>
              <template #icon>
                <SfImage
                  :src="addBasePath(`/icons/langs/${localesGetters.getCode(lang)}.webp`)"
                  height="20"
                  width="20"
                  alt="Flag"
                  class="mr-sf-sm"
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
  computed,
  useRouter,
  useRoute,
  useContext
} from '@nuxtjs/composition-api';
import { localesGetters, useFacet, useLocaleSwitchHelper } from '@vue-storefront/plentymarkets';
import { addBasePath } from '@vue-storefront/core';
import { useUiState } from '~/composables';

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

    const { isLangModalOpen, toggleLangModal } = useUiState();

    const { locales, locale } = app.i18n;
    const route = useRoute();
    const router = useRouter();
    const availableLocales = computed(() =>
      locales.filter((i) => i.code !== locale)
    );
    const { result: facet } = useFacet();
    const { routeToCategory } = useLocaleSwitchHelper();

    const switchLocale = (language) => {
      app.i18n.setLocaleCookie(language);
      if (facet.value && route.value.name.startsWith('category')) {
        routeToCategory(facet, language);
      } else {
        router.push(app.switchLocalePath(language));
      }
    };

    return {
      localesGetters,
      availableLocales,
      locale,
      addBasePath,
      switchLocale,
      isLangModalOpen,
      toggleLangModal
    };
  }
};
</script>

<style lang="scss" scoped>
  .sf-bottom-modal {
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
</style>
