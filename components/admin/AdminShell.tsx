"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({
  user,
  children,
}: {
  user: { name?: string | null };
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out ${
          collapsed ? "w-[60px]" : "w-60"
        }`}
      >
        <AdminSidebar
          user={user}
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
        />
      </div>

      {/* Main content */}
      <main
        className={`flex-1 min-h-screen transition-all duration-300 ease-in-out ${
          collapsed ? "ml-[60px]" : "ml-60"
        }`}
      >
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
