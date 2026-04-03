import Hero from "@/components/Hero";
import PlatformPartners from "@/components/PlatformPartners";
import DataBlock from "@/components/DataBlock";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <PlatformPartners />
      <DataBlock />
      <Services />
      <Process />
      <CaseStudies />
      <WhyUs />
      <Testimonials />
      <CtaSection />
    </main>
  );
}
