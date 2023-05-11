import {
  sharedRef, useVSFContext,Context
} from '@vue-storefront/core';

export const useForgotPassword = () => {
  const context = useVSFContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resetPassword = async (email): Promise<void> => {
    context.$plentymarkets.api.requestChangePasswordEmail(email);
  }
  const setNewPassword = async ( hash, newPassword,newPassword2, contactId ): Promise<void> => {
    context.$plentymarkets.api.changePasswordBasedOnHash(hash, newPassword, newPassword2, contactId)
  }
  return {
    resetPassword,
    setNewPassword
  }
};
