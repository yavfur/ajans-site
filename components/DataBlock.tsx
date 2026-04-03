"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, active: boolean, duration = 1.5, decimals = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const factor = Math.pow(10, decimals);
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target * factor) / factor);
      if (p < 1) requestAnimationFrame(step);
      else setVal(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration, decimals]);
  return val;
}

const stats = [
  {
    prefix: "",
    target: 20,
    suffix: "+",
    decimals: 0,
    label: "Büyüyen Marka",
    sublabel: "Aktif müşteri portföyü",
    glow: "rgba(99,102,241,0.25)",
    border: "rgba(99,102,241,0.2)",
    accent: "#6366F1",
  },
  {
    prefix: "",
    target: 5,
    suffix: "M+ ₺",
    decimals: 0,
    label: "Yönetilen Bütçe",
    sublabel: "Toplam reklam harcaması",
    glow: "rgba(34,197,94,0.25)",
    border: "rgba(34,197,94,0.2)",
    accent: "#22C55E",
  },
  {
    prefix: "",
    target: 3.8,
    suffix: "x",
    decimals: 1,
    label: "Ortalama ROAS",
    sublabel: "Sektör ortalaması 1.9x",
    glow: "rgba(34,197,94,0.25)",
    border: "rgba(34,197,94,0.2)",
    accent: "#22C55E",
  },
  {
    prefix: "%",
    target: 40,
    suffix: "",
    decimals: 0,
    label: "Maliyet Düşüşü",
    sublabel: "Ortalama CPA optimizasyonu",
    glow: "rgba(249,115,22,0.2)",
    border: "rgba(249,115,22,0.15)",
    accent: "#F97316",
  },
];

function StatCard({ s, index }: { s: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const count = useCountUp(s.target, inView, 1.5, s.decimals);
  const display = s.decimals > 0
    ? `${s.prefix}${count.toFixed(s.decimals)}${s.suffix}`
    : `${s.prefix}${count}${s.suffix}`;

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={{
        background: "#111827",
        border: `1px solid ${hovered ? s.border : "rgba(255,255,255,0.05)"}`,
        borderRadius: "16px",
        padding: "28px 24px",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered ? `0 20px 60px ${s.glow}` : "0 4px 24px rgba(0,0,0,0.3)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent bar top */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%",
        height: "2px",
        background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
        opacity: hovered ? 0.8 : 0.3,
        transition: "opacity 0.3s",
        borderRadius: "0 0 4px 4px",
      }} />

      {/* Glow orb */}
      <div style={{
        position: "absolute", top: "-20px", right: "-20px",
        width: "100px", height: "100px",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${s.glow} 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s",
        pointerEvents: "none",
      }} />

      <div style={{ fontSize: "clamp(36px, 4vw, 48px)", fontWeight: 700, color: s.accent, fontFamily: "var(--font-heading)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "8px" }}>
        {inView ? display : `${s.prefix}0${s.suffix}`}
      </div>
      <div style={{ fontSize: "15px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>{s.label}</div>
      <div style={{ fontSize: "12px", color: "#9CA3AF" }}>{s.sublabel}</div>
    </motion.div>
  );
}

export default function DataBlock() {
  return (
    <section
      style={{ background: "#0B0F1A", padding: "80px 0", position: "relative", overflow: "hidden" }}
    >
      {/* Separator lines */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), rgba(34,197,94,0.2), transparent)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          style={{ textAlign: "center", marginBottom: "48px" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span style={{
            display: "inline-block",
            padding: "5px 14px",
            borderRadius: "99px",
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.25)",
            fontSize: "11px",
            fontWeight: 600,
            color: "#22C55E",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}>
            Veriler
          </span>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700,
            color: "#FFFFFF",
            fontFamily: "var(--font-heading)",
            letterSpacing: "-0.02em",
          }}>
            Rakamlarla Biz
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {stats.map((s, i) => <StatCard key={s.label} s={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
