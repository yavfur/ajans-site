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
  Layers,
  Inbox,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/musteriler", label: "Müşteriler", icon: Users },
  { href: "/admin/hizmetler", label: "Hizmetler", icon: Layers },
  { href: "/admin/icerikler", label: "İçerikler", icon: FileText },
  { href: "/admin/faturalar", label: "Faturalar", icon: Receipt },
  { href: "/admin/mesajlar", label: "Mesajlar", icon: MessageSquare },
  { href: "/admin/iletisim", label: "İletişim Talepleri", icon: Inbox },
];

export default function AdminSidebar({
  user,
  collapsed,
  onToggle,
  onClose,
}: {
  user: { name?: string | null };
  collapsed?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className="h-full bg-background border-r border-border flex flex-col overflow-hidden">
      {/* Logo + Toggle */}
      <div className="px-3 py-4 border-b border-border flex items-center justify-between gap-2 min-h-[57px]">
        {!collapsed && (
          <Link
            href="/admin"
            onClick={onClose}
            className="text-base font-bold text-foreground tracking-tight whitespace-nowrap"
          >
            Ajans<span className="text-brand">.</span>
            <span className="text-xs font-normal text-foreground/35 ml-2">Admin</span>
          </Link>
        )}
        {onToggle && (
          <button
            onClick={onToggle}
            className={`p-1.5 rounded-lg text-foreground/40 hover:text-foreground hover:bg-muted transition-colors shrink-0 ${
              collapsed ? "mx-auto" : "ml-auto"
            }`}
            aria-label={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                collapsed ? "justify-center" : ""
              } ${
                active
                  ? "bg-brand/10 text-brand font-medium"
                  : "text-foreground/50 hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon size={15} className={`shrink-0 ${active ? "text-brand" : "text-foreground/40"}`} />
              {!collapsed && (
                <>
                  <span className="truncate">{label}</span>
                  {active && <span className="ml-auto w-1 h-4 rounded-full bg-brand shrink-0" />}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Alt */}
      <div className="px-2 py-3 border-t border-border">
        {!collapsed && (
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
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/giris" })}
          title={collapsed ? "Çıkış Yap" : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground/45 hover:text-red-400 hover:bg-red-500/8 transition-all duration-150 w-full cursor-pointer ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={15} className="shrink-0" />
          {!collapsed && "Çıkış Yap"}
        </button>
      </div>
    </aside>
  );
}
