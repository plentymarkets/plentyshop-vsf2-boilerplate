import { Category } from 'src/types';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from 'src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getBreadcrumbs(context: Context, params: any): Promise<Category[]> {

  /*  const url: URL = new URL('/rest/io/categorytree/', context.config.api.url);
  const { data } = await context.client.get(url.href); */

  if (params.variationId) {
    // call api for variation breadcrumb path
  } else {
    // call api for category breadcrumb path
  }

  const data = Promise.resolve([{
    id: 16,
    type: 'item',
    childCount: 2,
    itemCount: [
      {
        categoryId: 16,
        webstoreId: 0,
        lang: 'de',
        count: 29,
        createdAt: '2022 - 06 - 10 19: 02: 41',
        updatedAt: '2022 - 07 - 18 15: 20: 43',
        variationCount: 31,
        customerClassId: 0
      }
    ],
    details: [
      {
        lang: 'de',
        name: 'Wohnzimmer',
        nameUrl: 'wohnzimmer',
        metaTitle: 'Möbel für Wohnzimmer',
        imagePath: null,
        image2Path: null
      }
    ],
    children: []
  }]);

  return data;
}
