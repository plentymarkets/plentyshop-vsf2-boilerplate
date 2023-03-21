import { ref, Ref, computed } from '@nuxtjs/composition-api';
import type { User, Guest } from '@vue-storefront/plentymarkets-api';

export const useGuest = (
  user: Ref<User>
): Guest => {
  const isGuest: Ref<boolean> = computed(() => {
    return user.value !== null && (user.value?.guestMail ?? false);
  });

  return {
    isGuest
  };
};
