import { Boxes } from 'lucide-react'

import { useGsapReveal } from '@/components/animation/useGsapReveal'
import { Container } from '@/components/layout/container'
import { ecosystemCards } from '@/data/landing'

export function ProductEcosystemSection() {
  const ref = useGsapReveal<HTMLDivElement>()

  return (
    <section id="ecosystem" className="py-20 sm:py-28">
      <Container>
        <div ref={ref} className="rounded-[36px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="section-kicker">Product ecosystem</p>
            <h2 className="section-title">No vendemos una web suelta. Diseñamos un sistema comercial modular.</h2>
            <p className="section-copy">
              Cada pack responde a una etapa concreta del negocio: confianza, reservas, seguimiento comercial o
              conversión local.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ecosystemCards.map((card) => (
              <article key={card.title} className="feature-card min-h-[15rem]">
                <Boxes className="h-5 w-5 text-primary-soft" />
                <h3 className="mt-6 text-2xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
