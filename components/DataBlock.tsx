"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, DollarSign, Target, Zap } from "lucide-react";

function useCountUp(target: number, active: boolean, dur = 1.6, dec = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let t0: number | null = null;
    const fac = Math.pow(10, dec);
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / (dur * 1000), 1);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * target * fac) / fac);
      if (p < 1) requestAnimationFrame(tick); else setV(target);
    };
    requestAnimationFrame(tick);
  }, [active, target, dur, dec]);
  return v;
}

const stats = [
  {
    icon: Target, target: 50, dec: 0, prefix: "", suffix: "+",
    label: "Büyüyen Marka",
    sub: "Aktif müşteri portföyü",
    micro: "son 24 ay",
    compare: "2022'de 12 markadaydık",
    accent: "#6366F1", glow: "rgba(99,102,241,0.3)",
  },
  {
    icon: DollarSign, target: 5, dec: 0, prefix: "", suffix: "M+ ₺",
    label: "Yönetilen Bütçe",
    sub: "Toplam reklam harcaması",
    micro: "tüm zamanlar",
    compare: "3 platform · Meta, Google, TikTok",
    accent: "#22C55E", glow: "rgba(34,197,94,0.3)",
  },
  {
    icon: TrendingUp, target: 3.8, dec: 1, prefix: "", suffix: "x",
    label: "Ortalama ROAS",
    sub: "Tüm hesaplar ortalaması",
    micro: "son 12 ay",
    compare: "Sektör ort: 1.9x",
    accent: "#22C55E", glow: "rgba(34,197,94,0.3)",
  },
  {
    icon: Zap, target: 40, dec: 0, prefix: "%", suffix: "",
    label: "Maliyet Düşüşü",
    sub: "CPA optimizasyonu",
    micro: "ort. 90 günde",
    compare: "En yüksek: %68 düşüş",
    accent: "#F97316", glow: "rgba(249,115,22,0.25)",
  },
];

const LOGOS = [
  { name: "Lumière",  accent: "#6366F1" },
  { name: "StepUp",  accent: "#22C55E" },
  { name: "NutriBox", accent: "#22C55E" },
  { name: "TechBase", accent: "#6366F1" },
  { name: "ModaCo",  accent: "#F97316" },
  { name: "FitLife",  accent: "#22C55E" },
];

