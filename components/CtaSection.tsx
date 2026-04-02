"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

const proof = [
  { value: "50+", label: "Aktif Marka" },
  { value: "₺10M+", label: "Ad Spend" },
  { value: "%340", label: "Ort. ROAS" },
];

export default function CtaSection() {
  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Social proof stars */}
          <div className="flex items-center justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-sm text-foreground/50">50+ markanın tercihi</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight">
            Markanızı Bir Sonraki{" "}
            <span className="bg-gradient-to-r from-brand to-violet-400 bg-clip-text text-transparent">
              Seviyeye
            </span>{" "}
            Taşıyalım
          </h2>

          <p className="text-foreground/50 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
            Ücretsiz 30 dakikalık dijital pazarlama analizi için hemen iletişime geçin.
            Hızlıca büyüme fırsatlarınızı tespit edelim.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand text-white font-semibold hover:bg-brand/90 transition-all duration-200 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5 cursor-pointer"
            >
              Ücretsiz Analiz Talep Et
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/hizmetler"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground/70 font-medium hover:border-brand/40 hover:text-foreground transition-all duration-200 cursor-pointer"
            >
              Hizmetlerimizi İncele
            </Link>
          </div>

          {/* Mini stats */}
          <div className="flex items-center justify-center gap-8 pt-8 border-t border-border">
            {proof.map((p) => (
              <div key={p.label} className="text-center">
                <div className="text-xl font-bold text-foreground">{p.value}</div>
                <div className="text-xs text-foreground/40 mt-0.5">{p.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
