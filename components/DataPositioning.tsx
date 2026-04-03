"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BrainCircuit } from "lucide-react";
import ScrambleText from "@/components/ScrambleText";

const vars = [
  "Hedef kitle segmentasyonu",
  "Reklam zamanlaması",
  "Bütçe dağılımı",
  "Creative rotasyonu",
  "Funnel analizi",
  "Attribution modeli",
  "Sezonsal trendler",
  "Rakip analizi",
];

export default function DataPositioning() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden bg-foreground/[0.03]">
      {/* Dark bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/8 via-transparent to-transparent pointer-events-none" />
      <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand/6 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Sol */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-mono text-foreground/20 tracking-[0.3em] mb-3">003/</p>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium">
              <BrainCircuit size={13} />
              Veri Altyapısı
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
              <ScrambleText text="Her karar" duration={700} />{" "}
              <span className="bg-gradient-to-r from-brand to-emerald-400 bg-clip-text text-transparent">
                <ScrambleText text="veriye dayanır" delay={200} duration={800} />
              </span>
            </h2>
            <p className="text-foreground/55 text-sm leading-relaxed mb-4">
              Bu süreç onlarca değişkenden oluşur ve sürekli optimizasyon gerektirir.
              Biz bu süreci sizin için yönetiyoruz.
            </p>
            <p className="text-foreground/40 text-xs leading-relaxed mb-8">
              Veriler günlük olarak güncellenir. Tüm süreç şeffaftır.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-[#0b1a12] text-sm font-semibold hover:bg-brand/90 transition-all duration-200 hover:shadow-lg hover:shadow-brand/30"
            >
              Ücretsiz Analiz Talep Et
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Sağ: değişken pill'leri */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {vars.map((v, i) => (
              <motion.span
                key={v}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                className="px-3 py-2 rounded-xl border border-border bg-background/60 text-xs text-foreground/60 backdrop-blur-sm hover:border-brand/40 hover:text-foreground transition-all duration-200 cursor-default"
              >
                {v}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="px-3 py-2 rounded-xl border border-dashed border-brand/30 text-xs text-brand/50"
            >
              +onlarca değişken
            </motion.span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
