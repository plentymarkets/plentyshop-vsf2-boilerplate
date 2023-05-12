import {
  sharedRef, useVSFContext,Context
} from '@vue-storefront/core';
export const useForgotPassword = () => {
  const context = useVSFContext();
  const error = null // there are 2 ways to do that, either interpret response type, or check for returned string
  const resetPassword = async (email): Promise<void> => {
    context.$plentymarkets.api.requestChangePasswordEmail(email);
    //Todo here should interpret what i get from server, if error or not!
  }
  const setNewPassword = async ( hash, newPassword,newPassword2, contactId ): Promise<void> => {
    context.$plentymarkets.api.changePasswordBasedOnHash(hash, newPassword, newPassword2, contactId)
    // Todo here should interpret what i get from server, if error or not!,
    // Posible error cases
    // password don;t match required format !
    // hash not match contactId or one of them is not found
  }
  const verifyHash = async (contactId, hash ): Promise<string> => {
    const data = await context.$plentymarkets.api.verifyHash(contactId, hash) // error case treated currently as string
    return data.email
  }
  return {
    resetPassword,
    setNewPassword,
    verifyHash,
    error
  }
};
