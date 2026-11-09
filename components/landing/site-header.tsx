import Link from 'next/link'
import { Search, ShoppingBag, Menu } from 'lucide-react'

const nav = [
  { label: 'Destacados', href: '#coleccion' },
  { label: 'Catálogo (10 Categorías)', href: '#catalogo' },
  { label: 'Apertura', href: '#apertura' },
  { label: 'Sobre nosotros', href: '#filosofia' },
  { label: 'FAQ', href: '/faq' },
]

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-16">
        <Link href="/" className="font-serif text-3xl tracking-tight text-espresso">
          BuyTevora
        </Link>
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-10 text-xs text-foreground/80">
            {nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-5 text-foreground/80">
          <Link href="#catalogo" aria-label="Buscar productos en el catálogo" className="hover:text-primary transition-colors">
            <Search className="size-4" strokeWidth={1.5} />
          </Link>
          <Link href="#catalogo" aria-label="Ver reservas y carrito" className="hover:text-primary transition-colors">
            <ShoppingBag className="size-4" strokeWidth={1.5} />
          </Link>
          <Link href="#catalogo" aria-label="Ver colecciones" className="hover:text-primary transition-colors md:hidden">
            <Menu className="size-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </header>
  )
}
