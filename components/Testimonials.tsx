"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "İlk ajansla çalışmamızda ROAS'ımız ikiye katlandı. Veri odaklı yaklaşımları fark yaratıyor.",
    name: "Selin Korkmaz", title: "Kurucu", company: "Lumière Skin", initial: "SK",
  },
  {
    quote: "Trendyol'da satışlarımız durma noktasına gelmişti. 3 ayda ciromuz üç katına çıktı.",
    name: "Murat Demir", title: "E-ticaret Müdürü", company: "StepUp Ayakkabı", initial: "MD",
  },
  {
    quote: "Haftalık raporlar gerçekten değerli — ne yaptıklarını, neden yaptıklarını her zaman açıklıyorlar.",
    name: "Ayşe Yıldız", title: "CEO", company: "NutriBox", initial: "AY",
  },
  {
    quote: "Instagram'ımız 6 ayda 4.000'den 38.000 takipçiye çıktı. Ve bu büyüme satışa dönüştü.",
    name: "Caner Şahin", title: "Marka Direktörü", company: "BeautyLab TR", initial: "CS",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  function go(next: number) {
    setDir(next > active ? 1 : -1);
    setActive(next);
  }

  const advance = useCallback(() => {
    setDir(1);
    setActive((a) => (a + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(advance, 4500);
    return () => clearTimeout(t);
  }, [advance, paused, active]);

  const t = testimonials[active];

  return (
    <section
      style={{ background: "#050505", padding: "100px 0", position: "relative", overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "600px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          style={{ textAlign: "center", marginBottom: "48px" }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <span style={{
            display: "inline-block", padding: "5px 14px", borderRadius: "99px",
            background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
            fontSize: "11px", fontWeight: 600, color: "#22C55E",
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px",
          }}>Referanslar</span>
          <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}>
            Müşterilerimiz anlatıyor
          </h2>
        </motion.div>

        <div style={{ position: "relative", minHeight: "220px", display: "flex", alignItems: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: dir * 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: dir * -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                width: "100%", padding: "32px",
                background: "#111827", borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} style={{ fill: "#F59E0B", color: "#F59E0B" }} />
                ))}
              </div>
              <p style={{ fontSize: "clamp(16px,2vw,19px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.65, marginBottom: "24px", fontStyle: "italic" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg, #7C3AED, #22C55E)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "11px", fontWeight: 700, color: "#fff",
                }}>
                  {t.initial}
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>{t.name}</div>
                  <div style={{ fontSize: "12px", color: "#888899", marginTop: "2px" }}>{t.title} · {t.company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "20px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              () => go(active === 0 ? testimonials.length - 1 : active - 1),
              () => go((active + 1) % testimonials.length),
            ].map((fn, j) => (
              <button key={j}
                onClick={() => { setPaused(true); fn(); }}
                style={{
                  width: "38px", height: "38px", borderRadius: "10px",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >
                {j === 0 ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            {testimonials.map((_, i) => (
              <button key={i}
                onClick={() => { setPaused(true); go(i); }}
                style={{
                  height: "3px", borderRadius: "99px",
                  width: i === active ? "24px" : "6px",
                  background: i === active ? "linear-gradient(90deg, #7C3AED, #22C55E)" : "rgba(255,255,255,0.12)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "width 0.3s, background 0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
