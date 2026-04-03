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
    <section className="py-24 lg:py-32 px-4 sm:px-6" style={{ background: "#050505" }}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase text-violet-300"
            style={{ border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.1)" }}>
            Sonuçlarımız
          </span>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-white mb-4">
            Rakamlarla konuşuyoruz
          </h2>
          <p className="max-w-lg mx-auto leading-relaxed" style={{ color: "#888899" }}>
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
              className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Top gradient accent */}
              <div className="h-px w-full"
                style={{ background: "linear-gradient(90deg, #7C3AED, #C084FC, #06B6D4)", opacity: 0.4 + i * 0.2 }} />

              <div className="p-7">
                <div className="flex items-start justify-between gap-2 mb-5">
                  <div>
                    <h3 className="font-bold text-white text-base">{c.brand}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "#888899" }}>{c.sector}</p>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium"
                    style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", color: "#C084FC" }}>
                    {c.tag}
                  </span>
                </div>

                <div className="mb-5 pb-5 space-y-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#888899" }}>Problem</span>
                    <p className="text-sm text-white/70 mt-0.5">{c.challenge}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#888899" }}>Çözüm</span>
                    <p className="text-sm mt-0.5" style={{ color: "#888899" }}>{c.solution}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-xl font-bold gradient-text">{m.value}</div>
                      <div className="text-[10px] mt-0.5 leading-tight" style={{ color: "#888899" }}>{m.label}</div>
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
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #C084FC)",
              boxShadow: "0 0 24px rgba(124,58,237,0.3)",
            }}
          >
            Sizin Başarı Hikayenizi Yazalım
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
