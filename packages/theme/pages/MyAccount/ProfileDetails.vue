<template>
  <PsfMyProfile
    :account="user"
    data-testid="my-profile-tabs"
    @update:personal="user = { ...user, ...$event }"
    @update:password="changePassword({ currentUser: user, current: $event.currentPassword, new: $event.newPassword })"
  />
</template>
<script>
import PsfMyProfile from '~/components/MyAccount/PsfMyProfile';
import { useUser } from '@vue-storefront/plentymarkets';
import { onSSR } from '@vue-storefront/core';
import { useUiNotification } from '~/composables';
import {useContext} from '@nuxtjs/composition-api';

export default {
  name: 'ProfileDetails',
  components: {
    PsfMyProfile
  },
  setup() {
    const { user, load, changePassword: change, error } = useUser();
    const { send } = useUiNotification();
    const { app } = useContext();

    onSSR(async () => {
      await load();
    });

    const changePassword = async (params) => {
      await change(params);

      if (error.value?.changePassword) {
        send({ message: error.value.changePassword?.message ?? '', type: 'danger' });
      } else {
        send({ message: app.i18n.t('ProfileDetails.Successfully changed your password'), type: 'success' });
      }
    };

    return {
      changePassword,
      user
    };
  }
};
</script>

<style lang='scss' scoped>
</style>
