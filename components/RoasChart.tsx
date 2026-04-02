"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrambleText from "@/components/ScrambleText";

// ROAS değerleri: hafta 0-12, başlangıç 1.8x → 6.4x
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

  const weeks = ["Başlangıç", "H4", "H8", "H12"];
  const yLabels = [2, 3, 4, 5, 6];
  const minV = Math.min(...roasData) - 0.3;
  const maxV = Math.max(...roasData) + 0.3;

  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden border-t border-border/20" ref={ref}>
      <div className="absolute inset-0 bg-[#0d2018]/40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Sol: metin */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-mono text-foreground/20 tracking-[0.3em] mb-3">003/</p>
            <span className="inline-block mb-4 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
              Kanıtlanmış Büyüme
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
              <ScrambleText text="ROAS 12 haftada" duration={700} />{" "}
              <span className="bg-gradient-to-r from-brand to-emerald-400 bg-clip-text text-transparent">
                <ScrambleText text="3.5x büyüdü" delay={200} duration={700} />
              </span>
            </h2>
            <p className="text-foreground/55 text-sm font-light leading-relaxed mb-4">
              Lumière Skin için yürüttüğümüz kampanya optimizasyon sürecinden gerçek veri.
              1.8x ile başladık, 12. haftada 6.4x'e ulaştık.
            </p>
            <div className="flex gap-6 mb-8">
              <div>
                <div className="text-2xl font-bold text-brand">1.8x</div>
                <div className="text-xs text-foreground/40 font-light mt-0.5">Başlangıç ROAS</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="text-2xl font-bold text-emerald-400">6.4x</div>
                <div className="text-xs text-foreground/40 font-light mt-0.5">Hafta 12 ROAS</div>
              </div>
              <div className="w-px bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">%256</div>
                <div className="text-xs text-foreground/40 font-light mt-0.5">Toplam Artış</div>
              </div>
            </div>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-[#0b1a12] text-sm font-semibold hover:bg-brand/90 transition-all hover:shadow-lg hover:shadow-brand/30"
            >
              Siz de Bu Sonuçlara Ulaşın
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Sağ: Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-border/60 bg-background/60 backdrop-blur-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-foreground/50 font-medium">ROAS Büyüme Grafiği</p>
              <span className="text-[10px] px-2 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand font-medium">12 hafta</span>
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="roasGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B4FF00" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#B4FF00" stopOpacity="0" />
                </linearGradient>
                <clipPath id="roasClip">
                  <motion.rect
                    x={PAD.left}
                    y={0}
                    height={H}
                    initial={{ width: 0 }}
                    animate={inView ? { width: W - PAD.left - PAD.right } : { width: 0 }}
                    transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
                  />
                </clipPath>
              </defs>

              {/* Y grid lines */}
              {yLabels.map((v) => {
                const y = PAD.top + (1 - (v - minV) / (maxV - minV)) * (H - PAD.top - PAD.bottom);
                return (
                  <g key={v}>
                    <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#1c3822" strokeWidth="1" />
                    <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#4a7a56">{v}x</text>
                  </g>
                );
              })}

              {/* X labels */}
              {weeks.map((w, i) => {
                const idx = i === 0 ? 0 : i === 1 ? 4 : i === 2 ? 8 : 12;
                const x = PAD.left + (idx / (roasData.length - 1)) * (W - PAD.left - PAD.right);
                return (
                  <text key={w} x={x} y={H - 4} textAnchor="middle" fontSize="9" fill="#4a7a56">{w}</text>
                );
              })}

              {/* Area fill */}
              <path d={areaD} fill="url(#roasGrad)" clipPath="url(#roasClip)" />

              {/* Line */}
              <path d={lineD} fill="none" stroke="#B4FF00" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" clipPath="url(#roasClip)" />

              {/* Start dot */}
              <motion.circle
                cx={pts[0].x} cy={pts[0].y} r={5}
                fill="#0b1a12" stroke="#B4FF00" strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3 }}
              />
              {/* End dot */}
              <motion.circle
                cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r={5}
                fill="#0b1a12" stroke="#34d399" strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 2.0 }}
              />
              {/* End label */}
              <motion.text
                x={pts[pts.length - 1].x - 4}
                y={pts[pts.length - 1].y - 10}
                textAnchor="middle" fontSize="10" fontWeight="700" fill="#34d399"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 2.1 }}
              >
                6.4x
              </motion.text>
            </svg>

            <p className="text-[10px] text-foreground/25 mt-3 text-center font-light">
              Gerçek kampanya verisi · Lumière Skin · 2024
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
