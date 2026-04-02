"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { MessageSquare, Receipt, LogOut, LayoutDashboard } from "lucide-react";

type Service = { id: string; name: string; icon: string };

export default function DashboardSidebar({
  user,
  services,
  onClose,
}: {
  user: { name?: string | null };
  services: Service[];
  onClose?: () => void;
}) {
  const pathname = usePathname();

  const serviceLinks = services.map((s) => ({
    href: `/dashboard/hizmet/${s.id}`,
    label: s.name,
    emoji: s.icon || "📦",
  }));

  const bottomLinks = [
    { href: "/dashboard/mesajlar", label: "Mesajlar", icon: <MessageSquare size={15} /> },
    { href: "/dashboard/faturalar", label: "Faturalar", icon: <Receipt size={15} /> },
  ];

  return (
    <aside className="h-full w-60 bg-background border-r border-border flex flex-col">
      <div className="px-5 py-5 border-b border-border">
        <Link href="/dashboard" onClick={onClose} className="text-base font-bold text-foreground tracking-tight">
          Ajans<span className="text-brand">.</span>
          <span className="text-xs font-normal text-foreground/35 ml-2">Panel</span>
        </Link>
      </div>

      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {/* Genel Bakış */}
        <Link
          href="/dashboard"
          onClick={onClose}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
            pathname === "/dashboard"
              ? "bg-brand/10 text-brand font-medium"
              : "text-foreground/50 hover:text-foreground hover:bg-muted"
          }`}
        >
          <LayoutDashboard size={15} className={pathname === "/dashboard" ? "text-brand" : "text-foreground/40"} />
          Genel Bakış
          {pathname === "/dashboard" && <span className="ml-auto w-1 h-4 rounded-full bg-brand" />}
        </Link>

        {/* Hizmetler */}
        {serviceLinks.length > 0 && (
          <>
            <p className="px-3 pt-4 pb-1.5 text-[10px] text-foreground/25 uppercase tracking-widest font-medium">
              Hizmetlerim
            </p>
            {serviceLinks.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                    active
                      ? "bg-brand/10 text-brand font-medium"
                      : "text-foreground/50 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="text-sm leading-none">{link.emoji}</span>
                  <span className="truncate">{link.label}</span>
                  {active && <span className="ml-auto w-1 h-4 rounded-full bg-brand shrink-0" />}
                </Link>
              );
            })}
          </>
        )}

        {/* Hesap */}
        <p className="px-3 pt-4 pb-1.5 text-[10px] text-foreground/25 uppercase tracking-widest font-medium">
          Hesap
        </p>
        {bottomLinks.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                active
                  ? "bg-brand/10 text-brand font-medium"
                  : "text-foreground/50 hover:text-foreground hover:bg-muted"
              }`}
            >
              <span className={active ? "text-brand" : "text-foreground/40"}>{link.icon}</span>
              {link.label}
              {active && <span className="ml-auto w-1 h-4 rounded-full bg-brand shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* Kullanıcı */}
      <div className="px-2 py-3 border-t border-border">
        <div className="px-3 py-2.5 mb-1 rounded-lg bg-muted">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-brand/20 text-brand flex items-center justify-center text-xs font-bold shrink-0">
              {(user.name ?? "K").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-foreground/35">Müşteri</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/giris" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground/45 hover:text-red-400 hover:bg-red-500/8 transition-all duration-150 w-full cursor-pointer"
        >
          <LogOut size={15} />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
