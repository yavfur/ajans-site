"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Zap, TrendingUp, ShieldCheck } from "lucide-react";
import KpiDashboard from "@/components/KpiDashboard";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Floating geometric fragments ── */
const FRAGMENTS = [
  // [x%, y%, size, opacity, animClass, shape, color]
  { x: 8,   y: 12,  s: 28, o: 0.10, a: "animate-float-slow",   shape: "triangle", c: "#7C3AED" },
  { x: 15,  y: 65,  s: 14, o: 0.08, a: "animate-float-medium", shape: "circle",   c: "#06B6D4" },
  { x: 22,  y: 38,  s: 8,  o: 0.06, a: "animate-drift",        shape: "square",   c: "#F59E0B" },
  { x: 88,  y: 18,  s: 18, o: 0.09, a: "animate-float-medium", shape: "triangle", c: "#06B6D4" },
  { x: 78,  y: 72,  s: 10, o: 0.07, a: "animate-float-slow",   shape: "circle",   c: "#7C3AED" },
  { x: 92,  y: 55,  s: 22, o: 0.08, a: "animate-drift",        shape: "hexagon",  c: "#7C3AED" },
  { x: 5,   y: 82,  s: 16, o: 0.06, a: "animate-float-fast",   shape: "square",   c: "#22C55E" },
  { x: 50,  y: 8,   s: 12, o: 0.07, a: "animate-float-medium", shape: "circle",   c: "#C084FC" },
  { x: 60,  y: 90,  s: 20, o: 0.07, a: "animate-float-slow",   shape: "triangle", c: "#22D3EE" },
  { x: 35,  y: 20,  s: 6,  o: 0.06, a: "animate-drift",        shape: "square",   c: "#C084FC" },
  { x: 72,  y: 35,  s: 9,  o: 0.05, a: "animate-float-fast",   shape: "circle",   c: "#F59E0B" },
  { x: 42,  y: 78,  s: 14, o: 0.06, a: "animate-float-medium", shape: "hexagon",  c: "#06B6D4" },
];

function FragmentShape({ shape, size, color }: { shape: string; size: number; color: string }) {
  if (shape === "circle") {
    return (
      <div style={{
        width: size, height: size, borderRadius: "50%",
        border: `1.5px solid ${color}`,
        background: `${color}10`,
      }} />
    );
  }
  if (shape === "square") {
    return (
      <div style={{
        width: size, height: size,
        border: `1.5px solid ${color}`,
        background: `${color}08`,
        transform: "rotate(45deg)",
      }} />
    );
  }
  if (shape === "triangle") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L22 20H2L12 2Z" stroke={color} strokeWidth="1.5" fill={`${color}10`} />
      </svg>
    );
  }
  if (shape === "hexagon") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke={color} strokeWidth="1.5" fill={`${color}08`} />
      </svg>
    );
  }
  return null;
}

