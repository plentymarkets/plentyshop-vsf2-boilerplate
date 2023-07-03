<template>
  <SfTopBar class="topbar">
    <template #center>
      <SfButton
        id="downloadPwa"
        class="topbar__button sf-button--text"
        @click="installPwa"
      >
        {{ $t('TopBar.Download') }}
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
import { ref, onMounted } from '@nuxtjs/composition-api';

export default {
  components: {
    SfTopBar,
    SfButton,
    LocaleSelector
  },
  setup() {
    let installPrompt = null;
    const downloadPwa = ref(null);

    onMounted(() => {
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        installPrompt = event;
        if (downloadPwa.value) {
          downloadPwa.value.removeAttribute('hidden');
        }
      });
    });

    const disableInAppInstallPrompt = () => {
      installPrompt = null;
      if (downloadPwa.value) {
        downloadPwa.value.setAttribute('hidden', '');
      }
    };

    const installPwa = async () => {
      if (!installPrompt) {
        return;
      }
      const result = await installPrompt.prompt();

      if (result) {
        disableInAppInstallPrompt();
      }
    };

    return {
      installPwa
    };
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
