import { useEffect, useRef, type FormEvent } from "react";
import Hls from "hls.js";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "5491100000000";

const videos = {
  hero: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4",
  mission: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4",
  solution: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4",
  cta: "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8",
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const platformCards = [
  {
    icon: "/icon-instagram.png",
    title: "Instagram que agenda",
    description: "Transformá visitas al perfil y mensajes de DM en reservas claras, servicios elegidos y contactos listos para volver.",
  },
  {
    icon: "/icon-whatsapp.png",
    title: "WhatsApp sin caos",
    description: "Centralizá consultas, recordatorios y confirmaciones para que tu equipo no dependa de capturas ni memoria.",
  },
  {
    icon: "/icon-google.png",
    title: "Google que convierte",
    description: "Mostrá horarios, ubicación, servicios y confianza profesional cuando una clienta busca un salón cerca.",
  },
];

const features = [
  {
    title: "Turnero online",
    description: "Reservas 24/7 por servicio, profesional, duración y disponibilidad real del salón.",
  },
  {
    title: "CRM de clientas",
    description: "Historial, preferencias, visitas, notas internas y segmentación para aumentar la recurrencia.",
  },
  {
    title: "Equipo y servicios",
    description: "Panel para gestionar estilistas, horarios, precios, tratamientos y carga operativa.",
  },
  {
    title: "WhatsApp y recordatorios",
    description: "Confirmaciones, avisos previos y contacto directo para reducir ausencias y responder más rápido.",
  },
];

function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="grid h-7 w-7 place-items-center rounded-full border-2 border-foreground/60">
        <div className="h-3 w-3 rounded-full border border-foreground/60" />
      </div>
      <span className="text-base font-bold tracking-tight md:text-lg">MYMS Salon</span>
    </div>
  );
}

