export default function ComposeLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 animate-pulse">
      {/* Header */}
      <div className="mb-10">
        <div className="h-8 w-56 bg-muted rounded-md mb-3" />
        <div className="h-4 w-96 bg-muted rounded-md" />
      </div>

      {/* Pattern selection grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-border/60 bg-card p-4"
          >
            <div className="h-5 w-32 bg-muted rounded-md mb-2" />
            <div className="h-3 w-full bg-muted rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
