import Link from "next/link";
import { Camera, Briefcase, AtSign } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

const legalLinks = [
  { href: "/gizlilik", label: "Gizlilik Politikası" },
];

const socials = [
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: Briefcase, label: "LinkedIn", href: "#" },
  { icon: AtSign, label: "Twitter/X", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Logo + Açıklama */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-xl font-bold text-foreground tracking-tight">
            Ajans<span className="text-brand">.</span>
          </Link>
          <p className="text-sm text-foreground/40 leading-relaxed max-w-xs">
            Markanızı dijital dünyada büyütmek için stratejik ve veri odaklı çözümler üretiyoruz.
          </p>
          <div className="flex gap-2 mt-1">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-foreground/40 hover:border-brand/50 hover:text-brand transition-all duration-200 cursor-pointer"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Hızlı Linkler */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Sayfalar</h4>
          <ul className="flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">İletişim</h4>
          <div className="flex flex-col gap-2.5 text-sm text-foreground/40">
            <a href="mailto:info@ajans.com" className="hover:text-foreground transition-colors duration-200">
              info@ajans.com
            </a>
            <a href="tel:+905001234567" className="hover:text-foreground transition-colors duration-200">
              +90 500 123 45 67
            </a>
            <p className="text-foreground/30 text-xs mt-1 leading-relaxed">
              Pzt–Cum: 09:00–18:00
            </p>
          </div>
        </div>
      </div>

      {/* Alt çizgi */}
      <div className="border-t border-border px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-foreground/30">
          © 2026 Ajans. Tüm hakları saklıdır.
        </p>
        <div className="flex gap-4">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
