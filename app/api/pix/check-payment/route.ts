import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const paymentId = searchParams.get("id")

    if (!paymentId) {
      return NextResponse.json({ error: "ID do pagamento não fornecido" }, { status: 400 })
    }

    // Em produção, consultar status no banco de dados
    // const payment = await getPixPaymentById(paymentId)

    // Simular verificação (em produção, consultar API do banco)
    // Por enquanto, retorna sempre pendente para demonstração
    const status = "pending" // ou "paid" quando confirmado

    return NextResponse.json({
      paymentId,
      status,
      paidAt: status === "paid" ? new Date().toISOString() : null,
    })
  } catch (error) {
    console.error("Erro ao verificar pagamento PIX:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
