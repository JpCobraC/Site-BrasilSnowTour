import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "brl", metadata } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Valor inválido para pagamento" }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe usa centavos
      currency,
      metadata: {
        ...metadata,
        source: "ski-tourism-photos",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error("Erro ao criar payment intent:", error)
    return NextResponse.json({ error: "Erro interno do servidor ao processar pagamento" }, { status: 500 })
  }
}
