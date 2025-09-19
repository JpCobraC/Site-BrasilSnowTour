"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Eye, Download, Star, Filter } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"

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
    photographer: "Márcio Casici",
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
    photographer: "Bruno Medeiros",
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
    photographer: "Bruno Medeiros",
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
    photographer: "Bruno Medeiros",
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
    photographer: "Bruno Medeiros",
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
    photographer: "Márcio Casici",
    price: 119.9,
    image: "/placeholder.svg?key=photo6",
    category: "Arquitetura",
    rating: 4.6,
    downloads: 143,
    featured: false,
  },
]

const categories = ["Todas", "Paisagem", "Ação", "Família", "Arquitetura"]
const sortOptions = [
  { value: "featured", label: "Destaques" },
  { value: "price-low", label: "Menor Preço" },
  { value: "price-high", label: "Maior Preço" },
  { value: "rating", label: "Melhor Avaliação" },
  { value: "downloads", label: "Mais Baixadas" },
]

export default function LojaPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [sortBy, setSortBy] = useState("featured")
  const { cart, addToCart, removeFromCart, isInCart, cartTotal, clearCart } = useCart()
  const router = useRouter()

  const filteredAndSortedPhotos = photos
    .filter((photo) => selectedCategory === "Todas" || photo.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "downloads":
          return b.downloads - a.downloads
        case "featured":
        default:
          return b.featured ? 1 : -1
      }
    })

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-12 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">Loja de Fotos</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Adquira fotografias profissionais de alta qualidade das nossas aventuras na neve. Cada imagem captura a
              beleza única dos Andes chilenos.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Sort */}
      <section className="py-6 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort and Cart */}
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {cart.length > 0 && (
                <Button className="relative" onClick={() => router.push("/checkout")}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Carrinho ({cart.length})
                  <Badge className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground">
                    {cart.length}
                  </Badge>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Photos Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedPhotos.map((photo) => (
              <Card key={photo.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={photo.image || "/placeholder.svg"}
                    alt={photo.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="secondary">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                              <img
                                src={photo.image || "/placeholder.svg"}
                                alt={photo.title}
                                className="w-full h-auto rounded-lg"
                              />
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Badge className="mb-2">{photo.category}</Badge>
                                {photo.featured && (
                                  <Badge variant="secondary" className="ml-2">
                                    Destaque
                                  </Badge>
                                )}
                                <h2 className="text-2xl font-bold text-foreground text-balance">{photo.title}</h2>
                                <p className="text-muted-foreground">{photo.location}</p>
                                <p className="text-sm text-muted-foreground">Por {photo.photographer}</p>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-4 h-4 ${
                                        star <= photo.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">({photo.rating})</span>
                                <span className="text-sm text-muted-foreground">• {photo.downloads} downloads</span>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  {photo.originalPrice && (
                                    <span className="text-sm text-muted-foreground line-through">
                                      R$ {photo.originalPrice.toFixed(2)}
                                    </span>
                                  )}
                                  <span className="text-2xl font-bold text-primary">R$ {photo.price.toFixed(2)}</span>
                                </div>
                              </div>

                              <div className="pt-4 space-y-2">
                                <Button
                                  className="w-full"
                                  onClick={() => (isInCart(photo.id) ? removeFromCart(photo.id) : addToCart(photo.id))}
                                  variant={isInCart(photo.id) ? "outline" : "default"}
                                >
                                  {isInCart(photo.id) ? "Remover do Carrinho" : "Adicionar ao Carrinho"}
                                </Button>
                                <Button variant="outline" className="w-full bg-transparent">
                                  <Download className="w-4 h-4 mr-2" />
                                  Comprar Agora
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-primary text-primary-foreground">{photo.category}</Badge>
                    {photo.featured && (
                      <Badge variant="secondary" className="bg-yellow-500 text-white">
                        Destaque
                      </Badge>
                    )}
                  </div>

                  {/* Discount badge */}
                  {photo.originalPrice && (
                    <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                      {Math.round(((photo.originalPrice - photo.price) / photo.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-1 text-balance line-clamp-1">{photo.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{photo.location}</p>
                  <p className="text-xs text-muted-foreground mb-3">Por {photo.photographer}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{photo.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{photo.downloads} downloads</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {photo.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through block">
                          R$ {photo.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-lg font-bold text-primary">R$ {photo.price.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => (isInCart(photo.id) ? removeFromCart(photo.id) : addToCart(photo.id))}
                    variant={isInCart(photo.id) ? "outline" : "default"}
                  >
                    {isInCart(photo.id) ? (
                      "Remover"
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Adicionar
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <section className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg z-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {cart.length} {cart.length === 1 ? "foto" : "fotos"} no carrinho
                </p>
                <p className="text-sm text-muted-foreground">Total: R$ {cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={clearCart}>
                  Limpar
                </Button>
                <Button onClick={() => router.push("/checkout")}>Finalizar Compra</Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
