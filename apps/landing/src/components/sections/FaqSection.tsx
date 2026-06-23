import { faqItems } from '@/data/landing'
import { useGsapReveal } from '@/components/animation/useGsapReveal'
import { Container } from '@/components/layout/container'

export function FaqSection() {
  const ref = useGsapReveal<HTMLDivElement>()

  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container>
        <div ref={ref} className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="section-kicker">FAQ</p>
            <h2 className="section-title">Preguntas que aparecen cuando un negocio deja de pensar en “una web” y empieza a pensar en sistema.</h2>
          </div>
          <div className="grid gap-4">
            {faqItems.map((item) => (
              <article key={item.question} className="feature-card">
                <h3 className="text-xl font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
