export interface PayPalLink {
  href: string;
  method: string;
  rel: string;
}

export interface PayPalCreateOrder {
  id: string;
  links: PayPalLink[],
  status: string;
}

export interface PayPalApproveOrder {
  url: string;
}

export interface PayPalExecutePayment {
  executeResponse?: {
    statusCode: number;
    result: {
      id: string;
      intent: string;
      status: string;
      payment_source: {
        paypal: {
          email_address: string;
          account_id: string;
          account_status: string;
          name: {
            given_name: string;
            surname: string;
          };
          address: {
            country_code: string;
          };
        };
      };
      purchase_units: {
        reference_id: string;
        amount: {
          currency_code: string;
          value: string;
          breakdown: {
            item_total: {
              currency_code: string;
              value: string;
            };
            shipping: {
              currency_code: string;
              value: string;
            };
            handling: {
              currency_code: string;
              value: string;
            };
            tax_total: {
              currency_code: string;
              value: string;
            };
            insurance: {
              currency_code: string;
              value: string;
            };
            shipping_discount: {
              currency_code: string;
              value: string;
            };
          };
        };
        payee: {
          email_address: string;
          merchant_id: string;
        };
        description: string;
        invoice_id: string;
        items: {
          name: string;
          unit_amount: {
            currency_code: string;
            value: string;
          };
          tax: {
            currency_code: string;
            value: string;
          };
          quantity: string;
          sku?: string;
          image_url: string;
        }[];
        shipping: {
          name: {
            full_name: string;
          };
          address: {
            address_line_1: string;
            admin_area_2: string;
            postal_code: string;
            country_code: string;
          };
        };
        payments: {
          captures: {
            id: string;
            status: string;
            amount: {
              currency_code: string;
              value: string;
            };
            final_capture: boolean;
            disbursement_mode: string;
            seller_protection: {
              status: string;
              dispute_categories: string[];
            };
            seller_receivable_breakdown: {
              gross_amount: {
                currency_code: string;
                value: string;
              };
              paypal_fee: {
                currency_code: string;
                value: string;
              };
              net_amount: {
                currency_code: string;
                value: string;
              };
            };
            invoice_id: string;
            links: {
              href: string;
              rel: string;
              method: string;
            }[];
            create_time: string;
            update_time: string;
          }[];
        };
      }[];
      payer: {
        name: {
          given_name: string;
          surname: string;
        };
        email_address: string;
        payer_id: string;
        address: {
          country_code: string;
        };
      };
      create_time: string;
      update_time: string;
      links: {
        href: string;
        rel: string;
        method: string;
      }[];
    };
    headers: {
      [key: string]: string;
    };
  };
}
