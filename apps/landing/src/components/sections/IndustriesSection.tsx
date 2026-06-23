import { industries } from '@/data/landing'
import { useGsapReveal } from '@/components/animation/useGsapReveal'
import { Container } from '@/components/layout/container'

export function IndustriesSection() {
  const ref = useGsapReveal<HTMLDivElement>()

  return (
    <section id="industries" className="py-20 sm:py-28">
      <Container>
        <div ref={ref} className="rounded-[36px] border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:p-10">
          <p className="section-kicker">Industrias</p>
          <h2 className="section-title max-w-4xl">MYMS está pensado para negocios que venden confianza, tiempo, atención o seguimiento.</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            {industries.map((industry) => (
              <span key={industry} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/84">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
