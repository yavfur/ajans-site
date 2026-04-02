"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Receipt,
  MessageSquare,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/musteriler", label: "Müşteriler", icon: Users },
  { href: "/admin/icerikler", label: "İçerikler", icon: FileText },
  { href: "/admin/faturalar", label: "Faturalar", icon: Receipt },
  { href: "/admin/mesajlar", label: "Mesajlar", icon: MessageSquare },
];

export default function AdminSidebar({ user }: { user: { name?: string | null } }) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-background border-r border-border flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <Link href="/admin" className="text-base font-bold text-foreground tracking-tight">
          Ajans<span className="text-brand">.</span>
          <span className="text-xs font-normal text-foreground/35 ml-2">Admin</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                active
                  ? "bg-brand/10 text-brand font-medium"
                  : "text-foreground/50 hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon size={15} className={active ? "text-brand" : "text-foreground/40"} />
              {label}
              {active && <span className="ml-auto w-1 h-4 rounded-full bg-brand" />}
            </Link>
          );
        })}
      </nav>

      {/* Alt */}
      <div className="px-2 py-3 border-t border-border">
        <div className="px-3 py-2.5 mb-1 rounded-lg bg-muted">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-brand/20 text-brand flex items-center justify-center text-xs font-bold shrink-0">
              {(user.name ?? "A").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-foreground/35">Admin</p>
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
