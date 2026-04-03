"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Daha önce 3 ajansla çalıştık, hepsi vaat verdi ama sonuç yoktu. Burada ilk aydan itibaren ROAS'ımız ikiye katlandı.",
    name: "Selin Korkmaz",
    title: "Kurucu",
    company: "Lumière Skin",
    initial: "SK",
  },
  {
    quote: "Trendyol'da satışlarımız durma noktasına gelmişti. 3 ayda ciromuz üç katına çıktı. Beklentilerimin çok ötesinde.",
    name: "Murat Demir",
    title: "E-ticaret Müdürü",
    company: "StepUp Ayakkabı",
    initial: "MD",
  },
  {
    quote: "Haftalık raporlar gerçekten değerli — ne yaptıklarını, neden yaptıklarını her zaman açıklıyorlar.",
    name: "Ayşe Yıldız",
    title: "CEO",
    company: "NutriBox",
    initial: "AY",
  },
  {
    quote: "Instagram hesabımız 6 ayda 4.000'den 38.000 takipçiye çıktı. Ama asıl etkileyici olan: bu büyüme satışa dönüştü.",
    name: "Caner Şahin",
    title: "Marka Direktörü",
    company: "BeautyLab TR",
    initial: "CS",
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
      className="py-24 lg:py-32 px-4 sm:px-6 bg-muted/40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[760px] mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold text-brand tracking-[0.2em] uppercase mb-3">005 — Referanslar</p>
          <h2 className="text-[clamp(24px,4vw,40px)] font-bold text-foreground mb-4">
            Müşterilerimiz anlatıyor
          </h2>
        </motion.div>

        <div className="relative min-h-[220px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: dir * 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: dir * -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full p-8 md:p-10 rounded-2xl border border-border bg-white"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-brand text-brand" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-medium">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.title} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            <button
              onClick={() => { setPaused(true); go(active === 0 ? testimonials.length - 1 : active - 1); }}
              className="w-10 h-10 rounded-xl border border-border bg-white flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-brand/30 transition-all duration-200"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => { setPaused(true); go((active + 1) % testimonials.length); }}
              className="w-10 h-10 rounded-xl border border-border bg-white flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-brand/30 transition-all duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-muted-foreground">
              {String(active + 1).padStart(2, "0")}/{String(testimonials.length).padStart(2, "0")}
            </span>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setPaused(true); go(i); }}
                  className={`h-1 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-brand" : "w-1.5 bg-border"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
