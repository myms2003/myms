import { AlertCircle } from 'lucide-react'

import { useGsapReveal } from '@/components/animation/useGsapReveal'
import { Container } from '@/components/layout/container'
import { problemPoints } from '@/data/landing'

export function ProblemSection() {
  const titleRef = useGsapReveal<HTMLDivElement>()
  const cardsRef = useGsapReveal<HTMLDivElement>({ delay: 0.08 })

  return (
    <section id="problem" className="py-20 sm:py-28">
      <Container>
        <div ref={titleRef} className="max-w-3xl">
          <p className="section-kicker">Problema</p>
          <h2 className="section-title">La mayoría vende desde canales sueltos. MYMS los convierte en estructura.</h2>
          <p className="section-copy">
            Muchos negocios locales viven entre WhatsApp, Instagram, referrals y seguimiento manual. El problema no es
            la falta de consultas. Es la falta de sistema.
          </p>
        </div>
        <div ref={cardsRef} className="mt-10 grid gap-4 md:grid-cols-3">
          {problemPoints.map((point) => (
            <article key={point} className="feature-card">
              <AlertCircle className="h-5 w-5 text-primary-soft" />
              <p className="mt-5 text-xl font-medium leading-8 text-white">{point}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
