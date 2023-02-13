<template>
  <client-only>
    <div>
      <div
        v-if="!cookieGroups.decided"
        :class="!furtherSettingsOn ? 'cookieGroupCard' : 'furtherSettingsOn'"
      >
        <div class="card p-xs">
          <div v-if="!furtherSettingsOn">
            <!-- cookie info -->
            <div class="sf-heading">
              {{ cookieGroups.barTitle }}
            </div>
            <div class="barDescription p-xs">
              {{ cookieGroups.barDescription }}

              <SfButton link="/privacy-policy" class="sf-button--text">
                Privacy Settings
              </SfButton>
            </div>
            <!-- checkboxes -->
            <div class="checkboxes ml-xs">
              <div
                v-for="cookieGroup in cookieGroups.list"
                :key="cookieGroup.id"
              >
                <SfCheckbox
                  :name="cookieGroup.name"
                  :label="cookieGroup.name"
                  v-model="cookieGroup.accepted"
                />
              </div>
            </div>
          </div>
          <div class="furtherSettingsCard" v-else>
            <div class="furtherSettingsCardScrollable">
              <div
                v-for="cookieGroup in cookieGroups.list"
                :key="cookieGroup.id"
                class="bg-grey mb-xs"
              >
                <div class="p-sm">
                  <SfCheckbox
                  class=""
                    :name="`${cookieGroup.name}(${cookieGroup.cookies.length})`"
                    :label="cookieGroup.name"
                    v-model="cookieGroup.accepted"
                  />
                  <div class="cookieDescription">
                    {{ cookieGroup.description }}
                  </div>
                  <div v-if="cookieGroup.showMore" class="ml-xs cookieDetails">
                    <div
                      v-for="(cookie, index) in Object.entries(
                        cookieGroup.cookies
                      )"
                      :key="index"
                    >
                      <div class="flex full-width mb-xs p-xs bg-white"  v-for="keyName in Object.keys(cookie[1])" :key="keyName">
                        <div v-if="keyName !== 'name'" class="col-2">{{ keyName }}</div>
                        <div class="col-4">
                          {{ cookie[1][keyName] }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <SfButton
                    v-if="!cookieGroup.showMore"
                    @click="cookieGroup.showMore = true"
                    class="sf-button--text"
                  >
                    More information
                  </SfButton>
                  <SfButton
                    v-else
                    @click="cookieGroup.showMore = false"
                    class="sf-button--text"
                  >
                    Show less
                  </SfButton>
                </div>
              </div>
            </div>
          </div>
          <!-- further settings / back button -->
          <div class="furtherSettingMargin text-center">
            <SfButton
              v-if="!furtherSettingsOn"
              @click="furtherSettingsOn = true"
              class="sf-button--text"
            >
              Further Settings
            </SfButton>
            <SfButton
              v-else
              @click="furtherSettingsOn = false"
              class="sf-button--text"
            >
              Back
            </SfButton>
          </div>
          <!-- action buttons -->
          <div class="actionButtons">
            <div class="actionButton">
              <button
                class="color-primary full-width sf-button"
                :aria-disabled="false"
                type="button"
                aria-label="button"
                @click="toggle(true, true)"
              >
                Accept ALL
              </button>
            </div>
            <div class="actionButton">
              <button
                class="color-primary full-width  sf-button"
                :aria-disabled="false"
                type="button"
                aria-label="button"
                @click="toggle(true, false)"
              >
                REJECT ALL
              </button>
            </div>
            <div class="actionButton">
              <button
                class="sf-button full-width  flat"
                :aria-disabled="false"
                type="button"
                @click="toggle(false, true)"
              >
                Accept SELECTION
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- button to open cookie tab -->
      <button
        v-else
        class="color-primary sf-button openCookies"
        aria-label="Cookie control"
        @click="cookieGroups.decided = false"
      >
        <SfIcon
          icon="info_shield"
          size="sm"
          color="white"
          viewBox="0 0 24 24"
          :coverage="1"
        />
        cookies
      </button>
    </div>
  </client-only>
</template>

<script>
import { ref, useContext } from '@nuxtjs/composition-api';
import { SfModal, SfCheckbox, SfIcon, SfButton } from '@storefront-ui/vue';
export default {
  components: {
    SfModal,
    SfIcon,
    SfCheckbox,
    SfButton
  },
  setup() {
    const { app } = useContext();
    const furtherSettingsOn = ref(false);
    // cookieGroups must be defined in nuxtconfig and language plugins
    const cookieGroups = ref({
      modal: false,
      decided: false,
      list: [
        {
          id: 0,
          name: 'Essentials',
          accepted: false,
          description:
            'Essential cookies enable basic functions and are necessary for the proper functioning of the website.',
          cookies: [
            {
              name: 'Session',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':
                'https://timms.plentymarkets-cloud01.com/en/privacy-policy/',
              Lifespan: '100 days'
            },
            {
              name: 'Consent',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':
                'https://timms.plentymarkets-cloud01.com/en/privacy-policy/',
              Lifespan: '100 days'
            },
            {
              name: 'Session2',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':
                'https://timms.plentymarkets-cloud01.com/en/privacy-policy/',
              Lifespan: '100 days'
            }
          ],
          showMore: false
        },
        {
          id: 1,
          name: 'External Media',
          accepted: false,
          description:
            'Content by video platforms and social media platforms are blocked by default. If you accept cookies by external media, access to these contents requires no further consent.',
          cookies: [
            {
              name: 'Session',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':
                'https://timms.plentymarkets-cloud01.com/en/privacy-policy/',
              Lifespan: '100 days'
            },
            {
              name: 'Consent',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':
                'https://timms.plentymarkets-cloud01.com/en/privacy-policy/',
              Lifespan: '100 days'
            },
            {
              name: 'Session2',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':
                'https://timms.plentymarkets-cloud01.com/en/privacy-policy/',
              Lifespan: '100 days'
            }
          ],
          showMore: false
        },
        {
          id: 2,
          name: 'Functional',
          accepted: false,
          description:
            'Marketing cookies are used by third parties and publishers to display personalised advertisements by following users across websites.',
          cookies: [
            {
              name: 'Session',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':
                'https://timms.plentymarkets-cloud01.com/en/privacy-policy/',
              Lifespan: '100 days'
            },
            {
              name: 'Consent',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':
                'https://timms.plentymarkets-cloud01.com/en/privacy-policy/',
              Lifespan: '100 days'
            },
            {
              name: 'Session2',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':
                'https://timms.plentymarkets-cloud01.com/en/privacy-policy/',
              Lifespan: '100 days'
            }
          ],
          showMore: false
        },
        {
          id: 3,
          name: 'Marketing',
          accepted: false,
          description:
            'Marketing cookies are used by third parties and publishers to display personalised advertisements by following users across websites.',
          cookies: [
            {
              name: 'Session',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':
                'https://timms.plentymarkets-cloud01.com/en/privacy-policy/',
              Lifespan: '100 days'
            },
            {
              name: 'Consent',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':
                'https://timms.plentymarkets-cloud01.com/en/privacy-policy/',
              Lifespan: '100 days'
            },
            {
              name: 'Session2',
              Provider: 'plentyShop LTS',
              Status:
                'The consent cookies stores the user’s state of consent for cookies on our page.',
              'Privacy policy':
                'https://timms.plentymarkets-cloud01.com/en/privacy-policy/',
              Lifespan: '100 days'
            }
          ],
          showMore: false
        }
      ],
      barTitle: 'We value your privacy',
      barDescription:
        'We use cookies and similar technologies on our website and process personal data of visitors to our website (e.g. IP address), e.g. to personalise content and advertisements, to integrate media from third-party providers or to analyse access to our website. Data processing only takes place when cookies are set. We share this data with third parties that we name in the settings.Data processing may be carried out with consent or on the basis of a legitimate interest. Consent can be given or refused. There is a right not to consent and to change or withdraw consent at a later date. We provide more information about the use of personal data and the services in our'
    });

    cookieGroups.value.decided = app.$cookies.getAll().decided;
    if (
      app.$cookies.getAll().cookieGroups &&
      app.$cookies.getAll().cookieGroups.length
    ) {
      cookieGroups.value.list.forEach((cookieGroup) => {
        if (app.$cookies.getAll().cookieGroups.includes(cookieGroup.id)) {
          cookieGroup.accepted = true;
        }
      });
    }
    const toggle = (all, state) => {
      if (all) {
        cookieGroups.value.list.forEach((cookieGroup) => {
          cookieGroup.accepted = state;
        });
      }

      const list = cookieGroups.value.list
        .filter((x) => x.accepted)
        .map((x) => x.id);
      app.$cookies.set('cookieGroups', JSON.stringify(list), {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });
      app.$cookies.set('decided', state, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });
      cookieGroups.value.decided = state;
    };

    return { cookieGroups, toggle, furtherSettingsOn };
  }
};
</script>

