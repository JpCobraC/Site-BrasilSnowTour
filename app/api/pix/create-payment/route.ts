import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, items, customerData } = await request.json()

    // Validação básica
    if (!amount || !items || !customerData) {
      return NextResponse.json({ error: "Dados obrigatórios não fornecidos" }, { status: 400 })
    }

    // Simular geração de código PIX (em produção, usar API do banco)
    const paymentId = `pix_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const pixCode = `00020126580014br.gov.bcb.pix0136${paymentId}520400005303986540${amount.toFixed(2)}5802BR5925EMPRESA TURISMO ESQUI6009SAO PAULO62070503***6304${Math.random().toString(36).substr(2, 4).toUpperCase()}`

    // Em produção, salvar no banco de dados
    // await savePixPayment({
    //   id: paymentId,
    //   amount,
    //   items,
    //   customerData,
    //   pixCode,
    //   status: 'pending',
    //   expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutos
    // })

    return NextResponse.json({
      paymentId,
      pixCode,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    })
  } catch (error) {
    console.error("Erro ao criar pagamento PIX:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
