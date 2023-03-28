import { ProductsSearchParams } from '@vue-storefront/core';
import { Product, Context, ReviewAverage } from 'src/types';

export async function getProduct(context: Context, params: ProductsSearchParams): Promise<Product[]> {
  let url: URL;
  if (params.id) {
    url = new URL(`/rest/storefront/items/${ params.id }?withVariationAttributeMap=true`, context.config.api.url);
    url.searchParams.set('variationIds[]', params.id);
    url.searchParams.set('resultFieldTemplate', 'SingleItem');
  } else if (params.term) {
    url = new URL('/rest/io/item/search', context.config.api.url);
    url.searchParams.set('query', params.term);
  } else {

    const categoryId = params.categoryId?.toString() || '16';
    url = new URL('/rest/io/category', context.config.api.url);
    url.searchParams.set('categoryId', categoryId);
    if (params.limit) {
      url.searchParams.set('items', params.limit);
    }
    if (params.sort) {
      url.searchParams.set('sorting', params.sort);
    }
  }

  const { data } = await context.client.get(url.href);

  if (params.id) {

    const products: Product[] = data.item.documents.map(document => document.data);
    products[0].feedback = await getFeedbackAvarage(context, [products[0].item.id.toString()]);

    // set the variation attribute map into the variations data
    if (data.attributes || data.variations) {
      products[0].variationAttributeMap = {
        attributes: data.attributes,
        variations: data.variations
      };
    }
    return products;
  } else {
    // TODO: load feedback for products
    return data.data.itemList.documents.map(document => document.data);
  }
}

async function getFeedbackAvarage(context: Context, itemIds: string[]): Promise<ReviewAverage> {
  const urlFeedbackStars: URL = new URL(`/rest/feedbacks/feedback/helper/counts/${itemIds[0]}`, context.config.api.url);
  urlFeedbackStars.searchParams.set('allowFeedbacksOnlyIfPurchased', 'false');
  urlFeedbackStars.searchParams.set('numberOfFeedbacks', '100');
  const { data } = await context.client.get(urlFeedbackStars.href);
  return data;
}
