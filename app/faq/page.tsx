import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { FaqAccordion } from '@/components/faq/faq-accordion'

export const metadata = {
  title: 'Preguntas frecuentes — BuyTevora',
  description: 'Resolvemos tus dudas sobre pedidos, envíos, devoluciones y la apertura de BuyTevora.',
}

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-16">
          <Link href="/" className="font-serif text-3xl tracking-tight text-espresso">BuyTevora</Link>
          <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-espresso">
            <ArrowLeft className="size-4" strokeWidth={1.5} /> Volver al inicio
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 md:px-16 md:pb-24 md:pt-28">
        <div className="grid gap-14 md:grid-cols-[0.75fr_1.25fr] md:gap-24">
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.24em] text-primary">Ayuda / FAQ</p>
            <h1 className="max-w-md font-serif text-6xl leading-[0.9] tracking-tight text-espresso md:text-8xl">
              Preguntas frecuentes
            </h1>
            <p className="mt-8 max-w-sm text-sm leading-7 text-muted-foreground">
              Todo lo que necesitas saber para descubrir BuyTevora y prepararte para nuestra apertura del 15 de octubre.
            </p>
            <div className="mt-12 border-t border-border pt-5 text-xs text-muted-foreground">
              <span className="text-espresso">¿No encuentras lo que buscas?</span>
              <a href="mailto:hola@buytevora.com" className="mt-3 flex items-center gap-2 uppercase tracking-[0.14em] text-primary hover:text-espresso">
                Escríbenos <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>
          <FaqAccordion />
        </div>
      </section>

      <footer className="border-t border-border/70 px-6 py-8 md:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© 2026 BuyTevora</span>
          <span>Tecnología / Estilo de vida / Tú</span>
        </div>
      </footer>
    </main>
  )
}
