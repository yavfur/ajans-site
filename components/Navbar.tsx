"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn } from "lucide-react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü açıkken scroll'u engelle
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
      <nav
        className={`max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-background/95 md:bg-background/80 md:backdrop-blur-xl border border-border shadow-lg shadow-black/20"
            : "bg-background/90 md:bg-background/40 md:backdrop-blur-md border border-white/10"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="text-lg font-bold text-foreground tracking-tight shrink-0">
          Ajans<span className="text-brand">.</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right: Login icon + CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/giris"
            title="Müşteri Girişi"
            className="p-2 rounded-lg text-foreground/45 hover:text-foreground hover:bg-white/8 transition-all duration-200"
          >
            <LogIn size={17} />
          </Link>
          <Link
            href="/iletisim"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-brand text-[#0b1a12] text-sm font-medium hover:bg-brand/90 transition-all duration-200 hover:shadow-md hover:shadow-brand/30 cursor-pointer"
          >
            Teklif Al
          </Link>
        </div>

        {/* Mobile Right: Login icon + Hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <Link
            href="/giris"
            title="Müşteri Girişi"
            className="p-2 rounded-lg text-foreground/50 hover:text-foreground transition-colors"
          >
            <LogIn size={18} />
          </Link>
          <button
            className="p-2 rounded-lg text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden mt-2 max-w-6xl mx-auto rounded-2xl bg-background border border-border shadow-xl shadow-black/30 overflow-hidden"
          >
            <div className="px-2 py-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.18 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center px-4 py-3 rounded-xl text-sm text-foreground/70 hover:text-foreground hover:bg-muted transition-all duration-150"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="px-4 pb-4 pt-1 border-t border-border flex flex-col gap-2">
              <Link
                href="/giris"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-foreground/70 text-sm font-medium hover:text-foreground hover:border-brand/40 transition-all duration-200"
                onClick={() => setMenuOpen(false)}
              >
                <LogIn size={15} />
                Müşteri Girişi
              </Link>
              <Link
                href="/iletisim"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-[#0b1a12] text-sm font-medium hover:bg-brand/90 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Teklif Al
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
