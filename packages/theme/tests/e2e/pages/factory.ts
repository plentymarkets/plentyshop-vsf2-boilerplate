import Category from './category';
import {CheckoutLogin, Billing, Payment, Shipping, ThankYou, ReadyOnlyCheckout} from './checkout';
import Cart from './components/cart-sidebar';
import Home from './home';
import Product from './product';

const page = {
  get cart(): any {
    return Cart;
  },
  get category(): any {
    return Category;
  },
  get checkout(): any {
    return {
      checkoutlogin: new CheckoutLogin(),
      shipping: new Shipping(),
      billing: new Billing(),
      payment: new Payment(),
      thankyou: new ThankYou(),
      checkoutReadyOnly: new ReadyOnlyCheckout()
    };
  },
  get home(): any {
    return Home;
  },
  get product(): any {
    return Product;
  }
};

export default page;
