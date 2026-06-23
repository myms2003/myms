import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

gsap.registerPlugin(ScrollTrigger)

type RevealOptions = {
  y?: number
  delay?: number
  scrub?: boolean
  start?: string
}

export function useGsapReveal<T extends HTMLElement>({
  y = 28,
  delay = 0,
  scrub = false,
  start = 'top 84%',
}: RevealOptions = {}) {
  const ref = useRef<T | null>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!ref.current) {
      return
    }

    if (reducedMotion) {
      gsap.set(ref.current, { autoAlpha: 1, y: 0 })
      return
    }

    const element = ref.current
    const animation = gsap.fromTo(
      element,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start,
          scrub,
        },
      },
    )

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [delay, reducedMotion, scrub, start, y])

  return ref
}
