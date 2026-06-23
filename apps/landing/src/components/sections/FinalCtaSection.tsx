import { ArrowRight } from 'lucide-react'

import { ContactForm } from '@/components/forms/contact-form'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

export function FinalCtaSection() {
  return (
    <section id="final-cta" className="py-20 sm:py-28">
      <Container>
        <div className="rounded-[36px] border border-primary/20 bg-[linear-gradient(145deg,rgba(45,127,249,0.18),rgba(5,10,18,0.92))] p-6 shadow-glow sm:p-8 lg:p-12">
          <p className="section-kicker text-primary-soft">Final CTA</p>
          <h2 className="section-title max-w-4xl">Una web no es decoración. Es confianza. Y sin sistema, la confianza no escala.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#d5deeb]">
            MYMS convierte tráfico, referrals y mensajes dispersos en una estructura comercial clara para consultar,
            reservar, cotizar y vender mejor.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#interactive-demo">
                Ver demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="mt-8">
            <ContactForm compact />
          </div>
        </div>
      </Container>
    </section>
  )
}
