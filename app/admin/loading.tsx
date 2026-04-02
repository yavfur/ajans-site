import { SkeletonCard } from "@/components/LoadingSkeleton";

export default function AdminLoading() {
  return (
    <div className="max-w-5xl">
      <div className="h-8 w-40 bg-muted rounded-lg animate-pulse mb-8" />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
