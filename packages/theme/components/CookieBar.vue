<template>
  <client-only>
    <div>
      <div
        v-if="!bannerIsHidden"
        :class="['fixed right-sf-xs font-sf-xl z-9999999999 shadow-2xl', !furtherSettingsOn ? 'bottom-32 w-full md:w-2/5 p-2 md:bottom-4 h-96 text-sf-c-text font-sf-medium font-sf-secondary' : 'bottom-24 md:bottom-0 md:bottom-10 md:h-96 text-sf-c-text font-sf-secondary font-sf-medium']"
      >
        <div class="bg-sf-c-light-lighten shadow-xl p-xs">
          <div v-if="!furtherSettingsOn">
            <!-- cookie info -->
            <div class="text-left md:text-center ml-sf-xs md:ml-0 font-sf-secondary non-italic font-sf-semibold pt-sf-xs text-sf-xl text-sf-c-primary">
              {{ cookieBarGetters.getBarTitle(cookieGroupsFromConfig) }}
            </div>
            <div class="font-sf-secondary non-italic font-sf-normal text-sf-xs md:text-sf-sm leading-relaxed p-2">
              {{ cookieBarGetters.getBarDescription(cookieGroupsFromConfig) }}

              <SfButton
                link="/PrivacyPolicy"
                class="sf-button--text"
              >
                {{ $t('CookieBar.Privacy Settings') }}
              </SfButton>
            </div>
            <!-- checkboxes -->
            <div v-if="cookieJson" class="flex flex-wrap md:flex-nowrap ml-sf-xs justify-around">
              <div
                v-for="(cookieGroup, index) in cookieJson"
                :key="index"
                class="mr-sf-sm"
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
            class="overflow-y-scroll	h-[300px] bg-[color:var(--_c-light-primary-lighten)] p-2"
          >
            <div class="h-64">
              <div
                v-for="(cookieGroup, groupIndex) in cookieJson"
                :key="groupIndex"
                class="bg-sf-c-light-primary mt-sf-xs p-sf-xs"
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
            <div class="flex-1 pr-sf-xs pl-sf-xs text-center z-100000000 mb-sf-xs">
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
            <div class="flex-1 pr-sf-xs pl-sf-xs text-center z-100000000 mb-sf-xs">
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
            <div class="flex-1 pr-sf-xs pl-sf-xs text-center z-100000000 mb-sf-xs">
              <button
                v-e2e="'accept-selection'"
                class="sf-button w-full border-solid border-1 border-sf-c-primary"
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
