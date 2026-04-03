"use client";

import { motion } from "framer-motion";
import { BarChart2, Lightbulb, RefreshCw } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: BarChart2,
    title: "Analiz Et",
    description: "Mevcut kampanyalarınızı, rakiplerinizi ve hedef kitlenizi derinlemesine analiz ediyoruz.",
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Stratejik Planla",
    description: "Veriye dayalı büyüme haritası hazırlıyoruz. Her kanal, bütçe ve hedef kitle yazılı olarak belirleniyor.",
  },
  {
    num: "03",
    icon: RefreshCw,
    title: "Sürekli Optimize Et",
    description: "Haftalık raporlar ve anlık dashboard ile neyin işe yaradığını çoğaltıyor, yaramayanı kesiyoruz.",
  },
];

export default function Process() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 bg-muted/40">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold text-brand tracking-[0.2em] uppercase mb-3">002 — Sürecimiz</p>
          <h2 className="text-[clamp(24px,4vw,40px)] font-bold text-foreground mb-4">
            3 adımda büyüme sistemi
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Her adımda ne yapıldığını bilirsiniz. Sürpriz yok, gecikme yok.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                className="relative p-8 rounded-2xl bg-white border border-border hover:border-brand/20 hover:shadow-md transition-all duration-300"
              >
                {/* Step number */}
                <span className="text-[11px] font-mono font-semibold text-brand/40 tracking-widest mb-4 block">{step.num}</span>

                <div className="w-11 h-11 rounded-xl bg-brand/8 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-brand" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>

                {/* Connector line — desktop only */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-[3.5rem] -right-4 w-8 h-px bg-border z-10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
