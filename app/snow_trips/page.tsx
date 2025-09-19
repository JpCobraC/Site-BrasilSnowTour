"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, MapPin, Users, Eye } from "lucide-react"
import { useState } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

interface GalleryItem {
  id: number
  title: string
  location: string
  date: string
  description: string
  images: string[]
  category: string
  participants: number
}

// Função para detectar vídeo
function isVideo(src: string) {
  return src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg")
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Chillan",
    location: "Chillán - Ñuble",
    date: "2022",
    description: "Uma semana incrível nas pistas de Chillan!",
    images: [
      "/chillan22/7.jpg",
      "/chillan22/1.jpg",
      "chillan22/2v.jpg",
      "/chillan22/2.jpg",
      "/chillan22/3.jpg",
      "/chillan22/4.jpg",
      "/chillan22/v1.mp4",
      "/chillan22/v2.mp4",
    ],
    category: "Chillan",
    participants: 12,
  },
  {
    id: 2,
    title: "La Parva",
    location: "Lo Barnechea - Santiago",
    date: "2023",
    description: "Descrição",
    images: [
      "/laparva23/0v.jpg",
      "/laparva23/1v.jpg",
      "/laparva23/2v.jpg",
      "/laparva23/v1.mp4",
      "/laparva23/3v.jpg",
      "/laparva23/4v.jpg",
    ],
    category: "La Parva",
    participants: 9,
  },

  {
    id: 3,
    title: "El Colorado",
    location: "Lo Barnechea, Chile",
    date: "2024",
    description: "Descrição",
    images: [
      "/24/0v.jpg",
      "/24/1v.jpg",
      "/24/2v.jpg",
      "/24/3v.jpg",
      "/24/4v.jpg",
    ],
    category: "El Colorado",
    participants: 2,
  },
  {
    id: 4,
    title: "La Parva",
    location: "Lo Barnechea - Santiago",
    date: "2024",
    description: "Fim de semana épico com o grupo de amigos de São Paulo. Muita diversão e adrenalina nas pistas!",
    images: [
      "/placeholder.svg?key=colorado1",
      "/placeholder.svg?key=colorado1b",
    ],
    category: "El Colorado",
    participants: 8,
  },
  {
    id: 5,
    title: "Valle Nevado - Curso Avançado",
    location: "Valle Nevado, Chile",
    date: "Agosto 2024",
    description: "Curso intensivo de esqui avançado com instrutores especializados. Técnicas profissionais na neve.",
    images: [
      "/placeholder.svg?key=valle2",
      "/placeholder.svg?key=valle2b",
    ],
    category: "Valle Nevado",
    participants: 4,
  },
  {
    id: 6,
    title: "La Parva - Fotografia na Neve",
    location: "La Parva, Chile",
    date: "Setembro 2024",
    description: "Workshop especial de fotografia na neve com paisagens deslumbrantes dos Andes chilenos.",
    images: [
      "/placeholder.svg?key=laparva2",
      "/placeholder.svg?key=laparva2b",
    ],
    category: "La Parva",
    participants: 10,
  },
]

const categories = ["Todos", "Valle Nevado", "La Parva", "Portillo", "El Colorado"]

export default function GaleriaPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  const filteredItems =
    selectedCategory === "Todos" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-12 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">Galeria de Viagens</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Reviva os momentos mágicos das nossas aventuras na neve. Cada foto conta uma história única de alegria,
              superação e descobertas nas montanhas chilenas.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <Carousel>
                        <CarouselContent>
                          {item.images.map((media, idx) => (
                            <CarouselItem key={idx}>
                              {isVideo(media) ? (
                                <video
                                  src={media}
                                  controls
                                  playsInline
                                  className="w-full h-[420px] object-cover rounded-xl mx-auto aspect-[9/16] bg-black"
                                  style={{ maxWidth: 320 }}
                                />
                              ) : (
                                <img
                                  src={media}
                                  alt={item.title}
                                  className="w-full h-[420px] object-cover rounded-xl mx-auto aspect-[9/16] bg-black"
                                  style={{ maxWidth: 320 }}
                                />
                              )}
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2" />
                        <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />
                      </Carousel>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                        <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
                      </div>
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                        {item.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 text-balance">{item.title}</h3>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{item.participants} participantes</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mt-3 text-pretty line-clamp-2">{item.description}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-4xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <Carousel>
                        <CarouselContent>
                          {item.images.map((media, idx) => (
                            <CarouselItem key={idx}>
                              {isVideo(media) ? (
                                <video
                                  src={media}
                                  controls
                                  playsInline
                                  className="w-full h-[520px] object-cover rounded-xl mx-auto aspect-[9/16] bg-black"
                                  style={{ maxWidth: 360 }}
                                />
                              ) : (
                                <img
                                  src={media}
                                  alt={item.title}
                                  className="w-full h-[520px] object-cover rounded-xl mx-auto aspect-[9/16] bg-black"
                                  style={{ maxWidth: 360 }}
                                />
                              )}
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2" />
                        <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />
                      </Carousel>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Badge className="mb-2">{item.category}</Badge>
                        <h2 className="text-2xl font-bold text-foreground text-balance">{item.title}</h2>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-muted-foreground">
                          <MapPin className="h-5 w-5" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-muted-foreground">
                          <Calendar className="h-5 w-5" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-muted-foreground">
                          <Users className="h-5 w-5" />
                          <span>{item.participants} participantes</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-pretty leading-relaxed">{item.description}</p>

                      <div className="pt-4">
                        <Button className="w-full">Quero uma Viagem Assim!</Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Sua Próxima Aventura Está Aqui</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Inspire-se nas experiências dos nossos clientes e planeje sua própria aventura na neve. Entre em contato
            conosco para criar memórias inesquecíveis!
          </p>
          <Button size="lg">Solicitar Orçamento Personalizado</Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}