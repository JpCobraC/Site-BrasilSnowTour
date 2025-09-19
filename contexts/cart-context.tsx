"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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

interface CartContextType {
  cart: number[]
  addToCart: (photoId: number) => void
  removeFromCart: (photoId: number) => void
  clearCart: () => void
  isInCart: (photoId: number) => boolean
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<number[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("ski-photos-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("ski-photos-cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (photoId: number) => {
    setCart((prev) => [...prev, photoId])
  }

  const removeFromCart = (photoId: number) => {
    setCart((prev) => prev.filter((id) => id !== photoId))
  }

  const clearCart = () => {
    setCart([])
  }

  const isInCart = (photoId: number) => cart.includes(photoId)

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

  const cartTotal = cart.reduce((total, photoId) => {
    const photo = photos.find((p) => p.id === photoId)
    return total + (photo?.price || 0)
  }, 0)

  const cartCount = cart.length

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
