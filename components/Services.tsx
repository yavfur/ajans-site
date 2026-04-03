"use client";

import { motion } from "framer-motion";
import { Target, Share2, Search, Palette, Filter, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, MouseEvent } from "react";

const services = [
  {
    icon: Target,
    title: "Performance Marketing",
    subtitle: "Büyüme Sistemi",
    description: "Tüm reklam kanallarını tek strateji altında birleştiren veri odaklı büyüme sistemi. ROAS hedefleri, bütçe optimizasyonu ve sürekli A/B test döngüsü.",
    accent: "#6366F1",
    glow: "rgba(99,102,241,0.25)",
    metric: "Avg ROAS lift: +2.4x",
    status: "ACTIVE",
    statusColor: "#22C55E",
    large: true,
    bars: [65, 78, 85],
  },
  {
    icon: Share2,
    title: "Meta Ads",
    subtitle: "Facebook & Instagram",
    description: "Audience segmentasyonu, creative testing ve funnel optimizasyonu ile Meta'da ölçeklenebilir büyüme.",
    accent: "#6366F1",
    glow: "rgba(99,102,241,0.2)",
    metric: "Avg CPA reduction: −31%",
    status: "RUNNING",
    statusColor: "#6366F1",
    large: false,
    bars: [],
  },
  {
    icon: Search,
    title: "Google Ads",
    subtitle: "Search & Display",
    description: "Arama niyeti odaklı kampanyalar, Performance Max yapılandırması ve akıllı teklif stratejileri.",
    accent: "#22C55E",
    glow: "rgba(34,197,94,0.2)",
    metric: "Avg CTR improvement: +1.8%",
    status: "RUNNING",
    statusColor: "#22C55E",
    large: false,
    bars: [],
  },
  {
    icon: Palette,
    title: "Creative Optimization",
    subtitle: "A/B Test & Kreatif",
    description: "Kreatif yorgunluğunu önleyen sürekli test döngüsü. Video, statik ve carousel formatlarında veri destekli içerik.",
    accent: "#22C55E",
    glow: "rgba(34,197,94,0.2)",
    metric: "Avg hook rate: +44%",
    status: "ACTIVE",
    statusColor: "#22C55E",
    large: false,
    bars: [],
  },
  {
    icon: Filter,
    title: "Funnel Optimization",
    subtitle: "CRO & Dönüşüm",
    description: "Landing page testi, checkout optimizasyonu ve kullanıcı yolculuğu analizi ile dönüşüm oranlarını artırın.",
    accent: "#6366F1",
    glow: "rgba(99,102,241,0.2)",
    metric: "Avg conv. rate: +22%",
    status: "ACTIVE",
    statusColor: "#6366F1",
    large: false,
    bars: [],
  },
];

