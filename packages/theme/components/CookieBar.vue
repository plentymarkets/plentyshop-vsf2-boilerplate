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
                v-for="(cookieGroup, index) in Object.values(cookieJson)"
                :key="index"
              >
                <SfCheckbox
                  :disabled="index === 0"
                  @change="
                    ($event) => setChildrenCheckboxes(cookieGroup, $event)
                  "
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
                v-for="(cookieGroup, index) in Object.values(cookieJson)"
                :key="index"
                class="bg-grey ml-xs mb-xs"
              >
                <div>
                  <SfCheckbox
                    :disabled="index === 0"
                    @change="
                      ($event) => setChildrenCheckboxes(cookieGroup, $event)
                    "
                    :name="cookieGroup.name"
                    :label="cookieGroup.name"
                    v-model="cookieGroup.accepted"
                  />
                  <div class="cookieDescription ml-xs">
                    {{ cookieGroups.list[index].description }}
                  </div>
                  <div v-if="showMore" class="ml-xs cookieDetails">
                    <div
                      class="p-sm"
                      v-for="(cookie, index2) in Object.values(
                        cookieGroup.cookies
                      )"
                      :key="index2"
                    >
                      <SfCheckbox
                        :disabled="index === 0"
                        @change="setParentCheckbox(cookieGroup)"
                        :name="cookie.name"
                        :label="cookie.name"
                        v-model="cookie.accepted"
                      />

                      <div
                        v-for="(cookie, index) in Object.entries(
                          cookieGroups.list[index].cookies[index2]
                        )"
                        :key="index"
                      >
                        <div class="flex full-width mb-xs p-xs bg-white">
                          <div v-if="cookie[0] !== 'name'" class="col-2">
                            {{ cookie[0] }}
                          </div>
                          <div class="col-4">
                            {{ cookie[1] }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ml-xs">
                  <SfButton
                    v-if="!showMore"
                    @click="showMore = true"
                    class="sf-button--text mb-xs"
                  >
                    {{ $t('More information') }}
                  </SfButton>
                  <SfButton
                    v-else
                    @click="showMore = false"
                    class="sf-button--text mb-xs"
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
                @click="convertAndSaveCookies(true, true)"
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
                @click="convertAndSaveCookies(true, false)"
              >
                {{ $t('Reject All') }}
              </button>
            </div>
            <div class="actionButton">
              <button
                class="sf-button full-width flat"
                :aria-disabled="false"
                type="button"
                @click="convertAndSaveCookies(false)"
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
// import { keyBy } from 'lodash';
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
    const cookieGroupsSaved = app.$cookies.get('plenty-shop-cookie');
    // make saveable json from nuxt config
    const cookieJson = ref(
      cookieGroups.value.list.map((group) => ({
        name: group.name,
        accepted: false,
        cookies: group.cookies.map((cookie) => ({
          accepted: false,
          name: cookie.name
        }))
      }))
    );

    const initcookieJson = () => {
      if (cookieGroupsSaved) {
        cookieGroupsSaved.forEach((group, index) => {
          const cookies = Object.values(group)[0];
          let atLeastOneIsTrue = false;
          cookies.forEach((cookie, index2) => {
            // First Esential cookies group allways true;
            cookieJson.value[index].cookies[index2].accepted =
              Object.values(cookie)[0];
            atLeastOneIsTrue = Object.values(cookie)[0]
              ? true
              : atLeastOneIsTrue;
          });
          cookieJson.value[index].accepted = atLeastOneIsTrue;
        });
      }

      cookieJson.value[0].accepted = true;
      cookieJson.value[0].cookies = cookieJson.value[0].cookies.map(
        (cookie) => ({ ...cookie, accepted: true })
      );
    };

    const getMinimumLifeSpan = () => {
      const convertToDays = (daysInString) => {
        return parseInt(daysInString.split(' ')[0]);
      };

      let minimum = 100000;
      console.log(cookieGroups);
      cookieGroups.value.list.forEach((group) => {
        group.cookies.forEach((cookie) => {
          console.log(cookie);
          if (minimum > convertToDays(cookie.Lifespan)) {
            minimum = convertToDays(cookie.Lifespan);
          }
        });
      });
      return minimum;
    };

    initcookieJson();
    const bannerIsHidden = ref(cookieGroupsSaved !== undefined);
    const saveCookies = (key, cookieValue) => {
      const minimumOfAllMinimums = 60 * 60 * 24 * getMinimumLifeSpan();
      app.$cookies.set(key, cookieValue, {
        path: '/',
        maxAge: minimumOfAllMinimums
      });
    };
    const convertToSaveableJson = (jsonList) => {
      let toSave = [];
      toSave = jsonList.map((group) => ({
        [group.name]: group.cookies.map((cookie) => ({
          [cookie.name]: cookie.accepted
        }))
      }));
      return toSave;
    };

    const convertAndSaveCookies = (setAllCookies, newStatus) => {
      if (setAllCookies) {
        // accept all or reject all case
        // set checkboxes acordingly
        cookieJson.value.forEach((group, index) => {
          if (index !== 0) {
            group.accepted = newStatus;
            group.cookies.forEach((cookie) => {
              cookie.accepted = newStatus;
            });
          }
        });
      }
      const toSave = convertToSaveableJson(cookieJson.value, newStatus);
      saveCookies('plenty-shop-cookie', toSave);
      bannerIsHidden.value = true;
    };

    const setChildrenCheckboxes = (group, state) => {
      group.cookies = group.cookies.map((cookie) => ({
        ...cookie,
        accepted: state
      }));
    };

    const setParentCheckbox = (group) => {
      group.accepted = group.cookies.some((cookie) => cookie.accepted);
    };

    return {
      showMore: ref(false),
      cookieGroups,
      cookieGroupsSaved,
      cookieJson,
      setChildrenCheckboxes,
      setParentCheckbox,
      convertAndSaveCookies,
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
