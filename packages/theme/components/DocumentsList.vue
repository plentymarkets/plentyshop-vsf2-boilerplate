<template>
  <div
    v-if="documents && documents.length"
    v-e2e="'documents-list'"
    class="documents-list"
  >
    <SfButton
      v-for="(document, key) in documents"
      :key="key"
      target="”_blank”"
      :link="getDocumentLink(document)"
      class="sf-button--full-width color-primary mb-2"
    >
      {{ getTypeName(document.type) }}
    </SfButton>
  </div>
</template>

<script>
import { SfButton } from '@storefront-ui/vue';
import { useContext } from '@nuxtjs/composition-api';
import { orderGetters } from '@vue-storefront/plentymarkets';

export default {
  name: 'DocumentsList',
  components: { SfButton },
  props: {
    documents: {
      type: Array,
      default: () => []
    },
    accessKey: {
      type: String,
      default: ''
    }
  },

  setup(props) {
    const { app } = useContext();

    // disable eslint this mapping cant use camelcase
    /* eslint-disable */
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
    /* eslint-enable */

    const getTypeName = (type) => {
      return translations[type];
    };

    const getDocumentLink = (doc) => {
      return orderGetters.getDocumentLink(doc, props.accessKey);
    };

    return {
      getTypeName,
      getDocumentLink
    };
  }
};
</script>

<style scoped>

</style>
