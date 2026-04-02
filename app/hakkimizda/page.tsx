"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart2, Layers, Zap, Eye, Award, ArrowRight } from "lucide-react";

const stats = [
  { value: "50+", label: "Yönetilen Marka" },
  { value: "₺10M+", label: "Toplam Ad Spend" },
  { value: "%340", label: "Ort. ROAS Artışı" },
  { value: "3+", label: "Yıl Deneyim" },
];

const values = [
  {
    icon: Eye,
    title: "Şeffaflık",
    description: "Haftalık raporlar ve anlık dashboard erişimi. Ne yaptığımızı ve neden yaptığımızı her zaman bilirsiniz.",
    accent: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/20",
  },
  {
    icon: BarChart2,
    title: "Sonuç Odaklılık",
    description: "Vanity metrics değil; gerçek ROI ve gelir büyümesi. Her kampanya, ölçülebilir hedeflere bağlıdır.",
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Layers,
    title: "Ortaklık Zihniyeti",
    description: "Sizin başarınız bizim başarımızdır. Müşteri değil, iş ortağı olarak çalışıyoruz.",
    accent: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: Zap,
    title: "Sürekli Öğrenme",
    description: "Algoritma değişikliklerine, yeni platformlara ve sektör trendlerine hızla adapte oluyoruz.",
    accent: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
];

const certs = [
  "Meta Business Partner",
  "Google Partner",
  "Shopify Partner",
  "Google Analytics Sertifikası",
];

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Hero */}
        <motion.div
          className="max-w-3xl mx-auto text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
            Hakkımızda
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-3 mb-4 leading-tight">
            E-ticaret DNA'sıyla{" "}
            <span className="bg-gradient-to-r from-brand to-violet-400 bg-clip-text text-transparent">
              Dijital Pazarlama
            </span>
          </h1>
          <p className="text-foreground/50 text-lg leading-relaxed">
            Sadece pazarlama değil, e-ticaret sektörünü içten bilen bir iş ortağı.
          </p>
        </motion.div>

        {/* Hikaye */}
        <div className="grid md:grid-cols-2 gap-14 items-center mb-28">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-5">Hikayemiz</h2>
            <div className="flex flex-col gap-4 text-foreground/55 leading-relaxed text-[15px]">
              <p>
                Dijital pazarlamada yıllarca edinilen deneyim ve e-ticaret sektörüne
                olan derin tutku ile kuruldu. Büyük ajansların aksine; hız, çeviklik
                ve maliyet verimliliğini ön planda tutuyoruz.
              </p>
              <p>
                Birden fazla markayı aynı anda solo olarak yönetme deneyimi,
                bize hem stratejik hem de teknik bakış açısı kazandırdı.
                Shopify geliştirmeden reklam yönetimine, içerik üretiminden
                marketplace optimizasyonuna kadar her aşamada uzmanız.
              </p>
              <p>
                Türkiye e-ticaret pazarının dinamiklerini, kozmetik ve moda
                sektörlerinin özelliklerini ve lokal tüketici davranışlarını
                yakından tanıyoruz.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="p-6 rounded-2xl border border-border bg-muted/60 text-center hover:border-brand/30 transition-colors duration-300"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="text-3xl font-bold text-brand mb-1">{s.value}</div>
                <div className="text-xs text-foreground/45 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Değerler */}
        <div className="mb-28">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block mb-3 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-medium tracking-widest uppercase">
              Değerlerimiz
            </span>
            <h2 className="text-3xl font-bold text-foreground mt-2">Her projede bizi yönlendiren prensipler</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  className="flex gap-5 p-6 rounded-2xl border border-border bg-muted/60 hover:border-border/80 transition-colors duration-300"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className={`shrink-0 w-11 h-11 rounded-xl border ${v.bg} flex items-center justify-center`}>
                    <Icon size={20} className={v.accent} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1.5">{v.title}</h3>
                    <p className="text-sm text-foreground/50 leading-relaxed">{v.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sertifikalar */}
        <motion.div
          className="mb-28"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">Sertifikalar & Ortaklıklar</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {certs.map((cert) => (
              <div key={cert} className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-border bg-muted/60 hover:border-brand/30 transition-colors duration-200">
                <Award size={15} className="text-brand" />
                <span className="text-sm font-medium text-foreground/65">{cert}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="relative text-center p-14 rounded-2xl border border-brand/20 bg-brand/5 overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand/8 to-violet-500/5 pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Daha Fazlasını Öğrenelim
            </h2>
            <p className="text-foreground/50 mb-7 max-w-md mx-auto">
              Markanız için neler yapabileceğimizi birlikte konuşalım. İlk görüşme ücretsiz.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand text-white font-semibold hover:bg-brand/90 transition-all duration-200 hover:shadow-xl hover:shadow-brand/25 hover:-translate-y-0.5 cursor-pointer"
            >
              İletişime Geç
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
