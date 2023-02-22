<template>
  <div class="sf-shipping-details">
    <ValidationObserver ref="validationObserver">
      <form class="form">
        <slot name="form">
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('AddressInputForm.First name')"
            rules="required|min:2"
            slim
          >
            <SfInput
              v-model="internalForm.firstName"
              v-e2e="type + '-firstName'"
              :label="$t('AddressInputForm.First name')"
              :name="type + '-firstName'"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
              class="form__element form__element--half"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('AddressInputForm.Last name')"
            rules="required|min:2"
            slim
          >
            <SfInput
              v-model="internalForm.lastName"
              v-e2e="type + '-lastName'"
              :name="type + '-lastName'"
              :label="$t('AddressInputForm.Last name')"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
              class="form__element form__element--half form__element--half-even"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('AddressInputForm.Street')"
            rules="required|min:2"
            slim
          >
            <SfInput
              v-model="internalForm.streetName"
              v-e2e="type + '-streetName'"
              :name="type + '-streetName'"
              :label="$t('AddressInputForm.Street')"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('AddressInputForm.Address no')"
            rules="required|min:1"
            slim
          >
            <SfInput
              v-model="internalForm.apartment"
              v-e2e="type + '-apartment'"
              :name="type + '-apartment'"
              :label="$t('AddressInputForm.Address no')"
              required
              class="form__element"
              :valid="!errors[0]"
              :error-message="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('AddressInputForm.City')"
            rules="required|min:2"
            slim
          >
            <SfInput
              v-model="internalForm.city"
              v-e2e="type + '-city'"
              :name="type + '-city'"
              :label="$t('AddressInputForm.City')"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
              class="form__element form__element--half"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('AddressInputForm.Country')"
            rules="required|min:1"
            slim
          >
            <SfComponentSelect
              v-model="internalForm.country"
              :data-e2e="type + '-country'"
              :name="type + '-country'"
              :label="$t('AddressInputForm.Country')"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
              class="sf-component-select--underlined form__select form__element form__element--half form__element--half-even"
            >
              <SfComponentSelectOption
                v-for="country in countries"
                :key="countryGetters.getCountryId(country)"
                :value="countryGetters.getCountryId(country)"
                :data-e2e="type + '-country-' + countryGetters.getCountryName(country)"
              >
                {{ countryGetters.getCountryName(country) }}
              </SfComponentSelectOption>
            </SfComponentSelect>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('AddressInputForm.ZIP code')"
            rules="required|min:2"
            slim
          >
            <SfInput
              v-model="internalForm.zipCode"
              v-e2e="type + '-zipCode'"
              :name="type + '-zipCode'"
              :label="$t('AddressInputForm.ZIP code')"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
              class="form__element form__element--half"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('AddressInputForm.State/Province')"
            rules=""
            slim
          >
            <SfComponentSelect
              v-model="internalForm.state"
              :data-e2e="type + '-state'"
              :name="type + '-state'"
              :label="$t('AddressInputForm.State/Province')"
              :disabled="states.length <= 0"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
              class="sf-component-select--underlined form__select form__element form__element--half form__element--half-even"
            >
              <SfComponentSelectOption
                v-for="state in states"
                :key="countryGetters.getStateId(state)"
                :value="countryGetters.getStateId(state)"
                :data-e2e="type + '-state-' + countryGetters.getStateName(state)"
              >
                {{ countryGetters.getStateName(state) }}
              </SfComponentSelectOption>
            </SfComponentSelect>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('AddressInputForm.Phone no')"
            rules="required|min:5"
            slim
          >
            <SfInput
              v-model="internalForm.phoneNumber"
              v-e2e="type + '-phoneNumber'"
              :name="type + '-phoneNumber'"
              :label="$t('AddressInputForm.Phone no')"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
        </slot>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import {
  SfInput,
  SfComponentSelect
} from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min } from 'vee-validate/dist/rules';
import { watch, ref } from '@nuxtjs/composition-api';
import { countryGetters } from '@vue-storefront/plentymarkets';

export default {
  name: 'AddressInputForm',
  components: {
    SfInput,
    SfComponentSelect,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    countries: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: () => 'shipping'
    }
  },

  setup(props, { refs }) {
    extend('required', {
      ...required
    });
    extend('min', {
      ...min
    });

    const internalForm = ref(props.form);
    const states = ref([]);

    if (!internalForm?.value?.firstName) {
      internalForm.value = {
        firstName: '',
        lastName: '',
        streetName: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phoneNumber: ''
      };
    }

    const validate = async () => {
      const validation = await refs.validationObserver.validateWithInfo();
      if (validation.isValid) {
        return internalForm;
      }
      return false;
    };

    const setStates = (countryId) => {
      const country = props.countries.find(
        (country) => Number(country.id) === Number(countryId)
      );

      if (country) {
        if (countryGetters.getStates(country) <= 0) {
          internalForm.value.state = null;
        }
        states.value = countryGetters.getStates(country);
      }
    };

    watch(
      () => internalForm.value.country,
      async (countryId) => {
        setStates(countryId);
      }
    );

    setStates(internalForm.value.country);

    return {
      validate,
      internalForm,
      states,
      countryGetters
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/shared/styles/components/templates/SfShippingDetails.scss';
</style>
