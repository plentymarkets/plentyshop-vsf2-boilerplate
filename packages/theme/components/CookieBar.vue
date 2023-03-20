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
                link="/PrivacyPolicy"
                class="sf-button--text"
              >
                {{ $t('CookieBar.Privacy Settings') }}
              </SfButton>
            </div>
            <!-- checkboxes -->
            <div
              v-if="cookieJson"
              class="checkboxes"
            >
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
                class="furtherSettingsCardGroup"
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
                            class="propKey"
                          >
                            {{ propKey }}
                          </div>
                          <div class="propDescription">
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
                <div class="ml-xs">
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
          <div class="furtherSettingMargin text-center">
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
                {{ $t('CookieBar.Accept All') }}
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
                {{ $t('CookieBar.Reject All') }}
              </button>
            </div>
            <div class="actionButton">
              <button
                v-e2e="'accept-selection'"
                class="sf-button full-width flat"
                :aria-disabled="false"
                type="button"
                @click="convertAndSaveCookies(false, false)"
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
          {{ $t('CookieBar.Privacy Settings') }}
        </div>
      </button>
    </div>
  </client-only>
</template>

<script>
import { cookieBarGetters, useCookieBar } from '@vue-storefront/plentymarkets';
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
    const { cookieJson, bannerIsHidden, convertAndSaveCookies, defaultCheckboxIndex } = useCookieBar(
      app.$cookies,
      'plenty-shop-cookie',
      0,
      $config.cookieGroups
    );
    const furtherSettingsOn = ref(false);

    const setChildrenCheckboxes = (group, state) => {
      group.cookies = group.cookies.map((cookie) => ({
        ...cookie,
        accepted: state
      }));
    };

    const updateParentCheckbox = (group) => {
      group.accepted = group.cookies.some((cookie) => cookie.accepted);
    };

    return {
      defaultCheckboxIndex,
      furtherSettingsOn,
      bannerIsHidden,
      cookieBarGetters,
      cookieJson,
      convertAndSaveCookies,
      cookieGroupsFromConfig: ref($config.cookieGroups),
      setChildrenCheckboxes,
      updateParentCheckbox
    };
  }
};
</script>

<style lang="scss" scoped>
.propKey {
  width: 25%;
}
.propDescription {
  width: 75%;
}
.cookieGroupCard {
  width: 33vw;
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
.furtherSettingsCardGroup {
  background: var(--_c-light-primary);
  margin-top: var(--spacer-xs);
  padding: var(--spacer-xs);
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
.mt-xs {
  margin-top: 30px;
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
