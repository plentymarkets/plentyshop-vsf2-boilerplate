<template>
  <div class="sf-shipping-details">
    <ValidationObserver ref="validationObserver">
      <form class="form">
        <slot name="form">
          <ValidationProvider
            :name="type + '-firstName'"
            rules="required|min:2"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              v-e2e="type + '-firstName'"
              v-model="internalForm.firstName"
              :label="$t('AddressInputForm.First name')"
              :name="type + '-firstName'"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element form__element--half"
            />
          </ValidationProvider>
          <ValidationProvider
            :name="type + '-lastName'"
            rules="required|min:2"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              v-e2e="type + '-lastName'"
              v-model="internalForm.lastName"
              :name="type + '-lastName'"
              :label="$t('AddressInputForm.Last name')"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element form__element--half form__element--half-even"
            />
          </ValidationProvider>
          <ValidationProvider
            :name="type + '-streetName'"
            rules="required|min:2"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              v-e2e="type + '-streetName'"
              v-model="internalForm.streetName"
              :name="type + '-streetName'"
              :label="$t('AddressInputForm.Street')"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider
            :name="type + '-apartment'"
            rules="required|min:1"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              v-e2e="type + '-apartment'"
              v-model="internalForm.apartment"
              :name="type + '-apartment'"
              :label="$t('AddressInputForm.Address no.')"
              required
              class="form__element"
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider
            :name="type + '-city'"
            rules="required|min:2"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              v-e2e="type + '-city'"
              v-model="internalForm.city"
              :name="type + '-city'"
              :label="$t('AddressInputForm.City')"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element form__element--half"
            />
          </ValidationProvider>
          <ValidationProvider
            :name="type + '-country'"
            rules="required|min:1"
            v-slot="{ errors }"
            slim
          >
            <SfComponentSelect
              :data-e2e="type + '-country'"
              v-model="internalForm.country"
              :name="type + '-country'"
              :label="$t('AddressInputForm.Country')"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
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
            :name="type + '-zipCode'"
            rules="required|min:2"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              v-e2e="type + '-zipCode'"
              v-model="internalForm.zipCode"
              :name="type + '-zipCode'"
              :label="$t('AddressInputForm.ZIP code')"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
              class="form__element form__element--half"
            />
          </ValidationProvider>
          <ValidationProvider :name="type + '-state'" rules="" v-slot="{ errors }" slim>
            <SfComponentSelect
              :data-e2e="type + '-state'"
              v-model="internalForm.state"
              :name="type + '-state'"
              :label="$t('AddressInputForm.State/Province')"
              :disabled="states.length <= 0"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
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
            :name="type + '-phoneNumber'"
            rules="required|min:5"
            v-slot="{ errors }"
            slim
          >
            <SfInput
              v-e2e="type + '-phoneNumber'"
              v-model="internalForm.phoneNumber"
              :name="type + '-phoneNumber'"
              :label="$t('AddressInputForm.Phone no.')"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
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
  SfTabs,
  SfInput,
  SfButton,
  SfComponentSelect,
  SfIcon
} from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min } from 'vee-validate/dist/rules';
import { watch, ref } from '@nuxtjs/composition-api';
import { countryGetters } from '@vue-storefront/plentymarkets';

export default {
  name: 'AddressInputForm',
  components: {
    SfTabs,
    SfInput,
    SfButton,
    SfComponentSelect,
    SfIcon,
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
      ...required,
      message: 'This field is required'
    });
    extend('min', {
      ...min,
      message: 'The field should have at least {length} characters'
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
