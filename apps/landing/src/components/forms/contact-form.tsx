import type { FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { createWhatsAppUrl } from '@/lib/site'
import { cn } from '@/lib/utils'

type ContactFormProps = {
  compact?: boolean
}

export function ContactForm({ compact = false }: ContactFormProps) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const business = String(formData.get('business') ?? '').trim()
    const contact = String(formData.get('contact') ?? '').trim()
    const intent = String(formData.get('intent') ?? '').trim()

    const message = [
      'Hola MYMS, quiero convertir mi negocio en un sistema digital.',
      business ? `Negocio: ${business}.` : '',
      contact ? `Contacto: ${contact}.` : '',
      intent ? `Necesito: ${intent}.` : '',
    ]
      .filter(Boolean)
      .join(' ')

    window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        'liquid-glass flex flex-col gap-3 rounded-[28px] border border-white/10 p-3 sm:flex-row sm:items-center',
        compact && 'rounded-[24px]',
      )}
    >
      <input
        name="business"
        type="text"
        placeholder="Tu negocio"
        className="field-input"
        aria-label="Nombre del negocio"
      />
      <input
        name="contact"
        type="text"
        placeholder="WhatsApp o email"
        className="field-input"
        aria-label="WhatsApp o email"
      />
      <input
        name="intent"
        type="text"
        placeholder="Qué querés ordenar o vender mejor"
        className="field-input sm:max-w-[17rem]"
        aria-label="Necesidad principal"
      />
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Hablar por WhatsApp
      </Button>
    </form>
  )
}
