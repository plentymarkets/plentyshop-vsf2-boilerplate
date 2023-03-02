<template>
  <SfSection
    title-heading="Share Your Look"
    subtitle-heading="#YOURLOOK"
    class="title"
  >
    <div class="flex justify-center">
      <div class="flex flex-col ml-sf-sm">
        <div>
          <SfImage
            class="smartphone-only"
            :src="addBasePath('/homepage/imageAm.webp')"
            alt="katherina_trn"
            :width="160"
            :height="160"
          >
            katherina_trn
          </SfImage>
          <SfImage
            class="desktop-only"
            :src="addBasePath('/homepage/imageAd.webp')"
            alt="katherina_trn"
            :width="470"
            :height="470"
          >
            katherina_trn
          </SfImage>
        </div>
        <div>
          <SfImage
            class="smartphone-only"
            :src="addBasePath('/homepage/imageBm.webp')"
            alt="katherina_trn"
            :width="160"
            :height="160"
          >
            katherina_trn
          </SfImage>
          <SfImage
            class="desktop-only"
            :src="addBasePath('/homepage/imageCd.webp')"
            alt="katherina_trn"
            :width="470"
            :height="160"
          >
            katherina_trn
          </SfImage>
        </div>
      </div>
      <div class="flex flex-col ml-sf-sm">
        <div>
          <SfImage
            class="smartphone-only"
            :src="addBasePath('/homepage/imageCm.webp')"
            alt="katherina_trn"
            :width="160"
            :height="160"
          >
            katherina_trn
          </SfImage>
          <SfImage
            class="desktop-only"
            :src="addBasePath('/homepage/imageBd.webp')"
            alt="katherina_trn"
            :width="470"
            :height="160"
          >
            katherina_trn
          </SfImage>
        </div>
        <div>
          <SfImage
            class="smartphone-only"
            :src="addBasePath('/homepage/imageDm.webp')"
            alt="katherina_trn"
            :width="160"
            :height="160"
          >
            katherina_trn
          </SfImage>
          <SfImage
            class="desktop-only"
            :src="addBasePath('/homepage/imageDd.webp')"
            alt="katherina_trn"
            :width="470"
            :height="470"
          >
            katherina_trn
          </SfImage>
        </div>
      </div>
    </div>
  </SfSection>
</template>
<script>
import { addBasePath } from '@vue-storefront/core';
import {
  SfSection,
  SfImage
} from '@storefront-ui/vue';
export default {
  name: 'InstagramFeed',
  components: {
    SfSection,
    SfImage
  },
  setup() {
    return {
      addBasePath
    };
  }
};
</script>
<style lang="scss" scoped>
.title {
  --heading-title-font-weight: var(--font-weight--semibold);
  --section-margin: var(--spacer-xl) 0;
  --section-content-margin: var(--spacer-xl) 0;
  --heading-title-font-size: var(--h2-font-size);
  @include for-desktop {
    --section-margin: var(--spacer-2xl) 0;
    --section-content-margin: var(--spacer-2xl) 0;
  }
}
</style>