function Navbar() {
  const navLinks = ["Inicio", "Turnos", "Clientes", "Casos"];
  const hrefs = ["#home", "#turnos", "#clientes", "#casos"];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full px-6 py-4 md:px-28">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <a href="#home" aria-label="Ir al inicio">
          <Logo />
        </a>

        <div className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
          {navLinks.map((link, index) => (
            <div key={link} className="flex items-center gap-4">
              <a href={hrefs[index]} className="transition-colors hover:text-foreground">
                {link}
              </a>
              {index < navLinks.length - 1 ? <span className="text-muted-foreground/60">•</span> : null}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {[
            { icon: Instagram, label: "Instagram" },
            { icon: Linkedin, label: "LinkedIn" },
            { icon: Twitter, label: "Twitter" },
          ].map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#contacto"
              aria-label={label}
              className="liquid-glass grid h-10 w-10 place-items-center rounded-full text-foreground/80 transition-colors hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function DemoForm({ compact = false }: { compact?: boolean }) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const contact = String(formData.get("contact") || "").trim();
    const message = `Hola MYMS, quiero una demo para mi salón de belleza. Mi contacto es: ${contact || "no indicado"}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "liquid-glass mx-auto flex w-full max-w-lg items-center rounded-full p-2",
        compact && "max-w-md",
      )}
    >
      <Input
        name="contact"
        type="text"
        autoComplete="email"
        placeholder="Tu WhatsApp o email"
        className="h-12 flex-1 rounded-full px-5 text-base"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="rounded-full bg-foreground px-6 py-3 text-xs font-semibold tracking-[1.5px] text-background transition hover:bg-foreground/90 md:px-8"
      >
        DEMO
      </motion.button>
    </form>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-background">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videos.hero}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-64 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-28 text-center md:px-28 md:pt-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            {...fadeUp(0)}
            className="mb-7 flex flex-wrap items-center justify-center gap-4"
          >
            <div className="flex -space-x-2">
              {["/avatar-1.png", "/avatar-2.png", "/avatar-3.png"].map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-8 w-8 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">120+ salones listos para vender más organizado</span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="mx-auto mb-6 max-w-5xl text-5xl font-medium tracking-[-2px] md:text-7xl lg:text-8xl"
          >
            Agenda <span className="font-serif italic font-normal">llena</span> sin perder el control
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mx-auto mb-9 max-w-2xl text-lg leading-8 text-[hsl(var(--hero-subtitle))]"
          >
            Landing, turnero online, CRM de clientas, WhatsApp y panel de gestión para que tu salón se vea premium,
            responda mejor y convierta más consultas en reservas.
          </motion.p>

          <motion.div {...fadeUp(0.3)}>
            <DemoForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section id="turnos" className="px-6 pt-52 pb-9 md:px-28 md:pt-64">
      <motion.div {...fadeUp(0)} className="mx-auto max-w-5xl text-center">
        <h2 className="mb-6 text-5xl font-medium tracking-[-2px] md:text-7xl lg:text-8xl">
          Reservar cambió. <span className="font-serif italic font-normal">¿Tu salón?</span>
        </h2>
        <p className="mx-auto mb-24 max-w-2xl text-lg leading-8 text-muted-foreground">
          Tus clientas llegan desde Instagram, Google, WhatsApp y recomendaciones. MYMS convierte esa atención dispersa
          en una experiencia simple: ven, confían, reservan y vuelven.
        </p>
      </motion.div>

      <div className="mx-auto mb-20 grid max-w-6xl gap-12 md:grid-cols-3 md:gap-8">
        {platformCards.map((card, index) => (
          <motion.article key={card.title} {...fadeUp(index * 0.12)} className="text-center">
            <div className="mx-auto mb-8 grid h-[200px] w-[200px] place-items-center">
              <img src={card.icon} alt="" className="h-[200px] w-[200px] object-contain" />
            </div>
            <h3 className="mb-3 text-base font-semibold">{card.title}</h3>
            <p className="mx-auto max-w-xs text-sm leading-6 text-muted-foreground">{card.description}</p>
          </motion.article>
        ))}
      </div>

      <motion.p {...fadeUp(0.15)} className="text-center text-sm text-muted-foreground">
        Si una clienta no puede reservar fácil, otro salón se queda con ese turno.
      </motion.p>
    </section>
  );
}

function RevealWord({
  children,
  progress,
  index,
  total,
  rangeStart,
  rangeEnd,
  highlighted,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
  rangeStart: number;
  rangeEnd: number;
  highlighted: boolean;
}) {
  const segment = rangeEnd - rangeStart;
  const wordStart = rangeStart + (index / Math.max(total, 1)) * segment;
  const wordEnd = Math.min(wordStart + segment / Math.max(total / 2.5, 1), 1);
  const opacity = useTransform(progress, [wordStart, wordEnd], [0.15, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={cn(highlighted ? "text-foreground" : "text-[hsl(var(--hero-subtitle))]")}
    >
      {children}{" "}
    </motion.span>
  );
}

function normalizeWord(word: string) {
  return word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,;:—–!?¿¡()]/g, "");
}

function WordRevealParagraph({
  text,
  highlights,
  progress,
  className,
  rangeStart,
  rangeEnd,
}: {
  text: string;
  highlights: string[];
  progress: MotionValue<number>;
  className: string;
  rangeStart: number;
  rangeEnd: number;
}) {
  const words = text.split(" ");
  const normalizedHighlights = highlights.map(normalizeWord);

  return (
    <p className={className}>
      {words.map((word, index) => (
        <RevealWord
          key={`${word}-${index}`}
          progress={progress}
          index={index}
          total={words.length}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          highlighted={normalizedHighlights.includes(normalizeWord(word))}
        >
          {word}
        </RevealWord>
      ))}
    </p>
  );
}

function MissionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });

  return (
    <section id="clientes" ref={sectionRef} className="px-6 pt-0 pb-32 md:px-28 md:pb-44">
      <motion.div {...fadeUp(0)} className="mx-auto grid max-w-[800px] place-items-center">
        <video
          className="video-mask-soft aspect-square w-full max-w-[800px] object-cover"
          src={videos.mission}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
      </motion.div>

      <div className="mx-auto mt-10 max-w-5xl text-center">
        <WordRevealParagraph
          progress={scrollYProgress}
          rangeStart={0.05}
          rangeEnd={0.68}
          highlights={["confianza", "agenda", "profesional"]}
          className="text-2xl font-medium leading-tight tracking-[-1px] md:text-4xl lg:text-5xl"
          text="Estamos creando un sistema donde la confianza se ve desde el primer click, la agenda se ordena sin perseguir mensajes y cada clienta vive una experiencia profesional antes de sentarse en el sillón."
        />

        <WordRevealParagraph
          progress={scrollYProgress}
          rangeStart={0.48}
          rangeEnd={1}
          highlights={["equipo", "recurrencia", "crecimiento"]}
          className="mt-10 text-xl font-medium leading-tight tracking-[-0.5px] md:text-2xl lg:text-3xl"
          text="Un espacio donde servicios, equipo, datos y recurrencia fluyen juntos, con menos ruido operativo y más crecimiento para el salón."
        />
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section id="casos" className="border-t border-border/30 px-6 py-32 md:px-28 md:py-44">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp(0)} className="mb-12 text-center">
          <p className="mb-5 text-xs uppercase tracking-[3px] text-muted-foreground">SOLUCIÓN</p>
          <h2 className="mx-auto max-w-4xl text-4xl font-medium tracking-[-1.5px] md:text-6xl">
            El sistema para salones que venden <span className="font-serif italic font-normal">belleza</span>
          </h2>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="mb-14 overflow-hidden rounded-2xl border border-border/30">
          <video
            className="aspect-[3/1] w-full object-cover"
            src={videos.solution}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-4">
          {features.map((feature, index) => (
            <motion.article key={feature.title} {...fadeUp(index * 0.1)}>
              <h3 className="mb-3 text-base font-semibold">{feature.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HlsBackgroundVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 z-0 h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
    />
  );
}

function CTASection() {
  return (
    <section id="contacto" className="relative overflow-hidden border-t border-border/30 px-6 py-32 md:px-28 md:py-44">
      <HlsBackgroundVideo src={videos.cta} />
      <div className="absolute inset-0 z-[1] bg-background/45" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div {...fadeUp(0)} className="mb-7 flex justify-center">
          <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-foreground/70">
            <div className="h-5 w-5 rounded-full border border-foreground/70" />
          </div>
        </motion.div>

        <motion.h2 {...fadeUp(0.1)} className="mb-6 text-5xl font-medium tracking-[-2px] md:text-7xl">
          Llená tu <span className="font-serif italic font-normal">agenda</span>
        </motion.h2>

        <motion.p {...fadeUp(0.2)} className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-muted-foreground">
          Convertí tu salón en una experiencia digital confiable: reservas fáciles, seguimiento de clientas y un panel que
          te muestra qué está funcionando.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola MYMS, quiero una demo para mi salón de belleza.")}`}
              target="_blank"
              rel="noreferrer"
            >
              Solicitar demo
            </a>
          </Button>
          <Button asChild variant="glass" size="lg" className="border border-white/20">
            <a href="#turnos">Ver solución</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col gap-6 px-8 py-12 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-28">
      <p>© 2026 MYMS Salon. Todos los derechos reservados.</p>
      <div className="flex gap-6">
        <a href="#home" className="transition-colors hover:text-foreground">
          Privacidad
        </a>
        <a href="#home" className="transition-colors hover:text-foreground">
          Términos
        </a>
        <a href="#contacto" className="transition-colors hover:text-foreground">
          Contacto
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <PlatformSection />
      <MissionSection />
      <SolutionSection />
      <CTASection />
      <Footer />
      <div className="noise-layer" />
    </main>
  );
}
