"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const cases = [
  {
    brand: "Lumière Skin",
    sector: "Kozmetik & Cilt Bakımı",
    tag: "Meta Ads + Content",
    challenge: "Yüksek CPA ve düşük ROAS.",
    solution: "Kreatif A/B testleri, audience segmentasyonu ve retargeting funnel kurulumu.",
    metrics: [
      { label: "ROAS", value: "6.4x" },
      { label: "CPA Düşüşü", value: "%54" },
      { label: "Ciro Artışı", value: "%218" },
    ],
  },
  {
    brand: "StepUp Ayakkabı",
    sector: "Moda & E-ticaret",
    tag: "Shopify + Trendyol",
    challenge: "Trendyol'da görünürlük sorunu ve yüksek iade oranı.",
    solution: "Listing optimizasyonu, kampanya yeniden yapılandırma ve iade analizi.",
    metrics: [
      { label: "Satış Artışı", value: "%312" },
      { label: "İade Düşüşü", value: "%38" },
      { label: "AOV Artışı", value: "+%67" },
    ],
  },
  {
    brand: "NutriBox",
    sector: "Sağlık & Gıda",
    tag: "Sosyal Medya + Ads",
    challenge: "Sıfırdan marka bilinirliği ve abonelik büyütme.",
    solution: "İçerik takvimi, influencer ortaklıkları ve Meta Ads funnel kurulumu.",
    metrics: [
      { label: "Aktif Abone", value: "12K+" },
      { label: "Instagram", value: "%840" },
      { label: "CAC", value: "₺28" },
    ],
  },
];

export default function CaseStudies() {
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
          <p className="text-xs font-semibold text-brand tracking-[0.2em] uppercase mb-3">004 — Sonuçlarımız</p>
          <h2 className="text-[clamp(24px,4vw,40px)] font-bold text-foreground mb-4">
            Rakamlarla konuşuyoruz
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Her marka farklıdır. Yaklaşımımız her zaman veriye ve sonuca dayanır.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.brand}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              className="rounded-2xl border border-border bg-white hover:border-brand/25 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              {/* Top accent line */}
              <div className="h-1 bg-brand w-full" style={{ opacity: 0.15 + i * 0.15 }} />

              <div className="p-7">
                <div className="flex items-start justify-between gap-2 mb-5">
                  <div>
                    <h3 className="font-bold text-foreground text-base">{c.brand}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.sector}</p>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-[11px] font-medium border border-border">
                    {c.tag}
                  </span>
                </div>

                <div className="mb-5 pb-5 border-b border-border space-y-2.5">
                  <div>
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Problem</span>
                    <p className="text-sm text-foreground mt-0.5">{c.challenge}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Çözüm</span>
                    <p className="text-sm text-muted-foreground mt-0.5">{c.solution}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-xl font-bold text-brand">{m.value}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand/90 transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-0.5"
          >
            Sizin Başarı Hikayenizi Yazalım
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
