import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"

// Usando uma imagem de ícone personalizada
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/icon.png" alt="Ícone de Montanha" width={32} height={32} className="h-10 w-13" />
              <span className="text-xl font-bold text-foreground">Brasil Snow Tour</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sua aventura de esqui no Chile começa aqui. Oferecemos experiências únicas na neve com guias brasileiros
              especializados.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Galeria
                </Link>
              </li>
              <li>
                <Link href="/loja" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Loja de Fotos
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+55 (21) 97862-4554</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contato@brasilsnowtour.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Itacioatiara-RJ, Brasil</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">© 2025 Brasil Snow Tour. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
