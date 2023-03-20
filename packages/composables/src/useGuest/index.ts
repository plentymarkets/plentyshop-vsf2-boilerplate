import { ref, Ref } from '@nuxtjs/composition-api';
import type { User, Guest } from '@vue-storefront/plentymarkets-api';

export const useGuest = (
  user: User
): Guest => {
  const isGuest: Ref<boolean> = ref(user?.guestMail !== null);
  return {
    isGuest
  };
};
