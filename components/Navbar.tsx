"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/kpi", label: "KPI" },
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
      // Hide on scroll down (after 100px), show on scroll up
      if (y > 100) {
        setHidden(y > lastY.current);
      } else {
        setHidden(false);
      }
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
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <nav
          className="max-w-[1200px] mx-auto px-5 h-14 flex items-center justify-between rounded-2xl transition-all duration-500"
          style={scrolled ? {
            background: "rgba(5,5,5,0.7)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          } : {
            background: "transparent",
            border: "1px solid transparent",
          }}
        >
          {/* Logo */}
          <Link href="/" className="text-[17px] font-bold tracking-tight shrink-0">
            <span className="text-white">Ajans</span>
            <span className="gradient-text">.</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="text-sm text-white/55 hover:text-white transition-colors duration-200 py-1"
                >
                  {link.label}
                  {/* Underline grow left→right */}
                  <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/giris"
              title="Müşteri Girişi"
              className="p-2 rounded-lg text-white/40 hover:text-white transition-colors duration-200"
            >
              <LogIn size={17} />
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #C084FC)",
                boxShadow: "0 0 20px rgba(124,58,237,0.3)",
              }}
            >
              Teklif Al
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            <motion.span
              className="block h-px w-6 bg-white origin-center"
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block h-px w-6 bg-white"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block h-px w-6 bg-white origin-center"
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </nav>
      </motion.header>

      {/* ── Full-screen mobile overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: "rgba(5,5,5,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Blob accent */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-violet-600/15 blur-[80px] pointer-events-none" />

            <div className="flex flex-col items-center justify-center h-full gap-2 px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    className="block text-3xl font-bold text-white/60 hover:text-white text-center py-2 transition-colors duration-200 tracking-tight"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-10 flex flex-col gap-3 w-full max-w-[280px]"
              >
                <Link
                  href="/iletisim"
                  className="flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-semibold text-base"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #C084FC)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  Teklif Al
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/giris"
                  className="flex items-center justify-center gap-2 py-4 rounded-2xl text-white/50 text-sm font-medium hover:text-white transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  <LogIn size={15} />
                  Müşteri Girişi
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