<style lang="scss" scoped>
.cookieGroupCard {
  width: 604px;
  position: fixed;
  bottom: 0;
  right: var(--spacer-xs);
  z-index: 1000;
  height: 362px;
  color: rgb(0, 0, 0);
  font-weight: var(--font-weight--medium);
  font-size: var(--font-size--xl);
  font-family: 'Raleway', sans-serif;
  @include for-mobile {
    min-height: 70vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    right: var(--spacer-xs);
  }
}
.furtherSettingsOn {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 400px;
  z-index: 1000;
  color: rgb(0, 0, 0);
  font-family: 'Raleway', sans-serif;
  font-weight: var(--font-weight--medium);
  font-size: var(--font-size--xl);
  @include for-mobile {
    min-height: 70vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    right: var(--spacer-xs);
  }
}
.furtherSettingsCard {
  overflow-y: scroll;
  background: white;
  height: 300px;
}
.furtherSettingsCardScrollable {
  height: 250px;
}
.sf-heading {
  text-align: center;
  @include for-mobile {
    text-align: left;
    margin-left: var(--spacer-xs);
  }
  font-family: 'Raleway';
  font-style: normal;
  font-weight: var(--font-weight--semibold);
  padding: var(--spacer-xs) 0 0 0;
  font-size: var(--font-size--xl);
  color: #7ccb83;
}
.barDescription {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: var(--font-weight--normal);
  font-size: var(--font-size--sm);
  line-height: 1.6;
  @include for-mobile {
    font-size: 3vw;
  }
}

