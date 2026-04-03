"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="relative py-32 px-4 sm:px-6 overflow-hidden" style={{ background: "#050505" }}>
      {/* Gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none animate-blob1" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-cyan-500/8 blur-[80px] pointer-events-none animate-blob2" />

      <div className="relative max-w-[760px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase text-violet-300"
            style={{ border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.1)" }}>
            Harekete Geçin
          </span>

          <h2 className="text-[clamp(32px,6vw,64px)] font-bold text-white mb-6 leading-[1.08] tracking-tight">
            İşinizi veriyle
            <br />
            <span className="gradient-text-shimmer">büyütmeye hazır mısınız?</span>
          </h2>

          <p className="text-[#888899] mb-12 text-lg max-w-lg mx-auto leading-relaxed">
            Ücretsiz 30 dakikalık büyüme analizi için hemen iletişime geçin.
          </p>

          {/* CTA Button — glow pulse */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/iletisim"
              className="relative inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl text-base font-semibold text-white transition-all duration-300 hover:scale-105 group overflow-hidden glow-pulse"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #C084FC, #06B6D4)",
                backgroundSize: "200% 200%",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Ücretsiz Analiz Al
                <ArrowRight size={18} />
              </span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-2xl text-sm font-medium text-white/55 hover:text-white transition-all duration-200 hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              Süreci İncele
            </Link>
          </div>

          <p className="text-sm text-[#888899]">
            Markanı ücretsiz analiz edelim ve fırsatları ortaya çıkaralım
          </p>

          {/* Mini stats */}
          <div className="mt-16 pt-10 flex flex-wrap items-center justify-center gap-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { value: "50+", label: "Büyüyen Marka" },
              { value: "6.4x", label: "En Yüksek ROAS" },
              { value: "₺10M+", label: "Yönetilen Ad Spend" },
            ].map((p) => (
              <div key={p.label} className="text-center">
                <div className="text-2xl font-bold text-white mb-0.5">{p.value}</div>
                <div className="text-xs text-[#888899]">{p.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
