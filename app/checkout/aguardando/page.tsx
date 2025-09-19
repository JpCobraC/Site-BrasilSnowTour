"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function AguardandoPagamentoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const method = searchParams.get("method")
  const orderId = searchParams.get("orderId")

  const [paymentStatus, setPaymentStatus] = useState<"pending" | "completed" | "failed">("pending")
  const [timeoutReached, setTimeoutReached] = useState(false)

  useEffect(() => {
    if (!method || !orderId) {
      router.push("/checkout")
      return
    }

    let statusInterval: NodeJS.Timeout
    let timeoutTimer: NodeJS.Timeout

    if (method === "paypal") {
      // Verificar status do PayPal a cada 3 segundos
      statusInterval = setInterval(async () => {
        try {
          const response = await fetch(`/api/paypal/check-payment?orderId=${orderId}`)
          const data = await response.json()

          if (data.status === "COMPLETED") {
            setPaymentStatus("completed")
            clearInterval(statusInterval)
            setTimeout(() => {
              router.push(`/checkout/sucesso?payment=paypal&id=${orderId}`)
            }, 2000)
          } else if (data.status === "FAILED" || data.status === "CANCELLED") {
            setPaymentStatus("failed")
            clearInterval(statusInterval)
          }
        } catch (error) {
          console.error("Erro ao verificar pagamento PayPal:", error)
        }
      }, 3000)

      // Timeout após 10 minutos
      timeoutTimer = setTimeout(
        () => {
          setTimeoutReached(true)
          clearInterval(statusInterval)
        },
        10 * 60 * 1000,
      )
    }

    return () => {
      if (statusInterval) clearInterval(statusInterval)
      if (timeoutTimer) clearTimeout(timeoutTimer)
    }
  }, [method, orderId, router])

  const getMethodName = () => {
    switch (method) {
      case "paypal":
        return "PayPal"
      default:
        return "Pagamento"
    }
  }

  if (paymentStatus === "completed") {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Pagamento Confirmado!</h2>
                <p className="text-muted-foreground mb-4">
                  Seu pagamento via {getMethodName()} foi processado com sucesso.
                </p>
                <p className="text-sm text-muted-foreground">Redirecionando para a página de sucesso...</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (paymentStatus === "failed" || timeoutReached) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6">
                <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">
                  {timeoutReached ? "Tempo Esgotado" : "Pagamento Não Confirmado"}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {timeoutReached
                    ? "O tempo limite para confirmação do pagamento foi atingido."
                    : "Não foi possível confirmar seu pagamento. Tente novamente."}
                </p>
                <div className="space-y-2">
                  <Button onClick={() => router.push("/checkout")}>Tentar Novamente</Button>
                  <Button variant="outline" onClick={() => router.push("/loja")}>
                    Voltar à Loja
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardHeader>
                <CardTitle>Aguardando Confirmação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Processando Pagamento via {getMethodName()}</h2>
                  <p className="text-muted-foreground text-center">
                    Aguardando a confirmação do seu pagamento. Isso pode levar alguns minutos.
                  </p>
                </div>

                {method === "paypal" && (
                  <Alert>
                    <ExternalLink className="h-4 w-4" />
                    <AlertDescription>
                      Se você fechou a janela do PayPal, pode reabri-la clicando no botão abaixo.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  {method === "paypal" && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        const paypalUrl = `https://www.${
                          process.env.NODE_ENV === "production" ? "" : "sandbox."
                        }paypal.com/checkoutnow?token=${orderId}`
                        window.open(paypalUrl, "_blank")
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Reabrir {getMethodName()}
                    </Button>
                  )}

                  <Button variant="ghost" onClick={() => router.push("/checkout")}>
                    Cancelar e Voltar
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>• Não feche esta página até a confirmação</p>
                  <p>• O pagamento será verificado automaticamente</p>
                  <p>• Em caso de problemas, entre em contato conosco</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
