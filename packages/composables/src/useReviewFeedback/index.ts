import { useVSFContext } from '@vue-storefront/core';

export const useReviewFeedback = async (id: string): Promise<any> => {

  const context = useVSFContext();

  const usePlaceReviewFeedback = async (params: any): Promise<any> => {
    try {
      console.log('usePlaceReviewFeedback');
      const send = await context.$plentymarkets.api.placeReview(params);
      console.log(send);
    } catch (err) {
      console.log({err});
    }
  };
const params = {
  'name':'test-name',
  'title':'test-title',
  'ratings':5,
  'comment':'test-comment',
};
  return usePlaceReviewFeedback(params);
};
