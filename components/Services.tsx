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
    description: "Facebook, Instagram ve Google'da yüksek ROAS'lı kampanyalar. A/B testler, audience segmentasyonu ve conversion tracking.",
    accent: "#6366F1",
    glow: "rgba(99,102,241,0.25)",
    large: true,
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Dev",
    subtitle: "Shopify Uzmanlığı",
    description: "Shopify kurulum, tema özelleştirme, CRO ve GA4 entegrasyonu.",
    accent: "#22C55E",
    glow: "rgba(34,197,94,0.2)",
    large: false,
  },
  {
    icon: FileText,
    title: "Content & Creative",
    subtitle: "İçerik Üretimi",
    description: "SEO uyumlu içerikler, sosyal medya görselleri ve video üretimi.",
    accent: "#6366F1",
    glow: "rgba(99,102,241,0.2)",
    large: false,
  },
  {
    icon: Store,
    title: "Marketplace",
    subtitle: "Trendyol & Pazaryerleri",
    description: "Trendyol ve diğer pazaryerlerinde kampanya ve listeleme optimizasyonu.",
    accent: "#22C55E",
    glow: "rgba(34,197,94,0.2)",
    large: false,
  },
  {
    icon: Share2,
    title: "Sosyal Medya",
    subtitle: "Instagram, TikTok",
    description: "İçerik takvimi, community management ve influencer koordinasyonu.",
    accent: "#6366F1",
    glow: "rgba(99,102,241,0.2)",
    large: false,
  },
];

function ServiceCard({ s, index }: { s: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const Icon = s.icon;

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={s.large ? "md:col-span-2 md:row-span-2" : ""}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={{
        background: "#111827",
        border: `1px solid ${hovered ? s.accent + "33" : "rgba(255,255,255,0.05)"}`,
        borderRadius: "16px",
        padding: "28px",
        overflow: "hidden",
        position: "relative",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 50px ${s.glow}` : "0 4px 20px rgba(0,0,0,0.3)",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        minHeight: s.large ? "280px" : "auto",
      }}
    >
      {/* Mouse spotlight */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(280px at ${spot.x}% ${spot.y}%, ${s.glow.replace("0.2", "0.10")}, transparent 70%)`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
      }} />

      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, ${s.accent}, ${s.accent === "#6366F1" ? "#22C55E" : "#6366F1"})`,
        opacity: hovered ? 0.8 : 0.2, transition: "opacity 0.3s",
      }} />

      {/* Icon */}
      <div style={{
        width: "46px", height: "46px", borderRadius: "12px",
        background: `${s.accent}18`, border: `1px solid ${s.accent}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "16px",
        transition: "transform 0.3s",
        transform: hovered ? "scale(1.15) rotate(5deg)" : "scale(1) rotate(0deg)",
      }}>
        <Icon size={20} style={{ color: s.accent }} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: 500, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {s.subtitle}
        </div>
        <h3 style={{
          fontSize: s.large ? "22px" : "16px", fontWeight: 700,
          color: "#FFFFFF", fontFamily: "var(--font-heading)",
          marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {s.title}
          <ArrowUpRight size={15} style={{
            color: hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)",
            transform: hovered ? "translate(2px,-2px)" : "translate(0,0)",
            transition: "color 0.2s, transform 0.2s",
            flexShrink: 0,
          }} />
        </h3>
        <p style={{ fontSize: "14px", color: "#9CA3AF", lineHeight: 1.6 }}>{s.description}</p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section style={{ background: "#0B0F1A", padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "700px", height: "400px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          style={{ textAlign: "center", marginBottom: "56px" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span style={{
            display: "inline-block", padding: "5px 14px", borderRadius: "99px",
            background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
            fontSize: "11px", fontWeight: 600, color: "#a5b4fc",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px",
          }}>Hizmetler</span>
          <h2 style={{
            fontSize: "clamp(28px,4vw,48px)", fontWeight: 700,
            color: "#FFFFFF", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em",
          }}>
            Büyüme için <span className="gradient-text">her şey</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {services.map((s, i) => <ServiceCard key={s.title} s={s} index={i} />)}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <Link
              href="/iletisim"
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                height: "100%", minHeight: "200px", borderRadius: "16px", textAlign: "center",
                padding: "28px", textDecoration: "none",
                background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.15)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(249,115,22,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <p style={{ fontSize: "13px", color: "#9CA3AF", marginBottom: "16px", lineHeight: 1.5 }}>
                Hangi hizmetin size uygun olduğundan emin değil misiniz?
              </p>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "10px 20px", borderRadius: "10px",
                background: "#F97316", color: "#FFFFFF",
                fontWeight: 700, fontSize: "13px", fontFamily: "var(--font-heading)",
              }}>
                Ücretsiz Danışmanlık Al
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
