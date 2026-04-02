"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, User2, Search } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import { SkeletonTable } from "@/components/LoadingSkeleton";
import toast from "react-hot-toast";

type ClientService = {
  id: string;
  service: { name: string };
  status: string;
};

type Client = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  isActive: boolean;
  createdAt: string;
  clientServices: ClientService[];
};

export default function MusterilerPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchClients = async () => {
    const res = await fetch("/api/admin/musteriler");
    if (res.ok) setClients(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchClients(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bu müşteriyi silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/admin/musteriler/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Müşteri silindi.");
      fetchClients();
    } else {
      toast.error("Silme işlemi başarısız.");
    }
  };

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.company ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Müşteriler"
        description={`${clients.length} aktif müşteri`}
        action={
          <Link
            href="/admin/musteriler/yeni"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-[#0b1a12] text-sm font-medium hover:bg-brand/90 transition-colors cursor-pointer"
          >
            <Plus size={15} />
            Yeni Müşteri
          </Link>
        }
      />

      {/* Search */}
      <div className="relative mb-5">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="İsim, e-posta veya firma ara..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm placeholder:text-foreground/25 focus:outline-none focus:border-brand/50 transition-colors"
        />
      </div>

      {loading ? (
        <SkeletonTable rows={5} />
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-2xl">
          <User2 size={36} className="mx-auto mb-3 text-foreground/20" />
          <p className="text-foreground/30 text-sm">
            {search ? "Sonuç bulunamadı." : "Henüz müşteri eklenmemiş."}
          </p>
          {!search && (
            <Link
              href="/admin/musteriler/yeni"
              className="inline-flex items-center gap-1.5 mt-4 text-xs text-brand hover:text-brand/80 transition-colors cursor-pointer"
            >
              <Plus size={12} /> İlk müşteriyi ekle
            </Link>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden bg-background">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3.5 text-xs text-foreground/40 font-semibold uppercase tracking-widest">Müşteri</th>
                <th className="text-left px-5 py-3.5 text-xs text-foreground/40 font-semibold uppercase tracking-widest">Firma</th>
                <th className="text-left px-5 py-3.5 text-xs text-foreground/40 font-semibold uppercase tracking-widest">Hizmetler</th>
                <th className="text-left px-5 py-3.5 text-xs text-foreground/40 font-semibold uppercase tracking-widest">Durum</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((client) => (
                <tr key={client.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xs font-bold shrink-0">
                        {client.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{client.name}</p>
                        <p className="text-xs text-foreground/40">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-foreground/55 text-sm">{client.company ?? "—"}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {client.clientServices.length === 0 ? (
                        <span className="text-foreground/25 text-xs">—</span>
                      ) : (
                        client.clientServices.map((cs) => (
                          <span key={cs.id} className="px-2 py-0.5 rounded-full bg-brand/10 text-brand text-xs font-medium">
                            {cs.service.name}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      client.isActive
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${client.isActive ? "bg-emerald-400" : "bg-red-400"}`} />
                      {client.isActive ? "Aktif" : "Pasif"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 justify-end">
                      <Link
                        href={`/admin/musteriler/${client.id}`}
                        className="p-2 rounded-lg text-foreground/30 hover:text-brand hover:bg-brand/10 transition-all cursor-pointer"
                        title="Düzenle"
                      >
                        <Pencil size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="p-2 rounded-lg text-foreground/30 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                        title="Sil"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
