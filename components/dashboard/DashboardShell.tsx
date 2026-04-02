"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Menu } from "lucide-react";

type Service = { id: string; name: string; icon: string };

export default function DashboardShell({
  user,
  services,
  children,
}: {
  user: { name?: string | null };
  services: Service[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-background border-b border-border flex items-center px-4 gap-3">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Menüyü aç"
        >
          <Menu size={20} />
        </button>
        <span className="text-base font-bold text-foreground tracking-tight">
          Ajans<span className="text-brand">.</span>
          <span className="text-xs font-normal text-foreground/35 ml-1.5">Panel</span>
        </span>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <DashboardSidebar user={user} services={services} onClose={() => setOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
