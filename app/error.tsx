"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-red-400 text-sm font-medium tracking-widest uppercase mb-4">Hata</p>
      <h2 className="text-3xl font-bold text-foreground mb-3">Bir şeyler ters gitti</h2>
      <p className="text-foreground/50 max-w-md mb-8">
        Beklenmedik bir hata oluştu. Sayfayı yenilemeyi deneyin.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-6 py-3 rounded-xl bg-brand text-white font-medium hover:bg-brand/90 transition-colors cursor-pointer"
        >
          Tekrar Dene
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl border border-border text-foreground/70 font-medium hover:border-brand/50 transition-colors"
        >
          Ana Sayfa
        </Link>
      </div>
    </div>
  );
}
