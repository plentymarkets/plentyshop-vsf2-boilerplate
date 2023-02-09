<template>
  <client-only>
    <div>
      <div class="cookieControl">
        <div
          v-if="!cookies.accepted"
          :class="`cookieControl__Bar cookieControl__Bar--${cookies.barPosition}`"
        >
          <div>
            {{ cookies.text.barTitle }}
          </div>
          <div>
            {{ cookies.text.barDescription }}
          </div>
          <button @click="toggle(false)">decline</button>
          <button @click="toggle(true)">accept</button>
        </div>
        <button
          v-else
          class="cookieControl__ControlButton"
          aria-label="Cookie control"
          @click="cookies.modal = true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              fill="currentColor"
              d="M510.52 255.82c-69.97-.85-126.47-57.69-126.47-127.86-70.17 0-127-56.49-127.86-126.45-27.26-4.14-55.13.3-79.72 12.82l-69.13 35.22a132.221 132.221 0 00-57.79 57.81l-35.1 68.88a132.645 132.645 0 00-12.82 80.95l12.08 76.27a132.521 132.521 0 0037.16 72.96l54.77 54.76a132.036 132.036 0 0072.71 37.06l76.71 12.15c27.51 4.36 55.7-.11 80.53-12.76l69.13-35.21a132.273 132.273 0 0057.79-57.81l35.1-68.88c12.56-24.64 17.01-52.58 12.91-79.91zM176 368c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm32-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm160 128c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"
            />
          </svg>
        </button>
      </div>
      <SfModal
        title="My title"
        :visible="cookies.modal"
        overlay
        :persistent="false"
      >
        <div>
          <div>
            Enable list of cookies
          </div>

          <button
            @click="
              () => {
                cookies.accepted = false;
                cookies.modal = false;
              }
            "
          >
            delete cookies
          </button>
          <button @click="cookies.modal = false">close</button>
        </div>
      </SfModal>
    </div>
  </client-only>
</template>

