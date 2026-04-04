"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Zap, TrendingUp, ShieldCheck } from "lucide-react";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── 5 lightweight fragments (CSS animated, no Framer Motion) ── */
const FRAGMENTS = [
  { x: 8,  y: 14, s: 24, o: 0.10, a: "animate-float-slow",   shape: "triangle", c: "#7C3AED" },
  { x: 88, y: 20, s: 16, o: 0.08, a: "animate-float-medium", shape: "circle",   c: "#06B6D4" },
  { x: 6,  y: 75, s: 12, o: 0.07, a: "animate-float-fast",   shape: "square",   c: "#22C55E" },
  { x: 92, y: 62, s: 18, o: 0.07, a: "animate-drift",        shape: "hexagon",  c: "#7C3AED" },
  { x: 50, y: 7,  s: 10, o: 0.06, a: "animate-float-medium", shape: "circle",   c: "#C084FC" },
];

function FragmentShape({ shape, size, color }: { shape: string; size: number; color: string }) {
  if (shape === "circle") return (
    <div style={{ width: size, height: size, borderRadius: "50%", border: `1.5px solid ${color}`, background: `${color}10` }} />
  );
  if (shape === "square") return (
    <div style={{ width: size, height: size, border: `1.5px solid ${color}`, background: `${color}08`, transform: "rotate(45deg)" }} />
  );
  if (shape === "triangle") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L22 20H2L12 2Z" stroke={color} strokeWidth="1.5" fill={`${color}10`} />
    </svg>
  );
  if (shape === "hexagon") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke={color} strokeWidth="1.5" fill={`${color}08`} />
    </svg>
  );
  return null;
}

/* ── Lightweight metric card for hero right column ── */
const HERO_METRICS = [
  { label: "Ortalama ROAS", value: "3.8x", delta: "+41%", accent: "#22C55E" },
  { label: "CPA Düşüşü",   value: "%40",  delta: "90 gün", accent: "#06B6D4" },
  { label: "Aktif Marka",  value: "50+",  delta: "↑ 2022'den", accent: "#7C3AED" },
];

const SPARKLINE = [28, 34, 31, 42, 47, 44, 56, 62, 58, 71, 68, 80, 76, 89, 94];

