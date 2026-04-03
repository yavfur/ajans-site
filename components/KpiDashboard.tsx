"use client";

import { useRef, useEffect, useState, useId } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

/* ─── Smooth SVG path from data points ─── */
function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cpx = (prev[0] + curr[0]) / 2;
    d += ` C ${cpx},${prev[1]} ${cpx},${curr[1]} ${curr[0]},${curr[1]}`;
  }
  return d;
}

/* ─── Mini SVG Line Chart ─── */
function MiniChart({
  data,
  positive = true,
  delay = 0,
  w = 200,
  h = 56,
}: {
  data: number[];
  positive?: boolean;
  delay?: number;
  w?: number;
  h?: number;
}) {
  const id = useId().replace(/:/g, "");
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 4;

  const pts: [number, number][] = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - pad - ((v - min) / range) * (h - pad * 2),
  ]);

  const linePath = smoothPath(pts);
  const areaPath =
    linePath +
    ` L ${w},${h} L 0,${h} Z`;

  const strokeStart = positive ? "#22C55E" : "#F97316";
  const strokeEnd   = "#6366F1";
  const areaColor   = positive ? "#22C55E" : "#F97316";

  return (
    <svg
      width="100%"
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="overflow-visible"
    >
      <defs>
        <linearGradient id={`sg-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={strokeStart} />
          <stop offset="100%" stopColor={strokeEnd} />
        </linearGradient>
        <linearGradient id={`ag-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={areaColor} stopOpacity="0.18" />
          <stop offset="100%" stopColor={areaColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <motion.path
        d={areaPath}
        fill={`url(#ag-${id})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.4 }}
      />

      {/* Line */}
      <motion.path
        d={linePath}
        fill="none"
        stroke={`url(#sg-${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ pathLength: { duration: 1.2, delay, ease: "easeInOut" }, opacity: { duration: 0.3, delay } }}
      />

      {/* Last point dot */}
      <motion.circle
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r="3"
        fill={positive ? "#22C55E" : "#F97316"}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 1.1 }}
      />
    </svg>
  );
}

/* ─── Count-up hook ─── */
function useCountUp(target: number, active: boolean, duration = 1.4, decimals = 0) {
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

/* ─── KPI Card ─── */
interface KpiCardProps {
  label: string;
  displayValue: string;
  countTarget: number;
  countDecimals?: number;
  countPrefix?: string;
  countSuffix?: string;
  change: string;
  changeLabel?: string;
  positive?: boolean;
  data: number[];
  delay?: number;
  glowColor?: string;
}

function KpiCard({
  label,
  displayValue,
  countTarget,
  countDecimals = 0,
  countPrefix = "",
  countSuffix = "",
  change,
  changeLabel,
  positive = true,
  data,
  delay = 0,
  glowColor = "rgba(34,197,94,0.15)",
}: KpiCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);
  const count = useCountUp(countTarget, inView, 1.4, countDecimals);

  const displayCount =
    countDecimals > 0
      ? `${countPrefix}${count.toFixed(countDecimals)}${countSuffix}`
      : `${countPrefix}${count}${countSuffix}`;

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={{
        background: "#111827",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "14px",
        padding: "20px 24px",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        boxShadow: hovered
          ? `0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px ${glowColor}`
          : "0 4px 24px rgba(0,0,0,0.3)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "12px", fontWeight: 500, color: "#9CA3AF", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {label}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
            fontSize: "12px",
            fontWeight: 600,
            color: positive ? "#22C55E" : "#F97316",
            background: positive ? "rgba(34,197,94,0.1)" : "rgba(249,115,22,0.1)",
            padding: "2px 8px",
            borderRadius: "99px",
          }}
        >
          {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {change}
        </span>
      </div>

      {/* Value */}
      <div>
        <div
          style={{
            fontSize: "clamp(28px,3vw,36px)",
            fontWeight: 700,
            color: "#FFFFFF",
            fontFamily: "var(--font-heading)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {inView ? displayCount : (countPrefix + "0" + countSuffix)}
        </div>
        {changeLabel && (
          <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "4px" }}>{changeLabel}</div>
        )}
      </div>

      {/* Chart */}
      <div style={{ marginTop: "4px" }}>
        {inView && <MiniChart data={data} positive={positive} delay={delay + 0.2} />}
      </div>
    </motion.div>
  );
}

/* ─── KPI Dashboard Grid ─── */
const kpis: KpiCardProps[] = [
  {
    label: "ROAS",
    displayValue: "4.2x",
    countTarget: 4.2,
    countDecimals: 1,
    countSuffix: "x",
    change: "+32%",
    changeLabel: "Geçen aya göre",
    positive: true,
    data: [2.1, 2.4, 2.3, 2.8, 3.1, 3.0, 3.4, 3.7, 4.0, 4.2],
    glowColor: "rgba(34,197,94,0.2)",
    delay: 0,
  },
  {
    label: "CPA",
    displayValue: "-38%",
    countTarget: 38,
    countSuffix: "%",
    countPrefix: "-",
    change: "-38%",
    changeLabel: "Maliyet düşüşü",
    positive: true,
    data: [100, 94, 88, 83, 79, 73, 68, 63, 60, 62],
    glowColor: "rgba(34,197,94,0.2)",
    delay: 0.08,
  },
  {
    label: "Gelir",
    displayValue: "+120%",
    countTarget: 120,
    countSuffix: "%",
    countPrefix: "+",
    change: "+120%",
    changeLabel: "YoY büyüme",
    positive: true,
    data: [30, 38, 42, 50, 60, 72, 85, 98, 110, 120],
    glowColor: "rgba(99,102,241,0.2)",
    delay: 0.16,
  },
  {
    label: "CTR",
    displayValue: "3.8%",
    countTarget: 3.8,
    countDecimals: 1,
    countSuffix: "%",
    change: "+0.9%",
    changeLabel: "Sektör ort. 1.9%",
    positive: true,
    data: [1.8, 2.0, 2.2, 2.5, 2.7, 3.0, 3.2, 3.5, 3.7, 3.8],
    glowColor: "rgba(99,102,241,0.2)",
    delay: 0.24,
  },
];

export default function KpiDashboard() {
  return (
    <div className="w-full">
      {/* Live badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
        <span
          style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: "#22C55E",
            boxShadow: "0 0 8px rgba(34,197,94,0.7)",
            display: "inline-block",
            animation: "pulse-green 2s infinite",
          }}
        />
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Live Performance Dashboard
        </span>
        <Activity size={12} style={{ color: "#22C55E", marginLeft: "2px" }} />
      </div>

      {/* 2×2 Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "14px",
          padding: "10px 16px",
          background: "rgba(99,102,241,0.06)",
          border: "1px solid rgba(99,102,241,0.15)",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "11px", color: "#9CA3AF" }}>
          Veriler son 30 güne aittir • Ortalama müşteri sonuçları
        </span>
      </div>
    </div>
  );
}
