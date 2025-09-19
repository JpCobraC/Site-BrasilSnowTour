export const PAYPAL_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  currency: "BRL",
  intent: "capture",
  locale: "pt_BR",
}

export interface PayPalOrderData {
  id: string
  status: string
  purchase_units: Array<{
    amount: {
      currency_code: string
      value: string
    }
  }>
}
