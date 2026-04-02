import Hero from "@/components/Hero";
import KpiSnapshot from "@/components/KpiSnapshot";
import DashboardPreview from "@/components/DashboardPreview";
import Process from "@/components/Process";
import DataPositioning from "@/components/DataPositioning";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <KpiSnapshot />
      <DashboardPreview />
      <Process />
      <DataPositioning />
      <CaseStudies />
      <Testimonials />
      <CtaSection />
    </main>
  );
}