.openCookies {
  position: fixed;
  bottom: 0;
  right: var(--spacer-xs);
}

.card {
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.cookieDescription {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: var(--font-weight--normal);
  font-size: var(--font-size--sm);
  line-height: 1.6;
}
.text-center {
  text-align: center;
}
.flat {
  background: white;
  border: 1px solid green;
  color: black;
}
.flex-center {
  align-items: center;
}
.flex {
  width: 100%;
  display: flex;
}
.bg-grey {
  background: #f2f2f4;
}
.checkboxmargin {
  margin: 0 var(--spacer-sm) 0 var(--spacer-sm);
}

.col {
  flex-grow: 1;
}
.col-2 {
  flex: 2;
}
.col-4 {
  flex: 4;
}
.full-width {
  width: 100%;
}
.p-sm {
  padding: var(--spacer-sm);
}
.p-xs {
  padding: var(--spacer-xs);
}
.px-xs {
  padding: 0 var(--spacer-xs);
}
.mx-xs {
  margin: 0 var(--spacer-xs);
}
.row {
  flex-direction: row;
}
.mb-xs {
  margin: 0 0 var(--spacer-xs) 0;
}
.ml-xs {
  margin: 0 0 0 var(--spacer-xs);
}
.furtherSettingMargin {
  margin: var(--spacer-xs) 0 var(--spacer-sm) 0;
}
.cookieDetails {
  font-weight: var(--font-weight--light);
}
.bg-white {
  background:white
}
.actionButtons {
  display: flex;
  flex-direction: row;

  @include for-mobile {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
.actionButton {
  flex: 1;
  padding: 0 var(--spacer-xs) 0 var(--spacer-xs);
  text-align: center;
  @include for-mobile {
    width: 100%;
    margin-bottom: var(--spacer-xs);
  }
}
.checkboxes {
  display: flex;
  @include for-mobile {
    width: 100%;
  }
}
.cookieGroupCheckbox {
  width: 50vw;
}
</style>

