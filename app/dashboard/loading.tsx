import { SkeletonCard } from "@/components/LoadingSkeleton";

export default function DashboardLoading() {
  return (
    <div className="max-w-4xl">
      <div className="h-4 w-24 bg-muted rounded animate-pulse mb-1.5" />
      <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mb-8" />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
