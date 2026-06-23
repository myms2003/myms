import { CheckCircle2 } from 'lucide-react'

import { useGsapReveal } from '@/components/animation/useGsapReveal'
import { Container } from '@/components/layout/container'
import { cn } from '@/lib/utils'

type ProductPackSectionProps = {
  id: string
  eyebrow: string
  headline: string
  audience: string
  solvedProblem: string
  features: string[]
  inverted?: boolean
}

export function ProductPackSection({
  id,
  eyebrow,
  headline,
  audience,
  solvedProblem,
  features,
  inverted = false,
}: ProductPackSectionProps) {
  const ref = useGsapReveal<HTMLDivElement>()

  return (
    <section id={id} className="py-20 sm:py-24">
      <Container>
        <div
          ref={ref}
          className={cn(
            'grid gap-8 rounded-[32px] border border-white/10 p-6 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10',
            inverted ? 'bg-[linear-gradient(135deg,rgba(45,127,249,0.12),rgba(255,255,255,0.03))]' : 'bg-white/[0.02]',
          )}
        >
          <div>
            <p className="section-kicker">{eyebrow}</p>
            <h2 className="section-title max-w-xl">{headline}</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-muted">
              <p>
                <span className="text-white">Para quién:</span> {audience}
              </p>
              <p>
                <span className="text-white">Qué resuelve:</span> {solvedProblem}
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="feature-card min-h-[7rem]">
                <CheckCircle2 className="h-5 w-5 text-primary-soft" />
                <p className="mt-4 text-base leading-7 text-white">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
