import { Cta } from './shared'

export function CtaBand() {
  return (
    <section id="contacto" className="scroll-mt-10 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-16">
        <h2 className="max-w-md font-serif text-3xl leading-tight text-balance md:text-4xl">
          ¿Listo para vivir la tecnología de una forma diferente? Te esperamos el 15 de octubre.
        </h2>
        <Cta href="#apertura" variant="light">
          Explora BuyTevora
        </Cta>
      </div>
    </section>
  )
}
