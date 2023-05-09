<template>
  <div class="documents-listing">
    <SfButton
      v-for="(document, key) in documents"
      :key="key"
      class="sf-button--full-width color-primary mb-5"
    >
      {{ getTypeName(document.type) }}
    </SfButton>
  </div>
</template>

<script>
import { SfButton } from '@storefront-ui/vue';
import { useContext } from '@nuxtjs/composition-api';

export default {
  name: 'DocumentsListing',
  components: { SfButton },
  props: {
    documents: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Array | Object,
      default: () => []
    }
  },

  setup () {

    const { app } = useContext();

    const translations = {
      correction_document: app.i18n.t('Correction Documents'),
      credit_note: app.i18n.t('Credit Note'),
      delivery_note: app.i18n.t('Delivery Note'),
      dunning_letter: app.i18n.t('Dunning Letter'),
      invoice_external: app.i18n.t('Invoice External'),
      invoice: app.i18n.t('Invoice'),
      offer: app.i18n.t('Offer'),
      order_confirmation: app.i18n.t('Order Confirmation'),
      pickup_delivery: app.i18n.t('Pickup Delivery'),
      // pro_forma_invoice: TranslationService.translate('Ceres::Template.myAccountOrderDocumentsProFormaInvoice'),
      // receipt: TranslationService.translate('Ceres::Template.myAccountOrderDocumentsReceipt'),
      // return_note: TranslationService.translate('Ceres::Template.myAccountOrderDocumentsReturnNote'),
      // success_confirmation: TranslationService.translate('Ceres::Template.myAccountOrderDocumentsSuccessConfirmation'),
      // reversal_document: TranslationService.translate('Ceres::Template.myAccountOrderDocumentsReversalDocument')
    };

    const getTypeName = (type) => {
      return translations[type];
    };

    return {
      getTypeName
    };
  }
};
</script>

<style scoped>

</style>
