"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import ScrambleText from "@/components/ScrambleText";

const testimonials = [
  {
    quote: "Daha önce 3 ajansla çalıştık, hepsi vaat verdi ama sonuç yoktu. Burada ilk aydan itibaren ROAS'ımız ikiye katlandı. Artık reklam bütçemizi güvenle artırabiliyoruz.",
    name: "Selin Korkmaz",
    title: "Kurucu",
    company: "Lumière Skin",
    initial: "SK",
    color: "bg-brand/15 text-brand",
    accent: "border-brand/20",
  },
  {
    quote: "Trendyol'da satışlarımız durma noktasına gelmişti. Ürün listelememizi ve kampanyalarımızı yeniden yapılandırdılar. 3 ayda ciromuz üç katına çıktı. Beklentilerimin çok ötesinde.",
    name: "Murat Demir",
    title: "E-ticaret Müdürü",
    company: "StepUp Ayakkabı",
    initial: "MD",
    color: "bg-emerald-500/20 text-emerald-400",
    accent: "border-emerald-500/20",
  },
  {
    quote: "Haftalık raporlar gerçekten değerli — ne yaptıklarını, neden yaptıklarını her zaman açıklıyorlar. 'Ajansımıza güveniyoruz' diyebilmek için yıllar gerekti, bu ekiple birkaç ay yetti.",
    name: "Ayşe Yıldız",
    title: "CEO",
    company: "NutriBox",
    initial: "AY",
    color: "bg-brand/15 text-brand",
    accent: "border-brand/20",
  },
  {
    quote: "Instagram hesabımız 6 ayda 4.000'den 38.000 takipçiye çıktı. Ama asıl etkileyici olan: bu büyüme satışa dönüştü. Influencer ortaklıklarını da çok iyi yönettiler.",
    name: "Caner Şahin",
    title: "Marka Direktörü",
    company: "BeautyLab TR",
    initial: "CS",
    color: "bg-emerald-500/20 text-emerald-400",
    accent: "border-emerald-500/20",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  function go(next: number) {
    setDir(next > active ? 1 : -1);
    setActive(next);
  }

  const advance = useCallback(() => {
    const next = (active + 1) % testimonials.length;
    setDir(1);
    setActive(next);
  }, [active]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(advance, 4500);
    return () => clearTimeout(t);
  }, [advance, paused]);

  const t = testimonials[active];

  return (
    <section
      className="py-28 px-4 sm:px-6 relative overflow-hidden border-t border-border/20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/3 to-transparent pointer-events-none" />
      <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] font-mono text-foreground/20 tracking-[0.3em] mb-3">005/</p>
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
            Referanslar
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2">
            <ScrambleText text="Müşterilerimiz Anlatıyor" duration={900} />
          </h2>
          <p className="text-foreground/50 mt-4 max-w-xl mx-auto text-base font-light leading-relaxed">
            Başarı hikayelerini kendi sesleriyle duymak daha anlamlı.
          </p>
        </motion.div>

        <div className="relative min-h-[240px] flex items-center">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, y: dir * 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: dir * -24 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className={`w-full p-8 md:p-10 rounded-2xl border bg-background ${t.accent}`}
            >
              <div className="flex gap-0.5 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="fill-brand text-brand" />
                ))}
              </div>

              <p className="text-base md:text-lg text-foreground/70 font-light leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${t.color}`}>
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-foreground/40 font-light">
                    {t.title} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setPaused(true); go(active === 0 ? testimonials.length - 1 : active - 1); }}
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-foreground/40 hover:text-foreground hover:border-brand/40 transition-all duration-200"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => { setPaused(true); go((active + 1) % testimonials.length); }}
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-foreground/40 hover:text-foreground hover:border-brand/40 transition-all duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-foreground/25">
              {String(active + 1).padStart(2, "0")}/{String(testimonials.length).padStart(2, "0")}
            </span>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setPaused(true); go(i); }}
                  className={`h-1 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-brand" : "w-1.5 bg-foreground/20"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
