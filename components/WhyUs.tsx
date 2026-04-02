"use client";

import { motion } from "framer-motion";
import { Layers, BarChart2, Zap, Eye } from "lucide-react";

const reasons = [
  {
    num: "01",
    icon: Layers,
    title: "360° Entegre Hizmet",
    description:
      "Reklamdan içeriğe, Shopify geliştirmeden marketplace yönetimine kadar tüm kanalları tek elden yönetiyoruz.",
  },
  {
    num: "02",
    icon: BarChart2,
    title: "Veri Odaklı Kararlar",
    description:
      "Vanity metrikler değil; ROAS, CPA ve gerçek gelir büyümesini ölçüyoruz. Her karar veriye dayanıyor.",
  },
  {
    num: "03",
    icon: Eye,
    title: "Şeffaf Raporlama",
    description:
      "Haftalık raporlar ve anlık dashboard erişimi. Ne yaptığımızı, neden yaptığımızı her zaman bilirsiniz.",
  },
  {
    num: "04",
    icon: Zap,
    title: "Hızlı Karar Alma",
    description:
      "Küçük ve çevik yapımız sayesinde kampanya değişikliklerine saatler içinde müdahale edebiliyoruz.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-28 px-6 bg-muted/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-border" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
            Farkımız
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2">
            Neden Biz?
          </h2>
          <p className="text-foreground/50 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            E-ticaret sektörüne özel derin uzmanlık ve hesap verebilir bir iş ortağı.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                className="group relative p-7 rounded-2xl border border-border bg-background hover:border-brand/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand/5 overflow-hidden cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {/* Hover glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative flex items-start gap-5">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand group-hover:bg-brand/15 transition-colors duration-300">
                      <Icon size={20} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{r.title}</h3>
                      <span className="text-xs font-bold text-foreground/15 font-mono tabular-nums shrink-0">{r.num}</span>
                    </div>
                    <p className="text-sm text-foreground/50 leading-relaxed">{r.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
