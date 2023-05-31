<template>
  <SfFooter
    :column="4"
    multiple
    class="footer"
  >
    <SfFooterColumn :title="$t('AppFooter.About us')">
      <SfList>
        <SfListItem
          v-for="item in aboutUs"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('AppFooter.Departments')">
      <SfList>
        <SfListItem
          v-for="item in departments"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('AppFooter.Help')">
      <SfList>
        <SfListItem
          v-for="item in help"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('AppFooter.Payment & Delivery')">
      <SfList>
        <SfListItem
          v-for="item in paymentsDelivery"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
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
    <SfFooterColumn :title="$t('AppFooter.Social')">
      <div class="footer__socials">
        <SfImage
          v-for="item in social"
          :key="item"
          class="footer__social-image"
          :src="addBasePath('/icons/'+item+'.svg')"
          :alt="item"
          width="32"
          height="32"
        />
      </div>
    </SfFooterColumn>
  </SfFooter>
</template>

<script>
import { SfFooter, SfList, SfImage, SfMenuItem } from '@storefront-ui/vue';
import { addBasePath } from '@vue-storefront/core';
import { useRouter } from '@nuxtjs/composition-api';

export default {
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem
  },
  setup() {
    const router = useRouter();

    return {
      router,
      addBasePath
    };
  },
  data() {
    return {
      aboutUs: ['AppFooter.Who we are', 'AppFooter.Quality in the details', 'AppFooter.Customer reviews'],
      departments: ['AppFooter.Women fashion', 'AppFooter.Men fashion', 'AppFooter.Kidswear', 'AppFooter.Home'],
      help: ['AppFooter.Customer service', 'AppFooter.Size guide', 'AppFooter.Contact us'],
      paymentsDelivery: ['AppFooter.Purchase terms', 'AppFooter.Guarantee'],
      social: ['facebook', 'pinterest', 'google', 'twitter', 'youtube'],
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
    @include for-desktop {
      margin-bottom: 0;
    }
    &__socials {
      display: flex;
      justify-content: space-between;
      margin: 0 auto var(--spacer-lg);
      padding: var(--spacer-base) var(--spacer-xl);
      @include for-desktop {
        justify-content: flex-start;
        padding: var(--spacer-xs) 0;
        margin: 0 auto;
      }
    }
    &__social-image {
      margin: 0 var(--spacer-2xs) 0 0;
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
