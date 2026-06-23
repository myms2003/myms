import { Suspense, lazy } from 'react'

import { useGsapReveal } from '@/components/animation/useGsapReveal'
import { Container } from '@/components/layout/container'

const MymsLogoScene = lazy(async () => import('@/components/three/MymsLogoScene').then((module) => ({ default: module.MymsLogoScene })))

export function LogoAnimationShowcase() {
  const ref = useGsapReveal<HTMLDivElement>()

  return (
    <section id="interactive-demo" className="py-20 sm:py-28">
      <Container>
        <div ref={ref} className="grid gap-8 rounded-[36px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
          <div className="self-center">
            <p className="section-kicker">Interactive demo</p>
            <h2 className="section-title">El sistema no se presenta como brochure. Se siente como producto.</h2>
            <p className="section-copy">
              Esta escena condensa la lógica de MYMS: presencia, turnos, CRM, WhatsApp y panel orbitando alrededor del
              núcleo comercial del negocio. También sirve como base para piezas launch-first y video exports.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-muted sm:grid-cols-2">
              <div className="feature-card">
                <p className="text-white">Three.js / R3F</p>
                <p className="mt-2 leading-6">Partículas, profundidad, parallax y módulos flotantes con fallback mobile.</p>
              </div>
              <div className="feature-card">
                <p className="text-white">GSAP</p>
                <p className="mt-2 leading-6">Entradas premium, reveals por sección y microinteracciones de bajo ruido.</p>
              </div>
            </div>
          </div>
          <div className="h-[22rem] sm:h-[28rem] lg:h-[34rem]">
            <Suspense fallback={<div className="h-full w-full rounded-[32px] bg-[radial-gradient(circle_at_center,_rgba(45,127,249,0.18),_transparent_52%)]" />}>
              <MymsLogoScene mode="showcase" />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  )
}
