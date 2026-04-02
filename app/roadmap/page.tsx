"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Database, FlaskConical, TrendingUp, RefreshCw, ArrowRight, CheckCircle } from "lucide-react";
import ScrambleText from "@/components/ScrambleText";

const phases = [
  {
    phase: "PHASE 1",
    icon: Database,
    title: "Veri Altyapısının Kurulması",
    desc: "Reklam performansını doğru ölçmek için tüm sistemler kurulur. Veri olmadan karar alınamaz.",
    items: ["Tracking kurulumu", "Pixel entegrasyonu", "Veri doğrulama"],
    color: "text-brand",
    bg: "bg-brand/10 border-brand/20",
    bar: "bg-brand",
    duration: "Hafta 1–2",
  },
  {
    phase: "PHASE 2",
    icon: FlaskConical,
    title: "Test Süreci",
    desc: "Hangi stratejinin çalıştığını anlamak için farklı senaryolar test edilir.",
    items: ["Kreatif testleri", "Hedef kitle testleri", "Funnel analizleri"],
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    bar: "bg-violet-400",
    duration: "Hafta 3–6",
  },
  {
    phase: "PHASE 3",
    icon: TrendingUp,
    title: "Ölçekleme",
    desc: "Performans veren kampanyalar büyütülür. Kazananlar belirlenir ve bütçe artırılır.",
    items: ["Bütçe artırımı", "Kazanan kampanyaların genişletilmesi", "Yeni kitle keşfi"],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    bar: "bg-emerald-400",
    duration: "Ay 2–3",
  },
  {
    phase: "PHASE 4",
    icon: RefreshCw,
    title: "Sürekli İyileştirme",
    desc: "Veriler analiz edilerek performans sürekli artırılır. Durağan olmak geri kalmak demektir.",
    items: ["ROAS artırma", "CPA düşürme", "Funnel geliştirme"],
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    bar: "bg-amber-400",
    duration: "Sürekli",
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
            Büyüme Yol Haritası
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4 leading-tight">
            <ScrambleText text="Büyüme" delay={200} duration={600} trigger={true} />{" "}
            <span className="bg-gradient-to-r from-brand to-violet-400 bg-clip-text text-transparent">
              <ScrambleText text="Yol Haritamız" delay={400} duration={700} trigger={true} />
            </span>
          </h1>
          <p className="text-foreground/50 text-base leading-relaxed max-w-lg mx-auto">
            Her müşteri için aynı sistemi uyguluyoruz — veri topla, test et, ölçekle, optimize et.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-brand/40 via-border to-transparent" />

          <div className="flex flex-col gap-6">
            {phases.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.phase}
                  className="flex gap-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Icon dot */}
                  <div className="relative shrink-0 flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center z-10 ${p.bg}`}>
                      <Icon size={18} className={p.color} />
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`flex-1 mb-2 p-6 rounded-2xl border bg-background hover:shadow-lg transition-all duration-300 ${p.bg}`}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className={`text-[10px] font-bold tracking-widest uppercase ${p.color}`}>{p.phase}</span>
                        <h3 className="text-lg font-bold text-foreground mt-0.5">{p.title}</h3>
                      </div>
                      <span className="shrink-0 px-2.5 py-1 rounded-full bg-muted border border-border text-xs text-foreground/40">
                        {p.duration}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/55 leading-relaxed mb-4">{p.desc}</p>
                    <ul className="flex flex-col gap-2">
                      {p.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-foreground/60">
                          <CheckCircle size={13} className={p.color} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14 p-8 rounded-2xl border border-brand/20 bg-brand/5 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-foreground mb-2">Bu süreç sizin için de geçerli</h3>
          <p className="text-foreground/50 text-sm mb-6">Ücretsiz görüşmede markanız için yol haritasını birlikte çizelim.</p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand text-[#0b1a12] font-semibold text-sm hover:bg-brand/90 transition-all hover:shadow-lg hover:shadow-brand/30 hover:-translate-y-0.5"
          >
            Ücretsiz Analiz Al
            <ArrowRight size={15} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
