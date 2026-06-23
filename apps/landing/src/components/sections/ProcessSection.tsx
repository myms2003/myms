import { processSteps } from '@/data/landing'
import { useGsapReveal } from '@/components/animation/useGsapReveal'
import { Container } from '@/components/layout/container'

export function ProcessSection() {
  const ref = useGsapReveal<HTMLDivElement>()

  return (
    <section id="process" className="py-20 sm:py-28">
      <Container>
        <div ref={ref}>
          <p className="section-kicker">Proceso</p>
          <h2 className="section-title">Del caos comercial a una operación que se puede mostrar, medir y escalar.</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="feature-card">
                <span className="text-sm text-primary-soft">0{index + 1}</span>
                <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
