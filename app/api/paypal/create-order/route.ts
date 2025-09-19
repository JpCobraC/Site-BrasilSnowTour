import { type NextRequest, NextResponse } from "next/server"

const PAYPAL_BASE_URL =
  process.env.NODE_ENV === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID!
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const { amount, items } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Valor inválido para pagamento" }, { status: 400 })
    }

    const accessToken = await getPayPalAccessToken()

    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "BRL",
            value: amount.toFixed(2),
          },
          items: items?.map((item: any) => ({
            name: item.title,
            unit_amount: {
              currency_code: "BRL",
              value: item.price.toFixed(2),
            },
            quantity: "1",
          })),
        },
      ],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/sucesso`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      },
    }

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    })

    const order = await response.json()

    if (!response.ok) {
      throw new Error(order.message || "Erro ao criar pedido PayPal")
    }

    return NextResponse.json({ orderId: order.id })
  } catch (error) {
    console.error("Erro ao criar pedido PayPal:", error)
    return NextResponse.json({ error: "Erro interno do servidor ao processar pagamento PayPal" }, { status: 500 })
  }
}
