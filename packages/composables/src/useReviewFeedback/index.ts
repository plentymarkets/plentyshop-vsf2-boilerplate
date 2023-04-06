import { useVSFContext } from '@vue-storefront/core';

export const useReviewFeedback = (): Object => {

  const context = useVSFContext();

  async function postReview(params: any): Promise<any> {
    try {
      console.log('usePlaceReviewFeedback');
      const send = await context.$plentymarkets.api.postReview(params);
      console.log(send);
    } catch (err) {
      console.log({err});
    }
  };

  return {
    postReview
  }
};
