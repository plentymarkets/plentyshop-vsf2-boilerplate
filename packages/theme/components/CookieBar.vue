<template>
  <client-only>
    <div>
      <div
        v-if="!bannerIsHidden"
        :class="!furtherSettingsOn ? 'cookieGroupCard' : 'furtherSettingsOn'"
      >
        <div class="card p-xs">
          <div v-if="!furtherSettingsOn">
            <!-- cookie info -->
            <div class="sf-heading">
              {{ cookieBarGetters.getBarTitle(cookieGroups) }}
            </div>
            <div class="barDescription p-xs">
              {{ cookieBarGetters.getBarDescription(cookieGroups) }}

              <SfButton link="/privacy-policy" class="sf-button--text">
                {{ $t('Privacy Settings') }}
              </SfButton>
            </div>
            <!-- checkboxes -->
            <div class="checkboxes">
              <div
                class="checkbox"
                v-for="cookieGroup in cookieBarGetters.getListOfGroups(
                  cookieGroups
                )"
                :key="cookieBarGetters.getId(cookieGroup)"
              >
                <SfCheckbox
                  :name="cookieBarGetters.getCookieGroupName(cookieGroup)"
                  :label="cookieBarGetters.getCookieGroupName(cookieGroup)"
                  v-model="cookieGroup.accepted"
                />
              </div>
            </div>
          </div>
          <div class="furtherSettingsCard" v-else>
            <div class="furtherSettingsCardScrollable">
              <div
                v-for="cookieGroup in cookieBarGetters.getListOfGroups(
                  cookieGroups
                )"
                :key="cookieBarGetters.getId(cookieGroup)"
                class="bg-grey mb-xs"
              >
                <div class="p-sm">
                  <SfCheckbox
                    :name="`${cookieBarGetters.getCookieGroupName(
                      cookieGroup
                    )}`"
                    :label="
                      cookieBarGetters.getCookieGroupNameWithCount(cookieGroup)
                    "
                    v-model="cookieGroup.accepted"
                  />
                  <div class="cookieDescription">
                    {{ cookieBarGetters.getBarDescription(cookieGroup) }}
                  </div>
                  <div
                    v-if="cookieBarGetters.getShowMore(cookieGroup)"
                    class="ml-xs cookieDetails"
                  >
                    <div
                      v-for="(cookie, index) in Object.entries(
                        cookieBarGetters.getCookiesList(cookieGroup)
                      )"
                      :key="index"
                    >
                      <div
                        class="flex full-width mb-xs p-xs bg-white"
                        v-for="keyName in Object.keys(cookie[1])"
                        :key="keyName"
                      >
                        <div v-if="keyName !== 'name'" class="col-2">
                          {{ keyName }}
                        </div>
                        <div class="col-4">
                          {{ cookie[1][keyName] }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <SfButton
                    v-if="!cookieBarGetters.getShowMore(cookieGroup)"
                    @click="cookieGroup.showMore = true"
                    class="sf-button--text"
                  >
                    {{ $t('More information') }}
                  </SfButton>
                  <SfButton
                    v-else
                    @click="cookieGroup.showMore = false"
                    class="sf-button--text"
                  >
                    {{ $t('Show less') }}
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
              {{ $t('Further Settings') }}
            </SfButton>
            <SfButton
              v-else
              @click="furtherSettingsOn = false"
              class="sf-button--text"
            >
              {{ $t('Back') }}
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
                {{ $t('Accept All') }}
              </button>
            </div>
            <div class="actionButton">
              <button
                class="color-primary full-width sf-button"
                :aria-disabled="false"
                type="button"
                aria-label="button"
                @click="toggle(true, false)"
              >
                {{ $t('Reject All') }}
              </button>
            </div>
            <div class="actionButton">
              <button
                class="sf-button full-width flat"
                :aria-disabled="false"
                type="button"
                @click="toggle(false, true)"
              >
                {{ $t('Accept Selection') }}
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
        @click="bannerIsHidden = false"
      >
        <SfIcon
          icon="info_shield"
          size="xs"
          color="white"
          viewBox="0 0 24 24"
          :coverage="1"
        />
        <div class="cookiesText">cookies</div>
      </button>
    </div>
  </client-only>
</template>

<script>
import { cookieBarGetters } from '@vue-storefront/plentymarkets';

import { ref, useContext } from '@nuxtjs/composition-api';
import { SfModal, SfCheckbox, SfIcon, SfButton } from '@storefront-ui/vue';
import { keyBy } from 'lodash';
export default {
  components: {
    SfModal,
    SfIcon,
    SfCheckbox,
    SfButton
  },
  setup() {
    const furtherSettingsOn = ref(false);
    const { $config, app } = useContext();
    const cookieGroups = ref($config.cookieGroups);
    const cookieGroupsSaved = app.$cookies.getAll().cookieGroups;
    const cookieGroupsById = keyBy($config.cookieGroups.list, 'id');
    const bannerIsHidden = ref(false);

    const groupHasExpiredCookies = (cookieGroupId) => {
      const cookieGroup = cookieGroupsById[cookieGroupId];
      const validCookieList = cookieGroup.cookies.filter((cookie) =>
        app.$cookies.get(cookieGroup.name + '-' + cookie.name)
      );
      // if the cookiegroup has less valid cookies than the cookie list from the consented cookiegroup
      if (validCookieList.length < cookieGroup.cookies.length) {
        return true;
      }
      return false;
    };
    const checkIfbannerIsHidden = () => {
      // method checks if any cookie from the conented cookieGroups is expired
      if (!cookieGroupsSaved) {
        return false;
      }
      let result = true;
      if (cookieGroupsSaved && cookieGroupsSaved.length) {
        // check if any off the cookies from the group that was previously accepted has expired
        cookieGroupsSaved.forEach((cookieGroupId) => {
          result = !groupHasExpiredCookies(cookieGroupId);
        });
      }

      return result;
    };

    const initializeCheckBoxesState = () => {
      console.log(cookieGroupsSaved);
      if (cookieGroupsSaved && cookieGroupsSaved.length) {
        cookieGroups.value.list.forEach((cookieGroup) => {
          // if the checkbox was checked and does't have a cookie expired
          if (
            cookieGroupsSaved.includes(cookieGroup.id) &&
            !groupHasExpiredCookies(cookieGroup.id)
          ) {
            cookieGroup.accepted = true;
          }
        });
      }
    };
    const clearAllCookiesRelatedToConsent = () => {
      cookieGroups.value.list.forEach((cookieGroup) => {
        cookieGroup.cookies.forEach((cookie) => {
          app.$cookies.remove(
            cookieBarGetters.getCookieGroupName(cookieGroup) +
              '-' +
              cookieBarGetters.getCookieName(cookie)
          );
        });
      });
    };

    bannerIsHidden.value = checkIfbannerIsHidden();
    // TODO initialization not putting checkbox in false state if previously unchecked !
    initializeCheckBoxesState();

    const toggle = (all, state) => {
      clearAllCookiesRelatedToConsent();
      if (cookieGroups.value.list[0].name === 'Essentials') {
        cookieGroups.value.accepted = true;
      }
      if (all) {
        cookieGroups.value.list.forEach((cookieGroup) => {
          cookieGroup.accepted = state;
        });
      }

      const consentedList = cookieGroups.value.list
        .filter((x) => x.accepted)
        .map((x) => x.id);

      // set each cookie with the folowing convention: cookiegroupname-cookiename
      consentedList.forEach((cookieGroupId) => {
        const cookieGroup = cookieGroupsById[cookieGroupId];
        cookieGroup.cookies.forEach((cookie) => {
          if (cookie.Lifespan) {
            const convertedToDays = parseInt(cookie.Lifespan.split(' ')[0]);
            const lifeSpan = 60 * 60 * 24 * convertedToDays;
            app.$cookies.set(
              cookieBarGetters.getCookieGroupName(cookieGroup) +
                '-' +
                cookieBarGetters.getCookieName(cookie),
              JSON.stringify(consentedList),
              {
                path: '/',
                maxAge: lifeSpan
              }
            );
          }
        });
      });
      // the browser must remember that the user once accepted a group of cookies
      const maximumAge = 60 * 60 * 24 * 256 * 10;
      app.$cookies.set('cookieGroups', JSON.stringify(consentedList), {
        path: '/',
        maxAge: maximumAge
      });
      bannerIsHidden.value = true;
    };

    return {
      cookieGroups,
      toggle,
      furtherSettingsOn,
      bannerIsHidden,
      cookieBarGetters
    };
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
  color: var(--c-text);
  font-weight: var(--font-weight--medium);
  font-size: var(--font-size--xl);
  font-family: var(--font-family--secondary);
  @include for-mobile {
    min-height: 75vh;
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
  height: 420px;
  z-index: 1000;
  color: var(--c-text);
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
  background: var(--_c-light-primary-lighten);
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
  color: var(--c-primary);
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
  z-index: 1000;
  position: fixed;
  bottom: 0;
  right: var(--spacer-xs);
  @include for-mobile {
    bottom: 100px;
  }
}

.card {
  background: var(--_c-light-primary-lighten);
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
  background: var(--_c-light-primary-lighten);
  border: 1px solid var(--c-primary);
  color: var(--c-text);
}
.flex-center {
  align-items: center;
}
.flex {
  width: 100%;
  display: flex;
}
.bg-grey {
  background: var(--_c-light-primary);
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
  background: var(--_c-light-primary-lighten);
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
.cookiesText {
  @include for-mobile {
    display: none;
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
  margin: 0 0 0 var(--spacer-xs);
  @include for-mobile {
    flex-wrap: wrap;
  }
}
.checkbox {
  margin: 0 var(--spacer-sm) 0 0;
  @include for-mobile {
    width: 40vw;
  }
}
</style>
