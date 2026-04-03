"use client";

import { motion } from "framer-motion";
import { TrendingUp, Target, MousePointerClick, ShoppingCart } from "lucide-react";
import Link from "next/link";

const kpis = [
  {
    icon: TrendingUp,
    label: "ROAS",
    title: "Reklam Harcama Getirisi",
    desc: "1 TL reklam → kaç TL geri dönüş",
    value: "6.4x",
    sub: "Ortalama müşteri ROAS'ı",
  },
  {
    icon: Target,
    label: "CPA",
    title: "Müşteri Edinme Maliyeti",
    desc: "Bir müşteri kazanmanın maliyeti",
    value: "₺42",
    sub: "Ortalama CPA",
  },
  {
    icon: MousePointerClick,
    label: "CTR",
    title: "Tıklama Oranı",
    desc: "Reklamın dikkat çekme oranı",
    value: "3.8%",
    sub: "Sektör ort. 1.2%",
  },
  {
    icon: ShoppingCart,
    label: "CVR",
    title: "Dönüşüm Oranı",
    desc: "Ziyaretçinin müşteriye dönüşme oranı",
    value: "%4.1",
    sub: "Sektör ort. %1.8",
  },
];

export default function KpiSnapshot() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold text-brand tracking-[0.2em] uppercase mb-3">001 — Temel Metrikler</p>
          <h2 className="text-[clamp(24px,4vw,40px)] font-bold text-foreground mb-4">
            Performansınızı sayılarla yönetin
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Reklam bütçenizin gerçekte ne kadar çalıştığını 4 temel metrikle ölçüyoruz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpis.map((k, i) => {
            const Icon = k.icon;
            return (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
                className="p-6 rounded-2xl border border-border bg-white hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-brand/8 flex items-center justify-center mb-5">
                  <Icon size={18} className="text-brand" />
                </div>
                <p className="text-xs text-muted-foreground font-medium mb-0.5">{k.label}</p>
                <h3 className="text-sm font-semibold text-foreground mb-1">{k.title}</h3>
                <p className="text-xs text-muted-foreground mb-5 leading-relaxed">{k.desc}</p>
                <div className="text-3xl font-bold text-brand">{k.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{k.sub}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link href="/kpi" className="text-sm text-muted-foreground hover:text-brand transition-colors underline underline-offset-4">
            Bu metrikleri nasıl ölçüyoruz? →
          </Link>
        </div>
      </div>
    </section>
  );
}
