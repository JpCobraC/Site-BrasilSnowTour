"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Download, Home, Mail } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useCart } from "@/contexts/cart-context"

export default function CheckoutSucessoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, clearCart } = useCart()
  const [emailSent, setEmailSent] = useState(false)

  const orderId = searchParams.get("orderId")
  const customerName = searchParams.get("customerName") || "Cliente"
  const customerEmail = searchParams.get("customerEmail") || ""
  const total = Number.parseFloat(searchParams.get("total") || "0")

  useEffect(() => {
    const sendPurchaseNotification = async () => {
      if (orderId && customerEmail && items.length > 0 && !emailSent) {
        try {
          const orderData = {
            orderId,
            customerName,
            customerEmail,
            items: items.map((item) => ({
              title: item.title,
              format: item.format,
              quantity: item.quantity,
              price: item.price,
            })),
            total,
          }

          const response = await fetch("/api/purchase-notification", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          })

          if (response.ok) {
            setEmailSent(true)
            clearCart()
          }
        } catch (error) {
          console.error("Erro ao enviar notificação de compra:", error)
        }
      }
    }

    sendPurchaseNotification()
  }, [orderId, customerEmail, customerName, total, items, emailSent, clearCart])

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-foreground mb-2">Compra Realizada com Sucesso!</h1>
              <p className="text-muted-foreground">
                Obrigado pela sua compra, {customerName}. Suas fotos estão prontas para download.
              </p>
              {orderId && (
                <p className="text-sm text-muted-foreground mt-2">
                  Número do pedido: <span className="font-mono">{orderId}</span>
                </p>
              )}
            </div>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <Mail className="w-5 h-5" />
                    <span className="font-medium">
                      {emailSent ? "Email de entrega enviado!" : "Enviando email de entrega..."}
                    </span>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">📧 Verifique seu Email:</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 text-left">
                      <li>
                        • <strong>Links diretos do Google Drive</strong> para suas fotos
                      </li>
                      <li>
                        • Downloads disponíveis por <strong>30 dias</strong>
                      </li>
                      <li>
                        • Fotos em <strong>alta resolução</strong> (300 DPI)
                      </li>
                      <li>• Licença para uso pessoal incluída</li>
                      <li>• Suporte técnico disponível via WhatsApp</li>
                    </ul>
                  </div>

                  {customerEmail && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        📬 Email enviado para: <strong>{customerEmail}</strong>
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => window.open("https://drive.google.com", "_blank")}
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Acessar Google Drive
                    </Button>
                    <Button variant="outline" onClick={() => router.push("/loja")}>
                      Comprar Mais Fotos
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button variant="ghost" onClick={() => router.push("/")} className="flex items-center gap-2 mx-auto">
              <Home className="w-4 h-4" />
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
