export default function PageSkeleton() {
  return (
    <div
      className="w-full max-w-[1100px] mx-auto px-4 md:px-6 lg:px-8 pt-6 pb-28 lg:pb-12 flex flex-col gap-5"
      aria-busy="true"
      aria-label="Memuat halaman"
    >
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-3.5 w-32 rounded-lg skeleton-shimmer" />
        <div className="h-8 w-52 rounded-xl skeleton-shimmer" />
      </div>

      {/* Hero Card Skeleton */}
      <div className="h-44 w-full rounded-[1.75rem] skeleton-shimmer" />

      {/* List Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-20 rounded-2xl bg-bg-surface border border-border p-4 flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-xl skeleton-shimmer shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/5 rounded-md skeleton-shimmer" />
              <div className="h-3 w-2/5 rounded-md skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
