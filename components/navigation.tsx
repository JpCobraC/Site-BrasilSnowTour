"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/icon.png" alt="Ícone de Montanha" width={32} height={32} className="h-11 w-15" />
            <span className="text-xl font-bold text-foreground">Brasil Snow Tour</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link href="/quem_somos" className="text-foreground hover:text-primary transition-colors">
              Quem Somos
            </Link>
            <Link href="/snow_trips" className="text-foreground hover:text-primary transition-colors">
              Snow Trips
            </Link>
            <Link href="/loja" className="text-foreground hover:text-primary transition-colors">
              Loja de Fotos
            </Link>
            <Link href="/contato" className="text-foreground hover:text-primary transition-colors">
              Contato
            </Link>
            <Button>Solicitar Orçamento</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <Link
                href="/"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Início
              </Link>
              <Link
                href="/quem_somos"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Quem Somos
              </Link>
              <Link
                href="/snow_trips"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Snow Trips
              </Link>
              <Link
                href="/loja"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Loja de Fotos
              </Link>
              <Link
                href="/contato"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contato
              </Link>
              <div className="px-3 py-2">
                <Button className="w-full">Solicitar Orçamento</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}