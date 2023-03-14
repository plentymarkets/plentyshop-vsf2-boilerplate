<template>
  <client-only>
    <div>
      <div
        v-if="!bannerIsHidden"
        :class="!furtherSettingsOn ? 'cookieGroupCard' : 'furtherSettingsOn'"
      >
        <div class="bg-sf-c-light-lighten shadow-xl p-xs">
          <div v-if="!furtherSettingsOn">
            <!-- cookie info -->
            <div class="text-left md:text-center ml-sf-xs md:ml-0 font-sf-secondary non-italic font-sf-semibold pt-sf-xs text-sf-xl text-sf-c-primary">
              {{ cookieBarGetters.getBarTitle(cookieGroupsFromConfig) }}
            </div>
            <div class="font-sf-secondary non-italic font-sf-normal text-sf-xs md:text-sf-sm leading-relaxed p-xs">
              {{ cookieBarGetters.getBarDescription(cookieGroupsFromConfig) }}

              <SfButton
                link="/PrivacyPolicy"
                class="sf-button--text"
              >
                {{ $t('CookieBar.Privacy Settings') }}
              </SfButton>
            </div>
            <!-- checkboxes -->
            <div class="flex flex-wrap md:flex-nowrap ml-sf-xs">
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
            class="overflow-y-scroll	h-[300px] bg-[color:var(--_c-light-primary-lighten)]"
          >
            <div class="h-[250px]">
              <div
                v-for="(cookieGroup, groupIndex) in cookieJson"
                :key="groupIndex"
                class="bg-[var(--_c-light-primary)] mt-[var(--spacer-xs)] p-[var(--spacer-xs)]"
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
                  <div class="font-sf-secondary non-italic text-sf-normal text-sf-sm leading-6 ml-sf-xs">
                    {{
                      cookieBarGetters.getCookieGroupDescription(cookieGroup)
                    }}
                  </div>
                  <div
                    v-if="cookieBarGetters.getShowMore(cookieGroup)"
                    class="ml-sf-xs font-sf-light"
                  >
                    <div
                      v-for="(
                        cookie, cookieIndex
                      ) in cookieBarGetters.getCookiesList(cookieGroup)"
                      :key="cookieIndex"
                      class="p-sf-sm"
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
                        <div class="flex w-full mb-sf-xs p-sf-xs bg-white">
                          <div
                            v-if="propKey !== 'name'"
                            class="w-1/4"
                          >
                            {{ propKey }}
                          </div>
                          <div class="w-3/4">
                            <template v-if="propKey === 'Privacy policy'">
                              <SfLink :link="localePath(cookie[propKey])">
                                {{ $t('CookieBar.Privacy Settings') }}
                              </SfLink>
                            </template>
                            <template v-else>
                              {{ cookie[propKey] }}
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ml-sf-xs">
                  <SfButton
                    v-if="!cookieBarGetters.getShowMore(cookieGroup)"
                    class="sf-button--text mb-xs"
                    @click="cookieGroup.showMore = true"
                  >
                    {{ $t('CookieBar.More information') }}
                  </SfButton>
                  <SfButton
                    v-else
                    class="sf-button--text mb-xs"
                    @click="cookieGroup.showMore = false"
                  >
                    {{ $t('CookieBar.Show less') }}
                  </SfButton>
                </div>
              </div>
            </div>
          </div>
          <!-- further settings / back button -->
          <div class="mt-sf-xs mb-sf-sm text-center">
            <SfButton
              v-if="!furtherSettingsOn"
              class="sf-button--text"
              @click="furtherSettingsOn = true"
            >
              {{ $t('CookieBar.Further Settings') }}
            </SfButton>
            <SfButton
              v-else
              class="sf-button--text"
              @click="furtherSettingsOn = false"
            >
              {{ $t('CookieBar.Back') }}
            </SfButton>
          </div>
          <!-- action buttons -->
          <div class="w-full flex flex-col md:flex-row">
            <div class="actionButton">
              <button
                v-e2e="'accept-all'"
                class="color-primary w-full sf-button"
                :aria-disabled="false"
                type="button"
                aria-label="button"
                @click="convertAndSaveCookies(true, true)"
              >
                {{ $t('CookieBar.Accept All') }}
              </button>
            </div>
            <div class="actionButton">
              <button
                v-e2e="'reject-all'"
                class="color-primary w-full sf-button"
                :aria-disabled="false"
                type="button"
                aria-label="button"
                @click="convertAndSaveCookies(true, false)"
              >
                {{ $t('CookieBar.Reject All') }}
              </button>
            </div>
            <div class="actionButton">
              <button
                v-e2e="'accept-selection'"
                class="sf-button w-full border-solid border-1 border-sf-c-primary bg-white"
                :aria-disabled="false"
                type="button"
                @click="convertAndSaveCookies(false)"
              >
                {{ $t('CookieBar.Accept Selection') }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- button to open cookie tab -->
      <button
        v-else
        v-e2e="'cookie-show-banner-button'"
        class="color-primary sf-button z-100 fixed bottom-100 md:bottom-0 right-sf-xs"
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
        <div class="hidden md:block">
          {{ $t('CookieBar.Privacy Settings') }}
        </div>
      </button>
    </div>
  </client-only>
</template>

<script>
import { cookieBarGetters } from '@vue-storefront/plentymarkets';
import { ref, useContext } from '@nuxtjs/composition-api';
import { SfCheckbox, SfIcon, SfButton, SfLink } from '@storefront-ui/vue';
export default {
  components: {
    SfIcon,
    SfCheckbox,
    SfButton,
    SfLink
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

    return {
      defaultCheckboxIndex,
      furtherSettingsOn,
      bannerIsHidden,
      cookieBarGetters,
      cookieJson,
      cookieJsonSaved,
      cookieGroupsFromConfig,
      setChildrenCheckboxes,
      updateParentCheckbox,
      convertAndSaveCookies
    };
  }
};
</script>

<style lang="scss" scoped>
.cookieGroupCard {
  width: 33vw;
  position: fixed;
  bottom: 40px;
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
  bottom: 40px;
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
.actionButton {
  flex: 1;
  padding: 0 var(--spacer-xs) 0 var(--spacer-xs);
  text-align: center;
  @include for-mobile {
    width: 100%;
    margin-bottom: var(--spacer-xs);
  }
}
.checkbox {
  margin: 0 var(--spacer-sm) 0 0;
  @include for-mobile {
    width: 40vw;
  }
}
</style>
