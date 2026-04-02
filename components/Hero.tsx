"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BarChart2, CheckCircle, ChevronDown } from "lucide-react";
import { ShaderAnimation } from "@/components/ShaderAnimation";
import DashboardMockup from "@/components/DashboardMockup";
import ScrambleText from "@/components/ScrambleText";

const trust = ["İlk görüşme ücretsiz", "Sözleşmesiz başlangıç", "Haftalık raporlama"];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">
      <ShaderAnimation />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85" />
      {/* Gradient orbs — anima.ai style depth */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-brand/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[300px] rounded-full bg-brand/6 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 w-[600px] h-[200px] rounded-full bg-emerald-900/20 blur-[140px] pointer-events-none" />

      {/* Navbar spacer */}
      <div className="h-[72px] shrink-0" />

      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Sol: Metin */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                  E-ticaret Odaklı Büyüme Ajansı
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-5 text-white"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <ScrambleText text="Reklam bütçenizi" delay={300} duration={600} trigger={true} />{" "}
                <span className="bg-gradient-to-r from-brand via-violet-400 to-brand/70 bg-clip-text text-transparent">
                  <ScrambleText text="veriye dayalı" delay={500} duration={700} trigger={true} />
                </span>{" "}
                <ScrambleText text="sistemlerle büyütüyoruz" delay={700} duration={800} trigger={true} />
              </motion.h1>

              <motion.p
                className="text-white/55 text-base lg:text-lg leading-relaxed mb-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Tüm kampanyalarınızı ölçülebilir verilerle yönetiyoruz.
                Süreci anlık olarak dashboard üzerinden takip edin.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-x-5 gap-y-1.5 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {trust.map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-sm text-white/45">
                    <CheckCircle size={12} className="text-brand shrink-0" />
                    {t}
                  </span>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand text-[#0b1a12] font-semibold hover:bg-brand/90 transition-all duration-200 hover:shadow-xl hover:shadow-brand/40 hover:-translate-y-0.5"
                >
                  Ücretsiz Analiz Al
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/roadmap"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 text-white/75 font-medium hover:border-brand/50 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <BarChart2 size={16} />
                  Demo Paneli Gör
                </Link>
              </motion.div>
            </div>

            {/* Sağ: Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 32, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="hidden lg:block"
            >
              <DashboardMockup />
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-1.5 pb-8 text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-[10px] tracking-widest uppercase font-medium">Keşfet</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-brand/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
