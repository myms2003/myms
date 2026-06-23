import { Container } from '@/components/layout/container'
import { siteConfig } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-white/6 py-10">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.24em] text-white">MYMS</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Sistemas digitales comerciales para negocios reales. Más confianza, más consultas, más orden.
          </p>
        </div>
        <div className="text-sm text-muted">
          <p>{siteConfig.instagramHandle}</p>
          <p className="mt-1">Landing. Turnos. CRM. WhatsApp. Panel.</p>
        </div>
      </Container>
    </footer>
  )
}
