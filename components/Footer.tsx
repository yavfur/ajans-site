"use client";

import Link from "next/link";
import { Camera, Briefcase, AtSign, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const quickLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

const socials = [
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: Briefcase, label: "LinkedIn", href: "#" },
  { icon: AtSign, label: "Twitter/X", href: "#" },
];

function SocialIcon({ icon: Icon, label, href }: { icon: React.ElementType; label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "36px", height: "36px", borderRadius: "10px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.04)",
        border: hovered ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.07)",
        color: hovered ? "#a5b4fc" : "rgba(255,255,255,0.35)",
        transition: "all 0.2s",
        boxShadow: hovered ? "0 0 16px rgba(124,58,237,0.3)" : "none",
      }}
    >
      <Icon size={14} />
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      {/* Top CTA */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "64px 0", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(124,58,237,0.08), transparent 70%)",
        }} />

        <motion.div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}
          className="lg:flex-row lg:justify-between lg:items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div style={{ textAlign: "center" }} className="lg:text-left">
            <h3 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em", marginBottom: "6px" }}>
              Projenizi konuşalım.
            </h3>
            <p style={{ fontSize: "14px", color: "#888899" }}>48 saat içinde yanıt garantisi.</p>
          </div>
          <Link href="/iletisim"
            className="glow-blue"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 28px", borderRadius: "12px",
              background: "#3B82F6", color: "#FFFFFF",
              fontWeight: 700, fontSize: "14px", textDecoration: "none",
              transition: "transform 0.2s", fontFamily: "var(--font-heading)",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            Bize Ulaşın <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>

      {/* Gradient separator */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(34,197,94,0.3), transparent)" }} />

      {/* Main grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "40px" }}>
        {/* Logo + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
            <Zap size={14} style={{ color: "#22C55E" }} />
            <span style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-heading)" }}>Ajans</span>
            <span style={{ color: "#7C3AED", fontWeight: 700 }}>.</span>
          </Link>
          <p style={{ fontSize: "13px", color: "#888899", lineHeight: 1.6, maxWidth: "220px" }}>
            Veri odaklı reklam sistemi. Trafik değil, satış üretiyoruz.
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            {socials.map((s) => <SocialIcon key={s.label} {...s} />)}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "16px" }}>Sayfalar</h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "16px" }}>İletişim</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <a href="mailto:info@ajans.com" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
              info@ajans.com
            </a>
            <a href="tel:+905001234567" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
              +90 500 123 45 67
            </a>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", marginTop: "4px" }}>Pzt–Cum: 09:00–18:00</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "16px 24px", maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>© 2026 Ajans. Tüm hakları saklıdır.</p>
        <Link href="/gizlilik" style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.2)"; }}>
          Gizlilik Politikası
        </Link>
      </div>
    </footer>
  );
}
