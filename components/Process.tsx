"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Ücretsiz Keşif Görüşmesi",
    description:
      "30 dakikalık video görüşmede markanızı, rakiplerinizi ve hedeflerinizi anlıyoruz. Hazır kalıplar yok — her analiz sıfırdan başlar.",
    detail: "Pazarlama altyapısı, mevcut kampanyalar, hedef kitle analizi",
  },
  {
    num: "02",
    title: "Büyüme Haritası",
    description:
      "İlk 90 günlük öncelikli aksiyon planını hazırlıyoruz. Hangi kanalda ne kadar bütçe, hangi içerik, hangi metrik — hepsi yazılı.",
    detail: "Kanal stratejisi, bütçe dağılımı, KPI belirleme",
  },
  {
    num: "03",
    title: "Hızlı Başlangıç",
    description:
      "İlk 2 haftada altyapıyı kuruyoruz: tracking, pixel, kampanyalar, içerik takvimi. Geç kalmak yok.",
    detail: "Teknik setup, ilk kampanyalar, içerik üretimi",
  },
  {
    num: "04",
    title: "Optimizasyon & Ölçekleme",
    description:
      "Her hafta verilere bakıyoruz, neyin işe yaradığını çoğaltıyoruz, neyin yaramadığını kesiyoruz. Duygusal değil, veri odaklı.",
    detail: "Haftalık raporlar, A/B testler, bütçe optimizasyonu",
  },
];

export default function Process() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-border" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
            Nasıl Çalışıyoruz
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2">
            Karmaşa Değil,{" "}
            <span className="bg-gradient-to-r from-brand to-violet-400 bg-clip-text text-transparent">
              Netlik
            </span>
          </h2>
          <p className="text-foreground/50 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            Her adımda ne yapıldığını bilirsiniz. Sürpriz yok, gecikme yok.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line — desktop */}
          <div className="hidden md:block absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] as const }}
                >
                  {/* Card */}
                  <div className={`flex-1 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="group p-6 rounded-2xl border border-border bg-background hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                          <span className="text-xs font-bold text-brand font-mono">{step.num}</span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                          <p className="text-sm text-foreground/55 leading-relaxed mb-3">{step.description}</p>
                          <p className="text-xs text-foreground/30 leading-relaxed">{step.detail}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand/30 border-2 border-brand items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                  </div>

                  {/* Empty side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
