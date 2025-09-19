"use client"

import type React from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCart } from "@/contexts/cart-context"
import { ArrowLeft, CreditCard, Shield, Truck, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface Photo {
  id: number
  title: string
  location: string
  photographer: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  downloads: number
  featured: boolean
}

const photos: Photo[] = [
  {
    id: 1,
    title: "Nascer do Sol em Valle Nevado",
    location: "Valle Nevado, Chile",
    photographer: "Carlos Mendoza",
    price: 89.9,
    originalPrice: 129.9,
    image: "/placeholder.svg?key=photo1",
    category: "Paisagem",
    rating: 4.9,
    downloads: 234,
    featured: true,
  },
  {
    id: 2,
    title: "Esquiador Profissional em Ação",
    location: "La Parva, Chile",
    photographer: "Ana Silva",
    price: 149.9,
    image: "/placeholder.svg?key=photo2",
    category: "Ação",
    rating: 4.8,
    downloads: 189,
    featured: true,
  },
  {
    id: 3,
    title: "Família na Neve - Momento Especial",
    location: "Portillo, Chile",
    photographer: "Roberto Lima",
    price: 79.9,
    image: "/placeholder.svg?key=photo3",
    category: "Família",
    rating: 4.7,
    downloads: 156,
    featured: false,
  },
  {
    id: 4,
    title: "Pistas Vazias ao Amanhecer",
    location: "El Colorado, Chile",
    photographer: "Maria Santos",
    price: 99.9,
    originalPrice: 139.9,
    image: "/placeholder.svg?key=photo4",
    category: "Paisagem",
    rating: 4.9,
    downloads: 298,
    featured: false,
  },
  {
    id: 5,
    title: "Snowboard Freestyle",
    location: "Valle Nevado, Chile",
    photographer: "João Ferreira",
    price: 169.9,
    image: "/placeholder.svg?key=photo5",
    category: "Ação",
    rating: 4.8,
    downloads: 167,
    featured: true,
  },
  {
    id: 6,
    title: "Chalé Aconchegante na Montanha",
    location: "La Parva, Chile",
    photographer: "Patricia Oliveira",
    price: 119.9,
    image: "/placeholder.svg?key=photo6",
    category: "Arquitetura",
    rating: 4.6,
    downloads: 143,
    featured: false,
  },
]

interface PaymentError {
  type: "validation" | "payment" | "network" | "server"
  message: string
  field?: string
}

function CheckoutForm() {
  const { cart, cartTotal, clearCart, removeFromCart } = useCart()
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [errors, setErrors] = useState<PaymentError[]>([])
  const [clientSecret, setClientSecret] = useState("")
  const [paypalOrderId, setPaypalOrderId] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    cpf: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const cartItems = cart.map((photoId) => photos.find((p) => p.id === photoId)).filter(Boolean) as Photo[]
  const subtotal = cartTotal
  const tax = subtotal * 0.05
  const total = subtotal + tax

  const validateForm = (): PaymentError[] => {
    const newErrors: PaymentError[] = []

    if (!formData.email) {
      newErrors.push({ type: "validation", message: "E-mail é obrigatório", field: "email" })
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push({ type: "validation", message: "E-mail inválido", field: "email" })
    }

    if (!formData.firstName) {
      newErrors.push({ type: "validation", message: "Nome é obrigatório", field: "firstName" })
    }

    if (!formData.lastName) {
      newErrors.push({ type: "validation", message: "Sobrenome é obrigatório", field: "lastName" })
    }

    if (!formData.phone) {
      newErrors.push({ type: "validation", message: "Telefone é obrigatório", field: "phone" })
    }

    if (!formData.cpf) {
      newErrors.push({ type: "validation", message: "CPF é obrigatório", field: "cpf" })
    }

    if (!paymentMethod) {
      newErrors.push({ type: "validation", message: "Selecione um método de pagamento" })
    }

    if ((paymentMethod === "credit" || paymentMethod === "debit") && !stripe) {
      newErrors.push({ type: "payment", message: "Sistema de pagamento não carregado. Tente novamente." })
    }

    return newErrors
  }

  useEffect(() => {
    if (paymentMethod === "credit" || paymentMethod === "debit") {
      createPaymentIntent()
    }
  }, [paymentMethod, total])

  const createPaymentIntent = async () => {
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          currency: "brl",
          metadata: {
            cartItems: JSON.stringify(cartItems.map((item) => ({ id: item.id, title: item.title }))),
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar intenção de pagamento")
      }

      setClientSecret(data.clientSecret)
    } catch (error) {
      console.error("Erro ao criar payment intent:", error)
      setErrors([{ type: "payment", message: "Erro ao inicializar pagamento. Tente novamente." }])
    }
  }

  const createPayPalOrder = async () => {
    try {
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          items: cartItems,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar pedido PayPal")
      }

      return data.orderId
    } catch (error) {
      console.error("Erro ao criar pedido PayPal:", error)
      throw error
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => prev.filter((error) => error.field !== field))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])

    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsProcessing(true)

    try {
      if (paymentMethod === "credit" || paymentMethod === "debit") {
        await handleStripePayment()
      } else if (paymentMethod === "paypal") {
        await handlePayPalPayment()
      } else if (paymentMethod === "pix") {
        await handlePixPayment()
      }
    } catch (error) {
      console.error("Erro no pagamento:", error)
      setErrors([
        {
          type: "payment",
          message: error instanceof Error ? error.message : "Erro inesperado no pagamento",
        },
      ])
    } finally {
      setIsProcessing(false)
    }
  }

  const handleStripePayment = async () => {
    if (!stripe || !elements || !clientSecret) {
      throw new Error("Sistema de pagamento não está pronto")
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      throw new Error("Elemento do cartão não encontrado")
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
        },
      },
    })

    if (error) {
      throw new Error(error.message || "Erro no pagamento com cartão")
    }

    if (paymentIntent?.status === "succeeded") {
      clearCart()
      router.push("/checkout/sucesso?payment=stripe&id=" + paymentIntent.id)
    }
  }

  const handlePayPalPayment = async () => {
    try {
      const orderId = await createPayPalOrder()
      setPaypalOrderId(orderId)

      const paypalUrl = `https://www.${
        process.env.NODE_ENV === "production" ? "" : "sandbox."
      }paypal.com/checkoutnow?token=${orderId}`

      window.open(paypalUrl, "_blank")

      router.push(`/checkout/aguardando?method=paypal&orderId=${orderId}`)
    } catch (error) {
      throw new Error("Erro ao processar pagamento PayPal")
    }
  }

  const handlePixPayment = async () => {
    try {
      const response = await fetch("/api/pix/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          items: cartItems,
          customerData: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            cpf: formData.cpf,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao gerar código PIX")
      }

      router.push(`/checkout/pix?code=${data.pixCode}&id=${data.paymentId}`)
    } catch (error) {
      throw new Error("Erro ao processar pagamento PIX")
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Carrinho Vazio</h1>
            <p className="text-muted-foreground mb-6">Você não tem itens no seu carrinho.</p>
            <Button onClick={() => router.push("/loja")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar à Loja
            </Button>
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
          <div className="mb-8">
            <Button variant="ghost" onClick={() => router.push("/loja")} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar à Loja
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Finalizar Compra</h1>
            <p className="text-muted-foreground">Complete seus dados para adquirir as fotos selecionadas</p>
          </div>

          {errors.length > 0 && (
            <div className="mb-6 space-y-2">
              {errors.map((error, index) => (
                <Alert key={index} variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nome</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={errors.some((e) => e.field === "firstName") ? "border-destructive" : ""}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={errors.some((e) => e.field === "lastName") ? "border-destructive" : ""}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.some((e) => e.field === "email") ? "border-destructive" : ""}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="(11) 99999-9999"
                        className={errors.some((e) => e.field === "phone") ? "border-destructive" : ""}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange("cpf", e.target.value)}
                        placeholder="000.000.000-00"
                        className={errors.some((e) => e.field === "cpf") ? "border-destructive" : ""}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Método de Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o método de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Cartão de Crédito</SelectItem>
                      <SelectItem value="debit">Cartão de Débito</SelectItem>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>

                  {(paymentMethod === "credit" || paymentMethod === "debit") && (
                    <div className="space-y-4">
                      <div>
                        <Label>Dados do Cartão</Label>
                        <div className="mt-2 p-3 border rounded-md">
                          <CardElement
                            options={{
                              style: {
                                base: {
                                  fontSize: "16px",
                                  color: "#424770",
                                  "::placeholder": {
                                    color: "#aab7c4",
                                  },
                                },
                              },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "pix" && (
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium">PIX - Pagamento Instantâneo</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Após confirmar o pedido, você receberá o código PIX para pagamento. O pagamento é processado
                        instantaneamente.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">PayPal - Pagamento Seguro</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Você será redirecionado para o PayPal para completar o pagamento de forma segura.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Seus dados estão protegidos com criptografia SSL</span>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((photo) => (
                    <div key={photo.id} className="flex items-center gap-4">
                      <img
                        src={photo.image || "/placeholder.svg"}
                        alt={photo.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{photo.title}</h4>
                        <p className="text-xs text-muted-foreground">{photo.location}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {photo.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">R$ {photo.price.toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(photo.id)}
                          className="text-xs text-muted-foreground hover:text-destructive"
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        Subtotal ({cart.length} {cart.length === 1 ? "item" : "itens"})
                      </span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taxa de processamento</span>
                      <span>R$ {tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      <span>Download imediato após pagamento aprovado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>Garantia de qualidade e satisfação</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      <span>Pagamento 100% seguro</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <form onSubmit={handleSubmit}>
                <Button type="submit" className="w-full" size="lg" disabled={!paymentMethod || isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    `Finalizar Compra - R$ ${total.toFixed(2)}`
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}
