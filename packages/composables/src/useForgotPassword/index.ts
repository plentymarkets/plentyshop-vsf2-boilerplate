import {
  Context,
} from '@vue-storefront/core';

export const useForgotPassword = () => {
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function resetPassword(context: Context, email:string): void {
    context.$plentymarkets.api.requestChangePasswordEmail(email);
    // should call the new route and send email.
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function setNewPassword (context: Context, { hash, newPassword,newPassword2, contactId }): void {
    context.$plentymarkets.api.changePasswordBasedOnHash(hash, newPassword, newPassword2, contactId)
    // should i check i have a valid response like in
  }
  return {
    resetPassword,
    setNewPassword
  }
};
