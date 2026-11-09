import { Cta, Eyebrow } from './shared'

export function Philosophy() {
  return (
    <section id="filosofia" className="border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:px-16 md:py-28">
        <div>
          <Eyebrow>Nuestra filosofía</Eyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-[1.05] text-balance md:text-5xl">
            Una visión diferente de la tecnología.
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-8 md:pl-10">
          <p className="max-w-md text-sm leading-relaxed text-foreground/80">
            En BuyTevora creemos que la tecnología puede ser más que funcional. Es una herramienta para vivir mejor,
            crear más y conectar con lo que te importa. Por eso hemos creado tiendas donde descubrir, probar y elegir
            con calma, acompañado de expertos.
          </p>
          <div>
            <Cta href="#apertura" variant="link">
              Descubre nuestra historia
            </Cta>
          </div>
        </div>
      </div>
    </section>
  )
}
