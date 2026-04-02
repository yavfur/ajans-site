"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import ScrambleText from "@/components/ScrambleText";

const cases = [
  {
    brand: "Lumière Skin",
    sector: "Kozmetik & Cilt Bakımı",
    tag: "Paid Advertising + Content",
    tagColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    challenge: "Yüksek CPA ve düşük ROAS ile boğuşan bir kozmetik markası.",
    result: "6 ayda Meta Ads ROAS'ını 1.8x'den 6.4x'e çıkardık.",
    metrics: [
      { label: "ROAS Artışı", value: "6.4x" },
      { label: "CPA Düşüşü", value: "%54" },
      { label: "Aylık Ciro Büyümesi", value: "%218" },
    ],
    accent: "from-rose-500/20 to-orange-500/5",
    bar: "bg-rose-400",
    dot: "bg-rose-400",
  },
  {
    brand: "StepUp Ayakkabı",
    sector: "Moda & E-ticaret",
    tag: "Shopify + Marketplace",
    tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    challenge: "Trendyol'da görünürlük sorunu ve yüksek iade oranı.",
    result: "Trendyol'da kategori liderliğine ulaştık, iade oranı %38 düştü.",
    metrics: [
      { label: "Trendyol Satış Artışı", value: "%312" },
      { label: "İade Oranı Düşüşü", value: "%38" },
      { label: "Ort. Sipariş Değeri", value: "+%67" },
    ],
    accent: "from-amber-500/20 to-yellow-500/5",
    bar: "bg-amber-400",
    dot: "bg-amber-400",
  },
  {
    brand: "NutriBox",
    sector: "Sağlık & Gıda",
    tag: "Sosyal Medya + Ads",
    tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    challenge: "Sıfırdan marka bilinirliği oluşturmak ve subscription modelini büyütmek.",
    result: "İlk 4 ayda 12.000 aktif aboneye ulaştık.",
    metrics: [
      { label: "Aktif Abone", value: "12.000+" },
      { label: "Instagram Büyümesi", value: "%840" },
      { label: "Müşteri Edinme Maliyeti", value: "₺28" },
    ],
    accent: "from-emerald-500/20 to-teal-500/5",
    bar: "bg-emerald-400",
    dot: "bg-emerald-400",
  },
];

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  function go(next: number) {
    setDir(next > active ? 1 : -1);
    setActive(next);
  }

  function prev() {
    go(active === 0 ? cases.length - 1 : active - 1);
  }

  function next() {
    go(active === cases.length - 1 ? 0 : active + 1);
  }

  const c = cases[active];

  return (
    <section className="py-28 px-4 sm:px-6 bg-muted/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-border" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] font-mono text-foreground/20 tracking-[0.3em] mb-3">004/</p>
          <span className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
            <TrendingUp size={11} />
            Sonuçlarımız
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2">
            <ScrambleText text="Rakamlarla Konuşuyoruz" duration={900} />
          </h2>
          <p className="text-foreground/50 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            Her marka farklıdır. Yaklaşımımız her zaman veriye ve sonuca dayanır.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative rounded-2xl border border-border bg-background overflow-hidden"
            >
              {/* Top gradient bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${c.accent}`} />

              <div className="p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  {/* Left */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                      <h3 className="text-xl font-bold text-foreground">{c.brand}</h3>
                    </div>
                    <p className="text-xs text-foreground/40 mb-4">{c.sector}</p>

                    <span className={`inline-block px-2.5 py-1 rounded-full border text-xs font-medium mb-5 ${c.tagColor}`}>
                      {c.tag}
                    </span>

                    <p className="text-sm text-foreground/55 leading-relaxed mb-4 pb-4 border-b border-border">
                      {c.challenge}
                    </p>

                    <p className="text-sm text-foreground/70 italic leading-relaxed">
                      &ldquo;{c.result}&rdquo;
                    </p>
                  </div>

                  {/* Right: Metrics */}
                  <div className="flex flex-col gap-4">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                        <span className="text-sm text-foreground/50">{m.label}</span>
                        <span className="text-2xl font-bold text-foreground">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-foreground/40 hover:text-foreground hover:border-brand/40 transition-all duration-200"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-foreground/40 hover:text-foreground hover:border-brand/40 transition-all duration-200"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Position indicator — anima.ai style */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-foreground/25">
                {String(active + 1).padStart(2, "0")}/{String(cases.length).padStart(2, "0")}
              </span>
              <div className="flex gap-1.5">
                {cases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === active ? "w-6 bg-brand" : "w-1.5 bg-foreground/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand text-[#0b1a12] font-semibold text-sm hover:bg-brand/90 transition-all duration-200 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5"
          >
            Sizin Başarı Hikayenizi Yazalım
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
