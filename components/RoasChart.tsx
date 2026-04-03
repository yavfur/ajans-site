"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const roasData = [1.8, 2.0, 2.3, 2.1, 2.8, 3.2, 3.6, 3.9, 4.5, 5.0, 5.6, 6.1, 6.4];
const W = 560;
const H = 180;
const PAD = { top: 20, right: 20, bottom: 30, left: 40 };

function toSvg(data: number[]) {
  const minV = Math.min(...data) - 0.3;
  const maxV = Math.max(...data) + 0.3;
  return data.map((v, i) => {
    const x = PAD.left + (i / (data.length - 1)) * (W - PAD.left - PAD.right);
    const y = PAD.top + (1 - (v - minV) / (maxV - minV)) * (H - PAD.top - PAD.bottom);
    return { x, y, v };
  });
}

export default function RoasChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const pts = toSvg(roasData);
  const lineD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `M ${pts[0].x} ${H - PAD.bottom} ` + pts.map(p => `L ${p.x} ${p.y}`).join(" ") + ` L ${pts[pts.length - 1].x} ${H - PAD.bottom} Z`;
  const yLabels = [2, 3, 4, 5, 6];
  const minV = Math.min(...roasData) - 0.3;
  const maxV = Math.max(...roasData) + 0.3;
  const weeks = ["Başlangıç", "H4", "H8", "H12"];

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 bg-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold text-brand tracking-[0.2em] uppercase mb-3">003 — Kanıtlanmış Büyüme</p>
            <h2 className="text-[clamp(24px,4vw,40px)] font-bold text-foreground mb-5">
              ROAS 12 haftada 3.5x büyüdü
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Lumière Skin için yürüttüğümüz kampanya optimizasyon sürecinden gerçek veri.
              1.8x ile başladık, 12. haftada 6.4x'e ulaştık.
            </p>

            <div className="flex gap-8 mb-8">
              {[
                { value: "1.8x", label: "Başlangıç ROAS", color: "text-muted-foreground" },
                { value: "6.4x", label: "Hafta 12 ROAS", color: "text-brand" },
                { value: "%256", label: "Toplam Artış", color: "text-foreground" },
              ].map((s) => (
                <div key={s.label}>
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand/90 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Siz de Bu Sonuçlara Ulaşın
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="rounded-2xl border border-border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-foreground">ROAS Büyüme Grafiği</p>
              <span className="text-xs px-2.5 py-1 rounded-full bg-brand/8 text-brand font-medium">12 hafta</span>
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="roasGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0A2540" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#0A2540" stopOpacity="0" />
                </linearGradient>
                <clipPath id="roasClip">
                  <motion.rect
                    x={PAD.left} y={0} height={H}
                    initial={{ width: 0 }}
                    animate={inView ? { width: W - PAD.left - PAD.right } : { width: 0 }}
                    transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
                  />
                </clipPath>
              </defs>

              {yLabels.map((v) => {
                const y = PAD.top + (1 - (v - minV) / (maxV - minV)) * (H - PAD.top - PAD.bottom);
                return (
                  <g key={v}>
                    <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#e5e7eb" strokeWidth="1" />
                    <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#999">{v}x</text>
                  </g>
                );
              })}

              {weeks.map((w, i) => {
                const idx = i === 0 ? 0 : i === 1 ? 4 : i === 2 ? 8 : 12;
                const x = PAD.left + (idx / (roasData.length - 1)) * (W - PAD.left - PAD.right);
                return <text key={w} x={x} y={H - 4} textAnchor="middle" fontSize="9" fill="#999">{w}</text>;
              })}

              <path d={areaD} fill="url(#roasGrad)" clipPath="url(#roasClip)" />
              <path d={lineD} fill="none" stroke="#0A2540" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" clipPath="url(#roasClip)" />

              <motion.circle cx={pts[0].x} cy={pts[0].y} r={4} fill="white" stroke="#0A2540" strokeWidth="2"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.3 }} />
              <motion.circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r={5} fill="#0A2540" stroke="white" strokeWidth="2"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 2.0 }} />
              <motion.text x={pts[pts.length - 1].x - 4} y={pts[pts.length - 1].y - 12}
                textAnchor="middle" fontSize="11" fontWeight="700" fill="#0A2540"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 2.1 }}>
                6.4x
              </motion.text>
            </svg>

            <p className="text-[11px] text-muted-foreground mt-3 text-center">
              Gerçek kampanya verisi · Lumière Skin · 2024
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
