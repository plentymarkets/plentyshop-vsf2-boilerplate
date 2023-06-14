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
