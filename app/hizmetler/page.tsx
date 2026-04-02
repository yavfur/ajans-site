"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Target, ShoppingBag, FileText, Store, Share2, Check, ArrowRight, Zap } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Paid Advertising",
    subtitle: "Meta & Google Ads Yönetimi",
    description:
      "Hedef kitlenize doğru zamanda, doğru mesajla ulaşan reklam kampanyaları. Bütçenizi maksimum ROAS ile değerlendiriyoruz.",
    deliverable: "Aylık ROAS raporları, kampanya performans analizi",
    accent: "text-rose-400",
    iconBg: "bg-rose-500/10 border-rose-500/20",
    features: [
      "Meta Ads (Facebook & Instagram) kampanya kurulumu ve optimizasyonu",
      "Google Ads (Search, Shopping, Display, YouTube)",
      "Audience segmentasyonu ve lookalike hedefleme",
      "A/B testing ve creative rotasyon",
      "Conversion tracking setup (Pixel, GA4, GTM)",
      "Remarketing kampanyaları",
    ],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Development",
    subtitle: "Shopify Uzmanlığı",
    description:
      "Satışa dönüştüren, hızlı ve ölçeklenebilir Shopify mağazaları kuruyoruz. Teknik altyapıdan UX'e kadar her detayla ilgileniyoruz.",
    deliverable: "Fully functional, optimized Shopify store",
    accent: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    features: [
      "Shopify store setup ve tema özelleştirme",
      "Liquid development ve metafield yapılandırması",
      "Bundle/set ürün stratejileri",
      "Conversion Rate Optimization (CRO)",
      "Google Analytics 4 entegrasyonu",
      "Meta Pixel & Google Tag Manager kurulumu",
    ],
  },
  {
    icon: FileText,
    title: "Content & Creative",
    subtitle: "İçerik ve Tasarım",
    description:
      "Markanızın sesini dijitalde güçlendiren, SEO uyumlu içerikler ve göz alıcı görseller üretiyoruz.",
    deliverable: "Hazır kullanıma uygun içerik paketi",
    accent: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    features: [
      "SEO uyumlu ürün açıklamaları (TR/EN)",
      "Fayda odaklı copywriting",
      "Sosyal medya görselleri ve banner tasarımları",
      "Email tasarımları",
      "Ürün tanıtım videoları",
      "Social media reels/shorts",
    ],
  },
  {
    icon: Store,
    title: "Marketplace Yönetimi",
    subtitle: "Trendyol & Diğer Pazaryerleri",
    description:
      "Türkiye'nin en büyük pazaryerlerinde markanızın görünürlüğünü ve satışlarını artırıyoruz.",
    deliverable: "Artan marketplace görünürlüğü ve satış",
    accent: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    features: [
      "Trendyol ürün listeleme ve optimizasyon",
      "Kategori ve anahtar kelime optimizasyonu",
      "Trendyol kampanya yönetimi",
      "Hepsiburada, N11 ve diğer platformlar",
      "Stok ve fiyat yönetimi entegrasyonu",
      "Performans analizi ve raporlama",
    ],
  },
  {
    icon: Share2,
    title: "Sosyal Medya Yönetimi",
    subtitle: "Instagram, TikTok, Facebook",
    description:
      "Tutarlı marka varlığı oluşturan, etkileşimi artıran sosyal medya stratejisi ve yönetimi.",
    deliverable: "Tutarlı marka varlığı, engagement artışı",
    accent: "text-sky-400",
    iconBg: "bg-sky-500/10 border-sky-500/20",
    features: [
      "Instagram, TikTok, Facebook strateji geliştirme",
      "İçerik takvimi ve düzenli paylaşım",
      "Community management",
      "Influencer iş birlikleri koordinasyonu",
      "Analiz ve aylık raporlama",
      "Trend takibi ve içerik adaptasyonu",
    ],
  },
];

