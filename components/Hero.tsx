"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ---------- Animated Counter ---------- */
function Counter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const duration = 1600;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [inView, end]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ---------- Stats ---------- */
const stats = [
  { value: 50, suffix: "+", label: "Büyüyen Marka" },
  { value: 64, suffix: "x", prefix: "6.", label: "Ortalama ROAS" },
  { value: 10, suffix: "M+ ₺", label: "Yönetilen Bütçe" },
  { value: 54, suffix: "%", label: "Ortalama CPA Düşüşü" },
];

/* ---------- Word stagger ---------- */
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#050505]">
      {/* ── Animated blob background (desktop only) ── */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden>
        <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[130px] animate-blob1" />
        <div className="absolute top-[25%] right-[8%] w-[420px] h-[420px] rounded-full bg-cyan-500/12 blur-[100px] animate-blob2" />
        <div className="absolute bottom-[10%] left-[40%] w-[380px] h-[380px] rounded-full bg-purple-800/15 blur-[120px] animate-blob3" />
      </div>

      {/* Mobile: simpler gradient */}
      <div className="absolute inset-0 pointer-events-none lg:hidden" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-violet-600/20 blur-[80px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      {/* ── Content ── */}
      <div className="relative flex-1 flex flex-col justify-center pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto w-full text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/10 text-violet-300 text-xs font-medium tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              E-ticaret Büyüme Ajansı
            </span>
          </motion.div>

          {/* Headline — word-by-word stagger */}
          <h1 className="text-[40px] sm:text-[56px] lg:text-[80px] xl:text-[96px] font-bold leading-[1.06] tracking-[-0.03em] text-white mb-8 overflow-hidden">
            <span className="block">
              {["E-ticaret", "Markanız", "İçin"].map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-[0.25em] last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block">
              <motion.span
                custom={3}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-[0.25em] gradient-text-shimmer"
              >
                360°
              </motion.span>
              <motion.span
                custom={4}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-[0.25em] gradient-text-shimmer"
              >
                Dijital
              </motion.span>
              <motion.span
                custom={5}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block gradient-text-shimmer"
              >
                Büyüme
              </motion.span>
            </span>
          </h1>

          {/* Subheadline */}
          <motion.p
            className="text-[18px] lg:text-[22px] text-[#888899] leading-relaxed max-w-[640px] mx-auto mb-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            Google & Meta Ads, sosyal medya ve kreatif optimizasyon ile
            e-ticaret satışlarınızı ölçülebilir biçimde artırıyoruz.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center mb-20"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/iletisim"
              className="relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 glow-pulse overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #C084FC)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Ücretsiz Reklam Analizi Al
                <ArrowRight size={16} />
              </span>
              {/* Ripple layer */}
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </Link>

            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-medium text-white/70 transition-all duration-200 hover:text-white hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Nasıl Çalışır?
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 max-w-[800px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            {stats.map((s, i) => (
              <div key={s.label} className={`text-center ${i < stats.length - 1 ? "lg:border-r lg:border-white/8" : ""}`}>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1 tabular-nums"
                  style={{ textShadow: "0 0 30px rgba(124,58,237,0.5)" }}
                >
                  <Counter end={s.value} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <div className="text-xs text-[#888899]">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="relative flex flex-col items-center gap-2 pb-10 text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Keşfet</span>
        <ChevronDown size={18} className="animate-bounce-slow" />
      </motion.div>
    </section>
  );
}
