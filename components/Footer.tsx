import Link from "next/link";
import { Camera, Briefcase, AtSign } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

const socials = [
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: Briefcase, label: "LinkedIn", href: "#" },
  { icon: AtSign, label: "Twitter/X", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Logo + Tagline */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-xl font-bold text-white tracking-tight">
            Ajans<span className="text-white/40">.</span>
          </Link>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">
            Biz sadece trafik değil, satış üretiyoruz.
          </p>
          <div className="flex gap-2 mt-1">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Hızlı Linkler */}
        <div>
          <h4 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">Sayfalar</h4>
          <ul className="flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/45 hover:text-white transition-colors duration-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h4 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">İletişim</h4>
          <div className="flex flex-col gap-2.5 text-sm text-white/45">
            <a href="mailto:info@ajans.com" className="hover:text-white transition-colors duration-200">
              info@ajans.com
            </a>
            <a href="tel:+905001234567" className="hover:text-white transition-colors duration-200">
              +90 500 123 45 67
            </a>
            <p className="text-white/30 text-xs mt-1">Pzt–Cum: 09:00–18:00</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 sm:px-6 py-5 max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/30">© 2026 Ajans. Tüm hakları saklıdır.</p>
        <Link href="/gizlilik" className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200">
          Gizlilik Politikası
        </Link>
      </div>
    </footer>
  );
}
