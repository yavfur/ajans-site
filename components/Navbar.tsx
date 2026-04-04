"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, ArrowRight, Zap } from "lucide-react";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > 100) setHidden(y > lastY.current);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4"
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav
          style={{
            maxWidth: "1200px", margin: "0 auto",
            padding: "0 20px", height: "56px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderRadius: "16px",
            transition: "all 0.4s ease",
            ...(scrolled ? {
              background: "rgba(5,5,5,0.88)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.08)",
            } : {
              background: "transparent",
              border: "1px solid transparent",
            }),
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
            <Zap size={16} style={{ color: "#7C3AED" }} />
            <span style={{ fontSize: "16px", fontWeight: 700, color: "#F5F5F7", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}>
              Ajans
            </span>
            <span style={{ color: "#06B6D4", fontWeight: 700 }}>.</span>
          </Link>

          {/* Desktop links */}
          <ul style={{ display: "none", listStyle: "none", margin: 0, padding: 0, gap: "24px" }} className="hidden md:flex">
            {navLinks.map((link) => (
              <li key={link.href} style={{ position: "relative" }}>
                <Link
                  href={link.href}
                  style={{ fontSize: "14px", color: "#9CA3AF", textDecoration: "none", transition: "color 0.2s", padding: "4px 0" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#9CA3AF"; }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop right */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "8px" }}>
            <Link
              href="/giris"
              style={{ padding: "8px", borderRadius: "8px", color: "#9CA3AF", transition: "color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#9CA3AF"; }}
            >
              <LogIn size={17} />
            </Link>
            <Link
              href="/iletisim"
              className="glow-amber"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "8px 16px", borderRadius: "10px",
                background: "#F59E0B", color: "#0A0A0F",
                fontWeight: 700, fontSize: "13px", textDecoration: "none",
                transition: "transform 0.2s",
                fontFamily: "var(--font-heading)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              Teklif Al
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ width: "32px", height: "32px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            aria-label="Menü"
          >
            <motion.span style={{ display: "block", height: "1.5px", width: "22px", background: "#fff", borderRadius: "2px", transformOrigin: "center" }}
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} />
            <motion.span style={{ display: "block", height: "1.5px", width: "22px", background: "#fff", borderRadius: "2px" }}
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.22 }} />
            <motion.span style={{ display: "block", height: "1.5px", width: "22px", background: "#fff", borderRadius: "2px", transformOrigin: "center" }}
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mob"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: "rgba(5,5,5,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div style={{
              position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
              width: "300px", height: "300px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)",
              filter: "blur(60px)", pointerEvents: "none",
            }} />

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "4px", padding: "0 24px" }}>
              {navLinks.map((link, i) => (
                <motion.div key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.35, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{ display: "block", fontSize: "28px", fontWeight: 700, color: "rgba(255,255,255,0.55)", textAlign: "center", padding: "8px 0", textDecoration: "none", fontFamily: "var(--font-heading)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ delay: 0.45, duration: 0.35 }}
                style={{ marginTop: "32px", width: "100%", maxWidth: "260px", display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Link href="/iletisim" onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    padding: "14px", borderRadius: "14px",
                    background: "#F59E0B", color: "#0A0A0F",
                    fontWeight: 700, fontSize: "15px", textDecoration: "none", fontFamily: "var(--font-heading)",
                  }}
                >
                  Teklif Al <ArrowRight size={15} />
                </Link>
                <Link href="/giris" onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    padding: "12px", borderRadius: "14px",
                    border: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF",
                    fontSize: "14px", textDecoration: "none",
                  }}
                >
                  <LogIn size={14} /> Müşteri Girişi
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
