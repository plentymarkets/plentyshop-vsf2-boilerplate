const address = require('../e2e/fixtures/customer.json').customer.address.shipping;
const country = require('../e2e/fixtures/country.json');

import { render, fireEvent,  screen } from '@testing-library/vue';
import AddressPicker from '../../components/AddressPicker.vue';

it('should emit an address when delete-address is clicked', async () => {
  const { emitted } = render(AddressPicker, {
    mocks: {
      $t: (msg) => msg
    },
    propsData: {
      addresses: [address],
      countries: [country],
    },
  });

  await fireEvent.click(screen.getByText('AddressPicker.Delete'));
  expect(emitted()['delete-address'][0][0]).toEqual(address);

});