function MiniChart() {
  const W = 280, H = 52;
  const mn = Math.min(...SPARKLINE), mx = Math.max(...SPARKLINE), rng = mx - mn;
  const pts: [number, number][] = SPARKLINE.map((v, i) => [
    (i / (SPARKLINE.length - 1)) * W,
    H - 4 - ((v - mn) / rng) * (H - 8),
  ]);
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1], [cx, cy] = pts[i], mx2 = (px + cx) / 2;
    d += ` C ${mx2},${py} ${mx2},${cy} ${cx},${cy}`;
  }
  const area = `${d} L ${W},${H} L 0,${H} Z`;
  const lastPt = pts[pts.length - 1];

  return (
    <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ fontSize: "10px", color: "#888899", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase" }}>ROAS Trend</span>
        <span style={{ fontSize: "10px", color: "#22C55E", fontWeight: 700, fontFamily: "var(--font-mono)" }}>+94% / 90 gün</span>
      </div>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: "block" }}>
        <defs>
          <linearGradient id="hg1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
          <linearGradient id="hg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#hg2)" />
        <path d={d} fill="none" stroke="url(#hg1)" strokeWidth="1.5" />
        <circle cx={lastPt[0]} cy={lastPt[1]} r="3" fill="#22C55E" />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section style={{
      background: "#050505",
      height: "100vh",
      maxHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* ══ BACKGROUND LAYERS (CSS animated, no Framer Motion layout props) ══ */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>

        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        {/* Purple blob — CSS animated for performance */}
        <div style={{
          position: "absolute", top: "8%", right: "3%",
          width: "560px", height: "560px",
          background: "radial-gradient(circle, rgba(124,58,237,0.20) 0%, rgba(124,58,237,0.06) 45%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform",
          animation: "float-slow 12s ease-in-out infinite",
          borderRadius: "50%",
        }} />

        {/* Cyan blob */}
        <div style={{
          position: "absolute", bottom: "8%", left: "-3%",
          width: "480px", height: "480px",
          background: "radial-gradient(circle, rgba(6,182,212,0.14) 0%, rgba(6,182,212,0.04) 50%, transparent 70%)",
          filter: "blur(70px)",
          willChange: "transform",
          animation: "float-medium 16s ease-in-out infinite 3s",
          borderRadius: "50%",
        }} />

        {/* Scan line — Framer Motion with transform only (no layout reflow) */}
        <motion.div
          style={{
            position: "absolute", left: 0, right: 0, height: "1px", top: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.5) 30%, rgba(6,182,212,0.3) 70%, transparent 100%)",
          }}
          animate={{ y: ["0vh", "100vh"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
        />

        {/* Edge vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 85% 65% at 50% 40%, rgba(5,5,5,0) 0%, rgba(5,5,5,0.65) 100%)",
        }} />
      </div>

      {/* ══ FLOATING FRAGMENTS (CSS only) ══ */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {FRAGMENTS.map((f, i) => (
          <div key={i} className={f.a} style={{
            position: "absolute", left: `${f.x}%`, top: `${f.y}%`,
            opacity: f.o, animationDelay: `${i * 1.1}s`, willChange: "transform",
          }}>
            <FragmentShape shape={f.shape} size={f.s} color={f.c} />
          </div>
        ))}
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "80px 24px 40px",
        position: "relative",
        zIndex: 1,
        minHeight: 0,
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>

          {/* Grid: 40% left copy / 60% right card */}
          <div className="hero-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "48px",
            alignItems: "center",
          }}>

            {/* ══ LEFT — Copy ══ */}
            <div>
              {/* Badge */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  padding: "6px 14px", borderRadius: "99px",
                  background: "rgba(124,58,237,0.10)",
                  border: "1px solid rgba(124,58,237,0.28)",
                  fontSize: "11px", fontWeight: 700, color: "#C084FC",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  marginBottom: "24px",
                }}>
                  <Zap size={10} style={{ color: "#22C55E" }} />
                  Growth Operating System
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial="hidden" animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                style={{ marginBottom: "18px" }}
              >
                {["Performans", "Reklamlarıyla", "Satışlarını"].map((word) => (
                  <motion.span key={word}
                    variants={{
                      hidden: { opacity: 0, y: 28 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
                    }}
                    style={{
                      display: "block",
                      fontSize: "clamp(36px, 4.6vw, 68px)",
                      fontWeight: 800, lineHeight: 1.04,
                      letterSpacing: "-0.04em",
                      color: "#F5F5F7",
                      fontFamily: "var(--font-heading)",
                    }}
                  >{word}</motion.span>
                ))}
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
                  }}
                  style={{
                    display: "block",
                    fontSize: "clamp(36px, 4.6vw, 68px)",
                    fontWeight: 800, lineHeight: 1.04,
                    letterSpacing: "-0.04em",
                    fontFamily: "var(--font-heading)",
                    background: "linear-gradient(120deg, #C084FC 0%, #7C3AED 35%, #06B6D4 70%, #22D3EE 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}
                >Ölçekle</motion.span>
              </motion.div>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.42, ease }}
                style={{
                  fontSize: "clamp(14px, 1.5vw, 17px)", color: "#888899",
                  lineHeight: 1.65, marginBottom: "28px", maxWidth: "420px",
                }}
              >
                Veri odaklı reklam sistemleriyle ROAS artır,
                maliyetleri düşür, büyümeyi hızlandır.
              </motion.p>

              {/* Trust signals */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.52, ease }}
                style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "28px" }}
              >
                {[
                  { icon: TrendingUp,  label: "+32% ort. ROAS artışı", color: "#22C55E" },
                  { icon: ShieldCheck, label: "Şeffaf raporlama",       color: "#06B6D4" },
                  { icon: Zap,         label: "48h içinde başla",       color: "#3B82F6" },
                ].map((t) => (
                  <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <t.icon size={11} style={{ color: t.color, flexShrink: 0 }} />
                    <span style={{ fontSize: "11px", color: "rgba(245,245,247,0.45)", fontWeight: 500 }}>{t.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.62, ease }}
                style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px" }}
              >
                <Link href="/iletisim" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "14px 26px", borderRadius: "12px",
                  background: "#3B82F6", color: "#FFFFFF",
                  fontWeight: 700, fontSize: "15px", textDecoration: "none",
                  fontFamily: "var(--font-heading)",
                  boxShadow: "0 0 28px rgba(59,130,246,0.45), 0 0 70px rgba(59,130,246,0.18)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05) translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 0 48px rgba(59,130,246,0.65), 0 0 120px rgba(59,130,246,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1) translateY(0)";
                    e.currentTarget.style.boxShadow = "0 0 28px rgba(59,130,246,0.45), 0 0 70px rgba(59,130,246,0.18)";
                  }}
                >
                  Reklam performansını analiz et
                  <ArrowRight size={15} />
                </Link>

                <Link href="/hizmetler" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "14px 20px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
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

              {/* Mini stats */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.45 }}
                style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
              >
                {[
                  { v: "50+",  l: "Marka",  c: "#22C55E" },
                  { v: "6.4x", l: "ROAS",   c: "#22C55E" },
                  { v: "₺5M+", l: "Bütçe",  c: "#06B6D4" },
                  { v: "%40",  l: "CPA↓",   c: "#22C55E" },
                ].map((s) => (
                  <div key={s.l}>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: s.c, fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}>{s.v}</div>
                    <div style={{ fontSize: "9px", color: "#888899", marginTop: "1px" }}>{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ══ RIGHT — Lightweight metric card (desktop only) ══ */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease }}
              style={{ willChange: "transform" }}
            >
              {/* Glass card shell */}
              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "20px",
                padding: "28px",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Purple top glow */}
                <div style={{
                  position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.6), rgba(6,182,212,0.4), transparent)",
                }} />

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#F5F5F7", fontFamily: "var(--font-heading)" }}>
                      Growth Dashboard
                    </div>
                    <div style={{ fontSize: "10px", color: "#888899", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
                      son 90 gün · canlı
                    </div>
                  </div>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "5px",
                    padding: "4px 10px", borderRadius: "99px",
                    background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)",
                  }}>
                    <motion.span style={{
                      width: "5px", height: "5px", borderRadius: "50%",
                      background: "#22C55E", display: "inline-block",
                      boxShadow: "0 0 6px rgba(34,197,94,0.9)",
                    }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
                    <span style={{ fontSize: "9px", color: "#22C55E", fontWeight: 700, fontFamily: "var(--font-mono)" }}>LIVE</span>
                  </div>
                </div>

                {/* Metric cards — 3 column */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "4px" }}>
                  {HERO_METRICS.map((m) => (
                    <div key={m.label} style={{
                      background: "rgba(255,255,255,0.025)",
                      border: `1px solid ${m.accent}18`,
                      borderRadius: "10px",
                      padding: "14px 12px",
                      position: "relative",
                      overflow: "hidden",
                    }}>
                      <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                        background: `linear-gradient(90deg, ${m.accent}, transparent)`,
                      }} />
                      <div style={{ fontSize: "22px", fontWeight: 800, color: m.accent, fontFamily: "var(--font-heading)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                        {m.value}
                      </div>
                      <div style={{ fontSize: "9px", color: "#888899", marginTop: "4px", lineHeight: 1.3 }}>{m.label}</div>
                      <div style={{ fontSize: "8px", color: m.accent, fontFamily: "var(--font-mono)", marginTop: "3px", opacity: 0.7 }}>{m.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Mini chart */}
                <MiniChart />

                {/* Bottom ticker */}
                <div style={{
                  marginTop: "16px",
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "7px 12px", borderRadius: "8px",
                  background: "rgba(34,197,94,0.05)",
                  border: "1px solid rgba(34,197,94,0.12)",
                }}>
                  <span style={{ fontSize: "9px", color: "#888899", fontFamily: "var(--font-mono)" }}>
                    bugün ·{" "}
                    <span style={{ color: "#22C55E", fontWeight: 600 }}>₺4,820</span> harcama ·{" "}
                    <span style={{ color: "#22C55E", fontWeight: 600 }}>4.1x</span> ROAS ·{" "}
                    <span style={{ color: "#06B6D4", fontWeight: 600 }}>3 aktif kampanya</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
          paddingBottom: "20px", color: "#888899",
        }}
      >
        <span style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.35 }}>Keşfet</span>
        <ChevronDown size={14} className="animate-bounce-slow" style={{ opacity: 0.35 }} />
      </motion.div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1023px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
