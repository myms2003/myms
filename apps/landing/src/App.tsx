import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { FaqSection } from '@/components/sections/FaqSection'
import { FinalCtaSection } from '@/components/sections/FinalCtaSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { IndustriesSection } from '@/components/sections/IndustriesSection'
import { LogoAnimationShowcase } from '@/components/sections/LogoAnimationShowcase'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ProductEcosystemSection } from '@/components/sections/ProductEcosystemSection'
import { ProductPackSection } from '@/components/sections/ProductPackSection'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { productPacks } from '@/data/landing'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <ProductEcosystemSection />
        {productPacks.map((pack, index) => (
          <ProductPackSection key={pack.id} {...pack} inverted={index % 2 === 1} />
        ))}
        <LogoAnimationShowcase />
        <ProcessSection />
        <IndustriesSection />
        <SocialProofSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
