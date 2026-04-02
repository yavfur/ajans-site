"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className={`max-w-6xl mx-auto px-5 h-14 flex items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border border-border shadow-lg shadow-black/20"
            : "bg-background/40 backdrop-blur-md border border-white/10"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="text-lg font-bold text-foreground tracking-tight">
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

        {/* CTA Button */}
        <Link
          href="/iletisim"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-all duration-200 hover:shadow-md hover:shadow-brand/30 cursor-pointer"
        >
          Teklif Al
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-foreground cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menüyü aç"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto rounded-2xl bg-background/90 backdrop-blur-xl border border-border shadow-lg px-5 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-200 py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-brand text-white text-sm font-medium mt-1 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            Teklif Al
          </Link>
        </div>
      )}
    </header>
  );
}
