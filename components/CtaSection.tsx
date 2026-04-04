"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Shield } from "lucide-react";

export default function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#050505",
        padding: "clamp(80px,14vh,160px) 0",
      }}
    >
      {/* ── ANIMATED BACKGROUND ── */}
      <motion.div
        style={{ position: "absolute", inset: 0, y: bgY, pointerEvents: "none" }}
      >
        {/* Deep radial */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "1200px",
            height: "700px",
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.22) 0%, rgba(124,58,237,0.10) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Purple top-left */}
        <div
          className="animate-blob-1"
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        {/* Blue bottom-right */}
        <div
          className="animate-blob-2"
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "-8%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.20) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        {/* Grid */}
        <div
          className="grid-bg"
          style={{ position: "absolute", inset: 0, opacity: 0.4 }}
        />
        {/* Top separator */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(124,58,237,0.3), transparent)",
          }}
        />
      </motion.div>

      {/* ── CONTENT ── */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 clamp(20px,5vw,48px)",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "28px" }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "7px 18px",
                borderRadius: "99px",
                background: "rgba(59,130,246,0.12)",
                border: "1px solid rgba(59,130,246,0.28)",
                fontSize: "11px",
                fontWeight: 700,
                color: "#60A5FA",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
              }}
            >
              <motion.span
                className="animate-pulse-dot"
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#3B82F6",
                  display: "inline-block",
                  boxShadow: "0 0 8px rgba(59,130,246,0.9)",
                }}
              />
              Büyüme Fırsatı Açık
            </span>
          </motion.div>

          {/* Headline */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={{ y: "105%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(36px,6vw,76px)",
                  fontWeight: 800,
                  color: "#F5F5F7",
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.06,
                  margin: 0,
                }}
              >
                Markanın büyüme
              </motion.h2>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.div
                initial={{ y: "105%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(36px,6vw,76px)",
                  fontWeight: 800,
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.06,
                  background:
                    "linear-gradient(120deg, #3B82F6 0%, #60A5FA 50%, #A78BFA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                potansiyelini keşfedelim
              </motion.div>
            </div>
          </div>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontSize: "clamp(15px,1.8vw,18px)",
              color: "#888899",
              lineHeight: 1.7,
              maxWidth: "520px",
              margin: "0 auto 44px",
            }}
          >
            Ücretsiz growth analizi ile rakiplerine kıyasla nerede durduğunu
            görelim. Büyüme fırsatları, açık kanallar ve aksiyon planı — 48 saat
            içinde.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Link
              href="/iletisim"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "20px 42px",
                borderRadius: "14px",
                background: "#3B82F6",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "18px",
                textDecoration: "none",
                fontFamily: "var(--font-heading)",
                boxShadow:
                  "0 0 40px rgba(59,130,246,0.5), 0 0 100px rgba(59,130,246,0.2)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05) translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 0 64px rgba(59,130,246,0.7), 0 0 140px rgba(59,130,246,0.32)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 0 40px rgba(59,130,246,0.5), 0 0 100px rgba(59,130,246,0.2)";
              }}
            >
              <span
                className="animate-shimmer"
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />
              Ücretsiz growth analizi al
              <ArrowRight size={20} />
            </Link>

            {/* Trust chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {[
                { icon: CheckCircle, text: "Kredi kartı gerekmez" },
                { icon: Clock,       text: "48 saat içinde yanıt" },
                { icon: Shield,      text: "İlk görüşme ücretsiz" },
              ].map((chip) => (
                <div
                  key={chip.text}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "5px 12px",
                    borderRadius: "99px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontSize: "11px",
                    color: "#9CA3AF",
                  }}
                >
                  <chip.icon size={10} style={{ color: "#22C55E" }} />
                  {chip.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{
              marginTop: "64px",
              paddingTop: "40px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "48px",
            }}
          >
            {[
              { value: "50+",  label: "Büyüyen Marka" },
              { value: "6.4×", label: "En Yüksek ROAS" },
              { value: "₺5M+", label: "Yönetilen Bütçe" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#22C55E",
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#888899",
                    marginTop: "4px",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