/* mini bar chart for the large card */
function MiniBarGroup({ bars, color }: { bars: number[]; color: string }) {
  if (!bars.length) return null;
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "flex-end", height: "28px" }}>
      {bars.map((h, i) => (
        <motion.div key={i}
          style={{ width: "8px", borderRadius: "2px 2px 0 0", background: color, opacity: 0.5 + i * 0.2 }}
          initial={{ height: 0 }} whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        />
      ))}
    </div>
  );
}

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
        border: `1px solid ${hovered ? s.accent + "40" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "16px",
        padding: "28px",
        overflow: "hidden",
        position: "relative",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        transform: hovered ? "translateY(-10px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 28px 70px ${s.glow.replace("0.2", "0.35")}, inset 0 0 40px ${s.glow.replace("0.2", "0.06")}`
          : "0 4px 20px rgba(0,0,0,0.35)",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        minHeight: s.large ? "300px" : "auto",
      }}
    >
      {/* Mouse spotlight */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(360px at ${spot.x}% ${spot.y}%, ${s.glow.replace("0.2", "0.12")}, transparent 70%)`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
      }} />

      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, ${s.accent}, ${s.accent === "#6366F1" ? "#22C55E" : "#6366F1"})`,
        opacity: hovered ? 1 : 0.25, transition: "opacity 0.3s",
      }} />

      {/* Corner glow */}
      <div style={{
        position: "absolute", top: "-40px", right: "-40px",
        width: "180px", height: "180px", borderRadius: "50%",
        background: `radial-gradient(circle, ${s.glow} 0%, transparent 70%)`,
        opacity: hovered ? 0.8 : 0.2, transition: "opacity 0.3s", pointerEvents: "none",
      }} />

      {/* Header row: icon + status badge */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "13px",
          background: `${s.accent}18`, border: `1px solid ${s.accent}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.3s, box-shadow 0.3s",
          transform: hovered ? "scale(1.18) rotate(6deg)" : "scale(1) rotate(0deg)",
          boxShadow: hovered ? `0 0 20px ${s.accent}40` : "none",
        }}>
          <Icon size={20} style={{ color: s.accent }} />
        </div>

        {/* System status badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: "5px",
          padding: "4px 9px", borderRadius: "99px",
          background: `${s.statusColor}12`,
          border: `1px solid ${s.statusColor}28`,
        }}>
          <motion.span style={{
            width: "5px", height: "5px", borderRadius: "50%",
            background: s.statusColor,
            boxShadow: `0 0 6px ${s.statusColor}`,
            display: "inline-block",
          }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
          <span style={{ fontSize: "8px", fontWeight: 800, color: s.statusColor, letterSpacing: "0.12em", fontFamily: "var(--font-mono)" }}>
            {s.status}
          </span>
        </div>
      </div>

      {/* Large card: mini bar chart */}
      {s.large && (
        <div style={{ marginBottom: "16px" }}>
          <MiniBarGroup bars={s.bars} color={s.accent} />
        </div>
      )}

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "10px", color: "#9CA3AF", fontWeight: 600, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {s.subtitle}
        </div>
        <h3 style={{
          fontSize: s.large ? "22px" : "16px", fontWeight: 700,
          color: "#FFFFFF", fontFamily: "var(--font-heading)",
          marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-between",
          letterSpacing: s.large ? "-0.02em" : "-0.01em",
        }}>
          {s.title}
          <ArrowUpRight size={15} style={{
            color: hovered ? s.accent : "rgba(255,255,255,0.15)",
            transform: hovered ? "translate(2px,-2px)" : "translate(0,0)",
            transition: "color 0.2s, transform 0.2s",
            flexShrink: 0,
          }} />
        </h3>
        <p style={{ fontSize: "14px", color: "#9CA3AF", lineHeight: 1.65, marginBottom: "20px" }}>
          {s.description}
        </p>
      </div>

      {/* Metric footer */}
      <div style={{
        paddingTop: "14px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "2px", background: s.accent, flexShrink: 0 }} />
        <span style={{ fontSize: "10px", color: s.accent, fontWeight: 700, fontFamily: "var(--font-mono)" }}>
          {s.metric}
        </span>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section style={{ background: "#0B0F1A", padding: "100px 0", position: "relative", overflow: "hidden" }}>

      {/* ── BACKGROUND LAYERS ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "800px", height: "800px",
          background: "radial-gradient(circle, rgba(99,102,241,0.16) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-15%", left: "-8%",
          width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.04) 50%, transparent 70%)",
          filter: "blur(70px)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
      </div>

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
            fontSize: "11px", fontWeight: 700, color: "#a5b4fc",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px",
          }}>Hizmetler</span>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800,
            color: "#FFFFFF", fontFamily: "var(--font-heading)",
            letterSpacing: "-0.03em",
          }}>
            Büyüme için{" "}
            <span style={{
              background: "linear-gradient(135deg, #22C55E 0%, #6366F1 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              her araç
            </span>
          </h2>
          <p style={{ fontSize: "15px", color: "#9CA3AF", marginTop: "14px", maxWidth: "420px", margin: "14px auto 0", lineHeight: 1.65 }}>
            Her kanal, tek strateji. Tüm araçlar bir büyüme sistemi olarak çalışır.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {services.map((s, i) => <ServiceCard key={s.title} s={s} index={i} />)}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <Link href="/iletisim" style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              height: "100%", minHeight: "200px", borderRadius: "16px", textAlign: "center",
              padding: "28px", textDecoration: "none",
              background: "rgba(249,115,22,0.07)", border: "1px solid rgba(249,115,22,0.18)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              boxShadow: "inset 0 0 40px rgba(249,115,22,0.04)",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(249,115,22,0.18)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "inset 0 0 40px rgba(249,115,22,0.04)"; }}
            >
              <p style={{ fontSize: "13px", color: "#9CA3AF", marginBottom: "16px", lineHeight: 1.55 }}>
                Hangi kanal size en uygun?
              </p>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "10px 20px", borderRadius: "10px",
                background: "#F97316", color: "#FFFFFF",
                fontWeight: 700, fontSize: "13px", fontFamily: "var(--font-heading)",
                boxShadow: "0 0 20px rgba(249,115,22,0.35)",
              }}>
                Ücretsiz Analiz Al
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
