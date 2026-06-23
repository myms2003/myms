import { ArrowRight, MessageCircle } from 'lucide-react'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { navItems } from '@/data/landing'
import { createWhatsAppUrl } from '@/lib/site'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-[#050A12]/70 backdrop-blur-xl">
      <Container className="flex h-18 items-center justify-between gap-6">
        <a href="#hero" className="flex items-center gap-3 text-white" aria-label="MYMS home">
          <span className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/5 shadow-glass">
            <span className="text-sm font-semibold tracking-[0.24em] text-primary-soft">M</span>
          </span>
          <span className="text-sm font-semibold tracking-[0.3em] text-white">MYMS</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-muted transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <a href="#interactive-demo">
              Ver demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href={createWhatsAppUrl('Hola MYMS, quiero ordenar mis consultas y ventas con un sistema digital.')}>
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>
      </Container>
    </header>
  )
}
