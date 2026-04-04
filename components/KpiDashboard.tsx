"use client";

import { useRef, useEffect, useState, useId } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, Wifi, MoreHorizontal, BarChart2 } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   MATH UTILITIES
═══════════════════════════════════════════════════════ */
function toPoints(data: number[], w: number, h: number, padY = 6): [number, number][] {
  const mn = Math.min(...data);
  const mx = Math.max(...data);
  const rng = mx - mn || 1;
  return data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - padY - ((v - mn) / rng) * (h - padY * 2),
  ]);
}

function buildPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const mx = (px + cx) / 2;
    d += ` C ${mx},${py} ${mx},${cy} ${cx},${cy}`;
  }
  return d;
}

/* ═══════════════════════════════════════════════════════
   COUNT-UP HOOK
═══════════════════════════════════════════════════════ */
function useCountUp(target: number, active: boolean, duration = 1.4, decimals = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const factor = Math.pow(10, decimals);
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target * factor) / factor);
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration, decimals]);
  return value;
}

/* ═══════════════════════════════════════════════════════
   1. MAIN REVENUE CHART — H=200, 28 points, peak callout
═══════════════════════════════════════════════════════ */
const REVENUE_DATA = [18, 25, 22, 35, 42, 38, 50, 58, 54, 68, 76, 72, 88, 95, 90, 108, 115, 110, 128, 140, 136, 155, 162, 158, 174, 188, 184, 200];
const Y_LABELS   = ["₺200K", "₺150K", "₺100K", "₺50K", "₺0"];
const X_LABELS   = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu"];

