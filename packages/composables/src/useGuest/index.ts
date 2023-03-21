import { Ref, ComputedRef, computed } from '@nuxtjs/composition-api';
import type { User, Guest } from '@vue-storefront/plentymarkets-api';

export const useGuest = (
  user: Ref<User>
): Guest => {
  const isGuest: ComputedRef<boolean> = computed(() => {
    return user.value !== null && user.value.guestMail !== null;
  });

  return {
    isGuest
  };
};
