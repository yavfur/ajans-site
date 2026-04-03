"use client";

import { motion } from "framer-motion";
import { BarChart2, Megaphone, ShoppingCart, TrendingUp } from "lucide-react";

const services = [
  {
    icon: BarChart2,
    title: "Performans Odaklı Reklam Yönetimi",
    desc: "Google Ads, Meta Ads ve TikTok kampanyalarını ROAS ve CPA hedeflerinize göre yönetiyoruz. Her kuruş takip altında.",
  },
  {
    icon: Megaphone,
    title: "Kreatif Test & Ölçeklendirme",
    desc: "Hangi görselin, metnin ve CTA'nın işe yaradığını A/B testlerle buluyoruz. Sonra kazananı ölçeklendiriyoruz.",
  },
  {
    icon: ShoppingCart,
    title: "Marketplace Yönetimi",
    desc: "Trendyol, Hepsiburada ve Amazon listing optimizasyonu, kampanya yönetimi ve satış artırma stratejileri.",
  },
  {
    icon: TrendingUp,
    title: "Funnel & Dönüşüm Optimizasyonu",
    desc: "Ziyaretçiyi müşteriye dönüştüren landing page, e-posta ve retargeting sistemleri kuruyoruz.",
  },
];

export default function DataPositioning() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 bg-muted/40">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold text-brand tracking-[0.2em] uppercase mb-3">005 — Hizmetlerimiz</p>
          <h2 className="text-[clamp(24px,4vw,40px)] font-bold text-foreground mb-4">
            Satış üreten hizmetler
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Biz sadece trafik değil, satış üretiyoruz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                className="p-8 rounded-2xl border border-border bg-white hover:border-brand/25 hover:shadow-md transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-brand/8 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-brand" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
