import Hero from "@/components/Hero";
import PlatformPartners from "@/components/PlatformPartners";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <PlatformPartners />
      <Services />
      <WhyUs />
      <CaseStudies />
      <Testimonials />
      <CtaSection />
    </main>
  );
}
