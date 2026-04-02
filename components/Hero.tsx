"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, ChevronDown, Play } from "lucide-react";
import { ShaderAnimation } from "@/components/ShaderAnimation";
import DashboardMockup from "@/components/DashboardMockup";
import ScrambleText from "@/components/ScrambleText";

const trust = ["İlk görüşme ücretsiz", "Sözleşmesiz başlangıç", "Haftalık raporlama"];

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function MetaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" fill="#1877F2"/>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">
      <ShaderAnimation />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85" />
      {/* Gradient orbs */}
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
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight mb-5 text-white"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <ScrambleText text="Reklam bütçenizi" delay={300} duration={600} trigger={true} />{" "}
                <span className="bg-gradient-to-r from-brand to-emerald-400 bg-clip-text text-transparent">
                  <ScrambleText text="6.4x ROAS'a" delay={500} duration={700} trigger={true} />
                </span>{" "}
                <ScrambleText text="taşıyoruz" delay={800} duration={500} trigger={true} />
              </motion.h1>

              <motion.p
                className="text-white/60 text-base lg:text-lg font-light leading-relaxed mb-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                50+ Türk e-ticaret markasının Meta & Google Ads, Trendyol ve
                Shopify kampanyalarını yönettik. Ölçülebilir sonuçlar, tam şeffaflık.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-x-5 gap-y-1.5 mb-5"
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

              {/* Partner badges */}
              <motion.div
                className="flex items-center gap-2.5 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.38 }}
              >
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                  <GoogleIcon />
                  <span className="text-[11px] text-white/50 font-medium">Google Partner</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                  <MetaIcon />
                  <span className="text-[11px] text-white/50 font-medium">Meta Business Partner</span>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
              >
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand text-[#0b1a12] font-semibold hover:bg-brand/90 transition-all duration-200 hover:shadow-xl hover:shadow-brand/40 hover:-translate-y-0.5"
                >
                  Ücretsiz Büyüme Analizi Al
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/roadmap"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 text-white/75 font-medium hover:border-brand/50 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <Play size={14} />
                  Nasıl Çalışır?
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
