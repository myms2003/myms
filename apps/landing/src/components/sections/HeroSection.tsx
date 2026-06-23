import { Suspense, lazy } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

import { ContactForm } from '@/components/forms/contact-form'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { heroModules } from '@/data/landing'
import { createWhatsAppUrl } from '@/lib/site'

const MymsLogoScene = lazy(async () => import('@/components/three/MymsLogoScene').then((module) => ({ default: module.MymsLogoScene })))

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden py-14 sm:py-18 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(45,127,249,0.22),_transparent_48%)]" />
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.18em] text-primary-soft uppercase"
          >
            Premium SaaS para negocios reales
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: 'easeOut' }}
            className="max-w-3xl text-balance text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl"
          >
            Convertí tu negocio en un sistema digital.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: 'easeOut' }}
            className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl"
          >
            Landing, turnos, CRM, WhatsApp y panel de gestión para negocios que quieren recibir más consultas, generar
            confianza y ordenar sus clientes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.24, ease: 'easeOut' }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg">
              <a href="#interactive-demo">
                Ver demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href={createWhatsAppUrl('Hola MYMS, quiero ver una demo del sistema digital para mi negocio.')}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Hablar por WhatsApp
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: 'easeOut' }}
            className="mt-10"
          >
            <ContactForm />
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-2">
            {heroModules.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-muted">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative h-[28rem] sm:h-[34rem] lg:h-[42rem]">
          <div className="absolute inset-0 rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-3 shadow-card">
            <Suspense fallback={<div className="h-full w-full rounded-[32px] bg-[radial-gradient(circle_at_center,_rgba(45,127,249,0.18),_transparent_52%)]" />}>
              <MymsLogoScene mode="hero" />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  )
}
