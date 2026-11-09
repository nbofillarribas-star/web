import Image from 'next/image'
import { Countdown } from './countdown'
import { Cta, OPENING_DATE_LABEL } from './shared'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <Image
        src="/images/hero.png"
        alt="Portátil plateado sobre un sofá de tela bouclé bañado por la luz de la tarde"
        fill
        priority
        sizes="100vw"
        className="object-cover object-right"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent md:via-background/60"
      />
      <div className="relative mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-center px-6 pb-16 pt-32 md:px-16">
        <div className="max-w-xl">
          <p className="mb-8 inline-flex items-center gap-3 border border-foreground/20 bg-background/60 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-espresso backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            Gran apertura · {OPENING_DATE_LABEL}
          </p>
          <h1 className="font-serif text-6xl leading-[0.95] tracking-tight text-foreground text-balance md:text-[5.5rem]">
            Tecnología, bien pensada.
          </h1>
          <p className="mt-8 max-w-sm text-base leading-relaxed text-foreground/80">
            El 15 de octubre abrimos las puertas de nuestras nuevas tiendas. Una nueva generación de tecnología premium,
            diseñada para integrarse en tu vida.
          </p>
          <div className="mt-10 max-w-md">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-espresso">Faltan</p>
            <Countdown tone="dark" />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Cta href="#apertura">Descubre la apertura</Cta>
            <Cta href="#coleccion" variant="link">
              Explora la colección
            </Cta>
          </div>
        </div>
        <div className="mt-20 hidden md:block" aria-hidden="true">
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Scroll</p>
          <div className="mt-3 h-10 w-px bg-foreground/40" />
        </div>
      </div>
    </section>
  )
}
