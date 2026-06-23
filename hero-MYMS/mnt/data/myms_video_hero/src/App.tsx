import { ReactNode, useEffect, useMemo, useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4';

type HeroCopy = {
  brand: string;
  nav: string[];
  heading: string;
  subheading: string;
  primaryCta: string;
  secondaryCta: string;
  tag: string;
};

const MYMS_COPY: HeroCopy = {
  brand: 'MYMS',
  nav: ['Presencia', 'Turnos', 'Ventas', 'Locales'],
  heading: 'Productos digitales\nque venden por vos.',
  subheading:
    'Creamos landings, CRM, turneros, paneles y tarjetas digitales para negocios que quieren más reach, confianza y orden comercial.',
  primaryCta: 'Start a Chat',
  secondaryCta: 'Explore Now',
  tag: 'Landing. CRM. Turneros.'
};

const VEX_REFERENCE_COPY: HeroCopy = {
  brand: 'VEX',
  nav: ['Story', 'Investing', 'Building', 'Advisory'],
  heading: 'Shaping tomorrow\nwith vision and action.',
  subheading: 'We back visionaries and craft ventures that define what comes next.',
  primaryCta: 'Start a Chat',
  secondaryCta: 'Explore Now',
  tag: 'Investing. Building. Advisory.'
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

function FadeIn({ children, delay = 0, duration = 1000, className }: FadeInProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn('transition-opacity', visible ? 'opacity-100' : 'opacity-0', className)}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

type AnimatedHeadingProps = {
  text: string;
  className?: string;
  initialDelay?: number;
  charDelay?: number;
  duration?: number;
};

function AnimatedHeading({
  text,
  className,
  initialDelay = 200,
  charDelay = 30,
  duration = 500
}: AnimatedHeadingProps) {
  const [visible, setVisible] = useState(false);
  const lines = useMemo(() => text.split('\n'), [text]);

  useEffect(() => {
    setVisible(false);
    const timer = window.setTimeout(() => setVisible(true), initialDelay);
    return () => window.clearTimeout(timer);
  }, [text, initialDelay]);

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => {
        const lineLength = line.length;

        return (
          <span key={`${line}-${lineIndex}`} className="block">
            {Array.from(line).map((char, charIndex) => {
              const transitionDelay = lineIndex * lineLength * charDelay + charIndex * charDelay;

              return (
                <span
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${char}-${charIndex}`}
                  className="inline-block will-change-transform"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-18px)',
                    transitionProperty: 'opacity, transform',
                    transitionDuration: `${duration}ms`,
                    transitionDelay: `${transitionDelay}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.2, 0.7, 0.2, 1)'
                  }}
                  aria-hidden="true"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </span>
        );
      })}
      <span className="sr-only">{text.replace('\n', ' ')}</span>
    </h1>
  );
}

function useHeroCopy() {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('variant') === 'vex' ? VEX_REFERENCE_COPY : MYMS_COPY;
  }, []);
}

export default function App() {
  const copy = useHeroCopy();

  return (
    <main className="relative min-h-screen overflow-hidden bg-black font-sans text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="px-6 pt-6 md:px-12 lg:px-16">
          <nav className="liquid-glass flex items-center justify-between rounded-xl px-4 py-2">
            <a href="/" className="text-2xl font-semibold tracking-tight text-white" aria-label="MYMS home">
              {copy.brand}
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {copy.nav.map((item) => (
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  key={item}
                  className="text-sm text-white transition-colors duration-300 hover:text-gray-300"
                >
                  {item}
                </a>
              ))}
            </div>

            <a
              href="https://wa.me/5491100000000?text=Hola%20MYMS%2C%20quiero%20crear%20mi%20sistema%20digital%20comercial."
              className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition-colors duration-300 hover:bg-gray-100"
            >
              Start a Chat
            </a>
          </nav>
        </header>

        <section className="flex flex-1 flex-col justify-end px-6 pb-12 md:px-12 lg:px-16 lg:pb-16">
          <div className="gap-10 lg:grid lg:grid-cols-2 lg:items-end">
            <div className="max-w-4xl">
              <AnimatedHeading
                text={copy.heading}
                className="mb-4 text-4xl font-normal leading-[0.95] text-white md:text-5xl lg:text-6xl xl:text-7xl"
              />

              <FadeIn delay={800} duration={1000}>
                <p className="mb-5 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
                  {copy.subheading}
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000} className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/5491100000000?text=Hola%20MYMS%2C%20quiero%20crear%20mi%20sistema%20digital%20comercial."
                  className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors duration-300 hover:bg-gray-100"
                >
                  {copy.primaryCta}
                </a>
                <a
                  href="#explore"
                  className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-white hover:text-black"
                >
                  {copy.secondaryCta}
                </a>
              </FadeIn>
            </div>

            <FadeIn delay={1400} duration={1000} className="mt-10 flex items-end justify-start lg:mt-0 lg:justify-end">
              <div className="liquid-glass rounded-xl border border-white/20 px-6 py-3">
                <p className="text-lg font-light text-white md:text-xl lg:text-2xl">{copy.tag}</p>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </main>
  );
}
