"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useId, useState } from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";

/* Mini chart helper */
function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], c = pts[i];
    const cpx = (p[0] + c[0]) / 2;
    d += ` C ${cpx},${p[1]} ${cpx},${c[1]} ${c[0]},${c[1]}`;
  }
  return d;
}

function ResultChart({ data, hovered }: { data: number[]; hovered: boolean }) {
  const id = useId().replace(/:/g, "");
  const w = 160, h = 40;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts: [number, number][] = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - 4 - ((v - min) / range) * (h - 8),
  ]);
  const line = smoothPath(pts);
  const area = line + ` L ${w},${h} L 0,${h} Z`;

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`cs-sg-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id={`cs-ag-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill={`url(#cs-ag-${id})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={`url(#cs-sg-${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: hovered ? 1 : 0.6 }}
        transition={{ duration: hovered ? 0.7 : 0.3, ease: "easeInOut" }}
      />
    </svg>
  );
}

const cases = [
  {
    brand: "Lumière Skin",
    sector: "Kozmetik",
    tag: "Meta Ads + Content",
    problem: "Yüksek CPA, düşük ROAS.",
    solution: "Kreatif A/B testleri, audience segmentasyonu, retargeting.",
    resultValue: "+87%",
    resultLabel: "ROAS artışı",
    metric2: { val: "-54%", label: "CPA düşüşü" },
    metric3: { val: "+218%", label: "Ciro artışı" },
    data: [30, 35, 38, 42, 50, 62, 74, 82, 87],
  },
  {
    brand: "StepUp Ayakkabı",
    sector: "Moda & E-ticaret",
    tag: "Shopify + Trendyol",
    problem: "Trendyol'da görünürlük sorunu.",
    solution: "Listing optimizasyonu, kampanya yapılandırma.",
    resultValue: "+312%",
    resultLabel: "Satış artışı",
    metric2: { val: "-38%", label: "İade düşüşü" },
    metric3: { val: "+67%", label: "AOV artışı" },
    data: [20, 30, 45, 70, 110, 160, 220, 280, 312],
  },
  {
    brand: "NutriBox",
    sector: "Sağlık & Gıda",
    tag: "Sosyal Medya + Ads",
    problem: "Sıfırdan marka bilinirliği.",
    solution: "İçerik + influencer + Meta funnel.",
    resultValue: "12K+",
    resultLabel: "Aktif abone",
    metric2: { val: "+840%", label: "Instagram büyüme" },
    metric3: { val: "₺28", label: "CAC" },
    data: [0, 800, 2000, 3500, 5500, 7500, 9200, 11000, 12000],
  },
];

function CaseCard({ c, index }: { c: typeof cases[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={{
        background: "#111827",
        border: `1px solid ${hovered ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.05)"}`,
        borderRadius: "16px",
        overflow: "hidden",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 60px rgba(34,197,94,0.12)" : "0 4px 24px rgba(0,0,0,0.3)",
        cursor: "default",
      }}
    >
      {/* Top: brand header */}
      <div style={{
        padding: "20px 24px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "12px",
      }}>
        <div>
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", marginBottom: "2px", fontFamily: "var(--font-heading)" }}>
            {c.brand}
          </div>
          <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{c.sector}</div>
        </div>
        <span style={{
          fontSize: "11px", fontWeight: 600, color: "#a5b4fc",
          background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)",
          padding: "3px 10px", borderRadius: "99px", whiteSpace: "nowrap",
        }}>
          {c.tag}
        </span>
      </div>

      {/* Middle: problem/solution */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ marginBottom: "8px" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>Problem</span>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", marginTop: "3px", lineHeight: 1.5 }}>{c.problem}</p>
        </div>
        <div>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>Çözüm</span>
          <p style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "3px", lineHeight: 1.5 }}>{c.solution}</p>
        </div>
      </div>

      {/* ─── BIG RESULT — most important ─── */}
      <div style={{ padding: "20px 24px" }}>
        {/* Mini chart — reveals fully on hover */}
        <div style={{ marginBottom: "16px" }}>
          <ResultChart data={c.data} hovered={hovered} />
        </div>

        {/* Big result number */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", marginBottom: "16px" }}>
          <div>
            <div style={{
              fontSize: "clamp(36px, 4vw, 48px)",
              fontWeight: 700,
              color: "#22C55E",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}>
              {c.resultValue}
            </div>
            <div style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
              <TrendingUp size={12} style={{ color: "#22C55E" }} />
              {c.resultLabel}
            </div>
          </div>

          {/* Secondary metrics */}
          <div style={{ marginLeft: "auto", display: "flex", gap: "16px" }}>
            {[c.metric2, c.metric3].map((m) => (
              <div key={m.label} style={{ textAlign: "right" }}>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#22C55E" }}>{m.val}</div>
                <div style={{ fontSize: "10px", color: "#9CA3AF", marginTop: "2px" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  return (
    <section style={{ background: "#0B0F1A", padding: "100px 0", position: "relative" }}>
      {/* bg glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(34,197,94,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "56px" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span style={{
            display: "inline-block", padding: "5px 14px", borderRadius: "99px",
            background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
            fontSize: "11px", fontWeight: 600, color: "#22C55E",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px",
          }}>
            Sonuçlar
          </span>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700,
            color: "#FFFFFF", fontFamily: "var(--font-heading)",
            letterSpacing: "-0.02em", marginBottom: "12px",
          }}>
            Rakamlarla konuşuyoruz
          </h2>
          <p style={{ fontSize: "16px", color: "#9CA3AF", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
            Her büyüme kararı veriye dayanır. Aşağıdaki sonuçlar gerçek müşteri hesaplarından alınmıştır.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginBottom: "40px" }}>
          {cases.map((c, i) => <CaseCard key={c.brand} c={c} index={i} />)}
        </div>

        <motion.div
          style={{ textAlign: "center" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Link
            href="/iletisim"
            className="glow-orange"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 28px", borderRadius: "12px",
              background: "#F97316", color: "#FFFFFF",
              fontWeight: 700, fontSize: "15px", textDecoration: "none",
              transition: "transform 0.2s ease",
              fontFamily: "var(--font-heading)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            Sizin büyüme hikayenizi yazalım
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
