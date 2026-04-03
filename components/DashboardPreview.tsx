"use client";

import { motion } from "framer-motion";
import { Activity, RefreshCw, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import DashboardMockup from "./DashboardMockup";

const features = [
  { icon: Activity, text: "Canlı veri takibi" },
  { icon: RefreshCw, text: "Günlük performans analizi" },
  { icon: Eye, text: "Şeffaf raporlama" },
];

export default function DashboardPreview() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 bg-muted/40">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold text-brand tracking-[0.2em] uppercase mb-3">Müşteri Paneli</p>
          <h2 className="text-[clamp(24px,4vw,40px)] font-bold text-foreground mb-4">
            Tüm veriler tek panelde
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Reklam performansınızı gerçek zamanlı olarak izleyin.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-[560px] mx-auto"
        >
          <DashboardMockup />
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {features.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <div className="w-8 h-8 rounded-lg bg-brand/8 border border-brand/10 flex items-center justify-center shrink-0">
                <Icon size={14} className="text-brand" />
              </div>
              {text}
            </div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand/90 transition-all duration-200 shadow-sm hover:-translate-y-0.5"
          >
            Dashboard&apos;u İncele
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
