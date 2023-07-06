<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      v-e2e="'my-account-content-pages'"
      :title="$t('MyAccount.My account')"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage($event)"
    >
      <SfContentCategory :title="$t('MyAccount.User data')">
        <SfContentPage :title="$t('MyAccount.My profile')">
          <ProfileDetails />
        </SfContentPage>

        <SfContentPage :title="$t('MyAccount.Shipping details')">
          <ShippingDetails />
        </SfContentPage>

        <SfContentPage :title="$t('MyAccount.Billing details')">
          <BillingDetails />
        </SfContentPage>

        <SfContentPage :title="$t('MyAccount.My newsletter')">
          <MyNewsletter />
        </SfContentPage>
      </SfContentCategory>

      <SfContentCategory :title="$t('MyAccount.Order details')">
        <SfContentPage :title="$t('MyAccount.Order history')">
          <OrderHistory />
        </SfContentPage>
        <SfContentPage :title="$t('MyAccount.Order returns')">
          <OrderReturns />
        </SfContentPage>
      </SfContentCategory>

      <SfContentPage :title="$t('MyAccount.Log out')" />
    </SfContentPages>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages } from '@storefront-ui/vue';
import { computed, useRoute, useRouter, useContext } from '@nuxtjs/composition-api';
import { useUser } from '@vue-storefront/plentymarkets';
import MyNewsletter from './MyAccount/MyNewsletter';
import OrderHistory from './MyAccount/OrderHistory';
import OrderReturns from './MyAccount/OrderReturns';
import ShippingDetails from './MyAccount/ShippingDetails';
import BillingDetails from './MyAccount/BillingDetails';
import ProfileDetails from './MyAccount/ProfileDetails';

export default {
  name: 'MyAccount',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    ShippingDetails,
    BillingDetails,
    ProfileDetails,
    MyNewsletter,
    OrderHistory,
    OrderReturns
  },
  middleware: [
    'is-authenticated'
  ],
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { app } = useContext();

    const { logout } = useUser();

    const activePage = computed(() => {
      const { pageName } = route.value.params;

      if (pageName) {
        const transformUrlToPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1).replace('-', ' ');

        return transformUrlToPageName;
      }

      return '';
    });

    const changeActivePage = async (title) => {
      if (title === app.i18n.t('MyAccount.Log out')) {
        await logout();
        window.location.reload();
      }

      const slugifiedTitle = (title || '').toLowerCase().replace(' ', '-');
      const transformedPath = `/my-account/${slugifiedTitle}`;
      const localeTransformedPath = app.localePath(transformedPath);

      router.push(localeTransformedPath);
    };

    return { activePage, changeActivePage };
  },

  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          link: '#'
        },
        {
          text: 'My Account',
          link: '#'
        }
      ]
    };
  },
  head: {
    meta: [
      {
        hid: 'description',
        name: 'robots',
        content: 'noindex'
      }
    ]
  }
};
</script>

<style lang='scss' scoped>
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) 0 var(--spacer-lg);
}
</style>
