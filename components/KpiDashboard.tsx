"use client";

import { useRef, useEffect, useState, useId } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, Wifi, MoreHorizontal } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   MATH UTILITIES
═══════════════════════════════════════════════════════ */

/** Converts an array of values to SVG [x,y] points within a viewBox */
function toPoints(data: number[], w: number, h: number, padY = 6): [number, number][] {
  const mn = Math.min(...data);
  const mx = Math.max(...data);
  const rng = mx - mn || 1;
  return data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - padY - ((v - mn) / rng) * (h - padY * 2),
  ]);
}

/** Builds a smooth cubic-bezier SVG path from [x,y] points */
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
   1. MAIN REVENUE CHART
   Full-width, tall, animated line with glow + area fill
═══════════════════════════════════════════════════════ */
const REVENUE_DATA = [22, 31, 28, 44, 50, 42, 62, 71, 80, 75, 92, 107, 104, 121, 136, 130, 152, 165, 170, 188];
const Y_LABELS = ["₺200K", "₺150K", "₺100K", "₺50K"];
const X_LABELS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem"];

function MainChart({ active }: { active: boolean }) {
  const uid = useId().replace(/:/g, "");
  const W = 520;
  const H = 160; // Tall chart — visually dominant

  const pts = toPoints(REVENUE_DATA, W, H, 10);
  const linePath = buildPath(pts);
  const areaPath = `${linePath} L ${W},${H} L 0,${H} Z`;
  const lastPt = pts[pts.length - 1];

  return (
    <div style={{ position: "relative" }}>
      {/* Y-axis */}
      <div style={{
        position: "absolute", left: 0, top: 0,
        bottom: 22, // leave room for x-labels
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        pointerEvents: "none",
      }}>
        {Y_LABELS.map((l) => (
          <span key={l} style={{ fontSize: "9px", color: "rgba(156,163,175,0.45)", lineHeight: 1, whiteSpace: "nowrap" }}>
            {l}
          </span>
        ))}
      </div>

      {/* Chart area */}
      <div style={{ marginLeft: "44px" }}>
        <svg
          width="100%"
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          style={{ display: "block", overflow: "visible" }}
          aria-label="Gelir trendi grafiği"
          role="img"
        >
          <defs>
            {/* Stroke gradient: purple → green */}
            <linearGradient id={`line-grad-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#6366F1" />
              <stop offset="45%"  stopColor="#22C55E" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>

            {/* Area fill gradient: top color → transparent */}
            <linearGradient id={`area-grad-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#6366F1" stopOpacity="0.28" />
              <stop offset="55%"  stopColor="#22C55E" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
            </linearGradient>

            {/* Glow filter on line */}
            <filter id={`line-glow-${uid}`} x="-10%" y="-50%" width="120%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Horizontal grid lines */}
          {[0.25, 0.5, 0.75].map((ratio) => (
            <line
              key={ratio}
              x1={0} y1={H * ratio}
              x2={W} y2={H * ratio}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area fill — fades in */}
          <motion.path
            d={areaPath}
            fill={`url(#area-grad-${uid})`}
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Main line — draws left to right */}
          <motion.path
            d={linePath}
            fill="none"
            stroke={`url(#line-grad-${uid})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            filter={`url(#line-glow-${uid})`}
            initial={{ pathLength: 0 }}
            animate={active ? { pathLength: 1 } : {}}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          />

          {/* Live endpoint dot */}
          <motion.circle
            cx={lastPt[0]} cy={lastPt[1]} r={4}
            fill="#22C55E"
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 1.7, duration: 0.3 }}
          />
          {/* Pulse ring around endpoint */}
          <motion.circle
            cx={lastPt[0]} cy={lastPt[1]} r={9}
            fill="none"
            stroke="#22C55E"
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: [0.8, 1.6, 1.6], opacity: [0, 0.5, 0] } : {}}
            transition={{
              delay: 1.9,
              duration: 1.2,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeOut",
            }}
          />
        </svg>

        {/* X-axis labels */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
          {X_LABELS.map((m) => (
            <span key={m} style={{ fontSize: "9px", color: "rgba(156,163,175,0.4)" }}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   2. FULL-WIDTH SPARKLINE (used inside KPI cards)
═══════════════════════════════════════════════════════ */
function Sparkline({
  data,
  color = "#22C55E",
  active,
}: {
  data: number[];
  color?: string;
  active: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const W = 200; // virtual viewBox width — renders at 100% actual width
  const H = 32;

  const pts = toPoints(data, W, H, 3);
  const linePath = buildPath(pts);
  const areaPath = `${linePath} L ${W},${H} L 0,${H} Z`;

  return (
    <svg
      width="100%"
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={`spark-fill-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.path
        d={areaPath}
        fill={`url(#spark-fill-${uid})`}
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      />

      <motion.path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : {}}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   3. KPI CARDS (2 × 2 grid)
═══════════════════════════════════════════════════════ */
const KPI_DATA = [
  {
    label: "ROAS",
    target: 4.2, decimals: 1, prefix: "", suffix: "x",
    change: "+32%", positive: true,
    sparkData: [2.1, 2.5, 2.8, 3.1, 3.4, 3.8, 4.0, 4.2],
    color: "#22C55E",
  },
  {
    label: "CPA",
    target: 38, decimals: 0, prefix: "-", suffix: "%",
    change: "-38%", positive: true,
    sparkData: [100, 90, 82, 75, 69, 63, 60, 62],
    color: "#22C55E",
  },
  {
    label: "Gelir",
    target: 120, decimals: 0, prefix: "+", suffix: "%",
    change: "+120%", positive: true,
    sparkData: [28, 40, 55, 70, 85, 98, 110, 120],
    color: "#6366F1",
  },
  {
    label: "CTR",
    target: 3.8, decimals: 1, prefix: "", suffix: "%",
    change: "+0.9%", positive: true,
    sparkData: [1.9, 2.2, 2.5, 2.9, 3.2, 3.5, 3.7, 3.8],
    color: "#22C55E",
  },
];

function KpiCard({
  kpi,
  active,
  delay,
}: {
  kpi: typeof KPI_DATA[0];
  active: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const count = useCountUp(kpi.target, active, 1.3, kpi.decimals);
  const displayValue = kpi.decimals > 0
    ? `${kpi.prefix}${count.toFixed(kpi.decimals)}${kpi.suffix}`
    : `${kpi.prefix}${count}${kpi.suffix}`;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 14 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
      style={{
        padding: "14px 16px 12px",
        borderRadius: "12px",
        background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? `${kpi.color}35` : "rgba(255,255,255,0.07)"}`,
        transition: "background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 32px ${kpi.color}1A` : "none",
        cursor: "default",
      }}
    >
      {/* Label + change badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <span style={{
          fontSize: "10px", fontWeight: 700, color: "#9CA3AF",
          textTransform: "uppercase", letterSpacing: "0.1em",
        }}>
          {kpi.label}
        </span>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "3px",
          fontSize: "10px", fontWeight: 700, color: kpi.color,
          background: `${kpi.color}18`, padding: "2px 7px", borderRadius: "99px",
        }}>
          {kpi.positive ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
          {kpi.change}
        </span>
      </div>

      {/* Big value */}
      <div style={{
        fontSize: "26px",
        fontWeight: 800,
        color: "#FFFFFF",
        fontFamily: "var(--font-heading)",
        letterSpacing: "-0.03em",
        lineHeight: 1,
        marginBottom: "10px",
      }}>
        {active ? displayValue : `${kpi.prefix}0${kpi.suffix}`}
      </div>

      {/* Full-width sparkline */}
      <Sparkline data={kpi.sparkData} color={kpi.color} active={active} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   4. CAMPAIGN TABLE
═══════════════════════════════════════════════════════ */
const CAMPAIGNS = [
  { name: "Summer Sale",     roas: "4.2x", spend: "₺45K", status: "active" },
  { name: "Retargeting",     roas: "5.1x", spend: "₺32K", status: "active" },
  { name: "Brand Awareness", roas: "2.8x", spend: "₺18K", status: "paused" },
];

function CampaignTable({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : {}}
      transition={{ delay: 0.7, duration: 0.45 }}
      style={{
        borderRadius: "10px",
        background: "rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 56px 58px 62px",
          padding: "8px 14px",
          background: "rgba(255,255,255,0.025)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {["Kampanya", "ROAS", "Harcama", "Durum"].map((h) => (
          <span
            key={h}
            style={{ fontSize: "9px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Data rows */}
      {CAMPAIGNS.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, x: -10 }}
          animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 56px 58px 62px",
            padding: "9px 14px",
            alignItems: "center",
            borderBottom: i < CAMPAIGNS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.78)" }}>
            {c.name}
          </span>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#22C55E", fontFamily: "var(--font-mono)" }}>
            {c.roas}
          </span>
          <span style={{ fontSize: "11px", color: "#9CA3AF", fontFamily: "var(--font-mono)" }}>
            {c.spend}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              style={{
                width: "5px", height: "5px", borderRadius: "50%", flexShrink: 0,
                background: c.status === "active" ? "#22C55E" : "#6B7280",
                boxShadow: c.status === "active" ? "0 0 6px rgba(34,197,94,0.7)" : "none",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "10px", fontWeight: 600,
                color: c.status === "active" ? "#22C55E" : "#6B7280",
              }}
            >
              {c.status === "active" ? "Aktif" : "Durdu"}
            </span>
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   5. ROAS PROGRESS BAR
═══════════════════════════════════════════════════════ */
function RoasProgress({ active }: { active: boolean }) {
  const target = 84; // 4.2x out of 5.0x = 84%

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : {}}
      transition={{ delay: 1.1, duration: 0.4 }}
    >
      {/* Labels */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#9CA3AF" }}>ROAS Hedefi</span>
          <span style={{ fontSize: "11px", color: "rgba(156,163,175,0.5)", marginLeft: "6px" }}>4.2x → 5.0x</span>
        </div>
        <span style={{ fontSize: "13px", fontWeight: 800, color: "#22C55E", fontFamily: "var(--font-heading)" }}>
          {target}%
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          height: "7px",
          borderRadius: "99px",
          background: "rgba(255,255,255,0.07)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Fill */}
        <motion.div
          style={{
            height: "100%",
            borderRadius: "99px",
            background: "linear-gradient(90deg, #6366F1 0%, #22C55E 100%)",
            boxShadow: "0 0 12px rgba(34,197,94,0.55)",
            position: "relative",
          }}
          initial={{ width: "0%" }}
          animate={active ? { width: `${target}%` } : {}}
          transition={{ delay: 1.2, duration: 1.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
        >
          {/* Shimmer sweep */}
          <motion.div
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
              backgroundSize: "60% 100%",
            }}
            animate={active ? { backgroundPosition: ["-60% 0", "160% 0"] } : {}}
            transition={{ delay: 2.4, duration: 1.2, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Scale ticks */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
        {["0x", "1x", "2x", "3x", "4x", "5x"].map((t) => (
          <span key={t} style={{ fontSize: "9px", color: "rgba(156,163,175,0.35)" }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   DASHBOARD SHELL — assembles all elements
═══════════════════════════════════════════════════════ */
export default function KpiDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef, { once: true, margin: "-40px" });

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* Outer ambient glow halo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-28px",
          borderRadius: "32px",
          background:
            "radial-gradient(ellipse at 40% 30%, rgba(99,102,241,0.14) 0%, rgba(34,197,94,0.07) 55%, transparent 75%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Main glassmorphic card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "linear-gradient(150deg, rgba(17,24,39,0.97) 0%, rgba(11,15,26,0.94) 100%)",
          border: "1px solid rgba(99,102,241,0.22)",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: [
            "0 0 0 1px rgba(34,197,94,0.04)",
            "0 40px 100px rgba(0,0,0,0.55)",
            "inset 0 1px 0 rgba(255,255,255,0.06)",
          ].join(", "),
        }}
      >
        {/* Top inner highlight line */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0, left: "15%", right: "15%", height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.65), rgba(34,197,94,0.45), transparent)",
          }}
        />

        {/* ── HEADER BAR ── */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* App icon */}
            <div
              style={{
                width: "30px", height: "30px",
                borderRadius: "9px",
                background: "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(34,197,94,0.25))",
                border: "1px solid rgba(99,102,241,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Activity size={14} style={{ color: "#22C55E" }} />
            </div>

            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-heading)", lineHeight: 1.2 }}>
                Performance Dashboard
              </div>
              <div style={{ fontSize: "10px", color: "#9CA3AF", marginTop: "1px" }}>Son 90 gün · Tüm kampanyalar</div>
            </div>
          </div>

          {/* Right: live badge + signal */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <motion.span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "#22C55E",
                  boxShadow: "0 0 8px rgba(34,197,94,0.8)",
                }}
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <span style={{ fontSize: "10px", fontWeight: 700, color: "#22C55E", letterSpacing: "0.06em" }}>LIVE</span>
            </div>
            <Wifi size={13} style={{ color: "#9CA3AF", opacity: 0.4 }} aria-hidden />
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{ padding: "20px 20px 22px", display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Revenue headline */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "4px" }}>
                Toplam Gelir
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span style={{
                  fontSize: "30px", fontWeight: 800, color: "#FFFFFF",
                  fontFamily: "var(--font-heading)", letterSpacing: "-0.03em",
                }}>
                  ₺1.24M
                </span>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "3px",
                  fontSize: "12px", fontWeight: 700, color: "#22C55E",
                  background: "rgba(34,197,94,0.12)",
                  padding: "3px 9px", borderRadius: "99px",
                }}>
                  <TrendingUp size={10} />
                  +120%
                </span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "10px", color: "#9CA3AF", marginBottom: "2px" }}>Geçen dönem</p>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-mono)" }}>
                ₺564K
              </span>
            </div>
          </div>

          {/* ① Main revenue chart */}
          <MainChart active={isVisible} />

          {/* ② KPI grid — 2 × 2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {KPI_DATA.map((kpi, i) => (
              <KpiCard key={kpi.label} kpi={kpi} active={isVisible} delay={0.25 + i * 0.08} />
            ))}
          </div>

          {/* ③ Campaign table */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{
                fontSize: "11px", fontWeight: 700,
                color: "rgba(255,255,255,0.45)",
                textTransform: "uppercase", letterSpacing: "0.09em",
              }}>
                Aktif Kampanyalar
              </span>
              <MoreHorizontal size={15} style={{ color: "#9CA3AF", opacity: 0.4 }} aria-hidden />
            </div>
            <CampaignTable active={isVisible} />
          </div>

          {/* ④ Progress bar */}
          <RoasProgress active={isVisible} />
        </div>
      </div>
    </div>
  );
}
