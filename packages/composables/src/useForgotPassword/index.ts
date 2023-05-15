import {
  sharedRef, useVSFContext, Context
} from '@vue-storefront/core';
export const useForgotPassword = (id: string) => {
  const context = useVSFContext();
  // const loading = sharedRef(false, `useForgot-loading-${id}`);
  // const error = sharedRef({
  //   load: null
  // }, `useForgot-error-${id}`);

  const resetPassword = async (email): Promise<void> => {
    try {
      // loading.value = true;
      // const userData =
      context.$plentymarkets.api.requestChangePasswordEmail(email);
      // if (userData.error) {
      //   error.value.load = userData.error;
      //   return;
      // }
    } catch (err) {
      // error.value.load = err;
    } finally {
      // loading.value = false;
    }
    //Todo here should interpret what i get from server, if error or not!
  }
  const setNewPassword = async (hash, newPassword, newPassword2, contactId): Promise<void> => {
    try {
      // loading.value = true;
      // const userData =
      context.$plentymarkets.api.changePasswordBasedOnHash(hash, newPassword, newPassword2, contactId)
      // if (userData.error) {
      //   error.value.load = userData.error;
      //   return;
      // }
    } catch (err) {
      // error.value.load = err;
    } finally {
      // loading.value = false;
    }
  }
  const verifyHash = async (contactId, hash): Promise<string> => {
    try {
      // loading.value = true;
      // const userData =
      const data = await context.$plentymarkets.api.verifyHash(contactId, hash) // error case treated currently as string
      // if (userData.error) {
      //   error.value.load = userData.error;
      //   return;
      // }
      return data.email
    } catch (err) {
      // error.value.load = err;
    } finally {
      // loading.value = false;
    }
  }
  return {
    // loading,
    // error,
    resetPassword,
    setNewPassword,
    verifyHash,
  }
};