function StatCard({ s, i }: { s: typeof stats[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const [hov, setHov] = useState(false);
  const count = useCountUp(s.target, inView, 1.6, s.dec);
  const display = s.dec > 0 ? `${s.prefix}${count.toFixed(s.dec)}${s.suffix}` : `${s.prefix}${count}${s.suffix}`;
  const Icon = s.icon;

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={{
        background: hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? s.accent + "35" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "18px",
        padding: "28px 24px 24px",
        position: "relative", overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hov
          ? `0 28px 70px ${s.glow}, 0 0 0 1px ${s.accent}20, inset 0 0 40px ${s.glow.replace("0.3", "0.06")}`
          : "0 4px 20px rgba(0,0,0,0.3)",
        cursor: "default",
      }}
    >
      {/* Top glow bar */}
      <div style={{
        position: "absolute", top: 0, left: "15%", right: "15%", height: "2px",
        background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
        opacity: hov ? 1 : 0.35, transition: "opacity 0.3s",
        borderRadius: "0 0 4px 4px",
      }} />

      {/* Corner glow */}
      <div style={{
        position: "absolute", top: "-35px", right: "-35px",
        width: "160px", height: "160px", borderRadius: "50%",
        background: `radial-gradient(circle, ${s.glow} 0%, transparent 70%)`,
        opacity: hov ? 1 : 0.3, transition: "opacity 0.3s", pointerEvents: "none",
      }} />

      {/* Micro period label */}
      <div style={{
        position: "absolute", top: "16px", right: "16px",
        fontSize: "8px", fontWeight: 700, color: "rgba(156,163,175,0.45)",
        fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em",
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
        padding: "2px 7px", borderRadius: "99px",
      }}>
        {s.micro}
      </div>

      {/* Icon */}
      <div style={{
        width: "46px", height: "46px", borderRadius: "12px",
        background: `${s.accent}15`, border: `1px solid ${s.accent}25`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "20px",
        transition: "transform 0.3s, box-shadow 0.3s",
        transform: hov ? "scale(1.12) rotate(-4deg)" : "scale(1)",
        boxShadow: hov ? `0 0 20px ${s.accent}40` : "none",
      }}>
        <Icon size={20} style={{ color: s.accent }} />
      </div>

      {/* Big number */}
      <div style={{
        fontSize: "clamp(48px, 5.5vw, 64px)", fontWeight: 800,
        color: s.accent, fontFamily: "var(--font-heading)",
        letterSpacing: "-0.035em", lineHeight: 1, marginBottom: "8px",
        textShadow: hov ? `0 0 48px ${s.accent}70, 0 0 80px ${s.accent}30` : "none",
        transition: "text-shadow 0.3s",
      }}>
        {inView ? display : `${s.prefix}0${s.suffix}`}
      </div>

      <div style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", marginBottom: "4px" }}>
        {s.label}
      </div>
      <div style={{ fontSize: "12px", color: "#888899", marginBottom: "14px" }}>{s.sub}</div>

      {/* Comparison sub-stat */}
      <div style={{
        paddingTop: "12px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        fontSize: "10px", color: "rgba(156,163,175,0.5)",
        fontFamily: "var(--font-mono)",
        display: "flex", alignItems: "center", gap: "5px",
      }}>
        <span style={{ display: "inline-block", width: "4px", height: "4px", borderRadius: "50%", background: s.accent, opacity: 0.6, flexShrink: 0 }} />
        {s.compare}
      </div>
    </motion.div>
  );
}

function LogoStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const [hovIdx, setHovIdx] = useState<number | null>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{ marginTop: "52px" }}
    >
      {/* Separator + label */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08))" }} />
        <span style={{
          fontSize: "9px", fontWeight: 700, color: "rgba(156,163,175,0.4)",
          textTransform: "uppercase", letterSpacing: "0.14em", whiteSpace: "nowrap",
          fontFamily: "var(--font-mono)",
        }}>
          Büyüyen markalar
        </span>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)" }} />
      </div>

      {/* Logo wordmarks */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        {LOGOS.map((l, i) => (
          <motion.div
            key={l.name}
            onMouseEnter={() => setHovIdx(i)}
            onMouseLeave={() => setHovIdx(null)}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              border: `1px solid ${hovIdx === i ? l.accent + "40" : "rgba(255,255,255,0.07)"}`,
              background: hovIdx === i ? `${l.accent}10` : "rgba(255,255,255,0.02)",
              fontSize: "13px", fontWeight: 800,
              fontFamily: "var(--font-heading)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: hovIdx === i ? l.accent : "rgba(156,163,175,0.3)",
              transition: "all 0.25s ease",
              cursor: "default",
              boxShadow: hovIdx === i ? `0 0 18px ${l.accent}18` : "none",
              transform: hovIdx === i ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            {l.name}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function DataBlock() {
  return (
    <section style={{ background: "#050505", padding: "100px 0", position: "relative", overflow: "hidden" }}>

      {/* ── BACKGROUND LAYERS ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Purple glow — top right */}
        <div style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(124,58,237,0.16) 0%, rgba(124,58,237,0.06) 40%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        {/* Green glow — bottom left */}
        <div style={{
          position: "absolute", bottom: "-15%", left: "-8%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.04) 50%, transparent 70%)",
          filter: "blur(70px)",
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        {/* Top separator */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(34,197,94,0.3), transparent)",
        }} />
        {/* Bottom separator */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent)",
        }} />
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          style={{ textAlign: "center", marginBottom: "56px" }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "6px 14px", borderRadius: "99px",
            background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
            fontSize: "11px", fontWeight: 700, color: "#22C55E",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px",
          }}>
            <TrendingUp size={10} /> Kanıtlanmış Sonuçlar
          </span>
          <h2 style={{
            fontSize: "clamp(32px, 4.5vw, 54px)", fontWeight: 800,
            color: "#FFFFFF", fontFamily: "var(--font-heading)",
            letterSpacing: "-0.03em",
          }}>
            Rakamlarla Biz
          </h2>
          <p style={{ fontSize: "16px", color: "#888899", marginTop: "12px", maxWidth: "400px", margin: "12px auto 0", lineHeight: 1.65 }}>
            Her metrik gerçek müşteri hesaplarından. Dönem ortalamaları, açık kaynak verilerle karşılaştırılmıştır.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {stats.map((s, i) => <StatCard key={s.label} s={s} i={i} />)}
        </div>

        <LogoStrip />
      </div>
    </section>
  );
}
