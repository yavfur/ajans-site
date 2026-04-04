import Hero from "@/components/Hero";
import DataReveal from "@/components/DataReveal";
import DataBlock from "@/components/DataBlock";
import PlatformPartners from "@/components/PlatformPartners";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import SceneSection from "@/components/SceneSection";

export default function Home() {
  return (
    <main>
      {/* Hero: no exit fade — it just scrolls away naturally */}
      <Hero />

      <SceneSection>
        <DataReveal />
      </SceneSection>

      <SceneSection>
        <PlatformPartners />
      </SceneSection>

      <SceneSection>
        <DataBlock />
      </SceneSection>

      <SceneSection>
        <Services />
      </SceneSection>

      <SceneSection>
        <Process />
      </SceneSection>

      <SceneSection>
        <CaseStudies />
      </SceneSection>

      <SceneSection>
        <WhyUs />
      </SceneSection>

      <SceneSection>
        <Testimonials />
      </SceneSection>

      {/* CTA: last section — no exit */}
      <SceneSection exitDisabled>
        <CtaSection />
      </SceneSection>
    </main>
  );
}
