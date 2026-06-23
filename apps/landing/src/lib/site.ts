export const siteConfig = {
  name: 'MYMS',
  title: 'MYMS | Convertí tu negocio en un sistema digital',
  description:
    'MYMS convierte negocios locales y profesionales independientes en sistemas digitales que generan confianza, consultas, turnos y ventas.',
  url: 'https://usemyms.com',
  whatsappNumber: '5491100000000',
  instagramHandle: '@usemyms',
}

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}
