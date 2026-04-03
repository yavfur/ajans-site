"use client";

import { useRef, useEffect, useState, useId } from "react";
import { motion, useInView, useAnimationControls } from "framer-motion";
import { TrendingUp, Activity, Wifi, MoreHorizontal } from "lucide-react";

/* ═══════════════════════════════════════
   UTILITIES
═══════════════════════════════════════ */
function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], c = pts[i];
    const cx = (p[0] + c[0]) / 2;
    d += ` C ${cx},${p[1]} ${cx},${c[1]} ${c[0]},${c[1]}`;
  }
  return d;
}

function normalize(data: number[], w: number, h: number, pad = 6): [number, number][] {
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  return data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - pad - ((v - mn) / rng) * (h - pad * 2),
  ]);
}

function useCountUp(target: number, active: boolean, dur = 1.4, dec = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let t0: number | null = null;
    const fac = Math.pow(10, dec);
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / (dur * 1000), 1);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(e * target * fac) / fac);
      if (p < 1) requestAnimationFrame(tick); else setV(target);
    };
    requestAnimationFrame(tick);
  }, [active, target, dur, dec]);
  return v;
}

/* ═══════════════════════════════════════
   1. MAIN REVENUE CHART
═══════════════════════════════════════ */
const revenueData = [28, 35, 32, 48, 52, 46, 68, 74, 82, 78, 95, 110, 108, 125, 138, 132, 155, 168, 172, 190];

