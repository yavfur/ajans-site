export function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-background animate-pulse">
      <div className="w-10 h-10 rounded-xl bg-muted mb-4" />
      <div className="h-6 w-16 bg-muted rounded-lg mb-2" />
      <div className="h-3 w-24 bg-muted/60 rounded" />
      {lines > 3 && Array.from({ length: lines - 3 }).map((_, i) => (
        <div key={i} className="h-3 bg-muted/40 rounded mt-2" />
      ))}
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-border animate-pulse last:border-0">
      <div className="w-8 h-8 rounded-full bg-muted shrink-0" />
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="h-3 w-32 bg-muted rounded" />
        <div className="h-2.5 w-48 bg-muted/60 rounded" />
      </div>
      <div className="h-5 w-16 rounded-full bg-muted" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="flex gap-4 px-5 py-3.5 border-b border-border bg-background/50 animate-pulse">
        {[120, 160, 100, 80].map((w, i) => (
          <div key={i} className="h-3 rounded bg-muted" style={{ width: w }} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}
