"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Service = { id: string; name: string };

type ServiceEntry = {
  serviceId: string;
  price: string;
  billingType: "MONTHLY" | "ONE_TIME";
};

export default function YeniMusteriPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    company: "",
  });
  const [selectedServices, setSelectedServices] = useState<ServiceEntry[]>([]);

  useEffect(() => {
    fetch("/api/admin/hizmetler").then((r) => r.json()).then(setServices);
  }, []);

  const toggleService = (id: string) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.serviceId === id);
      if (exists) return prev.filter((s) => s.serviceId !== id);
      return [...prev, { serviceId: id, price: "", billingType: "MONTHLY" }];
    });
  };

  const updateService = (id: string, field: "price" | "billingType", value: string) => {
    setSelectedServices((prev) =>
      prev.map((s) => (s.serviceId === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/musteriler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        services: selectedServices.map((s) => ({
          ...s,
          price: parseFloat(s.price) || 0,
        })),
      }),
    });
    setLoading(false);
    if (res.ok) router.push("/admin/musteriler");
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/musteriler" className="p-2 rounded-lg text-foreground/40 hover:text-foreground hover:bg-background transition-all">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Yeni Müşteri</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Kişisel Bilgiler */}
        <div className="p-6 rounded-xl border border-border bg-background flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-foreground">Kişisel Bilgiler</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { key: "name", label: "Ad Soyad", required: true },
              { key: "email", label: "E-posta", type: "email", required: true },
              { key: "password", label: "Şifre", type: "password", required: true },
              { key: "phone", label: "Telefon" },
              { key: "company", label: "Firma Adı" },
            ].map(({ key, label, type = "text", required }) => (
              <div key={key} className={key === "company" ? "sm:col-span-2" : ""}>
                <label className="block text-xs text-foreground/50 mb-1.5">
                  {label} {required && <span className="text-brand">*</span>}
                </label>
                <input
                  required={required}
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-brand/60 transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hizmet Atama */}
        <div className="p-6 rounded-xl border border-border bg-background flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-foreground">Hizmet Ata</h2>
          {services.length === 0 ? (
            <p className="text-sm text-foreground/40">Hizmet bulunamadı.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {services.map((service) => {
                const entry = selectedServices.find((s) => s.serviceId === service.id);
                return (
                  <div key={service.id} className={`p-4 rounded-lg border transition-all ${entry ? "border-brand/40 bg-brand/5" : "border-border"}`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!entry}
                        onChange={() => toggleService(service.id)}
                        className="accent-brand"
                      />
                      <span className="text-sm font-medium text-foreground">{service.name}</span>
                    </label>
                    {entry && (
                      <div className="mt-3 grid grid-cols-2 gap-3 pl-6">
                        <div>
                          <label className="block text-xs text-foreground/40 mb-1">Fiyat (TL)</label>
                          <input
                            type="number"
                            placeholder="0"
                            value={entry.price}
                            onChange={(e) => updateService(service.id, "price", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-foreground/40 mb-1">Ödeme Tipi</label>
                          <select
                            value={entry.billingType}
                            onChange={(e) => updateService(service.id, "billingType", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-brand/60 transition-colors"
                          >
                            <option value="MONTHLY">Aylık</option>
                            <option value="ONE_TIME">Tek Seferlik</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="py-3 rounded-lg bg-brand text-[#0b1a12] font-medium hover:bg-brand/90 disabled:opacity-50 transition-colors"
        >
          {loading ? "Kaydediliyor..." : "Müşteri Oluştur"}
        </button>
      </form>
    </div>
  );
}
