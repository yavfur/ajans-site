"use client";

import { motion } from "framer-motion";
import { Target, ShoppingBag, FileText, Store, Share2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Target,
    title: "Paid Advertising",
    subtitle: "Meta & Google Ads",
    description:
      "Facebook, Instagram ve Google'da hedef kitlenize ulaşan yüksek ROAS'lı kampanyalar. A/B testler, audience segmentasyonu ve conversion tracking ile bütçenizi maksimize ediyoruz.",
    color: "from-rose-500/20 to-orange-500/10",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Development",
    subtitle: "Shopify Uzmanlığı",
    description:
      "Shopify mağaza kurulumu, tema özelleştirme, CRO ve GA4 entegrasyonu. Satışa dönüştüren, hızlı ve ölçeklenebilir e-ticaret altyapısı oluşturuyoruz.",
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
  },
  {
    icon: FileText,
    title: "Content & Creative",
    subtitle: "İçerik Üretimi",
    description:
      "SEO uyumlu ürün açıklamaları, sosyal medya görselleri, banner tasarımları ve video içerikler. Markanızın sesini dijitalde güçlendiriyoruz.",
    color: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10",
  },
  {
    icon: Store,
    title: "Marketplace Yönetimi",
    subtitle: "Trendyol & Pazaryerleri",
    description:
      "Trendyol, Hepsiburada ve diğer pazaryerlerinde ürün listeleme, kategori optimizasyonu ve kampanya yönetimi ile görünürlüğünüzü artırıyoruz.",
    color: "from-amber-500/20 to-yellow-500/10",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
  },
  {
    icon: Share2,
    title: "Sosyal Medya Yönetimi",
    subtitle: "Instagram, TikTok, Facebook",
    description:
      "İçerik takvimi, düzenli paylaşım ve community management ile markanızı sosyal medyada büyütüyoruz. Influencer iş birlikleri koordinasyonu da dahil.",
    color: "from-sky-500/20 to-blue-500/10",
    iconColor: "text-sky-400",
    iconBg: "bg-sky-500/10",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function Services() {
  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
            Neler Yapıyoruz
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2">
            Hizmetlerimiz
          </h2>
          <p className="text-foreground/50 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            E-ticaret markalarına özel, entegre dijital pazarlama çözümleri.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={item}>
                <Link
                  href="/hizmetler"
                  className="group relative block h-full p-7 rounded-2xl border border-border bg-muted/60 hover:border-border/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden"
                >
                  {/* Hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative">
                    <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl border border-border/50 bg-muted">
                      <Icon size={20} className={service.iconColor} />
                    </div>
                    <p className="text-xs text-foreground/40 font-medium mb-1.5 tracking-wide">{service.subtitle}</p>
                    <h3 className="text-base font-semibold text-foreground mb-3 group-hover:text-foreground transition-colors duration-200 flex items-center justify-between gap-2">
                      {service.title}
                      <ArrowUpRight
                        size={16}
                        className="text-foreground/20 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
                      />
                    </h3>
                    <p className="text-foreground/50 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* CTA kartı */}
          <motion.div variants={item}>
            <Link
              href="/iletisim"
              className="group relative block h-full p-7 rounded-2xl border border-brand/20 bg-brand/5 hover:bg-brand/10 hover:border-brand/40 transition-all duration-300 hover:shadow-xl hover:shadow-brand/10 hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative h-full flex flex-col justify-center items-center text-center gap-4 min-h-[180px]">
                <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                  <ArrowUpRight size={20} className="text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
                <div>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-3">
                    Hangi paketi seçeceğinizden emin değil misiniz?
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-brand text-white text-sm font-medium group-hover:bg-brand/90 transition-colors cursor-pointer">
                    Ücretsiz Danışmanlık Al
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
