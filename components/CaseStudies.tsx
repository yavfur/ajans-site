"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useId, useState } from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";

/* ── smooth bezier path ── */
function sp(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], c = pts[i], cx = (p[0] + c[0]) / 2;
    d += ` C ${cx},${p[1]} ${cx},${c[1]} ${c[0]},${c[1]}`;
  }
  return d;
}

function CaseChart({ data, hov }: { data: number[]; hov: boolean }) {
  const id = useId().replace(/:/g, "");
  const W = 200, H = 48;
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  const pts: [number, number][] = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - 4 - ((v - mn) / rng) * (H - 8),
  ]);
  const line = sp(pts), area = line + ` L ${W},${H} L 0,${H} Z`;

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`csg-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366F1" /><stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
        <linearGradient id={`csa-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" stopOpacity={hov ? "0.25" : "0.1"} />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
        </linearGradient>
        <filter id={`csf-${id}`}><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <motion.path d={area} fill={`url(#csa-${id})`}
        animate={{ opacity: hov ? 1 : 0.5 }} transition={{ duration: 0.3 }} />
      <motion.path d={line} fill="none" stroke={`url(#csg-${id})`} strokeWidth="2"
        strokeLinecap="round" filter={`url(#csf-${id})`}
        animate={{ pathLength: hov ? 1 : 0.7 }} transition={{ duration: 0.5, ease: "easeInOut" }} />
      <motion.circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3"
        fill="#22C55E"
        animate={{ scale: hov ? [1, 1.5, 1] : 1, opacity: hov ? 1 : 0.6 }}
        transition={{ duration: 0.8, repeat: hov ? Infinity : 0 }} />
    </svg>
  );
}

const cases = [
  {
    brand: "Lumière Skin",
    sector: "Kozmetik & Cilt Bakımı",
    tag: "Meta Ads + Content",
    problem: "Yüksek CPA, düşük ROAS, kreatif yorgunluğu.",
    solution: "Kreatif A/B testleri, audience segmentasyonu ve retargeting funnel kurulumu.",
    bigResult: "+87%",
    bigLabel: "ROAS artışı",
    subs: [{ v: "-54%", l: "CPA düşüşü" }, { v: "+218%", l: "Ciro artışı" }, { v: "6.4x", l: "ROAS" }],
    data: [30, 35, 38, 44, 52, 63, 74, 82, 87],
    accent: "#22C55E",
  },
  {
    brand: "StepUp Ayakkabı",
    sector: "Moda & E-ticaret",
    tag: "Shopify + Trendyol",
    problem: "Trendyol'da görünürlük sorunu ve düşük dönüşüm oranı.",
    solution: "Listing optimizasyonu, kampanya yeniden yapılandırma, iade analizi.",
    bigResult: "+312%",
    bigLabel: "Satış artışı",
    subs: [{ v: "-38%", l: "İade oranı" }, { v: "+67%", l: "AOV artışı" }, { v: "5.1x", l: "ROAS" }],
    data: [20, 34, 52, 80, 118, 170, 234, 290, 312],
    accent: "#22C55E",
  },
  {
    brand: "NutriBox",
    sector: "Sağlık & Gıda",
    tag: "Sosyal Medya + Ads",
    problem: "Sıfırdan marka bilinirliği ve abonelik büyütme.",
    solution: "İçerik takvimi, influencer ortaklıkları ve Meta Ads funnel.",
    bigResult: "12K+",
    bigLabel: "Aktif abone",
    subs: [{ v: "+840%", l: "Instagram" }, { v: "₺28", l: "CAC" }, { v: "3.2x", l: "LTV/CAC" }],
    data: [0, 800, 2200, 4000, 6000, 8000, 10000, 11500, 12000],
    accent: "#6366F1",
  },
];

