"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useId } from "react";
import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";

/* ── smooth bezier path ── */
function toPoints(data: number[], w: number, h: number, padY = 4): [number, number][] {
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  return data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - padY - ((v - mn) / rng) * (h - padY * 2),
  ]);
}
function buildPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1], [cx, cy] = pts[i], mx = (px + cx) / 2;
    d += ` C ${mx},${py} ${mx},${cy} ${cx},${cy}`;
  }
  return d;
}

/* ── result chart (right column) ── */
function ResultChart({ data, color, active }: { data: number[]; color: string; active: boolean }) {
  const uid = useId().replace(/:/g, "");
  const W = 320, H = 60;
  const pts = toPoints(data, W, H, 6);
  const line = buildPath(pts);
  const area = `${line} L ${W},${H} L 0,${H} Z`;
  const lastPt = pts[pts.length - 1];

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
      style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={`csl-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
        <linearGradient id={`csa-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id={`csf-${uid}`} x="-10%" y="-60%" width="120%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <motion.path d={area} fill={`url(#csa-${uid})`}
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }} />
      <motion.path d={line} fill="none" stroke={`url(#csl-${uid})`} strokeWidth="2"
        strokeLinecap="round" filter={`url(#csf-${uid})`}
        initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }} />
      <motion.circle cx={lastPt[0]} cy={lastPt[1]} r={3.5} fill={color}
        initial={{ scale: 0 }} animate={active ? { scale: 1 } : {}}
        transition={{ delay: 1.3, duration: 0.3 }} />
      <motion.circle cx={lastPt[0]} cy={lastPt[1]} r={8} fill="none"
        stroke={color} strokeWidth="1"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={active ? { scale: [0.8, 1.8, 1.8], opacity: [0, 0.6, 0] } : {}}
        transition={{ delay: 1.5, duration: 1.2, repeat: Infinity, repeatDelay: 1.5, ease: "easeOut" }} />
    </svg>
  );
}

/* ── case data ── */
const cases = [
  {
    brand: "Lumière Skin",
    sector: "Kozmetik & Cilt Bakımı",
    tag: "Meta Ads + Content",
    problem: "Yüksek CPA, düşük ROAS ve kritik düzeyde kreatif yorgunluğu. Reklam harcaması büyürken gelir stagnasyona girdi.",
    solution: "Kreatif A/B test sistemi, audience yeniden segmentasyonu, retargeting funnel kurulumu ve haftalık optimizasyon döngüsü.",
    bigResult: "+187%",
    bigLabel: "ROAS artışı",
    timeLabel: "4 ayda elde edildi",
    subs: [
      { v: "+42%", l: "Dönüşüm", icon: TrendingUp, positive: true },
      { v: "-28%", l: "CPA",     icon: TrendingDown, positive: true },
    ],
    data: [30, 35, 38, 44, 55, 72, 88, 105, 120, 140, 158, 172, 187],
    color: "#22C55E",
  },
  {
    brand: "StepUp Ayakkabı",
    sector: "Moda & E-ticaret",
    tag: "Shopify + Trendyol",
    problem: "Trendyol'da görünürlük ve dönüşüm sorunu. Listeleme optimizasyonu ve fiyatlandırma rekabette kayıplar yaşanıyordu.",
    solution: "Listing optimizasyonu, kampanya yeniden yapılandırma, iade analizi ve dinamik fiyatlandırma stratejisi.",
    bigResult: "+312%",
    bigLabel: "Satış artışı",
    timeLabel: "6 ayda elde edildi",
    subs: [
      { v: "+67%", l: "AOV",   icon: TrendingUp, positive: true },
      { v: "-38%", l: "İade",  icon: TrendingDown, positive: true },
    ],
    data: [20, 34, 52, 80, 118, 170, 210, 255, 280, 295, 308, 312, 312],
    color: "#22C55E",
  },
  {
    brand: "NutriBox",
    sector: "Sağlık & Gıda",
    tag: "Sosyal Medya + Meta Ads",
    problem: "Sıfırdan marka bilinirliği ve abonelik büyütme. Belirsiz hedef kitle ve yetersiz funnel yapısı.",
    solution: "İçerik takvimi, micro-influencer ortaklıkları ve Meta Ads üçlü funnel: farkındalık → ilgi → dönüşüm.",
    bigResult: "12K+",
    bigLabel: "Aktif abone",
    timeLabel: "8 ayda elde edildi",
    subs: [
      { v: "+840%", l: "Instagram",  icon: TrendingUp, positive: true },
      { v: "3.2x",  l: "LTV/CAC",   icon: TrendingUp, positive: true },
    ],
    data: [0, 400, 1200, 2800, 4500, 6200, 8000, 9500, 10800, 11500, 11900, 12000, 12000],
    color: "#6366F1",
  },
];