function MainChart({ active }: { active: boolean }) {
  const uid  = useId().replace(/:/g, "");
  const W = 560, H = 200;
  const pts      = toPoints(REVENUE_DATA, W, H, 10);
  const linePath = buildPath(pts);
  const areaPath = `${linePath} L ${W},${H} L 0,${H} Z`;
  const lastPt   = pts[pts.length - 1];
  const peakIdx  = REVENUE_DATA.indexOf(Math.max(...REVENUE_DATA));
  const peakPt   = pts[peakIdx];

  return (
    <div style={{ position: "relative" }}>
      {/* Y-axis labels */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 20,
        display: "flex", flexDirection: "column", justifyContent: "space-between", pointerEvents: "none",
      }}>
        {Y_LABELS.map((l) => (
          <span key={l} style={{ fontSize: "8px", color: "rgba(156,163,175,0.38)", lineHeight: 1, whiteSpace: "nowrap" }}>{l}</span>
        ))}
      </div>

      {/* SVG area */}
      <div style={{ marginLeft: "46px" }}>
        <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
          style={{ display: "block", overflow: "visible" }} role="img" aria-label="Gelir trendi grafiği">
          <defs>
            <linearGradient id={`lg-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#6366F1" />
              <stop offset="40%"  stopColor="#22C55E" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
            <linearGradient id={`ag-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#6366F1" stopOpacity="0.38" />
              <stop offset="50%"  stopColor="#22C55E" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
            </linearGradient>
            <filter id={`gf-${uid}`} x="-10%" y="-60%" width="120%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((r) => (
            <line key={r} x1={0} y1={H * r} x2={W} y2={H * r}
              stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 6" />
          ))}

          {/* Peak vertical highlight band */}
          <rect x={peakPt[0] - 18} y={0} width={36} height={H}
            fill="rgba(99,102,241,0.07)" rx="4" />

          {/* Area fill */}
          <motion.path d={areaPath} fill={`url(#ag-${uid})`}
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }} />

          {/* Line */}
          <motion.path d={linePath} fill="none"
            stroke={`url(#lg-${uid})`} strokeWidth="2.5" strokeLinecap="round"
            filter={`url(#gf-${uid})`}
            initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : {}}
            transition={{ duration: 2.0, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }} />

          {/* Peak callout */}
          <motion.g initial={{ opacity: 0, y: -6 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.0, duration: 0.4 }}>
            <rect x={peakPt[0] - 24} y={peakPt[1] - 24} width={48} height={17} rx={4}
              fill="rgba(99,102,241,0.9)" />
            <text x={peakPt[0]} y={peakPt[1] - 12} textAnchor="middle"
              fill="white" fontSize="8" fontFamily="var(--font-mono)">₺200K</text>
          </motion.g>
          <motion.circle cx={peakPt[0]} cy={peakPt[1]} r={3.5} fill="#6366F1"
            initial={{ scale: 0 }} animate={active ? { scale: 1 } : {}}
            transition={{ delay: 1.9, duration: 0.3 }} />

          {/* Live endpoint */}
          <motion.circle cx={lastPt[0]} cy={lastPt[1]} r={4} fill="#22C55E"
            initial={{ scale: 0, opacity: 0 }} animate={active ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 1.9, duration: 0.3 }} />
          <motion.circle cx={lastPt[0]} cy={lastPt[1]} r={9} fill="none"
            stroke="#22C55E" strokeWidth="1"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={active ? { scale: [0.8, 1.9, 1.9], opacity: [0, 0.65, 0] } : {}}
            transition={{ delay: 2.1, duration: 1.4, repeat: Infinity, repeatDelay: 1.2, ease: "easeOut" }} />
        </svg>

        {/* X-axis */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
          {X_LABELS.map((m) => (
            <span key={m} style={{ fontSize: "8px", color: "rgba(156,163,175,0.32)" }}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   2. FULL-WIDTH SPARKLINE
═══════════════════════════════════════════════════════ */
function Sparkline({ data, color = "#22C55E", active }: { data: number[]; color?: string; active: boolean }) {
  const uid = useId().replace(/:/g, "");
  const W = 200, H = 28;
  const pts      = toPoints(data, W, H, 3);
  const linePath = buildPath(pts);
  const areaPath = `${linePath} L ${W},${H} L 0,${H} Z`;
  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`sf-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={areaPath} fill={`url(#sf-${uid})`}
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }} />
      <motion.path d={linePath} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : {}}
        transition={{ duration: 1.1, ease: "easeInOut" }} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   3. MINI ROAS BAR (in table rows)
═══════════════════════════════════════════════════════ */
function MiniBar({ value, color = "#22C55E" }: { value: number; color?: string }) {
  return (
    <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
      <motion.div
        style={{ height: "100%", borderRadius: "2px", background: color }}
        initial={{ width: "0%" }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.9, delay: 1.0, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   4. KPI CARDS — 2×3 grid (6 cards)
═══════════════════════════════════════════════════════ */
const KPI_DATA = [
  {
    label: "ROAS", target: 4.2, decimals: 1, prefix: "", suffix: "x",
    change: "+32%", positive: true,
    sparkData: [2.1, 2.5, 2.8, 3.1, 3.4, 3.8, 4.0, 4.2],
    color: "#22C55E", sub: "hedef 5.0x",
  },
  {
    label: "CPA", target: 38, decimals: 0, prefix: "-", suffix: "%",
    change: "-38%", positive: true,
    sparkData: [100, 90, 82, 75, 69, 63, 60, 62],
    color: "#22C55E", sub: "₺28 → ₺17",
  },
  {
    label: "Gelir", target: 120, decimals: 0, prefix: "+", suffix: "%",
    change: "+120%", positive: true,
    sparkData: [28, 40, 55, 70, 85, 98, 110, 120],
    color: "#6366F1", sub: "₺564K → ₺1.24M",
  },
  {
    label: "CTR", target: 3.8, decimals: 1, prefix: "", suffix: "%",
    change: "+0.9%", positive: true,
    sparkData: [1.9, 2.2, 2.5, 2.9, 3.2, 3.5, 3.7, 3.8],
    color: "#22C55E", sub: "sektör ort. 1.2%",
  },
  {
    label: "Conv. Rate", target: 22, decimals: 0, prefix: "+", suffix: "%",
    change: "+22%", positive: true,
    sparkData: [8, 10, 12, 14, 16, 18, 20, 22],
    color: "#22C55E", sub: "3.1% → 3.8%",
  },
  {
    label: "CPC", target: 18, decimals: 0, prefix: "-", suffix: "%",
    change: "-18%", positive: true,
    sparkData: [100, 95, 90, 86, 82, 82, 85, 82],
    color: "#22C55E", sub: "₺1.24 → ₺0.59",
  },
];

function KpiCard({ kpi, active, delay }: { kpi: typeof KPI_DATA[0]; active: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const count = useCountUp(kpi.target, active, 1.3, kpi.decimals);
  const displayValue = kpi.decimals > 0
    ? `${kpi.prefix}${count.toFixed(kpi.decimals)}${kpi.suffix}`
    : `${kpi.prefix}${count}${kpi.suffix}`;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 14 }} animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
      style={{
        padding: "10px 12px 9px 14px", borderRadius: "10px",
        background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? `${kpi.color}40` : "rgba(255,255,255,0.07)"}`,
        borderLeft: `2px solid ${hovered ? kpi.color : `${kpi.color}55`}`,
        transition: "all 0.2s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 10px 28px ${kpi.color}18, inset 0 0 20px ${kpi.color}06` : "none",
        cursor: "default",
      }}
    >
      {/* Label + badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <span style={{ fontSize: "9px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {kpi.label}
        </span>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "3px",
          fontSize: "9px", fontWeight: 700, color: kpi.color,
          background: `${kpi.color}18`, padding: "2px 6px", borderRadius: "99px",
        }}>
          {kpi.positive ? <TrendingUp size={7} /> : <TrendingDown size={7} />}
          {kpi.change}
        </span>
      </div>

      {/* Big value */}
      <div style={{
        fontSize: "28px", fontWeight: 800, color: "#FFFFFF",
        fontFamily: "var(--font-heading)", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "3px",
      }}>
        {active ? displayValue : `${kpi.prefix}0${kpi.suffix}`}
      </div>

      {/* Sub label */}
      <div style={{ fontSize: "9px", color: "rgba(156,163,175,0.5)", marginBottom: "8px", fontFamily: "var(--font-mono)" }}>
        {kpi.sub}
      </div>

      {/* Sparkline */}
      <Sparkline data={kpi.sparkData} color={kpi.color} active={active} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   5. CAMPAIGN TABLE — 4 rows + CTR + sparkline + mini bar
═══════════════════════════════════════════════════════ */

/** Tiny inline sparkline for table rows */
function RowSpark({ data, color }: { data: number[]; color: string }) {
  const uid = useId().replace(/:/g, "");
  const W = 48, H = 18;
  const pts = toPoints(data, W, H, 2);
  const path = buildPath(pts);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", flexShrink: 0 }}>
      <motion.path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.0, delay: 1.0, ease: "easeInOut" }} />
    </svg>
  );
}

const CAMPAIGNS = [
  { name: "Summer Sale",     roas: "4.2x", ctr: "3.8%", spend: "₺45K", roasPct: 84,  status: "active",  trend: [28,32,35,39,40,42,41,42] },
  { name: "Retargeting",     roas: "5.1x", ctr: "4.2%", spend: "₺32K", roasPct: 100, status: "active",  trend: [30,34,38,42,46,49,50,51] },
  { name: "Brand Awareness", roas: "2.8x", ctr: "1.9%", spend: "₺18K", roasPct: 56,  status: "paused",  trend: [40,38,36,34,33,30,29,28] },
  { name: "A/B Test #4",     roas: "3.6x", ctr: "3.1%", spend: "₺12K", roasPct: 72,  status: "active",  trend: [20,24,28,30,33,35,35,36] },
];

function CampaignTable({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}}
      transition={{ delay: 0.7, duration: 0.45 }}
      style={{ borderRadius: "10px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}
    >
      {/* Header */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 42px 38px 52px 36px 48px 54px",
        padding: "7px 12px",
        background: "rgba(255,255,255,0.025)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        {["Kampanya", "ROAS", "CTR", "Harcama", "Bar", "Trend", "Durum"].map((h) => (
          <span key={h} style={{ fontSize: "8px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      {CAMPAIGNS.map((c, i) => (
        <motion.div key={c.name}
          initial={{ opacity: 0, x: -8 }} animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.85 + i * 0.08, duration: 0.3 }}
          style={{
            display: "grid", gridTemplateColumns: "1fr 42px 38px 52px 36px 48px 54px",
            padding: "8px 12px", alignItems: "center",
            borderBottom: i < CAMPAIGNS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.008)",
          }}
        >
          <span style={{ fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.78)" }}>{c.name}</span>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#22C55E", fontFamily: "var(--font-mono)" }}>{c.roas}</span>
          <span style={{ fontSize: "10px", color: "#9CA3AF", fontFamily: "var(--font-mono)" }}>{c.ctr}</span>
          <span style={{ fontSize: "10px", color: "#9CA3AF", fontFamily: "var(--font-mono)" }}>{c.spend}</span>
          <MiniBar value={c.roasPct} color={c.status === "active" ? "#22C55E" : "#6B7280"} />
          <RowSpark data={c.trend} color={c.status === "active" ? "#22C55E" : "#6B7280"} />
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{
              width: "5px", height: "5px", borderRadius: "50%", flexShrink: 0,
              background: c.status === "active" ? "#22C55E" : "#6B7280",
              boxShadow: c.status === "active" ? "0 0 6px rgba(34,197,94,0.7)" : "none",
              display: "inline-block",
            }} />
            <span style={{ fontSize: "9px", fontWeight: 600, color: c.status === "active" ? "#22C55E" : "#6B7280" }}>
              {c.status === "active" ? "Aktif" : "Durdu"}
            </span>
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   6. PLATFORM BREAKDOWN — stacked bar + legend
═══════════════════════════════════════════════════════ */
const PLATFORMS = [
  { name: "Meta Ads", pct: 52, color: "#6366F1", spend: "₺97K" },
  { name: "Google",   pct: 31, color: "#22C55E", spend: "₺58K" },
  { name: "TikTok",   pct: 17, color: "#F97316", spend: "₺31K" },
];

function PlatformBreakdown({ active }: { active: boolean }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 1.0, duration: 0.4 }}>
      {/* Stacked bar */}
      <div style={{ display: "flex", height: "6px", borderRadius: "3px", overflow: "hidden", gap: "2px", marginBottom: "8px" }}>
        {PLATFORMS.map((p) => (
          <motion.div key={p.name}
            style={{ borderRadius: "3px", background: p.color, height: "100%", boxShadow: `0 0 10px ${p.color}55` }}
            initial={{ width: "0%", opacity: 0 }}
            animate={active ? { width: `${p.pct}%`, opacity: 1 } : {}}
            transition={{ delay: 1.1, duration: 1.0, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          />
        ))}
      </div>
      {/* Legend */}
      <div style={{ display: "flex", gap: "16px" }}>
        {PLATFORMS.map((p) => (
          <div key={p.name} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "2px", background: p.color, flexShrink: 0 }} />
            <span style={{ fontSize: "9px", color: "#9CA3AF" }}>{p.name}</span>
            <span style={{ fontSize: "9px", color: "rgba(156,163,175,0.5)", fontFamily: "var(--font-mono)" }}>{p.pct}% · {p.spend}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   7. DUAL PROGRESS BARS — ROAS + Budget
═══════════════════════════════════════════════════════ */
const PROGRESS_BARS = [
  { label: "ROAS Hedefi", sub: "4.2x → 5.0x", pct: 84, c1: "#6366F1", c2: "#22C55E", ticks: ["0x","1x","2x","3x","4x","5x"] },
  { label: "Bütçe",       sub: "₺186K / ₺220K", pct: 85, c1: "#6366F1", c2: "#F97316", ticks: null },
];

function ProgressBars({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}}
      transition={{ delay: 1.2, duration: 0.4 }}
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      {PROGRESS_BARS.map((b, idx) => (
        <div key={b.label}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "10px", fontWeight: 600, color: "#9CA3AF" }}>{b.label}</span>
              <span style={{ fontSize: "9px", color: "rgba(156,163,175,0.4)", fontFamily: "var(--font-mono)" }}>{b.sub}</span>
            </div>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#22C55E", fontFamily: "var(--font-heading)" }}>{b.pct}%</span>
          </div>

          <div style={{ height: "6px", borderRadius: "99px", background: "rgba(255,255,255,0.07)", overflow: "hidden", position: "relative" }}>
            <motion.div
              style={{
                height: "100%", borderRadius: "99px",
                background: `linear-gradient(90deg, ${b.c1} 0%, ${b.c2} 100%)`,
                boxShadow: `0 0 10px ${b.c2}55`,
                position: "relative",
              }}
              initial={{ width: "0%" }}
              animate={active ? { width: `${b.pct}%` } : {}}
              transition={{ delay: 1.3 + idx * 0.2, duration: 1.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            >
              <motion.div
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                }}
                animate={active ? { backgroundPosition: ["-60% 0", "160% 0"] } : {}}
                transition={{ delay: 2.5 + idx * 0.2, duration: 1.2, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {b.ticks && (
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3px" }}>
              {b.ticks.map((t) => (
                <span key={t} style={{ fontSize: "7px", color: "rgba(156,163,175,0.28)" }}>{t}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   8. BOTTOM STATS STRIP
═══════════════════════════════════════════════════════ */
const BOTTOM_STATS = [
  { label: "İzlenim",  value: "8.4M"  },
  { label: "Tıklama",  value: "312K"  },
  { label: "Dönüşüm", value: "28.4K" },
  { label: "CPC",      value: "₺0.59" },
];

/* ═══════════════════════════════════════════════════════
   DASHBOARD SHELL
═══════════════════════════════════════════════════════ */
export default function KpiDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef, { once: true, margin: "-40px" });

  return (
    <div ref={containerRef} style={{ position: "relative" }}>

      {/* Ambient glow — two layered halos (purple + cyan) */}
      <div aria-hidden style={{
        position: "absolute", inset: "-56px",
        borderRadius: "48px",
        background: "radial-gradient(ellipse at 35% 25%, rgba(124,58,237,0.28) 0%, rgba(6,182,212,0.10) 45%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div aria-hidden style={{
        position: "absolute", inset: "-28px",
        borderRadius: "40px",
        background: "radial-gradient(ellipse at 70% 80%, rgba(34,197,94,0.10) 0%, transparent 60%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Main glassmorphism card */}
      <div style={{
        position: "relative", zIndex: 1,
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: [
          "0 0 0 1px rgba(124,58,237,0.10)",
          "0 60px 140px rgba(0,0,0,0.75)",
          "0 20px 50px rgba(0,0,0,0.50)",
          "inset 0 1px 0 rgba(255,255,255,0.08)",
          "inset 0 0 80px rgba(124,58,237,0.04)",
        ].join(", "),
      }}>

        {/* Top inner highlight line — purple → cyan */}
        <div aria-hidden style={{
          position: "absolute", top: 0, left: "8%", right: "8%", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.9), rgba(6,182,212,0.6), transparent)",
        }} />

        {/* Subtle inner grid overlay */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(124,58,237,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.028) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        {/* ── HEADER BAR ── */}
        <div style={{
          padding: "13px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "10px",
              background: "linear-gradient(135deg, rgba(124,58,237,0.45), rgba(6,182,212,0.25))",
              border: "1px solid rgba(124,58,237,0.40)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              boxShadow: "0 0 18px rgba(124,58,237,0.32)",
            }}>
              <Activity size={14} style={{ color: "#22C55E" }} />
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#F5F5F7", fontFamily: "var(--font-heading)", lineHeight: 1.2 }}>
                Performance Dashboard
              </div>
              <div style={{ fontSize: "9px", color: "#888899", marginTop: "1px", fontFamily: "var(--font-mono)" }}>
                90g · 3 platform · 24 kampanya · ₺186K spend
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <motion.span aria-hidden style={{
                display: "inline-block", width: "7px", height: "7px", borderRadius: "50%",
                background: "#22C55E", boxShadow: "0 0 12px rgba(34,197,94,0.95)",
              }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
              <span style={{ fontSize: "10px", fontWeight: 700, color: "#22C55E", letterSpacing: "0.06em" }}>LIVE</span>
            </div>
            <Wifi size={13} style={{ color: "#9CA3AF", opacity: 0.35 }} aria-hidden />
            <MoreHorizontal size={14} style={{ color: "#9CA3AF", opacity: 0.28 }} aria-hidden />
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{ padding: "16px 18px 20px", display: "flex", flexDirection: "column", gap: "14px" }}>

          {/* Revenue headline */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "9px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "3px" }}>
                Toplam Gelir
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span style={{
                  fontSize: "36px", fontWeight: 800, color: "#F5F5F7",
                  fontFamily: "var(--font-heading)", letterSpacing: "-0.04em",
                }}>
                  ₺1.24M
                </span>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "3px",
                  fontSize: "11px", fontWeight: 700, color: "#22C55E",
                  background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)",
                  padding: "3px 9px", borderRadius: "99px",
                }}>
                  <TrendingUp size={9} />+120%
                </span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "9px", color: "#9CA3AF", marginBottom: "2px" }}>vs önceki dönem</p>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-mono)" }}>₺564K</span>
            </div>
          </div>

          {/* ① Main chart */}
          <MainChart active={isVisible} />

          {/* ② Platform breakdown */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "7px" }}>
              <span style={{ fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Platform Dağılımı
              </span>
              <BarChart2 size={11} style={{ color: "#9CA3AF", opacity: 0.35 }} aria-hidden />
            </div>
            <PlatformBreakdown active={isVisible} />
          </div>

          {/* ③ KPI grid 2×3 — 6 cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "7px" }}>
            {KPI_DATA.map((kpi, i) => (
              <KpiCard key={kpi.label} kpi={kpi} active={isVisible} delay={0.25 + i * 0.07} />
            ))}
          </div>

          {/* ④ Campaign table */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "7px" }}>
              <span style={{ fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Aktif Kampanyalar
              </span>
              <MoreHorizontal size={13} style={{ color: "#9CA3AF", opacity: 0.32 }} aria-hidden />
            </div>
            <CampaignTable active={isVisible} />
          </div>

          {/* ⑤ Dual progress bars */}
          <div>
            <div style={{ marginBottom: "9px" }}>
              <span style={{ fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Hedefler
              </span>
            </div>
            <ProgressBars active={isVisible} />
          </div>

          {/* ⑥ Bottom stat strip */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "12px",
          }}>
            {BOTTOM_STATS.map((s, i) => (
              <div key={s.label} style={{
                textAlign: "center",
                borderRight: i < BOTTOM_STATS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}>
                <motion.div
                  style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.72)", fontFamily: "var(--font-mono)" }}
                  initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ delay: 1.6 + i * 0.07, duration: 0.4 }}
                >
                  {s.value}
                </motion.div>
                <div style={{ fontSize: "8px", color: "#9CA3AF", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
