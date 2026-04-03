"use client";

import Link from "next/link";
import { Camera, Briefcase, AtSign, ArrowRight } from "lucide-react";
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
    <a
      href={href}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
      style={{
        background: hovered ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
        border: hovered ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.07)",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        boxShadow: hovered ? "0 0 20px rgba(124,58,237,0.4)" : "none",
      }}
    >
      <Icon size={15} style={{ color: hovered ? "#C084FC" : "rgba(255,255,255,0.4)" }} />
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      {/* ── Top CTA ── */}
      <div className="relative overflow-hidden py-20 px-4 sm:px-6"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(124,58,237,0.12), transparent 70%)" }} />

        <motion.div
          className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-2">
              Projenizi konuşalım.
            </h3>
            <p className="text-[#888899]">Ücretsiz danışmanlık için hemen ulaşın.</p>
          </div>
          <Link
            href="/iletisim"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #C084FC)",
              boxShadow: "0 0 30px rgba(124,58,237,0.3)",
            }}
          >
            Bize Ulaşın
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>

      {/* Gradient separator */}
      <div className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(6,182,212,0.3), transparent)" }} />

      {/* ── Main grid ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-12">
        {/* Logo + tagline */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-white">Ajans</span>
            <span className="gradient-text">.</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#888899" }}>
            Biz sadece trafik değil, satış üretiyoruz. E-ticaret markaları için veri odaklı büyüme.
          </p>
          <div className="flex gap-2 mt-1">
            {socials.map((s) => (
              <SocialIcon key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] mb-5"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            Sayfalar
          </h4>
          <ul className="flex flex-col gap-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] mb-5"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            İletişim
          </h4>
          <div className="flex flex-col gap-3 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            <a href="mailto:info@ajans.com"
              className="hover:text-white transition-colors duration-200">
              info@ajans.com
            </a>
            <a href="tel:+905001234567"
              className="hover:text-white transition-colors duration-200">
              +90 500 123 45 67
            </a>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
              Pzt–Cum: 09:00–18:00
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-4 sm:px-6 py-5 max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          © 2026 Ajans. Tüm hakları saklıdır.
        </p>
        <Link href="/gizlilik"
          className="text-xs transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.2)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
        >
          Gizlilik Politikası
        </Link>
      </div>
    </footer>
  );
}
