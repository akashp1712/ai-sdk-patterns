export default function PatternsLoading() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-muted rounded-md mb-3" />
        <div className="h-4 w-80 bg-muted rounded-md" />
      </div>

      {/* Filter bar skeleton */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-20 bg-muted rounded-md" />
        ))}
      </div>

      {/* Card grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-border/60 bg-card p-5"
          >
            <div className="h-5 w-40 bg-muted rounded-md mb-3" />
            <div className="h-4 w-full bg-muted rounded-md mb-2" />
            <div className="h-4 w-2/3 bg-muted rounded-md mb-4" />
            <div className="flex gap-2">
              <div className="h-5 w-16 bg-muted rounded-md" />
              <div className="h-5 w-20 bg-muted rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
