"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp, Users, ShoppingBag } from "lucide-react";

const projects = [
  {
    brand: "KDID",
    category: "Kore Güzellik Markası",
    description: "E-ticaret altyapısını sıfırdan kurarak Shopify mağazasını hayata geçirdik. Instagram ve TikTok'ta organik büyüme stratejisi ile marka bilinirliğini 6 ayda 4 katına çıkardık.",
    tags: ["E-ticaret", "Sosyal Medya", "İçerik Üretimi"],
    results: [
      { icon: TrendingUp, value: "%340", label: "Organik Büyüme" },
      { icon: Users, value: "28K", label: "Yeni Takipçi" },
      { icon: ShoppingBag, value: "₺1.2M", label: "Satış Hacmi" },
    ],
    gradient: "from-pink-500/20 to-purple-600/20",
    accent: "#ec4899",
  },
  {
    brand: "Weyore London",
    category: "İngiliz Cilt Bakımı",
    description: "Türkiye pazarına girişini yönetiyoruz. Meta ve Google reklam kampanyalarıyla hedefli müşteri kitlesine ulaşıyor, aylık reklam bütçesini optimize ediyoruz.",
    tags: ["Meta Reklam", "Google Ads", "Shopify"],
    results: [
      { icon: TrendingUp, value: "4.2x", label: "ROAS" },
      { icon: Users, value: "15K", label: "Yeni Müşteri" },
      { icon: ShoppingBag, value: "%65", label: "Dönüşüm Artışı" },
    ],
    gradient: "from-blue-500/20 to-cyan-600/20",
    accent: "#3b82f6",
  },
  {
    brand: "Quessia",
    category: "Multi-Brand Perakende",
    description: "Birden fazla marka için entegre dijital pazarlama yönetimi sağlıyoruz. Kampanya planlamasından sosyal medya içeriklerine kadar tam kapsamlı hizmet sunuyoruz.",
    tags: ["Full Dijital", "Kampanya", "Çoklu Marka"],
    results: [
      { icon: TrendingUp, value: "%210", label: "Etkileşim Artışı" },
      { icon: Users, value: "52K", label: "Toplam Erişim" },
      { icon: ShoppingBag, value: "₺3.8M", label: "Yönetilen Bütçe" },
    ],
    gradient: "from-emerald-500/20 to-teal-600/20",
    accent: "#10b981",
  },
];

export default function Portfolio() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + projects.length) % projects.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % projects.length);
  };

  const project = projects[current];

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Başlık */}
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
            Çalışmalarımız
          </h2>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -60 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`rounded-2xl border border-border bg-gradient-to-br ${project.gradient} p-8 md:p-12`}
            >
              <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* Sol: Proje Bilgileri */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full border border-border bg-muted text-foreground/60 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {project.brand}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: project.accent }}>
                    {project.category}
                  </p>
                  <p className="text-foreground/60 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Sağ: Sonuçlar */}
                <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
                  {project.results.map((result) => {
                    const Icon = result.icon;
                    return (
                      <div
                        key={result.label}
                        className="flex md:flex-row flex-col items-center md:items-start gap-3 p-4 rounded-xl bg-background/40 border border-border"
                      >
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${project.accent}20` }}
                        >
                          <Icon size={18} style={{ color: project.accent }} />
                        </div>
                        <div className="text-center md:text-left">
                          <div className="text-xl font-bold text-foreground">{result.value}</div>
                          <div className="text-xs text-foreground/40">{result.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Kontroller */}
          <div className="flex items-center justify-between mt-8">
            {/* Noktalar */}
            <div className="flex gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-brand" : "w-4 bg-border"
                  }`}
                />
              ))}
            </div>

            {/* Ok butonları */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="p-2.5 rounded-lg border border-border text-foreground/60 hover:border-brand/50 hover:text-brand transition-all duration-200"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="p-2.5 rounded-lg border border-border text-foreground/60 hover:border-brand/50 hover:text-brand transition-all duration-200"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