function CaseCard({ c, i }: { c: typeof cases[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={{
        background: "#111827",
        border: `1px solid ${hov ? c.accent + "28" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "18px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hov ? `0 28px 70px rgba(0,0,0,0.5), 0 0 0 1px ${c.accent}18` : "0 4px 24px rgba(0,0,0,0.3)",
        cursor: "default",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Top gradient bar */}
      <div style={{ height: "2px", background: `linear-gradient(90deg, ${c.accent}, #6366F1)`, opacity: hov ? 1 : 0.3, transition: "opacity 0.3s" }} />

      {/* Brand header */}
      <div style={{
        padding: "20px 24px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      }}>
        <div>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-heading)", marginBottom: "2px" }}>{c.brand}</div>
          <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{c.sector}</div>
        </div>
        <span style={{
          fontSize: "10px", fontWeight: 700, color: "#a5b4fc",
          background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)",
          padding: "4px 10px", borderRadius: "99px", whiteSpace: "nowrap",
        }}>{c.tag}</span>
      </div>

      {/* Problem / Solution */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ marginBottom: "10px" }}>
          <div style={{ fontSize: "9px", fontWeight: 800, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Problem</div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5, margin: 0 }}>{c.problem}</p>
        </div>
        <div>
          <div style={{ fontSize: "9px", fontWeight: 800, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Çözüm</div>
          <p style={{ fontSize: "13px", color: "#9CA3AF", lineHeight: 1.5, margin: 0 }}>{c.solution}</p>
        </div>
      </div>

      {/* Chart */}
      <div style={{ padding: "16px 24px 8px" }}>
        <CaseChart data={c.data} hov={hov} />
      </div>

      {/* ── BIG RESULT — dominant ── */}
      <div style={{ padding: "8px 24px 20px" }}>
        <div style={{
          fontSize: "clamp(48px, 5vw, 64px)", fontWeight: 800,
          color: c.accent, fontFamily: "var(--font-heading)",
          letterSpacing: "-0.03em", lineHeight: 1,
          textShadow: hov ? `0 0 40px ${c.accent}60` : "none",
          transition: "text-shadow 0.3s",
        }}>
          {c.bigResult}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "4px", marginBottom: "16px" }}>
          <TrendingUp size={12} style={{ color: c.accent }} />
          <span style={{ fontSize: "13px", color: "#9CA3AF" }}>{c.bigLabel}</span>
        </div>

        {/* Sub metrics */}
        <div style={{ display: "flex", gap: "0", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "14px" }}>
          {c.subs.map((s, j) => (
            <div key={s.l} style={{ flex: 1, textAlign: "center", borderRight: j < c.subs.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", padding: "0 8px" }}>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#22C55E" }}>{s.v}</div>
              <div style={{ fontSize: "10px", color: "#9CA3AF", marginTop: "2px" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  return (
    <section style={{ background: "#0B0F1A", padding: "100px 0", position: "relative", overflow: "hidden" }}>
      {/* bg glow */}
      <div style={{
        position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)",
        width: "800px", height: "500px",
        background: "radial-gradient(ellipse, rgba(34,197,94,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          style={{ textAlign: "center", marginBottom: "60px" }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <span style={{
            display: "inline-block", padding: "6px 14px", borderRadius: "99px",
            background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
            fontSize: "11px", fontWeight: 700, color: "#22C55E",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px",
          }}>Kanıtlanmış Sonuçlar</span>
          <h2 style={{
            fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 800,
            color: "#FFFFFF", fontFamily: "var(--font-heading)", letterSpacing: "-0.025em", marginBottom: "12px",
          }}>
            Rakamlarla konuşuyoruz
          </h2>
          <p style={{ fontSize: "16px", color: "#9CA3AF", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
            Veri her zaman konuşur. Aşağıdaki sonuçlar gerçek hesaplardan alınmıştır.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px", marginBottom: "48px" }}>
          {cases.map((c, i) => <CaseCard key={c.brand} c={c} i={i} />)}
        </div>

        <motion.div
          style={{ textAlign: "center" }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}
        >
          <Link href="/iletisim" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "15px 30px", borderRadius: "12px",
            background: "#F97316", color: "#FFFFFF",
            fontWeight: 700, fontSize: "15px", textDecoration: "none",
            fontFamily: "var(--font-heading)",
            boxShadow: "0 0 24px rgba(249,115,22,0.4)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(249,115,22,0.6)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(249,115,22,0.4)"; }}
          >
            Sizin büyüme hikayenizi yazalım <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
