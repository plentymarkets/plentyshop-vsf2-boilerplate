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
      correction_document: app.i18n.t('Documents.Correction Documents'),
      credit_note: app.i18n.t('Documents.Credit Note'),
      delivery_note: app.i18n.t('Documents.Delivery Note'),
      dunning_letter: app.i18n.t('Documents.Dunning Letter'),
      invoice_external: app.i18n.t('Documents.Invoice External'),
      invoice: app.i18n.t('Documents.Invoice'),
      offer: app.i18n.t('Documents.Offer'),
      order_confirmation: app.i18n.t('Documents.Order Confirmation'),
      pickup_delivery: app.i18n.t('Documents.Pickup Delivery'),
      pro_forma_invoice: app.i18n.t('Documents.Pro Forma Invoice'),
      receipt: app.i18n.t('Documents.Receipt'),
      return_note: app.i18n.t('Documents.Return Note'),
      success_confirmation: app.i18n.t('Documents.Success Confirmation'),
      reversal_document: app.i18n.t('Documents.Reversal Document')
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
