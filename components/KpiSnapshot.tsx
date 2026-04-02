"use client";

import { motion } from "framer-motion";
import { TrendingUp, Target, MousePointerClick, ShoppingCart } from "lucide-react";
import Link from "next/link";
import ScrambleText from "@/components/ScrambleText";

const kpis = [
  {
    icon: TrendingUp,
    label: "ROAS",
    title: "Reklam Harcama Getirisi",
    desc: "1 TL reklam → kaç TL geri dönüş",
    value: "6.4x",
    sub: "Ortalama müşteri ROAS'ı",
    color: "text-brand",
    bg: "bg-brand/10 border-brand/20",
    glow: "bg-brand/5",
  },
  {
    icon: Target,
    label: "CPA",
    title: "Müşteri Edinme Maliyeti",
    desc: "Bir müşteri kazanmanın maliyeti",
    value: "₺42",
    sub: "Ortalama CPA",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    glow: "bg-emerald-500/5",
  },
  {
    icon: MousePointerClick,
    label: "CTR",
    title: "Tıklama Oranı",
    desc: "Reklamın dikkat çekme oranı",
    value: "3.8%",
    sub: "Sektör ort. 1.2%",
    color: "text-brand",
    bg: "bg-brand/10 border-brand/20",
    glow: "bg-brand/5",
  },
  {
    icon: ShoppingCart,
    label: "CVR",
    title: "Dönüşüm Oranı",
    desc: "Ziyaretçinin müşteriye dönüşme oranı",
    value: "%4.1",
    sub: "Sektör ort. %1.8",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    glow: "bg-emerald-500/5",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function KpiSnapshot() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden border-t border-border/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] font-mono text-foreground/20 tracking-[0.3em] mb-3">001/</p>
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
            Temel Metrikler
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            <ScrambleText text="Performansınızı sayılarla yönetin" duration={900} />
          </h2>
          <p className="text-foreground/50 mt-3 max-w-lg mx-auto text-sm font-light leading-relaxed">
            Reklam bütçenizin gerçekte ne kadar çalıştığını 4 temel metrikle ölçüyoruz.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <motion.div
                key={k.label}
                variants={item}
                className={`group relative rounded-2xl border p-6 cursor-default overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-xl ${k.bg}`}
              >
                <div className={`absolute inset-0 ${k.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${k.bg} mb-4`}>
                    <Icon size={18} className={k.color} />
                  </div>
                  <p className="text-xs text-foreground/40 font-medium mb-0.5">{k.label}</p>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{k.title}</h3>
                  <p className="text-xs text-foreground/50 font-light mb-4 leading-relaxed">{k.desc}</p>
                  <div className={`text-3xl font-bold tracking-tight ${k.color}`}>{k.value}</div>
                  <p className="text-xs text-foreground/30 mt-1">{k.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/kpi" className="text-sm text-foreground/40 hover:text-brand transition-colors underline underline-offset-4">
            Bu metrikleri nasıl ölçüyoruz? →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
