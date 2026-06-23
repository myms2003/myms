import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

gsap.registerPlugin(ScrollTrigger)

export function useGsapCounter(targetValue: number) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!ref.current) {
      return
    }

    if (reducedMotion) {
      ref.current.textContent = String(targetValue)
      return
    }

    const state = { value: 0 }
    const element = ref.current
    const tween = gsap.to(state, {
      value: targetValue,
      duration: 1.6,
      ease: 'power2.out',
      snap: { value: 1 },
      onUpdate: () => {
        element.textContent = String(state.value)
      },
      scrollTrigger: {
        trigger: element,
        start: 'top 92%',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion, targetValue])

  return ref
}
