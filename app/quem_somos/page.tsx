"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

const socios = [
  {
    nome: "Bruno Medeiros",
    cargo: "Sócio & Videomaker",
    descricao:
      "Carinhosamente conhecido como Bruninho, é um exemplo de superação. Humilde, proativo e com seis temporadas de esqui no Chile, é o videomaker oficial do grupo, registrando imagens incríveis nas pistas.",
    midias: [
      "/socios/bruno1.jpg",
      "/socios/bruno2.jpg",
      "/socios/bruno3.jpg",
    ],
    redes: [
      { nome: "Instagram", url: "https://instagram.com/bruno", icone: "/icons/instagram.svg" },
      { nome: "LinkedIn", url: "https://linkedin.com/in/bruno", icone: "/icons/linkedin.svg" },
    ],
  },
  {
    nome: "Márcio Casici",
    cargo: "Sócio & Técnico",
    descricao:
      "Conhecido como Máááárcio, começou nos esportes de neve em 2007 nos EUA. Engenheiro e perfeccionista, desenvolveu técnica em saltos e manobras no snowboard e está perto de completar seu primeiro backflip.",
    midias: [
      "/socios/marcio1.jpg",
      "/socios/marcio2.jpg",
      "/socios/marcio3.jpg",
    ],
    redes: [
      { nome: "Instagram", url: "https://instagram.com/marcio", icone: "/icons/instagram.svg" },
      { nome: "LinkedIn", url: "https://linkedin.com/in/marcio", icone: "/icons/linkedin.svg" },
    ],
  },
]

// ...existing imports and code...

export default function QuemSomosPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-8 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">Quem Somos</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Conheça os sócios fundadores da Brasil Snow Tour e descubra a paixão que move nossas aventuras na neve!
            </p>
          </div>
        </div>
      </section>

      {/* Texto sobre os sócios e como se conheceram */}
      <section className="pb-8 mt-8">
        {/* Adicionada a classe mt-8 para dar mais espaço acima */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-background/80 rounded-xl shadow p-6 sm:p-10 border border-border">
              <h2 className="text-2xl font-bold text-primary mb-4 text-center">Nossa História</h2>
              <p className="mb-4 text-foreground text-justify">
                <strong>Somos dois amigos apaixonados por esqui, snowboard e pela magia da neve!</strong>
              </p>
              <ul className="mb-4 space-y-3">
                <li>
                  <span className="font-semibold text-primary">Bruno Medeiros:</span> Carinhosamente conhecido como Bruninho, é um exemplo de superação. Um cara muito humilde e proativo! Com seis temporadas de esqui no Chile em seu histórico, ele chegou a realizar duas viagens em uma única temporada, tamanho vício no esporte, sendo uma com a família e outra com os amigos. É o videomaker oficial do nosso grupo, pois sua habilidade notável nos esquis permite que ele registre imagens de forma segura e bem próxima dos protagonistas.
                </li>
                <li>
                  <span className="font-semibold text-primary">Márcio Casici:</span> Apelidado de Máááárcio devido ao seu sotaque mineiro, iniciou sua jornada nos esportes de neve em 2007 durante um intercâmbio realizado na estação de esqui Big Sky Resort, em Montana, EUA. Engenheiro e perfeccionista em tudo que se propõe a fazer, desenvolveu sólida técnica em saltos e manobras no snowboard ao longo dos anos. Está muito perto de completar seu primeiro backflip.
                </li>
              </ul>
              <p className="mb-4 text-foreground text-justify">
                <span className="font-semibold text-primary">Nossa amizade:</span> Teve início em Niterói, onde nos conhecemos através de outros esportes e hobbies. Inicialmente nas quadras de tênis e posteriormente nos aventurando em trilhas e viagens de moto. Compartilhamos algumas paixões em comum, no entanto foi na montanha que nossa parceria cresceu. Graças à habilidade no esporte e disposição para encarar desafios, exploramos juntos praticamente todos os cantos e trilhas fora de pista das estações por onde passamos. Na última temporada, em agosto de 2023, tivemos a inspiração de compartilhar nossa experiência e know-how em snowtrips com outros amigos e entusiastas da neve.
              </p>
              <p className="mb-2 text-foreground text-justify">
                Assim nasceu a <span className="font-bold text-primary">Brasil Snow Tour</span>!
              </p>
              <p className="text-foreground text-justify">
                Juntos, estamos ansiosos para construir uma comunidade única e dedicada ao desenvolvimento desse esporte com você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sócios com carrossel */}
      {/* ...restante do código igual... */}

      {/* Sócios com carrossel */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {socios.map((socio, idx) => (
              <Card key={idx} className="flex flex-col items-center text-center p-6">
                <div className="mb-4 w-full">
                  <Carousel>
                    <CarouselContent>
                      {socio.midias.map((midia, i) => (
                        <CarouselItem key={i}>
                          <img
                            src={midia}
                            alt={socio.nome}
                            className="w-full h-[420px] object-cover rounded-xl mx-auto aspect-[9/16] bg-muted"
                            style={{ maxWidth: 320 }}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />
                  </Carousel>
                </div>
                <CardContent>
                  <h2 className="text-2xl font-bold text-foreground mb-1">{socio.nome}</h2>
                  <Badge className="mb-3">{socio.cargo}</Badge>
                  <p className="text-muted-foreground mb-4">{socio.descricao}</p>
                  <div className="flex justify-center gap-4">
                    {socio.redes.map((rede, i) => (
                      <a
                        key={i}
                        href={rede.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition"
                        title={rede.nome}
                      >
                        <img src={rede.icone} alt={rede.nome} className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Vamos juntos para a neve?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Entre em contato e faça parte da próxima aventura com a Brasil Snow Tour!
          </p>
          <Button size="lg">Fale Conosco</Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}