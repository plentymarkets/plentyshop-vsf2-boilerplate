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
              {{ cookieBarGetters.getBarTitle(cookieGroupsFromConfig) }}
            </div>
            <div class="barDescription p-xs">
              {{ cookieBarGetters.getBarDescription(cookieGroupsFromConfig) }}

              <SfButton
                link="/privacy-policy"
                class="sf-button--text"
              >
                {{ $t('Privacy Settings') }}
              </SfButton>
            </div>
            <!-- checkboxes -->
            <div class="checkboxes">
              <div
                v-for="(cookieGroup, index) in cookieJson"
                :key="index"
                class="checkbox"
              >
                <SfCheckbox
                  v-model="cookieGroup.accepted"
                  v-e2e="`checkbox-${index}`"
                  :disabled="index === defaultCheckboxIndex"
                  :name="cookieBarGetters.getCookieGroupName(cookieGroup)"
                  :label="cookieBarGetters.getCookieGroupName(cookieGroup)"
                  @change="
                    ($event) => setChildrenCheckboxes(cookieGroup, $event)
                  "
                />
              </div>
            </div>
          </div>
          <div
            v-else
            class="furtherSettingsCard"
          >
            <div class="furtherSettingsCardScrollable">
              <div
                v-for="(cookieGroup, groupIndex) in cookieJson"
                :key="groupIndex"
                class="bg-grey ml-xs mb-xs"
              >
                <div>
                  <SfCheckbox
                    v-model="cookieGroup.accepted"
                    :disabled="groupIndex === defaultCheckboxIndex"
                    :name="cookieBarGetters.getCookieGroupName(cookieGroup)"
                    :label="cookieBarGetters.getCookieGroupName(cookieGroup)"
                    @change="
                      ($event) => setChildrenCheckboxes(cookieGroup, $event)
                    "
                  />
                  <div class="cookieDescription ml-xs">
                    {{
                      cookieBarGetters.getCookieGroupDescription(cookieGroup)
                    }}
                  </div>
                  <div
                    v-if="cookieBarGetters.getShowMore(cookieGroup)"
                    class="ml-xs cookieDetails"
                  >
                    <div
                      v-for="(
                        cookie, cookieIndex
                      ) in cookieBarGetters.getCookiesList(cookieGroup)"
                      :key="cookieIndex"
                      class="p-sm"
                    >
                      <SfCheckbox
                        v-model="cookie.accepted"
                        :disabled="groupIndex === defaultCheckboxIndex"
                        :name="cookieBarGetters.getCookieName(cookie)"
                        :label="cookieBarGetters.getCookieName(cookie)"
                        @change="updateParentCheckbox(cookieGroup)"
                      />
                      <div
                        v-for="propKey in Object.keys(cookie)"
                        :key="propKey"
                      >
                        <div class="flex full-width mb-xs p-xs bg-white">
                          <div
                            v-if="propKey !== 'name'"
                            class="col-2"
                          >
                            {{ propKey }}
                          </div>
                          <div class="col-4">
                            {{ localReplace(cookie, propKey) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ml-xs">
                  <SfButton
                    v-if="!cookieBarGetters.getShowMore(cookieGroup)"
                    class="sf-button--text mb-xs"
                    @click="cookieGroup.showMore = true"
                  >
                    {{ $t('More information') }}
                  </SfButton>
                  <SfButton
                    v-else
                    class="sf-button--text mb-xs"
                    @click="cookieGroup.showMore = false"
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
              class="sf-button--text"
              @click="furtherSettingsOn = true"
            >
              {{ $t('Further Settings') }}
            </SfButton>
            <SfButton
              v-else
              class="sf-button--text"
              @click="furtherSettingsOn = false"
            >
              {{ $t('Back') }}
            </SfButton>
          </div>
          <!-- action buttons -->
          <div class="actionButtons">
            <div class="actionButton">
              <button
                v-e2e="'accept-all'"
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
                v-e2e="'reject-all'"
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
                v-e2e="'accept-selection'"
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
        v-e2e="'cookie-show-banner-button'"
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
        <div class="cookiesText">
          {{ $t('Cookies') }}
        </div>
      </button>
    </div>
  </client-only>
</template>

<script>
import { cookieBarGetters } from '@vue-storefront/plentymarkets';
import { ref, useContext } from '@nuxtjs/composition-api';
import { SfCheckbox, SfIcon, SfButton } from '@storefront-ui/vue';
export default {
  components: {
    SfIcon,
    SfCheckbox,
    SfButton
  },
  setup() {
    const { $config, app } = useContext();
    const cookieGroupsFromConfig = ref($config.cookieGroups);
    const cookieJsonSaved = app.$cookies.get('plenty-shop-cookie');
    const furtherSettingsOn = ref(false);
    const defaultCheckboxIndex = 0;
    const cookieJson = ref(
      cookieGroupsFromConfig.value.groups.map((group) => ({
        name: group.name,
        accepted: false,
        showMore: false,
        description: group.description,
        cookies: group.cookies.map((cookie) => ({
          ...cookie,
          accepted: false,
          name: cookie.name
        }))
      }))
    );

    const initcookieJson = () => {
      if (cookieJsonSaved) {
        cookieJsonSaved.forEach((group, index) => {
          const cookies = Object.values(group)[0];
          let atLeastOneIsTrue = false;
          cookies.forEach((cookie, index2) => {
            cookieJson.value[index].cookies[index2].accepted =
              Object.values(cookie)[0];
            atLeastOneIsTrue = Object.values(cookie)[0]
              ? true
              : atLeastOneIsTrue;
          });
          cookieJson.value[index].accepted = atLeastOneIsTrue;
        });
      }
      // Mark default checkbox group as true
      cookieJson.value[defaultCheckboxIndex].accepted = true;
      cookieJson.value[defaultCheckboxIndex].cookies =
        cookieJson.value[0].cookies.map((cookie) => ({
          ...cookie,
          accepted: true
        }));
    };

    const getMinimumLifeSpan = () => {
      const convertToDays = (daysInString) => {
        return parseInt(daysInString.split(' ')[0]);
      };

      let minimum = 100000;
      cookieGroupsFromConfig.value.groups.forEach((group) => {
        group.cookies.forEach((cookie) => {
          if (minimum > convertToDays(cookie.Lifespan)) {
            minimum = convertToDays(cookie.Lifespan);
          }
        });
      });
      return minimum;
    };
    const bannerIsHidden = ref(cookieJsonSaved !== undefined);
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
        // accept all or reject all case (update cookieJson and checkboxes from ui)
        cookieJson.value.forEach((group, index) => {
          if (index !== defaultCheckboxIndex) {
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

    const updateParentCheckbox = (group) => {
      group.accepted = group.cookies.some((cookie) => cookie.accepted);
    };

    initcookieJson();

    const localReplace = (cookie, propKey) => {
      return propKey === 'Privacy policy' ? window.location.origin + cookie[propKey] : cookie[propKey];
    };

    return {
      defaultCheckboxIndex,
      furtherSettingsOn,
      bannerIsHidden,
      cookieBarGetters,
      cookieJson,
      cookieJsonSaved,
      cookieGroupsFromConfig,
      localReplace,
      setChildrenCheckboxes,
      updateParentCheckbox,
      convertAndSaveCookies
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
  font-family: var(--font-family--secondary);
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
  font-family: var(--font-family--secondary);
  font-style: normal;
  font-weight: var(--font-weight--semibold);
  padding: var(--spacer-xs) 0 0 0;
  font-size: var(--font-size--xl);
  color: var(--c-primary);
}
.barDescription {
  font-family: var(--font-family--secondary);
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
  font-family: var(--font-family--secondary);
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
