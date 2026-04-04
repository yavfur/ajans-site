"use client";

import { motion } from "framer-motion";
import { Target, Share2, Search, Palette, Filter, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, MouseEvent } from "react";

const SERVICES = [
  {
    icon: Target,
    title: "Performance Marketing",
    sub: "Büyüme Sistemi",
    desc: "Tüm reklam kanallarını tek strateji altında birleştiren veri odaklı büyüme sistemi. ROAS hedefleri, bütçe optimizasyonu ve sürekli A/B test döngüsü.",
    accent: "#7C3AED",
    glow: "rgba(124,58,237,0.25)",
    metric: "+2.4× ort. ROAS lift",
    tag: "FLAGSHIP",
    size: "large", // large card spans 2 cols
    stats: [
      { v: "2.4×", l: "ROAS" },
      { v: "%31↓", l: "CPA" },
      { v: "50+",  l: "Marka" },
    ],
  },
  {
    icon: Share2,
    title: "Meta Ads",
    sub: "Facebook & Instagram",
    desc: "Audience segmentasyonu ve funnel optimizasyonu ile Meta'da ölçeklenebilir büyüme.",
    accent: "#3B82F6",
    glow: "rgba(59,130,246,0.22)",
    metric: "−31% ort. CPA",
    tag: "POPULAR",
    size: "small",
    stats: [],
  },
  {
    icon: Search,
    title: "Google Ads",
    sub: "Search & Display",
    desc: "Arama niyeti odaklı kampanyalar ve Performance Max ile satışa dönüşen trafik.",
    accent: "#22C55E",
    glow: "rgba(34,197,94,0.22)",
    metric: "+1.8% ort. CTR",
    tag: "CORE",
    size: "small",
    stats: [],
  },
  {
    icon: Palette,
    title: "Creative Optimization",
    sub: "A/B Test & Kreatif",
    desc: "Kreatif yorgunluğunu önleyen sürekli test döngüsü. Video, statik ve carousel formatlarında veri destekli içerik.",
    accent: "#A78BFA",
    glow: "rgba(167,139,250,0.22)",
    metric: "+44% ort. hook rate",
    tag: "CREATIVE",
    size: "small",
    stats: [],
  },
  {
    icon: Filter,
    title: "Funnel Optimization",
    sub: "CRO & Dönüşüm",
    desc: "Landing page testi, checkout optimizasyonu ve kullanıcı yolculuğu analizi ile dönüşüm oranlarını artırın.",
    accent: "#06B6D4",
    glow: "rgba(6,182,212,0.22)",
    metric: "+22% ort. conv. rate",
    tag: "BOOSTER",
    size: "small",
    stats: [],
  },
];

function ServiceCard({
  s,
  i,
}: {
  s: (typeof SERVICES)[0];
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const Icon = s.icon;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setSpot({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }

  const isLarge = s.size === "large";

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: i * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        gridColumn: isLarge ? "span 2" : "span 1",
        background: hov ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hov ? s.accent + "40" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "18px",
        padding: isLarge ? "36px 40px" : "28px",
        overflow: "hidden",
        position: "relative",
        cursor: "default",
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hov
          ? `0 24px 60px ${s.glow}, 0 0 0 1px ${s.accent}20`
          : "0 4px 24px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: isLarge ? "row" : "column",
        gap: isLarge ? "40px" : "0",
        alignItems: isLarge ? "center" : "flex-start",
      }}
    >
      {/* Mouse spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(400px at ${spot.x}% ${spot.y}%, ${s.glow.replace("0.22", "0.12")}, transparent 70%)`,
          opacity: hov ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      />

      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${s.accent}, transparent 60%)`,
          opacity: hov ? 1 : 0.3,
          transition: "opacity 0.3s",
        }}
      />

      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${s.glow} 0%, transparent 70%)`,
          opacity: hov ? 1 : 0.2,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      />

      {/* Left content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: isLarge ? "24px" : "20px",
          }}
        >
          <div
            style={{
              width: isLarge ? "52px" : "46px",
              height: isLarge ? "52px" : "46px",
              borderRadius: "12px",
              background: `${s.accent}15`,
              border: `1px solid ${s.accent}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s, box-shadow 0.3s",
              transform: hov ? "scale(1.12) rotate(4deg)" : "scale(1) rotate(0)",
              boxShadow: hov ? `0 0 20px ${s.accent}40` : "none",
            }}
          >
            <Icon size={isLarge ? 22 : 18} style={{ color: s.accent }} />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "8px",
                fontWeight: 800,
                color: s.accent,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.14em",
                padding: "3px 8px",
                borderRadius: "99px",
                background: `${s.accent}12`,
                border: `1px solid ${s.accent}25`,
              }}
            >
              {s.tag}
            </span>
            <ArrowUpRight
              size={14}
              style={{
                color: hov ? s.accent : "rgba(255,255,255,0.15)",
                transform: hov ? "translate(2px,-2px)" : "none",
                transition: "all 0.2s",
              }}
            />
          </div>
        </div>

        <div
          style={{
            fontSize: "11px",
            color: "#888899",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "6px",
            fontFamily: "var(--font-mono)",
          }}
        >
          {s.sub}
        </div>
        <h3
          style={{
            fontSize: isLarge ? "24px" : "17px",
            fontWeight: 700,
            color: "#F5F5F7",
            fontFamily: "var(--font-heading)",
            letterSpacing: "-0.02em",
            marginBottom: "12px",
          }}
        >
          {s.title}
        </h3>
        <p
          style={{
            fontSize: "13px",
            color: "#9CA3AF",
            lineHeight: 1.65,
            marginBottom: "20px",
          }}
        >
          {s.desc}
        </p>

        {/* Metric footer */}
        <div
          style={{
            paddingTop: "14px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "2px",
              background: s.accent,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "11px",
              color: s.accent,
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
            }}
          >
            {s.metric}
          </span>
        </div>
      </div>

      {/* Large card right: stats strip */}
      {isLarge && s.stats.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            flexShrink: 0,
            paddingLeft: "40px",
            borderLeft: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {s.stats.map((stat) => (
            <div key={stat.l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: s.accent,
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {stat.v}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#888899",
                  marginTop: "4px",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {stat.l}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      style={{
        background: "#050505",
        padding: "clamp(60px,10vh,120px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "-15%",
            right: "-8%",
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.16) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-6%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="grid-bg"
          style={{ position: "absolute", inset: 0, opacity: 0.5 }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(16px,4vw,48px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "clamp(40px,7vh,72px)" }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "5px 14px",
              borderRadius: "99px",
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.25)",
              fontSize: "11px",
              fontWeight: 700,
              color: "#A78BFA",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
              marginBottom: "18px",
            }}
          >
            Hizmetler
          </div>
          <h2
            style={{
              fontSize: "clamp(32px,5vw,60px)",
              fontWeight: 800,
              color: "#F5F5F7",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              maxWidth: "600px",
            }}
          >
            Her kanalda büyüme,
            <br />
            <span
              style={{
                background:
                  "linear-gradient(120deg, #7C3AED, #3B82F6, #22C55E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              tek strateji altında
            </span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "14px",
          }}
          className="services-grid"
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            marginTop: "32px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link
            href="/hizmetler"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "#9CA3AF",
              fontSize: "13px",
              textDecoration: "none",
              transition: "all 0.2s",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#F5F5F7";
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#9CA3AF";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
            }}
          >
            Tüm hizmetleri gör
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .services-grid > * {
            grid-column: span 1 !important;
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
