"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, QrCode, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function PixPaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pixCode = searchParams.get("code")
  const paymentId = searchParams.get("id")

  const [copied, setCopied] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "paid" | "expired">("pending")
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutos

  useEffect(() => {
    if (!pixCode || !paymentId) {
      router.push("/checkout")
      return
    }

    // Verificar status do pagamento a cada 5 segundos
    const statusInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/pix/check-payment?id=${paymentId}`)
        const data = await response.json()

        if (data.status === "paid") {
          setPaymentStatus("paid")
          clearInterval(statusInterval)
          setTimeout(() => {
            router.push(`/checkout/sucesso?payment=pix&id=${paymentId}`)
          }, 2000)
        }
      } catch (error) {
        console.error("Erro ao verificar pagamento:", error)
      }
    }, 5000)

    // Timer de expiração
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPaymentStatus("expired")
          clearInterval(statusInterval)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(statusInterval)
      clearInterval(timer)
    }
  }, [pixCode, paymentId, router])

  const copyPixCode = () => {
    if (pixCode) {
      navigator.clipboard.writeText(pixCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (paymentStatus === "paid") {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Pagamento Confirmado!</h2>
                <p className="text-muted-foreground mb-4">Seu pagamento PIX foi processado com sucesso.</p>
                <p className="text-sm text-muted-foreground">Redirecionando para a página de sucesso...</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (paymentStatus === "expired") {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6">
                <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Código PIX Expirado</h2>
                <p className="text-muted-foreground mb-4">O tempo para pagamento expirou. Tente novamente.</p>
                <Button onClick={() => router.push("/checkout")}>Voltar ao Checkout</Button>
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
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Pagamento PIX</h1>
              <p className="text-muted-foreground">
                Escaneie o QR Code ou copie o código PIX para finalizar seu pagamento
              </p>
            </div>

            <Alert className="mb-6">
              <Clock className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <span>Tempo restante para pagamento:</span>
                  <Badge variant="outline" className="font-mono text-lg">
                    {formatTime(timeLeft)}
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="w-5 h-5" />
                    QR Code PIX
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="bg-white p-4 rounded-lg inline-block mb-4">
                    <img
                      src={`/generic-placeholder-graphic.png?height=200&width=200&text=QR+Code+PIX`}
                      alt="QR Code PIX"
                      className="w-48 h-48"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Abra o app do seu banco e escaneie o código</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Copy className="w-5 h-5" />
                    Código PIX
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Código PIX Copia e Cola:</label>
                      <div className="mt-2 p-3 bg-muted rounded-lg font-mono text-sm break-all">{pixCode}</div>
                    </div>

                    <Button
                      onClick={copyPixCode}
                      variant="outline"
                      className="w-full bg-transparent"
                      disabled={!pixCode}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copied ? "Código Copiado!" : "Copiar Código PIX"}
                    </Button>

                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>
                        <strong>Como pagar:</strong>
                      </p>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Abra o app do seu banco</li>
                        <li>Escolha a opção PIX</li>
                        <li>Escaneie o QR Code ou cole o código</li>
                        <li>Confirme o pagamento</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardContent className="pt-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="font-medium">Aguardando pagamento...</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Assim que o pagamento for confirmado, você será redirecionado automaticamente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
