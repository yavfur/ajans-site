import Hero from "@/components/Hero";
import PlatformPartners from "@/components/PlatformPartners";
import KpiSnapshot from "@/components/KpiSnapshot";
import DashboardPreview from "@/components/DashboardPreview";
import Process from "@/components/Process";
import RoasChart from "@/components/RoasChart";
import DataPositioning from "@/components/DataPositioning";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <PlatformPartners />
      <KpiSnapshot />
      <DashboardPreview />
      <Process />
      <RoasChart />
      <DataPositioning />
      <CaseStudies />
      <Testimonials />
      <CtaSection />
    </main>
  );
}
