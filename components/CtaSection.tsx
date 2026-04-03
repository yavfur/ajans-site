"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 bg-brand">
      <div className="max-w-[760px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-[clamp(28px,5vw,52px)] font-bold text-white mb-5 leading-tight">
            İşinizi veriyle büyütmeye hazır mısınız?
          </h2>

          <p className="text-white/70 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
            Ücretsiz 30 dakikalık büyüme analizi için hemen iletişime geçin.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-brand font-semibold hover:bg-white/95 transition-all duration-200 shadow-lg hover:-translate-y-0.5"
            >
              Ücretsiz Analiz Al
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/25 text-white font-medium hover:bg-white/10 transition-all duration-200"
            >
              Süreci İncele
            </Link>
          </div>

          <div className="flex items-center justify-center gap-10 pt-8 border-t border-white/15">
            {[
              { value: "50+", label: "Büyüyen Marka" },
              { value: "6.4x", label: "En Yüksek ROAS" },
              { value: "₺10M+", label: "Yönetilen Ad Spend" },
            ].map((p) => (
              <div key={p.label} className="text-center">
                <div className="text-2xl font-bold text-white">{p.value}</div>
                <div className="text-xs text-white/55 mt-0.5">{p.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
