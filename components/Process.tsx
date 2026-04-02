"use client";

import { motion } from "framer-motion";
import { Database, Lightbulb, Rocket, BarChart2, RefreshCw } from "lucide-react";
import ScrambleText from "@/components/ScrambleText";

const steps = [
  {
    num: "01",
    icon: Database,
    title: "Veri Analizi",
    description: "Mevcut kampanyalarınız, rakipleriniz ve hedef kitleniz analiz edilir. Doğru veri olmadan doğru karar alınamaz.",
    color: "text-brand",
    bg: "bg-brand/10 border-brand/20",
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Strateji Oluşturma",
    description: "Veriye dayalı büyüme haritası hazırlanır. Hangi kanal, hangi bütçe, hangi hedef kitle — her şey yazılı.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Kampanya Kurulumu",
    description: "Tracking, pixel, kampanyalar ve içerik takvimi ilk 2 haftada hazır. Geç kalmak yok.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    num: "04",
    icon: BarChart2,
    title: "Performans Takibi",
    description: "Haftalık raporlar ve anlık dashboard. Ne yaptığımızı ve neden yaptığımızı her zaman görürsünüz.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    num: "05",
    icon: RefreshCw,
    title: "Sürekli Optimizasyon",
    description: "Neyin işe yaradığını çoğaltıyor, neyin yaramadığını kesiyoruz. Duygusal değil, tamamen veri odaklı.",
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/20",
  },
];

export default function Process() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-border" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] font-mono text-foreground/20 tracking-[0.3em] mb-3">002/</p>
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
            Sürecimiz
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            <ScrambleText text="5 adımda büyüme sistemi" duration={900} />
          </h2>
          <p className="text-foreground/50 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            Her adımda ne yapıldığını bilirsiniz. Sürpriz yok, gecikme yok.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector */}
          <div className="absolute left-[27px] md:left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-border via-border/50 to-transparent hidden sm:block" style={{ transform: "translateX(-0.5px)" }} />

          <div className="flex flex-col gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  className={`relative flex items-start gap-4 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] as const }}
                >
                  {/* Card */}
                  <div className={`flex-1 md:max-w-[calc(50%-2rem)] ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                    <div className={`group p-5 rounded-2xl border bg-background hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${step.bg}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${step.bg}`}>
                          <Icon size={16} className={step.color} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-foreground/25">{step.num}</span>
                          <h3 className="text-sm font-semibold text-foreground leading-tight">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/55 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Center dot — md only */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background border-2 border-brand items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-brand" />
                  </div>

                  {/* Empty half */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