function MainChart({ active }: { active: boolean }) {
  const id = useId().replace(/:/g, "");
  const W = 500, H = 120;
  const pts = normalize(revenueData, W, H, 8);
  const line = smoothPath(pts);
  const area = line + ` L ${W},${H} L 0,${H} Z`;

  // X-axis labels
  const months = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem"];

  return (
    <div style={{ position: "relative" }}>
      {/* Y-axis labels */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {["₺200K", "₺150K", "₺100K", "₺50K"].map((l) => (
          <span key={l} style={{ fontSize: "10px", color: "rgba(156,163,175,0.5)", lineHeight: 1 }}>{l}</span>
        ))}
      </div>

      <div style={{ marginLeft: "42px" }}>
        <svg
          width="100%" height={H}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id={`mg-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
            <linearGradient id={`ma-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#22C55E" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
            </linearGradient>
            {/* Glow filter */}
            <filter id={`glow-${id}`}>
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((p) => (
            <line key={p} x1={0} y1={H * p} x2={W} y2={H * p}
              stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}

          {/* Area */}
          <motion.path
            d={area} fill={`url(#ma-${id})`}
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          {/* Line with glow */}
          <motion.path
            d={line} fill="none"
            stroke={`url(#mg-${id})`} strokeWidth="2.5"
            strokeLinecap="round" filter={`url(#glow-${id})`}
            initial={{ pathLength: 0 }}
            animate={active ? { pathLength: 1 } : {}}
            transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Last point pulse */}
          <motion.circle
            cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={4}
            fill="#22C55E"
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.3 }}
          />
          <motion.circle
            cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={8}
            fill="none" stroke="#22C55E" strokeWidth="1.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: [0, 1.4, 1], opacity: [0, 0.5, 0] } : {}}
            transition={{ delay: 1.7, duration: 1, repeat: Infinity, repeatDelay: 1.5 }}
          />
        </svg>

        {/* X-axis */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
          {months.map((m) => (
            <span key={m} style={{ fontSize: "10px", color: "rgba(156,163,175,0.4)" }}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   2. MINI SPARKLINE (per KPI card)
═══════════════════════════════════════ */
function Sparkline({ data, color = "#22C55E", active }: { data: number[]; color?: string; active: boolean }) {
  const id = useId().replace(/:/g, "");
  const W = 80, H = 28;
  const pts = normalize(data, W, H, 2);
  const line = smoothPath(pts);
  const area = line + ` L ${W},${H} L 0,${H} Z`;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sk-a-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={area} fill={`url(#sk-a-${id})`}
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }} />
      <motion.path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : {}}
        transition={{ duration: 1, ease: "easeInOut" }} />
    </svg>
  );
}

/* ═══════════════════════════════════════
   3. KPI MINI CARD
═══════════════════════════════════════ */
const kpiData = [
  { label: "ROAS", val: 4.2, dec: 1, suffix: "x", change: "+32%", data: [2.1, 2.8, 3.0, 3.4, 3.7, 4.0, 4.2], color: "#22C55E" },
  { label: "CPA", val: 38, dec: 0, prefix: "-", suffix: "%", change: "-38%", data: [100, 88, 78, 70, 63, 59, 62], color: "#22C55E" },
  { label: "Gelir", val: 120, dec: 0, prefix: "+", suffix: "%", change: "+120%", data: [30, 50, 68, 85, 98, 110, 120], color: "#6366F1" },
  { label: "CTR", val: 3.8, dec: 1, suffix: "%", change: "+0.9%", data: [1.9, 2.2, 2.6, 3.0, 3.4, 3.7, 3.8], color: "#22C55E" },
];

function KpiMiniCard({ k, active, delay }: { k: typeof kpiData[0]; active: boolean; delay: number }) {
  const [hov, setHov] = useState(false);
  const count = useCountUp(k.val, active, 1.3, k.dec);
  const display = k.dec > 0
    ? `${k.prefix ?? ""}${count.toFixed(k.dec)}${k.suffix}`
    : `${k.prefix ?? ""}${count}${k.suffix}`;

  return (
    <motion.div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      initial={{ opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.4 }}
      style={{
        padding: "12px 14px",
        borderRadius: "10px",
        background: hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? `${k.color}30` : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.2s",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hov ? `0 8px 24px ${k.color}20` : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <span style={{ fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {k.label}
        </span>
        <span style={{
          fontSize: "10px", fontWeight: 700, color: k.color,
          background: `${k.color}15`, padding: "1px 6px", borderRadius: "99px",
          display: "flex", alignItems: "center", gap: "2px",
        }}>
          <TrendingUp size={8} />
          {k.change}
        </span>
      </div>
      <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "8px" }}>
        {active ? display : `${k.prefix ?? ""}0${k.suffix}`}
      </div>
      <Sparkline data={k.data} color={k.color} active={active} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   4. CAMPAIGN TABLE
═══════════════════════════════════════ */
const campaigns = [
  { name: "Summer Sale", roas: "4.2x", spend: "₺45K", status: "active", roasNum: 4.2 },
  { name: "Retargeting", roas: "5.1x", spend: "₺32K", status: "active", roasNum: 5.1 },
  { name: "Brand Awareness", roas: "2.8x", spend: "₺18K", status: "paused", roasNum: 2.8 },
];

function CampaignTable({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : {}}
      transition={{ delay: 0.6, duration: 0.5 }}
      style={{
        borderRadius: "10px",
        background: "rgba(0,0,0,0.2)",
        border: "1px solid rgba(255,255,255,0.05)",
        overflow: "hidden",
      }}
    >
      {/* Table header */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 60px 60px 50px",
        padding: "8px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.02)",
      }}>
        {["Kampanya", "ROAS", "Harcama", ""].map((h) => (
          <span key={h} style={{ fontSize: "10px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
        ))}
      </div>

      {campaigns.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, x: -8 }}
          animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
          style={{
            display: "grid", gridTemplateColumns: "1fr 60px 60px 50px",
            padding: "9px 14px",
            borderBottom: i < campaigns.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.75)" }}>{c.name}</span>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#22C55E", fontFamily: "var(--font-mono)" }}>{c.roas}</span>
          <span style={{ fontSize: "11px", color: "#9CA3AF", fontFamily: "var(--font-mono)" }}>{c.spend}</span>
          <span style={{
            fontSize: "10px", fontWeight: 600,
            color: c.status === "active" ? "#22C55E" : "#9CA3AF",
            display: "flex", alignItems: "center", gap: "4px",
          }}>
            <span style={{
              width: "5px", height: "5px", borderRadius: "50%",
              background: c.status === "active" ? "#22C55E" : "#9CA3AF",
              boxShadow: c.status === "active" ? "0 0 6px rgba(34,197,94,0.6)" : "none",
              display: "inline-block",
            }} />
            {c.status === "active" ? "Aktif" : "Durduruldu"}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   5. PROGRESS BAR
═══════════════════════════════════════ */
function RoasProgressBar({ active }: { active: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 1, duration: 0.4 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#9CA3AF" }}>ROAS Hedefi (5.0x)</span>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "#22C55E" }}>84%</span>
      </div>
      <div style={{ height: "6px", borderRadius: "99px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <motion.div
          style={{
            height: "100%", borderRadius: "99px",
            background: "linear-gradient(90deg, #6366F1, #22C55E)",
            boxShadow: "0 0 10px rgba(34,197,94,0.5)",
          }}
          initial={{ width: "0%" }}
          animate={active ? { width: "84%" } : {}}
          transition={{ delay: 1.1, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
        <span style={{ fontSize: "10px", color: "rgba(156,163,175,0.4)" }}>0x</span>
        <span style={{ fontSize: "10px", color: "rgba(156,163,175,0.4)" }}>5.0x</span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   MAIN DASHBOARD EXPORT
═══════════════════════════════════════ */
export default function KpiDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Outer glow halo */}
      <div style={{
        position: "absolute", inset: "-20px",
        borderRadius: "28px",
        background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.12) 0%, rgba(34,197,94,0.06) 50%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Main card */}
      <div style={{
        position: "relative", zIndex: 1,
        background: "linear-gradient(145deg, rgba(17,24,39,0.98) 0%, rgba(11,15,26,0.95) 100%)",
        border: "1px solid rgba(99,102,241,0.2)",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 0 0 1px rgba(34,197,94,0.05), 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}>
        {/* Inner top glow */}
        <div style={{
          position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(34,197,94,0.4), transparent)",
        }} />

        {/* ── HEADER ── */}
        <div style={{
          padding: "16px 20px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "8px",
              background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(34,197,94,0.2))",
              border: "1px solid rgba(99,102,241,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Activity size={13} style={{ color: "#22C55E" }} />
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading)" }}>
                Performance Dashboard
              </div>
              <div style={{ fontSize: "10px", color: "#9CA3AF" }}>Son 90 gün</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <motion.span
                style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22C55E", display: "inline-block" }}
                animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span style={{ fontSize: "10px", fontWeight: 600, color: "#22C55E" }}>LIVE</span>
            </div>
            <Wifi size={13} style={{ color: "#9CA3AF", opacity: 0.5 }} />
          </div>
        </div>

        <div style={{ padding: "16px 20px 18px", display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* ── REVENUE HEADER ── */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "10px", color: "#9CA3AF", fontWeight: 500, marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Toplam Gelir
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span style={{ fontSize: "28px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading)", letterSpacing: "-0.025em" }}>
                  ₺1.24M
                </span>
                <span style={{
                  fontSize: "12px", fontWeight: 700, color: "#22C55E",
                  background: "rgba(34,197,94,0.12)", padding: "2px 8px", borderRadius: "99px",
                  display: "flex", alignItems: "center", gap: "3px",
                }}>
                  <TrendingUp size={10} />+120%
                </span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "10px", color: "#9CA3AF", marginBottom: "2px" }}>vs geçen dönem</div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mono)" }}>₺564K</div>
            </div>
          </div>

          {/* ── MAIN CHART ── */}
          <MainChart active={inView} />

          {/* ── KPI GRID ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {kpiData.map((k, i) => (
              <KpiMiniCard key={k.label} k={k} active={inView} delay={0.2 + i * 0.07} />
            ))}
          </div>

          {/* ── CAMPAIGN TABLE ── */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                Aktif Kampanyalar
              </span>
              <MoreHorizontal size={14} style={{ color: "#9CA3AF", opacity: 0.5, cursor: "pointer" }} />
            </div>
            <CampaignTable active={inView} />
          </div>

          {/* ── PROGRESS BAR ── */}
          <RoasProgressBar active={inView} />
        </div>
      </div>
    </div>
  );
}
