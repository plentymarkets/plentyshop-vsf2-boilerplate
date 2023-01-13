export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];

  if (!currentPath) {
    return;
  }
  // const session = await $vsf.$plentymarkets.api.getSession();
  // const isAuthenticated = session.user;
  const redirectWithLocalePath = path => app.context.redirect(app.localePath(path));
  // TODO this is just a hotfix for refresh problem in checkout/payment const BILLING_TYPE = 1;
  const BILLING_TYPE = 1;

  switch (currentPath) {
    case 'login':
      break;
    case 'billing':
      break;
    case 'shipping':
      const billing = await $vsf.$plentymarkets.api.loadAddresses(BILLING_TYPE);
      if (billing.length <= 0) {
        redirectWithLocalePath('billing');
      }
      break;
    case 'payment':
      const _billing = await $vsf.$plentymarkets.api.loadAddresses(BILLING_TYPE);
      if (_billing.length <= 0) {
        redirectWithLocalePath('shipping');
      }
      break;
  }
};
