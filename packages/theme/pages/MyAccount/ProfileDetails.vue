<template>
  <PsfMyProfile
    :account="user"
    :v-e2e="'my-profile-tabs'"
    @update:personal="user = { ...user, ...$event }"
    @update:password="changePassword({ currentUser: user, current: $event.currentPassword, new: $event.newPassword })"
  />
</template>
<script>
import PsfMyProfile from '~/components/MyAccount/PsfMyProfile';
import { useUser } from '@vue-storefront/plentymarkets';
import { onSSR } from '@vue-storefront/core';
export default {
  name: 'ProfileDetails',
  components: {
    PsfMyProfile
  },
  setup() {
    const { user, load, changePassword } = useUser();

    onSSR(async () => {
      await load();
    });

    return {
      user,
      changePassword
    };
  }
};
</script>

<style lang='scss' scoped>
</style>
