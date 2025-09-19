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
    const { orderId } = await request.json()

    if (!orderId) {
      return NextResponse.json({ error: "ID do pedido é obrigatório" }, { status: 400 })
    }

    const accessToken = await getPayPalAccessToken()

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const captureData = await response.json()

    if (!response.ok) {
      throw new Error(captureData.message || "Erro ao capturar pagamento PayPal")
    }

    return NextResponse.json(captureData)
  } catch (error) {
    console.error("Erro ao capturar pedido PayPal:", error)
    return NextResponse.json({ error: "Erro interno do servidor ao capturar pagamento PayPal" }, { status: 500 })
  }
}
