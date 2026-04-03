"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, BarChart2, Zap, Eye } from "lucide-react";

const reasons = [
  {
    num: "01", icon: Layers, title: "360° Entegre Hizmet",
    description: "Reklamdan içeriğe, Shopify geliştirmeden marketplace yönetimine kadar tüm kanalları tek elden yönetiyoruz.",
    accent: "#6366F1", glow: "rgba(99,102,241,0.15)",
  },
  {
    num: "02", icon: BarChart2, title: "Veri Odaklı Kararlar",
    description: "Vanity metrikler değil; ROAS, CPA ve gerçek gelir büyümesini ölçüyoruz. Her karar veriye dayanıyor.",
    accent: "#22C55E", glow: "rgba(34,197,94,0.15)",
  },
  {
    num: "03", icon: Eye, title: "Şeffaf Raporlama",
    description: "Haftalık raporlar ve anlık dashboard erişimi. Ne yaptığımızı, neden yaptığımızı her zaman bilirsiniz.",
    accent: "#22C55E", glow: "rgba(34,197,94,0.15)",
  },
  {
    num: "04", icon: Zap, title: "Hızlı Karar Alma",
    description: "Küçük ve çevik yapımız sayesinde kampanya değişikliklerine saatler içinde müdahale edebiliyoruz.",
    accent: "#6366F1", glow: "rgba(99,102,241,0.15)",
  },
];

export default function WhyUs() {
  return (
    <section style={{ background: "#0B0F1A", padding: "100px 0", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div className="lg:grid" style={{ display: "grid" }}>
          <div className="lg:grid-cols-[360px,1fr]" style={{ display: "grid", gap: "60px", alignItems: "start" }}>
            {/* Left sticky */}
            <div className="lg:sticky" style={{ top: "120px" }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <span style={{
                  display: "inline-block", padding: "5px 14px", borderRadius: "99px",
                  background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
                  fontSize: "11px", fontWeight: 600, color: "#a5b4fc",
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px",
                }}>Farkımız</span>
                <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "20px" }}>
                  Neden<br /><span className="gradient-text">Biz?</span>
                </h2>
                <p style={{ fontSize: "15px", color: "#9CA3AF", lineHeight: 1.65, marginBottom: "32px" }}>
                  E-ticaret sektörüne özel derin uzmanlık ve hesap verebilir bir iş ortağı.
                </p>
                <div style={{
                  padding: "20px", borderRadius: "14px",
                  background: "#111827", border: "1px solid rgba(34,197,94,0.15)",
                }}>
                  <div style={{ fontSize: "36px", fontWeight: 700, color: "#22C55E", fontFamily: "var(--font-heading)" }}>50+</div>
                  <div style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "4px" }}>Büyüyen markayla birlikte çalıştık</div>
                </div>
              </motion.div>
            </div>

            {/* Right: list */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {reasons.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={r.title}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    style={{
                      display: "flex", gap: "24px", padding: "28px 0",
                      borderBottom: i < reasons.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      position: "relative",
                    }}
                  >
                    {/* Accent line */}
                    <motion.div
                      style={{ position: "absolute", left: -24, top: 0, bottom: 0, width: "2px", background: `linear-gradient(to bottom, transparent, ${r.accent}, transparent)`, borderRadius: "2px" }}
                      initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                    />

                    <div style={{
                      width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0,
                      background: `${r.accent}15`, border: `1px solid ${r.accent}25`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={20} style={{ color: r.accent }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: r.accent, fontFamily: "var(--font-mono)", opacity: 0.7 }}>{r.num}</span>
                        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-heading)" }}>{r.title}</h3>
                      </div>
                      <p style={{ fontSize: "14px", color: "#9CA3AF", lineHeight: 1.65 }}>{r.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
