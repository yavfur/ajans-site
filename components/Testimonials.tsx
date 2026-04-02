"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Daha önce 3 ajansla çalıştık, hepsi vaat verdi ama sonuç yoktu. Burada ilk aydan itibaren ROAS'ımız ikiye katlandı. Artık reklam bütçemizi güvenle artırabiliyoruz.",
    name: "Selin Korkmaz",
    title: "Kurucu",
    company: "Lumière Skin",
    initial: "SK",
    color: "bg-rose-500/20 text-rose-400",
  },
  {
    quote:
      "Trendyol'da satışlarımız durma noktasına gelmişti. Ürün listelememizi ve kampanyalarımızı yeniden yapılandırdılar. 3 ayda ciromuz üç katına çıktı. Beklentilerimin çok ötesinde.",
    name: "Murat Demir",
    title: "E-ticaret Müdürü",
    company: "StepUp Ayakkabı",
    initial: "MD",
    color: "bg-amber-500/20 text-amber-400",
  },
  {
    quote:
      "Haftalık raporlar gerçekten değerli — ne yaptıklarını, neden yaptıklarını her zaman açıklıyorlar. 'Ajansımıza güveniyoruz' diyebilmek için yıllar gerekti, bu ekiple birkaç ay yetti.",
    name: "Ayşe Yıldız",
    title: "CEO",
    company: "NutriBox",
    initial: "AY",
    color: "bg-emerald-500/20 text-emerald-400",
  },
  {
    quote:
      "Instagram hesabımız 6 ayda 4.000'den 38.000 takipçiye çıktı. Ama asıl etkileyici olan: bu büyüme satışa dönüştü. Influencer ortaklıklarını da çok iyi yönettiler.",
    name: "Caner Şahin",
    title: "Marka Direktörü",
    company: "BeautyLab TR",
    initial: "CS",
    color: "bg-violet-500/20 text-violet-400",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function Testimonials() {
  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/3 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
            Referanslar
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2">
            Müşterilerimiz Anlatıyor
          </h2>
          <p className="text-foreground/50 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            Başarı hikayelerini kendi sesleriyle duymak daha anlamlı.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={item}
              className="group relative p-7 rounded-2xl border border-border bg-background hover:border-brand/25 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-7 text-foreground/8">
                <Quote size={40} />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-foreground/65 leading-relaxed mb-6 relative">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${t.color}`}>
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-foreground/40">
                    {t.title} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