export default function Hero() {
  return (
    <section style={{
      background: "#050505",
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* ══ BACKGROUND DEPTH LAYERS ══ */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>

        {/* Layer 1: subtle grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        {/* Layer 2: purple blob — top right, morphing */}
        <motion.div
          style={{
            position: "absolute", top: "10%", right: "5%",
            width: "600px", height: "600px",
            background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0.07) 40%, transparent 70%)",
            filter: "blur(60px)",
            borderRadius: "50%",
          }}
          animate={{ scale: [1, 1.12, 1.05, 1], x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Layer 2b: purple inner core */}
        <div style={{
          position: "absolute", top: "5%", right: "15%",
          width: "280px", height: "280px",
          background: "radial-gradient(circle, rgba(192,132,252,0.14) 0%, transparent 70%)",
          filter: "blur(30px)",
        }} />

        {/* Layer 3: cyan blob — bottom left, morphing */}
        <motion.div
          style={{
            position: "absolute", bottom: "5%", left: "-5%",
            width: "550px", height: "550px",
            background: "radial-gradient(circle, rgba(6,182,212,0.16) 0%, rgba(6,182,212,0.05) 45%, transparent 70%)",
            filter: "blur(70px)",
            borderRadius: "50%",
          }}
          animate={{ scale: [1, 1.08, 0.96, 1], x: [0, -12, 18, 0], y: [0, 12, -8, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Layer 3b: green data glow — center bottom */}
        <div style={{
          position: "absolute", bottom: "15%", left: "35%",
          width: "250px", height: "250px",
          background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />

        {/* Layer 4: center vignette — pulls edges darker */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 85% 65% at 50% 40%, rgba(5,5,5,0) 0%, rgba(5,5,5,0.7) 100%)",
        }} />

        {/* Layer 5: scan line */}
        <motion.div
          style={{
            position: "absolute", left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.5) 30%, rgba(6,182,212,0.3) 70%, transparent 100%)",
            top: 0,
          }}
          animate={{ y: ["0vh", "100vh"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
        />
      </div>

      {/* ══ FLOATING FRAGMENTS ══ */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {FRAGMENTS.map((f, i) => (
          <div
            key={i}
            className={f.a}
            style={{
              position: "absolute",
              left: `${f.x}%`,
              top: `${f.y}%`,
              opacity: f.o,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            <FragmentShape shape={f.shape} size={f.s} color={f.c} />
          </div>
        ))}
      </div>

      {/* ══ CONTENT ══ */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "100px 24px 60px",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>

          {/* Split: 40% left / 60% right */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "48px", alignItems: "center" }}
            className="hero-grid"
          >

            {/* ══ LEFT — Copy ══ */}
            <div>

              {/* System badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                style={{ marginBottom: "28px" }}
              >
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  padding: "7px 14px", borderRadius: "99px",
                  background: "rgba(124,58,237,0.1)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  fontSize: "11px", fontWeight: 700, color: "#C084FC",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  <Zap size={10} style={{ color: "#22C55E" }} />
                  Growth Operating System
                </span>
              </motion.div>

              {/* BIG Headline — staggered word reveal */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.07 } },
                }}
                style={{ marginBottom: "20px" }}
              >
                {["Performans", "Reklamlarıyla", "Satışlarını"].map((word) => (
                  <motion.span
                    key={word}
                    variants={{
                      hidden: { opacity: 0, y: 32 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
                    }}
                    style={{
                      display: "block",
                      fontSize: "clamp(42px, 5.2vw, 76px)",
                      fontWeight: 800,
                      lineHeight: 1.02,
                      letterSpacing: "-0.04em",
                      color: "#F5F5F7",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}

                {/* Gradient word */}
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 32 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
                  }}
                  style={{
                    display: "block",
                    fontSize: "clamp(42px, 5.2vw, 76px)",
                    fontWeight: 800,
                    lineHeight: 1.02,
                    letterSpacing: "-0.04em",
                    fontFamily: "var(--font-heading)",
                    background: "linear-gradient(120deg, #C084FC 0%, #7C3AED 35%, #06B6D4 70%, #22D3EE 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Ölçekle
                </motion.span>
              </motion.div>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease }}
                style={{
                  fontSize: "clamp(15px, 1.6vw, 18px)",
                  color: "#888899",
                  lineHeight: 1.7,
                  marginBottom: "32px",
                  maxWidth: "440px",
                }}
              >
                Veri odaklı reklam sistemleriyle ROAS artır,
                maliyetleri düşür, büyümeyi hızlandır.
              </motion.p>

              {/* Trust signals */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55, ease }}
                style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "36px" }}
              >
                {[
                  { icon: TrendingUp,  label: "+32% ort. ROAS artışı", color: "#22C55E" },
                  { icon: ShieldCheck, label: "Şeffaf raporlama",       color: "#06B6D4" },
                  { icon: Zap,         label: "48h içinde başla",       color: "#F59E0B" },
                ].map((t) => (
                  <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <t.icon size={12} style={{ color: t.color, flexShrink: 0 }} />
                    <span style={{ fontSize: "12px", color: "rgba(245,245,247,0.45)", fontWeight: 500 }}>
                      {t.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65, ease }}
                style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
              >
                <Link
                  href="/iletisim"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "15px 28px", borderRadius: "12px",
                    background: "#F59E0B", color: "#0A0A0F",
                    fontWeight: 700, fontSize: "15px", textDecoration: "none",
                    fontFamily: "var(--font-heading)",
                    boxShadow: "0 0 28px rgba(245,158,11,0.45), 0 0 70px rgba(245,158,11,0.18)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    position: "relative", overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05) translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 0 48px rgba(245,158,11,0.65), 0 0 120px rgba(245,158,11,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1) translateY(0)";
                    e.currentTarget.style.boxShadow = "0 0 28px rgba(245,158,11,0.45), 0 0 70px rgba(245,158,11,0.18)";
                  }}
                >
                  Reklam performansını analiz et
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/roadmap"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "15px 22px", borderRadius: "12px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    color: "#888899", fontWeight: 500, fontSize: "14px", textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#F5F5F7";
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#888899";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  Nasıl çalışır?
                </Link>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                style={{ marginTop: "36px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Stats row */}
                <div style={{ display: "flex", gap: "24px", marginBottom: "14px" }}>
                  {[
                    { v: "50+",  l: "Marka",  c: "#22C55E" },
                    { v: "6.4x", l: "ROAS",   c: "#22C55E" },
                    { v: "₺5M+", l: "Bütçe",  c: "#06B6D4" },
                    { v: "%40",  l: "CPA↓",   c: "#22C55E" },
                  ].map((s) => (
                    <div key={s.l}>
                      <div style={{ fontSize: "20px", fontWeight: 800, color: s.c, fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}>
                        {s.v}
                      </div>
                      <div style={{ fontSize: "10px", color: "#888899", marginTop: "2px" }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* Live ticker */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "7px 12px", borderRadius: "8px",
                  background: "rgba(34,197,94,0.06)",
                  border: "1px solid rgba(34,197,94,0.14)",
                }}>
                  <motion.span style={{
                    width: "5px", height: "5px", borderRadius: "50%", flexShrink: 0,
                    background: "#22C55E", boxShadow: "0 0 8px rgba(34,197,94,0.8)",
                    display: "inline-block",
                  }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
                  <span style={{ fontSize: "10px", color: "#888899", fontFamily: "var(--font-mono)" }}>
                    canlı · <span style={{ color: "#22C55E", fontWeight: 600 }}>3 aktif kampanya</span>
                    <span style={{ margin: "0 8px", opacity: 0.3 }}>·</span>
                    bugün <span style={{ color: "#22C55E", fontWeight: 600 }}>₺4,820</span> harcama
                    <span style={{ margin: "0 8px", opacity: 0.3 }}>·</span>
                    <span style={{ color: "#22C55E", fontWeight: 600 }}>4.1x</span> ROAS
                  </span>
                </div>
              </motion.div>
            </div>

            {/* ══ RIGHT — KPI Dashboard ══ */}
            <motion.div
              initial={{ opacity: 0, x: 48, y: 16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              className="hidden lg:block"
            >
              <KpiDashboard />
            </motion.div>
          </div>

          {/* Mobile dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="lg:hidden mt-12"
          >
            <KpiDashboard />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
          paddingBottom: "28px", color: "#888899",
        }}
      >
        <span style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.4 }}>
          Keşfet
        </span>
        <ChevronDown size={15} className="animate-bounce-slow" style={{ opacity: 0.4 }} />
      </motion.div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1023px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
