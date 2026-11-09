import Image from 'next/image'
import { MapPin, Laptop, Tablet, Smartphone, Headphones } from 'lucide-react'
import { Countdown } from './countdown'
import { Cta, OPENING_DATE_LABEL } from './shared'

const categories = [
  { label: 'Portátiles', icon: Laptop },
  { label: 'Tablets', icon: Tablet },
  { label: 'Smartphones', icon: Smartphone },
  { label: 'Accesorios', icon: Headphones },
]

export function GrandOpening() {
  return (
    <section id="apertura" aria-labelledby="apertura-title" className="relative scroll-mt-10 overflow-hidden bg-espresso text-white">
      <Image
        src="/images/store.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/80 to-espresso/40" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-16 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/75">Gran apertura</p>
          <h2 id="apertura-title" className="mt-5 max-w-lg font-serif text-5xl leading-[1.02] text-balance md:text-6xl">
            Nuestras tiendas de tecnología abren el 15 de octubre.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80">
            Te esperamos en nuestros nuevos espacios para descubrir, probar y vivir la mejor tecnología del mercado.
            Asesoramiento experto, demostraciones en vivo y sorpresas para los primeros visitantes.
          </p>
          <div className="mt-10">
            <Cta href="#contacto" variant="light">
              Más información
            </Cta>
          </div>
        </div>

        <div className="border border-white/20 bg-espresso/40 p-6 backdrop-blur-sm md:p-8">
          <div className="flex items-start gap-4">
            <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0" strokeWidth={1.5} />
            <div>
              <p className="font-serif text-3xl">
                <time dateTime="2026-10-15">{OPENING_DATE_LABEL}</time>
              </p>
              <p className="mt-1 text-sm text-white/80">En nuestras nuevas tiendas físicas y online.</p>
            </div>
          </div>

          <div className="mt-8">
            <Countdown />
          </div>

          <ul className="mt-8 grid grid-cols-4 gap-2 text-center">
            {categories.map(({ label, icon: Icon }) => (
              <li key={label} className="flex flex-col items-center gap-2">
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.25} />
                <span className="text-[10px] text-white/80">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
