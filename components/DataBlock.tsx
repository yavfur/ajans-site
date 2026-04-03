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
    icon: Target, target: 20, dec: 0, prefix: "", suffix: "+",
    label: "Büyüyen Marka",
    sub: "Aktif müşteri portföyü",
    accent: "#6366F1", glow: "rgba(99,102,241,0.3)",
    sparkData: [10, 12, 14, 15, 17, 18, 20],
  },
  {
    icon: DollarSign, target: 5, dec: 0, prefix: "", suffix: "M+ ₺",
    label: "Yönetilen Bütçe",
    sub: "Toplam reklam harcaması",
    accent: "#22C55E", glow: "rgba(34,197,94,0.3)",
    sparkData: [1, 1.5, 2.2, 3.0, 3.8, 4.5, 5],
  },
  {
    icon: TrendingUp, target: 3.8, dec: 1, prefix: "", suffix: "x",
    label: "Ortalama ROAS",
    sub: "Sektör ort. 1.9x",
    accent: "#22C55E", glow: "rgba(34,197,94,0.3)",
    sparkData: [1.9, 2.2, 2.5, 2.8, 3.1, 3.5, 3.8],
  },
  {
    icon: Zap, target: 40, dec: 0, prefix: "%", suffix: "",
    label: "Maliyet Düşüşü",
    sub: "Ortalama CPA optimizasyonu",
    accent: "#F97316", glow: "rgba(249,115,22,0.25)",
    sparkData: [10, 16, 22, 27, 32, 37, 40],
  },
];

function StatCard({ s, i }: { s: typeof stats[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
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
        background: hov ? "#111827" : "rgba(17,24,39,0.8)",
        border: `1px solid ${hov ? s.accent + "30" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "16px",
        padding: "28px 24px",
        position: "relative", overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hov ? `0 24px 60px ${s.glow}, inset 0 0 40px ${s.glow.replace("0.3", "0.05")}` : "0 4px 20px rgba(0,0,0,0.3)",
        cursor: "default",
      }}
    >
      {/* Top glow bar */}
      <div style={{
        position: "absolute", top: 0, left: "15%", right: "15%", height: "2px",
        background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
        opacity: hov ? 1 : 0.3, transition: "opacity 0.3s",
        borderRadius: "0 0 4px 4px",
      }} />

      {/* Corner glow orb */}
      <div style={{
        position: "absolute", top: "-30px", right: "-30px",
        width: "140px", height: "140px", borderRadius: "50%",
        background: `radial-gradient(circle, ${s.glow} 0%, transparent 70%)`,
        opacity: hov ? 1 : 0.3, transition: "opacity 0.3s", pointerEvents: "none",
      }} />

      {/* Icon */}
      <div style={{
        width: "44px", height: "44px", borderRadius: "12px",
        background: `${s.accent}15`, border: `1px solid ${s.accent}25`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "20px",
        transition: "transform 0.3s",
        transform: hov ? "scale(1.1)" : "scale(1)",
      }}>
        <Icon size={20} style={{ color: s.accent }} />
      </div>

      {/* Big number */}
      <div style={{
        fontSize: "clamp(44px, 5vw, 60px)", fontWeight: 800,
        color: s.accent, fontFamily: "var(--font-heading)",
        letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "8px",
        textShadow: hov ? `0 0 40px ${s.accent}60` : "none",
        transition: "text-shadow 0.3s",
      }}>
        {inView ? display : `${s.prefix}0${s.suffix}`}
      </div>

      <div style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", marginBottom: "4px" }}>
        {s.label}
      </div>
      <div style={{ fontSize: "12px", color: "#9CA3AF" }}>{s.sub}</div>
    </motion.div>
  );
}

export default function DataBlock() {
  return (
    <section style={{ background: "#0B0F1A", padding: "100px 0", position: "relative", overflow: "hidden" }}>
      {/* Bg depth */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(34,197,94,0.3), transparent)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent)",
      }} />

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
            fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 800,
            color: "#FFFFFF", fontFamily: "var(--font-heading)",
            letterSpacing: "-0.025em",
          }}>
            Rakamlarla Biz
          </h2>
          <p style={{ fontSize: "16px", color: "#9CA3AF", marginTop: "12px", maxWidth: "400px", margin: "12px auto 0", lineHeight: 1.6 }}>
            Her metrik gerçek müşteri hesaplarından, son 12 aylık ortalamalardan.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {stats.map((s, i) => <StatCard key={s.label} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
