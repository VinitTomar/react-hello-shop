export type CheckoutStep = "shipping" | "payment" | "confirmation";

export interface ShippingData {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface PaymentData {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface OrderResult {
  orderId: string;
  total: number;
}
