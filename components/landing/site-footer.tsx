import Link from 'next/link'

const links = [
  { label: 'Productos', href: '#' },
  { label: 'Colecciones', href: '#' },
  { label: 'Sobre nosotros', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contacto', href: '#' },
]
const socials = ['Instagram', 'Pinterest', 'LinkedIn', 'YouTube']

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="font-serif text-2xl text-espresso">
            BuyTevora
          </Link>
          <nav aria-label="Pie de página">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-foreground/80">
              {links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="flex flex-wrap gap-5 text-xs text-foreground/80">
            {socials.map((s) => (
              <li key={s}>
                <a href="#" className="hover:text-primary">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-[11px] text-muted-foreground md:flex-row md:justify-between">
          <p>© 2026 BuyTevora. Todos los derechos reservados.</p>
          <p>Tecnología / Estilo de vida / Tú</p>
        </div>
      </div>
    </footer>
  )
}
