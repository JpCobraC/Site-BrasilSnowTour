import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("orderId")

    if (!orderId) {
      return NextResponse.json({ error: "Order ID não fornecido" }, { status: 400 })
    }

    // Verificar status do pedido no PayPal
    const paypalResponse = await fetch(
      `https://api-m.${process.env.NODE_ENV === "production" ? "" : "sandbox."}paypal.com/v2/checkout/orders/${orderId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getPayPalAccessToken()}`,
        },
      },
    )

    if (!paypalResponse.ok) {
      throw new Error("Erro ao consultar PayPal")
    }

    const orderData = await paypalResponse.json()

    return NextResponse.json({
      orderId,
      status: orderData.status,
      paidAt: orderData.status === "COMPLETED" ? new Date().toISOString() : null,
    })
  } catch (error) {
    console.error("Erro ao verificar pagamento PayPal:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

async function getPayPalAccessToken() {
  const response = await fetch(
    `https://api-m.${process.env.NODE_ENV === "production" ? "" : "sandbox."}paypal.com/v1/oauth2/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`,
        ).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    },
  )

  const data = await response.json()
  return data.access_token
}
