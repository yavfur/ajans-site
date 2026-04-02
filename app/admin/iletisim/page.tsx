"use client";

import { useEffect, useState } from "react";
import { Mail, Building2, Phone, Globe, Tag } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";

type Submission = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  website: string | null;
  services: string[];
  budget: string | null;
  message: string | null;
  isRead: boolean;
  createdAt: string;
};

export default function AdminIletisimPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/iletisim")
      .then((r) => r.json())
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="İletişim Talepleri"
        description={`${submissions.length} başvuru`}
      />

      {loading ? (
        <div className="text-foreground/40 text-sm">Yükleniyor...</div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-2xl">
          <Mail size={36} className="mx-auto mb-3 text-foreground/20" />
          <p className="text-foreground/30 text-sm">Henüz başvuru yok.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {submissions.map((s) => (
            <div key={s.id} className="p-6 rounded-xl border border-border bg-background">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{s.name}</h3>
                    {!s.isRead && (
                      <span className="px-1.5 py-0.5 rounded-full bg-brand text-white text-xs font-medium">Yeni</span>
                    )}
                  </div>
                  <p className="text-xs text-foreground/40 mt-0.5">
                    {new Date(s.createdAt).toLocaleDateString("tr-TR", {
                      day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
                    })}
                  </p>
                </div>
                {s.budget && (
                  <span className="px-2.5 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-medium">
                    {s.budget}
                  </span>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Building2 size={13} className="text-foreground/30 shrink-0" />
                  {s.company}
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Mail size={13} className="text-foreground/30 shrink-0" />
                  <a href={`mailto:${s.email}`} className="hover:text-brand transition-colors">{s.email}</a>
                </div>
                {s.phone && (
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Phone size={13} className="text-foreground/30 shrink-0" />
                    {s.phone}
                  </div>
                )}
                {s.website && (
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Globe size={13} className="text-foreground/30 shrink-0" />
                    <a href={s.website} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors truncate">
                      {s.website}
                    </a>
                  </div>
                )}
              </div>

              {s.services.length > 0 && (
                <div className="flex items-start gap-2 mb-4">
                  <Tag size={13} className="text-foreground/30 mt-0.5 shrink-0" />
                  <div className="flex flex-wrap gap-1.5">
                    {s.services.map((sv) => (
                      <span key={sv} className="px-2 py-0.5 rounded-full bg-muted border border-border text-xs text-foreground/60">
                        {sv}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {s.message && (
                <p className="text-sm text-foreground/60 bg-muted rounded-lg px-4 py-3 leading-relaxed">
                  {s.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
