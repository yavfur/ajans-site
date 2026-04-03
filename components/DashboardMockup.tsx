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
          <stop offset="0%" stopColor="#0A2540" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0A2540" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#chartGrad)" />
      <polyline points={pts} fill="none" stroke="#0A2540" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export default function DashboardMockup() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto select-none">
      {/* Shadow glow — desktop only */}
      <div className="hidden lg:block absolute -inset-4 bg-brand/5 rounded-3xl blur-2xl pointer-events-none" />

      {/* Browser chrome */}
      <div className="relative rounded-2xl border border-border bg-white shadow-xl shadow-black/8 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/60">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          </div>
          <div className="flex-1 mx-3 h-5 rounded-md bg-border/60 flex items-center px-2">
            <span className="text-[9px] text-muted-foreground/60 font-mono">dashboard.ajans.com</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-brand/10 text-brand font-medium">Demo</span>
        </div>

        {/* Dashboard content */}
        <div className="p-4 space-y-3 bg-white">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "ROAS", value: "6.4x", delta: "+18%", up: true, color: "text-brand" },
              { label: "CPA", value: "₺42", delta: "-12%", up: false, color: "text-emerald-600" },
              { label: "CTR", value: "3.8%", delta: "+0.4%", up: true, color: "text-brand" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-muted/40 p-2.5">
                <p className="text-[9px] text-muted-foreground mb-1">{s.label}</p>
                <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {s.up ? (
                    <TrendingUp size={9} className="text-emerald-600" />
                  ) : (
                    <TrendingDown size={9} className="text-emerald-600" />
                  )}
                  <span className="text-[8px] text-emerald-600">{s.delta}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-xl border border-border bg-white p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] text-muted-foreground font-medium">Gelir Trendi</span>
              <span className="text-[8px] text-muted-foreground/60">Son 12 hafta</span>
            </div>
            <div className="h-[80px]">
              <MiniChart />
            </div>
          </div>

          {/* Campaign table */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-3 py-2 border-b border-border bg-muted/30">
              <span className="text-[9px] text-muted-foreground font-medium">Kampanyalar</span>
            </div>
            {[
              { name: "Meta — Retargeting", roas: "8.2x", spend: "₺4.200", status: "Aktif" },
              { name: "Google — Shopping", roas: "5.9x", spend: "₺3.100", status: "Aktif" },
              { name: "Meta — Prospecting", roas: "4.1x", spend: "₺2.800", status: "Test" },
            ].map((r) => (
              <div key={r.name} className="flex items-center gap-2 px-3 py-1.5 border-b border-border/50 last:border-0 bg-white">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-[9px] text-muted-foreground flex-1 truncate">{r.name}</span>
                <span className="text-[9px] font-semibold text-brand">{r.roas}</span>
                <span className="text-[9px] text-muted-foreground/60">{r.spend}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo badge */}
        <div className="absolute bottom-3 right-3">
          <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-muted border border-border text-muted-foreground/50">
            örnek veri
          </span>
        </div>
      </div>
    </div>
  );
}
