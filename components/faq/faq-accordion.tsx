'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

const categories = [
  {
    label: 'La apertura',
    questions: [
      ['¿Cuándo abre BuyTevora?', 'Abrimos nuestras puertas el 15 de octubre de 2026 a las 10:00. Te esperamos en nuestra nueva tienda física y también online.'],
      ['¿Dónde estará la tienda?', 'Muy pronto compartiremos todos los detalles sobre nuestra ubicación. Apúntate a nuestras novedades para ser la primera persona en saberlo.'],
    ],
  },
  {
    label: 'Pedidos y envíos',
    questions: [
      ['¿Puedo comprar online?', 'Sí. Nuestra tienda online estará disponible desde el día de la apertura, el 15 de octubre.'],
      ['¿Cuánto tardará mi pedido?', 'Los pedidos se preparan con cuidado y se entregan normalmente en 24–72 horas laborables, según destino.'],
      ['¿A qué lugares enviáis?', 'Enviamos a toda España peninsular y Baleares. Consulta las opciones disponibles al finalizar tu compra.'],
    ],
  },
  {
    label: 'Productos y garantías',
    questions: [
      ['¿Qué marcas encontraré?', 'Seleccionamos tecnología que combina diseño, rendimiento y utilidad: portátiles, tablets, audio, smartphones y accesorios.'],
      ['¿Qué garantía tienen los productos?', 'Todos nuestros productos cuentan con la garantía oficial correspondiente y nuestro equipo te acompaña si necesitas ayuda.'],
    ],
  },
  {
    label: 'Devoluciones',
    questions: [
      ['¿Puedo devolver un producto?', 'Sí. Dispones de 30 días naturales para solicitar una devolución, siempre que el producto esté en perfecto estado.'],
      ['¿Cómo contacto con BuyTevora?', 'Escríbenos a hola@buytevora.com y responderemos a tu consulta lo antes posible.'],
    ],
  },
] as const

export function FaqAccordion() {
  const [open, setOpen] = useState<string | null>(categories[0].questions[0][0])

  return (
    <div className="space-y-10">
      {categories.map((category) => (
        <section key={category.label} aria-labelledby={category.label.replaceAll(' ', '-').toLowerCase()}>
          <h2 id={category.label.replaceAll(' ', '-').toLowerCase()} className="mb-2 text-[10px] uppercase tracking-[0.2em] text-primary">{category.label}</h2>
          <div className="border-t border-border">
            {category.questions.map(([question, answer]) => {
              const isOpen = open === question
              return (
                <div key={question} className="border-b border-border">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : question)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-sm text-espresso transition-colors hover:text-primary"
                  >
                    <span>{question}</span>
                    {isOpen ? <Minus className="size-4 shrink-0 text-primary" strokeWidth={1.5} /> : <Plus className="size-4 shrink-0 text-primary" strokeWidth={1.5} />}
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ease-elegant ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-5 pr-8 text-sm leading-7 text-muted-foreground">{answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
