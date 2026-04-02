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
    <section className="py-24 px-4 sm:px-6 bg-muted/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-border" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
            Müşteri Paneli
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Tüm veriler tek panelde
          </h2>
          <p className="text-foreground/50 mt-3 text-sm leading-relaxed">
            Reklam performansınızı gerçek zamanlı olarak izleyin.
          </p>
        </motion.div>

        {/* Büyük dashboard görseli */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl mx-auto"
        >
          <DashboardMockup />
        </motion.div>

        {/* 3 madde */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {features.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-sm text-foreground/60">
              <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                <Icon size={14} className="text-brand" />
              </div>
              {text}
            </div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-[#0b1a12] text-sm font-semibold hover:bg-brand/90 transition-all duration-200 hover:shadow-lg hover:shadow-brand/30 hover:-translate-y-0.5"
          >
            Dashboard&apos;u İncele
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