const packages = [
  {
    name: "Starter",
    price: "15.000",
    description: "Büyümekte olan markalar için temel dijital varlık",
    adSpend: "50.000 TL'ye kadar",
    reporting: "Aylık",
    features: [
      "1 reklam platformu yönetimi",
      "Aylık 8 sosyal medya içeriği",
      "Temel analitik kurulumu",
      "Aylık performans raporu",
      "E-posta desteği",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "35.000",
    description: "Ölçeklenmek isteyen e-ticaret markaları için",
    adSpend: "150.000 TL'ye kadar",
    reporting: "Haftalık",
    badge: "En Popüler",
    features: [
      "Meta + Google Ads yönetimi",
      "Aylık 20 sosyal medya içeriği",
      "Shopify optimizasyonu",
      "Marketplace yönetimi (1 platform)",
      "Haftalık performans raporu",
      "Öncelikli destek",
    ],
    highlighted: true,
  },
  {
    name: "Premium 360°",
    price: "Özel",
    description: "Tam kapsamlı dijital pazarlama ortaklığı",
    adSpend: "Sınırsız",
    reporting: "Anlık Dashboard",
    features: [
      "Tüm reklam platformları yönetimi",
      "Sınırsız içerik üretimi",
      "Shopify geliştirme ve CRO",
      "Tüm marketplace yönetimi",
      "Anlık dashboard erişimi",
      "Özel strateji ve danışmanlık",
    ],
    highlighted: false,
  },
];

export default function HizmetlerPage() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
            Hizmetlerimiz
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-3 mb-4">
            E-ticaret için{" "}
            <span className="bg-gradient-to-r from-brand to-violet-400 bg-clip-text text-transparent">360°</span>{" "}
            Çözüm
          </h1>
          <p className="text-foreground/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Orta ölçekli e-ticaret markalarına özel, entegre dijital pazarlama hizmetleri.
            Her kanal, tek strateji.
          </p>
        </motion.div>
      </div>

      {/* Hizmet Detayları */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-6 mb-28">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              className={`grid md:grid-cols-2 gap-8 p-8 rounded-2xl border border-border bg-muted/60 items-center hover:border-border/80 transition-colors duration-300 ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border ${service.iconBg} mb-5`}>
                  <Icon size={22} className={service.accent} />
                </div>
                <p className="text-xs text-foreground/40 font-medium mb-1.5 tracking-wide">{service.subtitle}</p>
                <h2 className="text-2xl font-bold text-foreground mb-3">{service.title}</h2>
                <p className="text-foreground/55 leading-relaxed mb-5">{service.description}</p>
                <div className="flex items-center gap-2 text-xs text-foreground/40 bg-background px-3 py-2 rounded-lg border border-border w-fit">
                  <Zap size={11} className="text-brand" />
                  <span>{service.deliverable}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                {service.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mt-0.5">
                      <Check size={11} className="text-brand" />
                    </div>
                    <span className="text-sm text-foreground/65 leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Paketler */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
            Paketler
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Size Uygun Paketi Seçin
          </h2>
          <p className="text-foreground/50 mt-3">
            Her marka farklıdır. Özel teklif için iletişime geçin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              className={`relative p-7 rounded-2xl border flex flex-col gap-5 ${
                pkg.highlighted
                  ? "border-brand bg-brand/5 shadow-xl shadow-brand/10"
                  : "border-border bg-muted/60"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand text-[#0b1a12] text-xs font-semibold shadow-lg shadow-brand/30">
                  En Popüler
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-foreground">{pkg.name}</h3>
                <p className="text-foreground/40 text-sm mt-1">{pkg.description}</p>
              </div>
              <div>
                {pkg.price === "Özel" ? (
                  <span className="text-3xl font-bold text-foreground">Özel Teklif</span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">₺{pkg.price}</span>
                    <span className="text-foreground/40 text-sm">/ay</span>
                  </div>
                )}
                <p className="text-xs text-foreground/35 mt-1.5">
                  Ad spend: {pkg.adSpend} · Raporlama: {pkg.reporting}
                </p>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {pkg.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <Check size={13} className="text-brand shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/60">{f}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/iletisim"
                className={`inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  pkg.highlighted
                    ? "bg-brand text-[#0b1a12] hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/25"
                    : "border border-border text-foreground/70 hover:border-brand/50 hover:text-brand"
                }`}
              >
                {pkg.price === "Özel" ? "İletişime Geçin" : "Başlayın"}
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center p-10 rounded-2xl border border-dashed border-border/60 bg-muted/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-foreground/55 mb-5 max-w-md mx-auto">
            Hangi paketi seçeceğinizden emin değil misiniz? Birlikte konuşalım.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-[#0b1a12] text-sm font-medium hover:bg-brand/90 transition-all duration-200 hover:shadow-lg hover:shadow-brand/25 cursor-pointer"
          >
            Ücretsiz Danışmanlık Al
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
