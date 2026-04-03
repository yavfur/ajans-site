"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

const chartPoints = [30, 45, 38, 60, 52, 75, 68, 90, 82, 95, 88, 110];
const maxVal = Math.max(...chartPoints);
const W = 280;
const H = 80;

function MiniChart() {
  const pts = chartPoints
    .map((v, i) => {
      const x = (i / (chartPoints.length - 1)) * W;
      const y = H - (v / maxVal) * H;
      return `${x},${y}`;
    })
    .join(" ");
  const area = `0,${H} ${pts} ${W},${H}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B4FF00" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#B4FF00" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#chartGrad)" />
      <polyline points={pts} fill="none" stroke="#B4FF00" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export default function DashboardMockup() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto select-none">
      {/* Glow — desktop only */}
      <div className="hidden lg:block absolute -inset-4 bg-brand/10 rounded-3xl blur-2xl pointer-events-none" />

      {/* Browser chrome */}
      <div className="relative rounded-2xl border border-border/60 bg-background shadow-2xl shadow-black/40 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <div className="flex-1 mx-3 h-5 rounded-md bg-muted/60 flex items-center px-2">
            <span className="text-[9px] text-foreground/30 font-mono">dashboard.ajans.com</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-brand/15 text-brand font-medium">Demo</span>
        </div>

        {/* Dashboard content */}
        <div className="p-4 space-y-3">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "ROAS", value: "6.4x", delta: "+18%", up: true, color: "text-emerald-400" },
              { label: "CPA", value: "₺42", delta: "-12%", up: false, color: "text-brand" },
              { label: "CTR", value: "3.8%", delta: "+0.4%", up: true, color: "text-violet-400" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border/50 bg-muted/40 p-2.5">
                <p className="text-[9px] text-foreground/40 mb-1">{s.label}</p>
                <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {s.up ? (
                    <TrendingUp size={9} className="text-emerald-400" />
                  ) : (
                    <TrendingDown size={9} className="text-emerald-400" />
                  )}
                  <span className="text-[8px] text-emerald-400">{s.delta}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-xl border border-border/50 bg-muted/40 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] text-foreground/50 font-medium">Gelir Trendi</span>
              <span className="text-[8px] text-foreground/30">Son 12 hafta</span>
            </div>
            <div className="h-[80px]">
              <MiniChart />
            </div>
          </div>

          {/* Campaign table */}
          <div className="rounded-xl border border-border/50 bg-muted/40 overflow-hidden">
            <div className="px-3 py-2 border-b border-border/40">
              <span className="text-[9px] text-foreground/50 font-medium">Kampanyalar</span>
            </div>
            {[
              { name: "Meta — Retargeting", roas: "8.2x", spend: "₺4.200", status: "Aktif" },
              { name: "Google — Shopping", roas: "5.9x", spend: "₺3.100", status: "Aktif" },
              { name: "Meta — Prospecting", roas: "4.1x", spend: "₺2.800", status: "Test" },
            ].map((r) => (
              <div key={r.name} className="flex items-center gap-2 px-3 py-1.5 border-b border-border/20 last:border-0">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-[9px] text-foreground/60 flex-1 truncate">{r.name}</span>
                <span className="text-[9px] font-semibold text-brand">{r.roas}</span>
                <span className="text-[9px] text-foreground/35">{r.spend}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo overlay hint */}
        <div className="absolute bottom-3 right-3">
          <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-muted border border-border text-foreground/25">
            örnek veri
          </span>
        </div>
      </div>
    </div>
  );
}
