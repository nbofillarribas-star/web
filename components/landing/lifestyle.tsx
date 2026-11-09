import Image from 'next/image'
import { Star } from 'lucide-react'
import { Cta, Eyebrow } from './shared'

export function Lifestyle() {
  return (
    <section id="athena" className="scroll-mt-10">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-16 md:py-28">
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
          <Image
            src="/images/detail.png"
            alt="Portátil grafito sobre ropa de cama de lino junto a un smartphone"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <Eyebrow>Athena One</Eyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-[1.1] text-balance md:text-5xl">
            Diseñada para la forma en la que vives.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/80">
            Potencia, elegancia y rendimiento en un solo dispositivo. La Athena One es más que un portátil: es tu
            compañera de ideas, proyectos y momentos. Pruébala en tienda desde el día de la apertura.
          </p>
          <div className="mt-8">
            <Cta href="#coleccion" variant="link">
              Descubre Athena
            </Cta>
          </div>
        </div>

        <figure className="flex flex-col justify-center md:order-none">
          <blockquote className="font-serif text-3xl leading-snug text-balance md:text-4xl">
            {'“Tecnología que se siente, no solo se usa.”'}
          </blockquote>
          <div className="mt-5 flex gap-1 text-primary" aria-label="5 de 5 estrellas" role="img">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} aria-hidden="true" className="size-3.5 fill-current" strokeWidth={0} />
            ))}
          </div>
          <figcaption className="mt-4 text-xs text-muted-foreground">— Laura M., Cliente de BuyTevora</figcaption>
        </figure>
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
          <Image
            src="/images/lifestyle.png"
            alt="Mujer usando un portátil relajada en un sofá color crema"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
