"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Phone, Mail, Clock, MessageCircle, Send, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    tipoViagem: "",
    dataViagem: "",
    participantes: "",
    mensagem: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        })
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          tipoViagem: "",
          dataViagem: "",
          participantes: "",
          mensagem: "",
        })
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "Erro ao enviar solicitação. Tente novamente.",
        })
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      setSubmitStatus({
        type: "error",
        message: "Erro de conexão. Verifique sua internet e tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-12 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">Entre em Contato</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Estamos prontos para planejar sua aventura perfeita na neve. Entre em contato conosco e descubra como
              podemos tornar sua viagem ao Chile inesquecível.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Informações de Contato</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Telefone</h3>
                      <p className="text-muted-foreground">+55 (21) 97862-4554</p>
                      <p className="text-sm text-muted-foreground">WhatsApp disponível 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">E-mail</h3>
                      <p className="text-muted-foreground">contato@brasilsnowtour.com.br</p>
                      <p className="text-sm text-muted-foreground">Resposta em até 24 horas</p>
                    </div>
                  </div>

                  {/* Escritório removido */}

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Horário de Atendimento</h3>
                      <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                      <p className="text-muted-foreground">Sábado: 9h às 14h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Cards */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Contato Rápido</h3>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <a
                    href="https://api.whatsapp.com/send?phone=5521978624554&text=Ol%C3%A1%20BST!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    aria-label="Conversar no WhatsApp"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="h-8 w-8 text-green-600" />
                        <div>
                          <h4 className="font-semibold">WhatsApp</h4>
                          <p className="text-sm text-muted-foreground">Fale conosco agora</p>
                        </div>
                      </div>
                    </CardContent>
                  </a>
                </Card>

                {/* Ligação Gratuita removida */}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Solicite seu Orçamento</CardTitle>
                  <p className="text-muted-foreground">
                    Preencha o formulário abaixo e nossa equipe entrará em contato em até 2 horas para criar o pacote
                    perfeito para você.
                  </p>
                </CardHeader>
                <CardContent>
                  {submitStatus.type && (
                    <Alert
                      className={`mb-6 ${submitStatus.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                    >
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <AlertDescription className={submitStatus.type === "success" ? "text-green-800" : "text-red-800"}>
                        {submitStatus.message}
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo *</Label>
                        <Input
                          id="nome"
                          value={formData.nome}
                          onChange={(e) => handleInputChange("nome", e.target.value)}
                          placeholder="Seu nome completo"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="seu@email.com"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
                        <Input
                          id="telefone"
                          value={formData.telefone}
                          onChange={(e) => handleInputChange("telefone", e.target.value)}
                          placeholder="(11) 9999-9999"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tipoViagem">Tipo de Viagem</Label>
                        <Select
                          value={formData.tipoViagem}
                          onValueChange={(value) => handleInputChange("tipoViagem", value)}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="familia">Viagem em Família</SelectItem>
                            <SelectItem value="casal">Viagem de Casal</SelectItem>
                            <SelectItem value="amigos">Grupo de Amigos</SelectItem>
                            <SelectItem value="corporativo">Evento Corporativo</SelectItem>
                            <SelectItem value="individual">Viagem Individual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dataViagem">Data Preferida</Label>
                        <Input
                          id="dataViagem"
                          type="date"
                          value={formData.dataViagem}
                          onChange={(e) => handleInputChange("dataViagem", e.target.value)}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="participantes">Número de Participantes</Label>
                        <Select
                          value={formData.participantes}
                          onValueChange={(value) => handleInputChange("participantes", value)}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Quantas pessoas?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 pessoa</SelectItem>
                            <SelectItem value="2">2 pessoas</SelectItem>
                            <SelectItem value="3-5">3 a 5 pessoas</SelectItem>
                            <SelectItem value="6-10">6 a 10 pessoas</SelectItem>
                            <SelectItem value="11+">Mais de 10 pessoas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensagem">Mensagem</Label>
                      <Textarea
                        id="mensagem"
                        value={formData.mensagem}
                        onChange={(e) => handleInputChange("mensagem", e.target.value)}
                        placeholder="Conte-nos mais sobre sua viagem dos sonhos, experiência com esqui, preferências especiais..."
                        rows={4}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button type="submit" className="flex-1" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Enviar Solicitação
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        asChild
                        disabled={isSubmitting}
                      >
                        <a
                          href="https://api.whatsapp.com/send?phone=5521978624554&text=Ol%C3%A1%20BST!"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Conversar no WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Conversar no WhatsApp
                        </a>
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      * Campos obrigatórios. Seus dados estão seguros conosco e não serão compartilhados com terceiros.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Perguntas Frequentes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tire suas dúvidas sobre nossas viagens de esqui no Chile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Qual a melhor época para esquiar no Chile?</h3>
                <p className="text-muted-foreground text-sm">
                  A temporada de esqui no Chile vai de junho a setembro, com pico em julho e agosto quando há mais neve
                  e melhores condições.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Preciso ter experiência para esquiar?</h3>
                <p className="text-muted-foreground text-sm">
                  Não! Oferecemos pacotes para todos os níveis, desde iniciantes até esquiadores avançados, com aulas
                  incluídas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Os equipamentos estão incluídos?</h3>
                <p className="text-muted-foreground text-sm">
                  Sim! Todos os nossos pacotes incluem aluguel de equipamentos de esqui de alta qualidade (esquis,
                  botas, bastões).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Como funciona o transporte?</h3>
                <p className="text-muted-foreground text-sm">
                  Oferecemos transporte completo desde Santiago até as estações de esqui, com veículos confortáveis e
                  seguros.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}