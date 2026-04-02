"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, CheckCircle } from "lucide-react";
import { ShaderAnimation } from "@/components/ShaderAnimation";

const stats = [
  { value: "50+", label: "Büyüyen Marka" },
  { value: "₺10M+", label: "Yönetilen Ad Spend" },
  { value: "6.4x", label: "En Yüksek ROAS" },
];

const proof = [
  "İlk görüşme ücretsiz",
  "Sözleşmesiz başlangıç",
  "Haftalık raporlama",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <ShaderAnimation />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            Türkiye&apos;nin E-ticaret Odaklı Büyüme Ajansı
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          <span className="text-white">Reklam Değil,</span>
          <br />
          <span className="bg-gradient-to-r from-brand via-violet-400 to-brand/70 bg-clip-text text-transparent">
            Gerçek Büyüme
          </span>
          <br />
          <span className="text-white/90">Sağlıyoruz</span>
        </motion.h1>

        <motion.p
          className="text-white/55 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        >
          Meta & Google Ads'den Shopify geliştirmeye, marketplace yönetiminden
          içerik üretimine kadar — e-ticaret markanız için tek stratejik iş ortağı.
        </motion.p>

        {/* Micro trust signals */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {proof.map((p) => (
            <span key={p} className="flex items-center gap-1.5 text-sm text-white/50">
              <CheckCircle size={13} className="text-brand shrink-0" />
              {p}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
        >
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand text-white font-semibold hover:bg-brand/90 transition-all duration-200 hover:shadow-xl hover:shadow-brand/40 hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto justify-center"
          >
            Ücretsiz Büyüme Analizi Al
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 text-white/75 font-medium hover:border-brand/50 hover:text-white hover:bg-white/5 transition-all duration-200 backdrop-blur-sm cursor-pointer w-full sm:w-auto justify-center"
          >
            Sonuçlarımızı İncele
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="px-10 py-4 sm:py-2 text-center">
              <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Keşfet</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
