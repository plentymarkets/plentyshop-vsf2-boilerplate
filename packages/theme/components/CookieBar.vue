<template>
  <client-only>
    <div>
      <!-- cookiebar -->
      <div :class="!furtherSettingsOn ? 'cookieControl' : 'cookieControl2'">
        <div class="card" v-if="!cookieGroups.decided">
          <div v-if="!furtherSettingsOn">
            <div class="sf-heading__description p-2">
              {{ cookieGroups.text.barTitle }}
            </div>
            <div class="barDescription p-2">
              {{ cookieGroups.text.barDescription }}
              <a href="#">Privacy Settings</a>
            </div>
            <div class="flex p-2">
              <div
                v-for="cookieGroup in cookieGroups.list"
                :key="cookieGroup.id"
                class="item"
              >
                <SfCheckbox
                  :name="cookieGroup.name"
                  :label="cookieGroup.name"
                  v-model="cookieGroup.accepted"
                />
              </div>
            </div>
          </div>
          <div
            style="overflow-y: scroll; background: white; height: 300px"
            v-else
          >
            <div style="height: 200px">
              <div
                v-for="cookieGroup in cookieGroups.list"
                :key="cookieGroup.id"
                class="bg-grey"
                style="margin-bottom: 5px"
              >
                <div class="p-2">
                  <SfCheckbox
                    style="color: green"
                    :name="`${cookieGroup.name}(${cookieGroup.cookies.length})`"
                    :label="cookieGroup.name"
                    v-model="cookieGroup.accepted"
                  />
                  <div class="cookieDescription">
                    {{ cookieGroup.description }}
                  </div>
                  <div style="margin-left:10px;" v-if="cookieGroup.showMore">
                    <div
                      v-for="(cookie, index) in Object.entries(
                        cookieGroup.cookies
                      )"
                      :key="index"
                    >
                      <div v-for="k in Object.keys(cookie[1])" :key="k">
                        {{ k }}: {{ cookie[1][k] }}
                      </div>
                    </div>
                  </div>
                  <a
                    style="text-decoration: underline"
                    href="#"
                    v-if="!cookieGroup.showMore"
                    @click="cookieGroup.showMore = true"
                    >More information</a
                  >
                  <a href="#" v-else @click="cookieGroup.showMore = false"
                    >Show less</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div v-if="!furtherSettingsOn"  style="text-align:center">
            <a @click="furtherSettingsOn = true">Further Settings</a>
          </div>
          <div v-else style="text-align:center">
            <a href="#" @click="furtherSettingsOn = false">back</a>
          </div>
          <!-- buttons -->
          <div class="flex">
            <div class="item p-2">
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
            <div class="item p-2">
              <button
                class="color-primary full-width sf-button"
                :aria-disabled="false"
                type="button"
                aria-label="button"
                @click="toggle(true, false)"
              >
                REJECT ALL
              </button>
            </div>
            <div class="item p-2">
              <button
                class="full-width sf-button flat"
                :aria-disabled="false"
                type="button"
                aria-label="button"
                @click="toggle(false, true)"
              >
                Accept SELECTION
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
          v-if="cookieGroups.decided"
          class="color-primary sf-button openCookies"
          aria-label="Cookie control"
          @click="cookieGroups.decided = false"
        >
        cookies
      </button>
    </div>
  </client-only>
</template>

<script>
import { ref, useContext } from '@nuxtjs/composition-api';
import { SfModal, SfCheckbox } from '@storefront-ui/vue';
export default {
  components: {
    SfModal,
    SfCheckbox
  },
  setup() {
    const { app } = useContext();
    const furtherSettingsOn = ref(false);
    console.log(app.$cookies.getAll());
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
      barPosition: 'bottom-right',
      text: {
        barTitle: 'We value your privacy',
        barDescription:
          'We use cookies and similar technologies on our website and process personal data of visitors to our website (e.g. IP address), e.g. to personalise content and advertisements, to integrate media from third-party providers or to analyse access to our website. Data processing only takes place when cookies are set. We share this data with third parties that we name in the settings.Data processing may be carried out with consent or on the basis of a legitimate interest. Consent can be given or refused. There is a right not to consent and to change or withdraw consent at a later date. We provide more information about the use of personal data and the services in our',
        toggle: 'Accept all',
        declineAll: 'Delete all',
        manageCookies: 'Manage cookies',
        unsaved: 'You have unsaved settings',
        close: 'Close',
        save: 'Save',
        necessary: 'Necessary cookies',
        optional: 'Optional cookies',
        functional: 'Functional cookies',
        blockedIframe: 'To see this, please enable functional cookies',
        here: 'here',
        furtherSettingsOn: false,
        acceptNecessary: 'Accept necessary'
      }
    });

    cookieGroups.value.decided = app.$cookies.getAll().decided;
    if (app.$cookies.getAll().cookieGroups.length) {
      cookieGroups.value.list.forEach(cookieGroup => {
        if (app.$cookies.getAll().cookieGroups.includes(cookieGroup.id)) {
          cookieGroup.accepted = true;
        }
      });
    }
    const toggle = (all, state) => {
      if (all) {
        cookieGroups.value.list.forEach(cookieGroup => {
          cookieGroup.accepted = state;
        });
      }

      const list = cookieGroups.value.list.filter(x => x.accepted).map(x=> x.id);
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

<style scoped>
.flex {
  display: flex; /* or inline-flex */
}
.bg-grey {
  background: #f2f2f4;
}
.item {
  flex-grow: 1; /* default 0 */
}
.full-width {
  width: 100%;
}
.p-2 {
  padding: 5px;
}
.row {
  flex-direction: row;
}
.sf-heading__description {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height, or 144% */
  color: #7ccb83;
}
.barDescription {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140.6%;
}
.cookieControl {
  width: 604px;
  position: fixed;
  bottom: 350px;
  right: 20px;
  z-index: 1000;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: rgb(0, 0, 0);
  font-size: 14px;
  font-family: 'Lato', sans-serif;
  font-weight: 100;
  transition: 0.8s;
  animation: slideIn 0.8s;
  animation-delay: 0.8s;
}
.openCookies {
  position: fixed;
  bottom: 0;
  right: 20px;
}
.cookieControl2 {
  width: 100%;
  position: fixed;
  bottom: 80px;
  height: 300px;
  z-index: 1000;
  line-height: 30px;
  color: rgb(0, 0, 0);
  font-size: 14px;
  font-family: 'Lato', sans-serif;
  font-weight: 100;
  transition: 0.8s;
  animation: slideIn 0.8s;
  animation-delay: 0.8s;
}

.cookieControl .card {
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.cookieDescription {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140.6%;
}
.flat {
  background: white;
  border: 1px solid green;
  color: black;
}
</style>
