"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";

export default function GirisPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("E-posta veya şifre hatalı.");
      return;
    }

    const session = await fetch("/api/auth/session").then((r) => r.json());
    if (session?.user?.role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-background to-violet-500/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/8 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        className="relative w-full max-w-sm"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Geri dön */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground mb-8 transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft size={13} />
          Ana sayfaya dön
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand/10 border border-brand/20 mb-4">
            <span className="text-xl font-bold text-brand">A</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">
            Ajans<span className="text-brand">.</span>
          </h1>
          <p className="text-foreground/40 text-sm mt-1">Hesabınıza giriş yapın</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-7 rounded-2xl border border-border bg-muted/80 backdrop-blur-sm flex flex-col gap-4"
        >
          {/* E-posta */}
          <div>
            <label className="block text-xs text-foreground/50 mb-1.5 font-medium">E-posta</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30" />
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ornek@ajans.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-foreground/25 focus:outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/10 transition-all duration-200"
              />
            </div>
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-xs text-foreground/50 mb-1.5 font-medium">Şifre</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30" />
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-foreground/25 focus:outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/10 transition-all duration-200"
              />
            </div>
          </div>

          {/* Hata */}
          {error && (
            <motion.div
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AlertCircle size={13} />
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full py-3 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand/90 disabled:opacity-60 transition-all duration-200 hover:shadow-lg hover:shadow-brand/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Giriş yapılıyor...
              </>
            ) : (
              "Giriş Yap"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-foreground/25 mt-6">
          Sorun yaşıyorsanız ajansınızla iletişime geçin.
        </p>
      </motion.div>
    </div>
  );
}
