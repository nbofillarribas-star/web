import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Cta, Eyebrow } from './shared'

const products = [
  { name: 'Athena Air', tagline: 'Ligero, potente, siempre contigo.', price: '€1.199', image: '/images/product-laptop.png', alt: 'Portátil plateado ultrafino' },
  { name: 'Athena Tab Pro', tagline: 'Crea, trabaja, inspira.', price: '€899', image: '/images/product-tablet.png', alt: 'Tableta de color grafito' },
  { name: 'Athena Sound Max', tagline: 'Sonido que te envuelve.', price: '€549', image: '/images/product-headphones.png', alt: 'Auriculares inalámbricos beige' },
  { name: 'Athena Phone 15', tagline: 'Más que un teléfono.', price: '€999', image: '/images/product-phone.png', alt: 'Smartphone de color crema' },
]

export function Collection() {
  return (
    <section id="coleccion" className="scroll-mt-10">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-16 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Colección destacada</Eyebrow>
            <h2 className="mt-5 max-w-sm font-serif text-4xl leading-[1.05] text-balance md:text-5xl">
              Tecnología para cada momento.
            </h2>
          </div>
          <Cta href="#catalogo" variant="link">
            Explorar las 10 categorías (150 productos)
          </Cta>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.name}>
              <Link href="#coleccion" className="group block">
                <div className="relative aspect-[4/3.4] overflow-hidden bg-secondary">
                  <Image
                    src={p.image || '/placeholder.svg'}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-elegant group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 text-sm font-medium">{p.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.tagline}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span>{p.price}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 ease-elegant group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
