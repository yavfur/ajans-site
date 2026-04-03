"use client";

import { motion } from "framer-motion";
import { Target, ShoppingBag, FileText, Store, Share2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, MouseEvent } from "react";

const services = [
  {
    icon: Target,
    title: "Paid Advertising",
    subtitle: "Meta & Google Ads",
    description:
      "Facebook, Instagram ve Google'da yüksek ROAS'lı kampanyalar. A/B testler, audience segmentasyonu ve conversion tracking ile bütçenizi maksimize ediyoruz.",
    gradient: "from-violet-600/20 via-purple-500/10 to-transparent",
    glow: "rgba(124, 58, 237, 0.3)",
    iconGradient: "from-violet-500 to-purple-600",
    large: true,
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Dev",
    subtitle: "Shopify Uzmanlığı",
    description:
      "Shopify kurulum, tema özelleştirme, CRO ve GA4 entegrasyonu. Satışa dönüştüren, hızlı altyapı.",
    gradient: "from-cyan-600/20 via-teal-500/10 to-transparent",
    glow: "rgba(6, 182, 212, 0.3)",
    iconGradient: "from-cyan-500 to-teal-600",
    large: false,
  },
  {
    icon: FileText,
    title: "Content & Creative",
    subtitle: "İçerik Üretimi",
    description:
      "SEO uyumlu içerikler, sosyal medya görselleri ve video üretimi.",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    glow: "rgba(245, 158, 11, 0.3)",
    iconGradient: "from-amber-500 to-orange-600",
    large: false,
  },
  {
    icon: Store,
    title: "Marketplace Yönetimi",
    subtitle: "Trendyol & Pazaryerleri",
    description:
      "Trendyol, Hepsiburada ve diğer pazaryerlerinde kampanya ve listeleme optimizasyonu.",
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    glow: "rgba(244, 63, 94, 0.3)",
    iconGradient: "from-rose-500 to-pink-600",
    large: false,
  },
  {
    icon: Share2,
    title: "Sosyal Medya",
    subtitle: "Instagram, TikTok, Facebook",
    description:
      "İçerik takvimi, community management ve influencer koordinasyonu.",
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    glow: "rgba(14, 165, 233, 0.3)",
    iconGradient: "from-sky-500 to-blue-600",
    large: false,
  },
];

/* ── Glassmorphism card with mouse spotlight ── */
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden rounded-3xl cursor-default transition-transform duration-300 ${
        service.large ? "md:col-span-2 md:row-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? `0 24px 60px ${service.glow}, 0 0 0 1px rgba(255,255,255,0.08)` : "none",
      }}
    >
      {/* Spotlight radial */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at ${spotlight.x}% ${spotlight.y}%, ${service.glow.replace("0.3", "0.12")}, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} transition-opacity duration-300`}
        style={{ opacity: hovered ? 1 : 0.4 }} />

      {/* Gradient border on hover */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${service.glow.replace("0.3", "0.5")}, transparent 50%)`,
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className={`relative p-7 ${service.large ? "h-full flex flex-col justify-between min-h-[260px] md:min-h-[320px]" : ""}`}>
        {/* Icon */}
        <div className="mb-5">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl transition-transform duration-300"
            style={{
              background: `linear-gradient(135deg, ${service.glow.replace("0.3", "0.25")}, ${service.glow.replace("0.3", "0.1")})`,
              border: `1px solid ${service.glow.replace("0.3", "0.3")}`,
              transform: hovered ? "scale(1.15) rotate(5deg)" : "scale(1) rotate(0deg)",
            }}
          >
            <Icon size={20} className="text-white/80" />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="text-xs text-white/35 font-medium mb-1.5 tracking-wide">{service.subtitle}</p>
          <h3 className={`font-bold text-white mb-3 flex items-center justify-between gap-2 ${
            service.large ? "text-2xl lg:text-3xl" : "text-base"
          }`}>
            {service.title}
            <ArrowUpRight
              size={16}
              className="text-white/20 transition-all duration-200 shrink-0"
              style={{
                color: hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                transform: hovered ? "translate(2px,-2px)" : "translate(0,0)",
              }}
            />
          </h3>
          <p className="text-sm text-white/45 leading-relaxed">{service.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Container variants ── */
export default function Services() {
  return (
    <section className="py-28 px-4 sm:px-6 bg-[#050505] relative overflow-hidden">
      {/* Subtle bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-900/10 blur-[160px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase text-violet-300"
            style={{ border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.1)" }}>
            Neler Yapıyoruz
          </span>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold text-white mt-2 tracking-tight">
            Hizmetlerimiz
          </h2>
          <p className="text-[#888899] mt-4 max-w-xl mx-auto text-base leading-relaxed">
            E-ticaret markalarına özel, entegre dijital pazarlama çözümleri.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-auto md:auto-rows-[220px] gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <Link
              href="/iletisim"
              className="group relative flex flex-col items-center justify-center h-full min-h-[200px] rounded-3xl text-center p-7 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              style={{
                background: "rgba(124,58,237,0.08)",
                border: "1px solid rgba(124,58,237,0.2)",
              }}
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.15), transparent 70%)" }} />
              <div className="relative">
                <p className="text-white/40 text-sm mb-4 leading-relaxed">
                  Hangi paketi seçeceğinizden emin değil misiniz?
                </p>
                <span
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 group-hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #C084FC)" }}
                >
                  Ücretsiz Danışmanlık Al
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
