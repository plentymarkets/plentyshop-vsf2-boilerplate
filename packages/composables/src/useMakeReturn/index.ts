import { computed } from '@nuxtjs/composition-api';
import { useVSFContext, sharedRef } from '@vue-storefront/core';
import { CreateReturnResponse, MakeReturnParams } from '@vue-storefront/plentymarkets-api';
import { ComposableBaseResponse } from 'src/types';

interface UseMakeReturnResponse extends ComposableBaseResponse<CreateReturnResponse> {
  makeReturn(params: MakeReturnParams): Promise<void>
}

export const useMakeReturn = (id: string): UseMakeReturnResponse => {
  const context = useVSFContext();
  const result = sharedRef(null, `useMakeReturn-${id}`);
  const loading = sharedRef(false, `useMakeReturn-loading-${id}`);
  const error = sharedRef({
    makeReturn: null
  }, `useMakeReturn-error-${id}`);

  const makeReturn = async (params: MakeReturnParams): Promise<void> => {

    const returnParams = {
      orderId: params.orderId,
      orderAccessKey: params.orderAccessKey,
      returnNote: params.returnNote
    };

    // Todo: Json to FormData mapping will be removed one the endpoint supports json payload
    params.variationIds.forEach(item => {
      if (item.quantity > 0) {
        returnParams['variationIds[' + item.id + ']'] = item.quantity;
      }
    });

    // This method returns type FormData the method URLSearchParams is able to work with that type but typescript doesn't allow the interface overlap
    const objectToFormData = (object: unknown): unknown => {
      const formData = new FormData();

      Object.keys(object).forEach(key => formData.append(key, object[key]));
      return formData;
    };
    const makeReturnPayload = new URLSearchParams(objectToFormData(returnParams) as string).toString();

    try {
      loading.value = true;
      result.value = await context.$plentymarkets.api.makeOrderReturn(makeReturnPayload);
      error.value.makeReturn = null;
    } catch (err) {
      error.value.makeReturn = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    makeReturn,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