<script>
import { ref, useContext } from '@nuxtjs/composition-api';
import { SfModal } from '@storefront-ui/vue';
export default {
  components: {
    SfModal
  },
  setup() {
    const {app} = useContext();
    const cookies = ref({
      modal: false,
      accepted: app.$cookies.get('cookieBar'),
      barPosition: 'bottom-right',
      text: {
        barTitle: 'Cookies',
        barDescription:
          'We use our own cookies and third-party cookies so that we can show you this website and better understand how you use it, with a view to improving the services we offer. If you continue browsing, we consider that you have accepted the cookies.',
        acceptAll: 'Accept all',
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
        acceptNecessary: 'Accept necessary'
      }
    });
    const toggle = (state) => {
      cookies.value.accepted = state;
      app.$cookies.set('cookieBar', 'true', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });
      // set cookie
    };
    return { cookies, toggle };
  }
};
</script>
<!-- don't style the component because we will use storefront components -->
<style scoped>
.cookieControl__Modal-enter-active,
.cookieControl__Modal-leave-active {
  transition: opacity 0.25s;
}
.cookieControl__Modal-enter,
.cookieControl__Modal-leave-to {
  opacity: 0;
}
.cookieControl__Bar--center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.cookieControl__Bar--center-enter-active,
.cookieControl__Bar--top-left-enter-active,
.cookieControl__Bar--top-full-enter-active,
.cookieControl__Bar--top-right-enter-active,
.cookieControl__Bar--bottom-left-enter-active,
.cookieControl__Bar--bottom-full-enter-active,
.cookieControl__Bar--bottom-right-enter-active,
.cookieControl__Bar--center-leave-active,
.cookieControl__Bar--top-left-leave-active,
.cookieControl__Bar--top-full-leave-active,
.cookieControl__Bar--top-right-leave-active,
.cookieControl__Bar--bottom-left-leave-active,
.cookieControl__Bar--bottom-full-leave-active,
.cookieControl__Bar--bottom-right-leave-active {
  transition: transform 0.25s;
}
.cookieControl__Bar--top-left-enter,
.cookieControl__Bar--top-full-enter,
.cookieControl__Bar--top-right-enter,
.cookieControl__Bar--top-left-leave-to,
.cookieControl__Bar--top-full-leave-to,
.cookieControl__Bar--top-right-leave-to {
  transform: translateY(-100%);
}
.cookieControl__Bar--bottom-left-enter,
.cookieControl__Bar--bottom-full-enter,
.cookieControl__Bar--bottom-right-enter,
.cookieControl__Bar--bottom-left-leave-to,
.cookieControl__Bar--bottom-right-leave-to,
.cookieControl__Bar--bottom-full-leave-to {
  transform: translateY(100%);
}
.cookieControl__Bar--center-enter,
.cookieControl__Bar--center-leave-to {
  transform: translate(-50%, -50%) scale(0.95);
}
.cookieControl {
  position: relative;
  z-index: 100000;
}
.cookieControl button {
  border: 0;
  outline: 0;
  font-size: 16px;
  cursor: pointer;
  padding: 12px 20px;
  backface-visibility: hidden;
  transition: background-color 200ms, color 200ms;
}
.cookieControl__Bar {
  position: fixed;
  color: rgb(255, 255, 255);
  background-color: rgb(0, 120, 38);
  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
}
.cookieControl__Bar h3,
.cookieControl__Bar p {
  color: white;
  max-width: 900px;
}
.cookieControl__Bar h3 {
  margin: 0;
  font-size: 20px;
}
.cookieControl__Bar p {
  font-size: 16px;
  margin: 5px 0 0;
}
.cookieControl__Bar button {
  color: var(--cookie-control-barButtonColor);
  background-color: var(--cookie-control-barButtonBackground);
}
.cookieControl__Bar button:hover {
  color: var(--cookie-control-barButtonHoverColor);
  background-color: var(--cookie-control-barButtonHoverBackground);
}
.cookieControl__Bar button + button {
  margin-left: 10px;
}
.cookieControl__BarContainer {
  display: flex;
  padding: 20px;
  align-items: flex-end;
  justify-content: space-between;
}
.cookieControl__Bar--top-full,
.cookieControl__Bar--bottom-full {
  left: 0;
  right: 0;
}
.cookieControl__Bar--top-full {
  top: 0;
}
.cookieControl__Bar--bottom-full {
  bottom: 0;
}
.cookieControl__Bar--center p,
.cookieControl__Bar--top-left p,
.cookieControl__Bar--top-right p,
.cookieControl__Bar--bottom-left p,
.cookieControl__Bar--bottom-right p {
  max-width: 400px;
}
.cookieControl__Bar--center .cookieControl__BarContainer,
.cookieControl__Bar--top-left .cookieControl__BarContainer,
.cookieControl__Bar--top-right .cookieControl__BarContainer,
.cookieControl__Bar--bottom-left .cookieControl__BarContainer,
.cookieControl__Bar--bottom-right .cookieControl__BarContainer {
  flex-direction: column;
}
.cookieControl__Bar--center .cookieControl__BarButtons,
.cookieControl__Bar--top-left .cookieControl__BarButtons,
.cookieControl__Bar--top-right .cookieControl__BarButtons,
.cookieControl__Bar--bottom-left .cookieControl__BarButtons,
.cookieControl__Bar--bottom-right .cookieControl__BarButtons {
  margin-top: 20px;
}
.cookieControl__Bar--top-left,
.cookieControl__Bar--top-right {
  top: 20px;
}
.cookieControl__Bar--bottom-left,
.cookieControl__Bar--bottom-right {
  bottom: 20px;
}
.cookieControl__Bar--top-left,
.cookieControl__Bar--bottom-left {
  left: 20px;
}
.cookieControl__Bar--top-right,
.cookieControl__Bar--bottom-right {
  right: 20px;
}
.cookieControl__BarButtons {
  display: flex;
}
.cookieControl__Modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  font-size: 0;
  text-align: center;
}
.cookieControl__Modal:before {
  content: '';
  min-height: 100vh;
  display: inline-block;
  vertical-align: middle;
}
.cookieControl__Modal:after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: var(--cookie-control-modalOverlayOpacity);
  background-color: var(--cookie-control-modalOverlay);
}
.cookieControl__Modal > div {
  font-size: initial;
  padding-top: 80px;
}
.cookieControl__Modal button {
  color: var(--cookie-control-modalButtonColor);
  background-color: var(--cookie-control-modalButtonBackground);
}
.cookieControl__Modal button:hover {
  color: var(--cookie-control-modalButtonHoverColor);
  background-color: var(--cookie-control-modalButtonHoverBackground);
}
.cookieControl__ModalContent {
  position: relative;
  width: 100%;
  padding: 40px;
  max-width: 550px;
  max-height: 80vh;
  text-align: left;
  overflow-y: scroll;
  display: inline-block;
  vertical-align: middle;
  color: var(--cookie-control-modalTextColor);
  background-color: var(--cookie-control-modalBackground);
}
.cookieControl__ModalContent *:not(button) {
  color: var(--cookie-control-modalTextColor);
}
.cookieControl__ModalContent h3 {
  font-size: 24px;
  margin: 50px 0 25px;
}
.cookieControl__ModalContent h3:first-of-type {
  margin-top: 0;
}
.cookieControl__ModalContent ul {
  padding: 0;
  font-size: 16px;
  list-style-type: none;
}
.cookieControl__ModalContent ul ul {
  padding: 5px 56px 0;
}
.cookieControl__ModalContent ul ul li + li {
  margin-top: 5px;
}
.cookieControl__ModalContent li {
  align-items: center;
}
.cookieControl__ModalContent li + li {
  margin-top: 20px;
}
.cookieControl__ModalContent input {
  display: none;
}
.cookieControl__ModalContent input:checked + label {
  background-color: var(--cookie-control-checkboxActiveBackground);
}
.cookieControl__ModalContent input:checked + label:before {
  background-color: var(--cookie-control-checkboxActiveCircleBackground);
  transform: translate3d(100%, -50%, 0);
}
.cookieControl__ModalContent input:checked:disabled + label {
  background-color: var(--cookie-control-checkboxDisabledBackground);
}
.cookieControl__ModalContent input:checked:disabled + label:before {
  background-color: var(--cookie-control-checkboxDisabledCircleBackground);
}
.cookieControl__ModalContent label {
  position: relative;
  min-width: 36px;
  min-height: 20px;
  font-size: 0;
  display: block;
  margin-right: 20px;
  border-radius: 20px;
  backface-visibility: hidden;
  transition: background-color 200ms;
  background-color: var(--cookie-control-checkboxInactiveBackground);
}
.cookieControl__ModalContent label:before {
  position: absolute;
  content: '';
  top: 50%;
  left: 3px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  transition: transform 200ms;
  transform: translate3d(0, -50%, 0);
  background-color: var(--cookie-control-checkboxInactiveCircleBackground);
}
.cookieControl__ModalInputWrapper {
  display: flex;
  align-items: flex-start;
}
.cookieControl__ModalCookieName {
  font-weight: bold;
  text-transform: uppercase;
}
.cookieControl__ModalCookieName span {
  font-weight: normal;
  text-transform: none;
}
.cookieControl__ModalClose {
  position: absolute;
  top: 20px;
  right: 20px;
}
.cookieControl__ModalButtons {
  display: flex;
  margin-top: 80px;
  align-items: flex-start;
}
.cookieControl__ModalButtons button + button {
  margin-left: 20px;
}
.cookieControl__ModalUnsaved {
  position: absolute;
  left: 50%;
  bottom: 40px;
  margin: 0;
  color: var(--cookie-control-modalUnsavedColor);
  font-size: 14px;
  transform: translateX(-50%);
}
.cookieControl__BlockedIframe {
  padding: 20px;
  border: 2px solid #ddd;
}
.cookieControl__BlockedIframe p,
.cookieControl__BlockedIframe a {
  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
}
@media screen and (max-width: 768px) {
  .cookieControl__Bar {
    flex-direction: column;
    left: 0;
    right: 0;
  }
  .cookieControl__Bar p,
  .cookieControl__Bar h3 {
    max-width: 100%;
  }
  .cookieControl__Bar--top-full,
  .cookieControl__Bar--top-left,
  .cookieControl__Bar--top-right {
    top: 0;
  }
  .cookieControl__Bar--bottom-full,
  .cookieControl__Bar--bottom-left,
  .cookieControl__Bar--bottom-right {
    bottom: 0;
  }
  .cookieControl__ModalContent {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: none;
    max-height: 100%;
    padding: 80px 20px 20px;
  }
  .cookieControl__BarButtons {
    width: 100%;
    margin-top: 20px;
    flex-direction: column;
    justify-content: center;
  }
  .cookieControl__BarButtons button {
    width: 100%;
  }
  .cookieControl__BarButtons button + button {
    margin: 10px 0 0;
  }
  .cookieControl__BarContainer,
  .cookieControl__ModalButtons {
    flex-direction: column;
  }
  .cookieControl__ModalButtons button {
    width: 100%;
  }
  .cookieControl__ModalButtons button + button {
    margin: 10px 0 0;
  }
}
.cookieControl__ControlButton {
  position: fixed;
  right: 20px;
  bottom: 20px;
  border: 0;
  outline: 0;
  width: 40px;
  height: 40px;
  cursor: pointer;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  backface-visibility: hidden;
  transition: background-color 200ms;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background: var(--cookie-control-controlButtonBackground);
}
.cookieControl__ControlButton svg {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;
  transition: color 200ms;
  backface-visibility: hidden;
  transform: translate(-50%, -50%);
  color: var(--cookie-control-controlButtonIconColor);
}
.cookieControl__ControlButton:hover {
  background-color: var(--cookie-control-controlButtonHoverBackground);
}
.cookieControl__ControlButton:hover svg {
  color: var(--cookie-control-controlButtonIconHoverColor);
}
</style>