/* ── single case row ── */
function CaseRow({ c, i }: { c: typeof cases[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reversed = i % 2 !== 0;
  const Icon0 = c.subs[0].icon;
  const Icon1 = c.subs[1].icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={{
        display: "grid",
        gridTemplateColumns: reversed ? "3fr 2fr" : "2fr 3fr",
        gap: "0",
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 8px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* LEFT COPY — always rendered first in DOM, flex-order controlled */}
      <div
        style={{
          padding: "44px 40px",
          borderRight: reversed ? "none" : "1px solid rgba(255,255,255,0.06)",
          borderLeft: reversed ? "1px solid rgba(255,255,255,0.06)" : "none",
          order: reversed ? 2 : 1,
          display: "flex", flexDirection: "column", justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Top accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, ${c.color}, transparent)`,
          opacity: 0.6,
        }} />

        {/* Brand header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 800, color: "#FFFFFF", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}>
              {c.brand}
            </div>
            <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{c.sector}</div>
          </div>
          <span style={{
            marginLeft: "auto",
            fontSize: "9px", fontWeight: 700, color: "#C084FC",
            background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)",
            padding: "4px 10px", borderRadius: "99px", whiteSpace: "nowrap",
          }}>{c.tag}</span>
        </div>

        {/* Problem */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{
            fontSize: "9px", fontWeight: 800, color: "#9CA3AF",
            textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "6px",
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            <span style={{ display: "inline-block", width: "12px", height: "1px", background: "#EF4444" }} />
            Problem
          </div>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: 0 }}>
            {c.problem}
          </p>
        </div>

        {/* Solution */}
        <div>
          <div style={{
            fontSize: "9px", fontWeight: 800, color: "#9CA3AF",
            textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "6px",
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            <span style={{ display: "inline-block", width: "12px", height: "1px", background: c.color }} />
            Çözüm
          </div>
          <p style={{ fontSize: "14px", color: "#9CA3AF", lineHeight: 1.65, margin: 0 }}>
            {c.solution}
          </p>
        </div>
      </div>

      {/* RIGHT RESULT */}
      <div
        style={{
          padding: "44px 40px",
          background: "linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(5,5,5,0.6) 100%)",
          order: reversed ? 1 : 2,
          display: "flex", flexDirection: "column", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Animated radial glow behind number */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: "320px", height: "320px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${c.color}22 0%, ${c.color}08 40%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
          animate={inView ? { scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Big result number */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <div style={{
            fontSize: "clamp(64px, 9vw, 112px)",
            fontWeight: 900,
            color: c.color,
            fontFamily: "var(--font-heading)",
            letterSpacing: "-0.045em",
            lineHeight: 1,
            textShadow: `0 0 60px ${c.color}55, 0 0 120px ${c.color}25`,
          }}>
            {c.bigResult}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px", marginBottom: "24px" }}>
            <TrendingUp size={13} style={{ color: c.color }} />
            <span style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>
              {c.bigLabel}
            </span>
          </div>

          {/* Mini chart */}
          <div style={{ marginBottom: "20px" }}>
            <ResultChart data={c.data} color={c.color} active={inView} />
          </div>

          {/* Time label */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.35)",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
            padding: "4px 10px", borderRadius: "99px", marginBottom: "20px",
          }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: c.color, display: "inline-block" }} />
            {c.timeLabel}
          </div>

          {/* Supporting mini metrics */}
          <div style={{
            display: "flex", gap: "0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "16px",
          }}>
            <div style={{ flex: 1, paddingRight: "16px", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "3px" }}>
                <Icon0 size={10} style={{ color: c.color }} />
                <span style={{ fontSize: "16px", fontWeight: 800, color: c.color, fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}>
                  {c.subs[0].v}
                </span>
              </div>
              <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{c.subs[0].l}</div>
            </div>
            <div style={{ flex: 1, paddingLeft: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "3px" }}>
                <Icon1 size={10} style={{ color: c.color }} />
                <span style={{ fontSize: "16px", fontWeight: 800, color: c.color, fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}>
                  {c.subs[1].v}
                </span>
              </div>
              <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{c.subs[1].l}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  return (
    <section style={{ background: "#050505", padding: "100px 0", position: "relative", overflow: "hidden" }}>

      {/* ── BACKGROUND LAYERS ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Purple glow — top right */}
        <div style={{
          position: "absolute", top: "-15%", right: "-10%",
          width: "800px", height: "800px",
          background: "radial-gradient(circle, rgba(124,58,237,0.16) 0%, rgba(124,58,237,0.06) 40%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        {/* Green glow — bottom left */}
        <div style={{
          position: "absolute", bottom: "-10%", left: "-8%",
          width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.04) 50%, transparent 70%)",
          filter: "blur(70px)",
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* Section header */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "64px" }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <span style={{
            display: "inline-block", padding: "6px 14px", borderRadius: "99px",
            background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
            fontSize: "11px", fontWeight: 700, color: "#22C55E",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px",
          }}>
            Kanıtlanmış Sonuçlar
          </span>
          <h2 style={{
            fontSize: "clamp(32px, 4.5vw, 54px)", fontWeight: 800,
            color: "#FFFFFF", fontFamily: "var(--font-heading)",
            letterSpacing: "-0.03em", marginBottom: "14px",
          }}>
            Rakamlar konuşuyor
          </h2>
          <p style={{ fontSize: "16px", color: "#9CA3AF", maxWidth: "480px", margin: "0 auto", lineHeight: 1.65 }}>
            Her sonuç gerçek hesaplardan. Süs yok — sadece veri.
          </p>
        </motion.div>

        {/* Case rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "56px" }}>
          {cases.map((c, i) => <CaseRow key={c.brand} c={c} i={i} />)}
        </div>

        {/* Bottom CTA */}
        <motion.div
          style={{ textAlign: "center" }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
        >
          <Link href="/iletisim" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "16px 32px", borderRadius: "12px",
            background: "#F97316", color: "#FFFFFF",
            fontWeight: 700, fontSize: "15px", textDecoration: "none",
            fontFamily: "var(--font-heading)",
            boxShadow: "0 0 28px rgba(249,115,22,0.45), 0 0 60px rgba(249,115,22,0.18)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 48px rgba(249,115,22,0.65), 0 0 100px rgba(249,115,22,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(249,115,22,0.45), 0 0 60px rgba(249,115,22,0.18)"; }}
          >
            Sizin büyüme hikayenizi yazalım <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
