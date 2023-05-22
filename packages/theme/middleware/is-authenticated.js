/*
Checks whether the user is authenticated. Requires a page reload on logout. Use this middleware to guard routes against unauthenticated access, for example MyAccount.

Usage:
export default {
  middleware: [
    'is-authenticated'
  ],
}
*/

export default async(context) => {
  const session = await context.$vsf.$plentymarkets.api.getSession();
  if (!session?.user?.id) {
    context.redirect('/');
  }
};
