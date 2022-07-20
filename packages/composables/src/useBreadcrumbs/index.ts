import { Ref, ref } from '@nuxtjs/composition-api';
import { Context, useVSFContext } from '@vue-storefront/core';
import { Category } from '@vue-storefront/plentymarkets-api';

const breadcrumbs = ref();

export function useBreadcrumbs(): { search: any, breadcrumbs: Ref<Category[]> } {
  const context = useVSFContext() as Context;

  return {
    async search(params: any) {
      breadcrumbs.value = await context.$plentymarkets.api.getBreadcrumbs(params);
    },
    breadcrumbs
  };
}
