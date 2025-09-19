import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mountain, Shield, Users, MapPin, Star, ArrowRight, Snowflake, Camera, Heart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            className="w-full h-full object-cover"
            src="/video-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/stunning-snow-covered-mountain-ski-resort-in-chile.jpg"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            <Snowflake className="w-4 h-4 mr-2" />
            Temporada 2026 Aberta
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Viva a Aventura do Esqui no Chile
          </h1>

          <p className="text-xl sm:text-2xl mb-8 text-white/90 text-pretty max-w-2xl mx-auto">
            Descubra as melhores pistas de esqui do Chile com guias brasileiros especializados. Pacotes personalizados
            para uma experiência inesquecível na neve.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Solicitar Orçamento
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-foreground bg-transparent"
            >
              Ver Galeria
              <Camera className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Company Presentation */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              Sua Aventura na Neve Começa Aqui
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Somos especialistas em turismo de esqui no Chile, oferecendo experiências únicas com todo o conforto e
              segurança que você merece. Nossa equipe de guias brasileiros conhece cada detalhe das melhores estações de
              esqui chilenas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Segurança Total</h3>
                <p className="text-muted-foreground text-pretty">
                  Equipamentos de primeira linha e guias certificados para garantir sua segurança em todas as
                  atividades.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Guias Brasileiros</h3>
                <p className="text-muted-foreground text-pretty">
                  Nossa equipe fala português e conhece as necessidades dos turistas brasileiros no Chile.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Pacotes Personalizados</h3>
                <p className="text-muted-foreground text-pretty">
                  Criamos roteiros únicos baseados no seu perfil, experiência e preferências pessoais.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
                Por Que Escolher a Brasil Snow Tour?
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Mountain className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Acesso às Melhores Pistas</h3>
                    <p className="text-muted-foreground text-pretty">
                      Valle Nevado, La Parva, El Colorado e Portillo - conhecemos todos os segredos das principais
                      estações.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Logística Completa</h3>
                    <p className="text-muted-foreground text-pretty">
                      Transporte, hospedagem, equipamentos e refeições - cuidamos de todos os detalhes da sua viagem.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Star className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Experiência Comprovada</h3>
                    <p className="text-muted-foreground text-pretty">
                      Mais de 500 brasileiros já viveram momentos inesquecíveis na neve conosco.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button size="lg">
                  Conheça Nossos Pacotes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/group-of-happy-brazilian-tourists-skiing-in-chile-.jpg"
                alt="Turistas brasileiros esquiando no Chile"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 bg-primary rounded-full border-2 border-white" />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">500+ Clientes</p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">Pronto para Sua Aventura na Neve?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
            Entre em contato conosco e descubra como podemos tornar sua viagem de esqui no Chile uma experiência única e
            inesquecível.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Solicitar Orçamento Gratuito
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="/galeria" className="flex items-center">
                Ver Fotos das Viagens
                <Camera className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
