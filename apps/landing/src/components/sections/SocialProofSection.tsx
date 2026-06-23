import { credibilityItems, proofStats } from '@/data/landing'
import { useGsapCounter } from '@/components/animation/useGsapCounter'
import { useGsapReveal } from '@/components/animation/useGsapReveal'
import { Container } from '@/components/layout/container'

function CounterCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const counterRef = useGsapCounter(value)

  return (
    <article className="feature-card">
      <p className="text-4xl font-semibold tracking-[-0.06em] text-white">
        <span ref={counterRef}>0</span>
        {suffix}
      </p>
      <p className="mt-3 text-sm leading-6 text-muted">{label}</p>
    </article>
  )
}

export function SocialProofSection() {
  const ref = useGsapReveal<HTMLDivElement>()

  return (
    <section id="credibility" className="py-20 sm:py-28">
      <Container>
        <div ref={ref}>
          <p className="section-kicker">Credibilidad temprana</p>
          <h2 className="section-title">MYMS nace con una lógica clara: digitalizar el proceso comercial, no decorar negocios.</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {proofStats.map((item) => (
              <CounterCard key={item.label} {...item} />
            ))}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {credibilityItems.map((item) => (
              <article key={item.title} className="feature-card">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
