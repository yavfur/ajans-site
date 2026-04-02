"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  isActive: boolean;
};

export default function MusteriDuzenlePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Client | null>(null);

  useEffect(() => {
    fetch(`/api/admin/musteriler/${id}`)
      .then((r) => r.json())
      .then(setForm);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setLoading(true);
    await fetch(`/api/admin/musteriler/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    router.push("/admin/musteriler");
  };

  if (!form) return <div className="text-foreground/40 text-sm">Yükleniyor...</div>;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/musteriler" className="p-2 rounded-lg text-foreground/40 hover:text-foreground hover:bg-background transition-all">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Müşteri Düzenle</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-xl border border-border bg-background flex flex-col gap-4">
        {[
          { key: "name", label: "Ad Soyad", required: true },
          { key: "email", label: "E-posta", type: "email", required: true, disabled: true },
          { key: "phone", label: "Telefon" },
          { key: "company", label: "Firma Adı" },
        ].map(({ key, label, type = "text", required, disabled }) => (
          <div key={key}>
            <label className="block text-xs text-foreground/50 mb-1.5">
              {label} {required && <span className="text-brand">*</span>}
            </label>
            <input
              required={required}
              disabled={disabled}
              type={type}
              value={(form[key as keyof Client] as string) ?? ""}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors disabled:opacity-50"
            />
          </div>
        ))}

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isActive"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            className="accent-brand"
          />
          <label htmlFor="isActive" className="text-sm text-foreground">Hesap Aktif</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 py-3 rounded-lg bg-brand text-white font-medium hover:bg-brand/90 disabled:opacity-50 transition-colors"
        >
          {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </button>
      </form>
    </div>
  );
}
