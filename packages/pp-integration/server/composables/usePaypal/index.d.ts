import { PayPalNamespace } from '@paypal/paypal-js';
interface UsePaypalErrors {
    exampleEndpoint: Error;
}
declare const usePaypal: () => {
    error: import("@vue/composition-api").ComputedRef<UsePaypalErrors>;
    loading: import("@vue/composition-api").ComputedRef<boolean>;
    paymentObject: import("@vue/composition-api").ComputedRef<unknown>;
    exampleEndpoint: () => Promise<void>;
    setPaymentObject: (newPaymentObject: string) => void;
    loadScript: (currency: string) => Promise<PayPalNamespace>;
};
export default usePaypal;
