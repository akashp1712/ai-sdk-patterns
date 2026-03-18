export default function PatternDetailLoading() {
  return (
    <div className="animate-pulse">
      {/* Title */}
      <div className="mb-10">
        <div className="h-8 w-64 bg-muted rounded-md mb-3" />
        <div className="h-4 w-full max-w-xl bg-muted rounded-md mb-2" />
        <div className="h-4 w-2/3 max-w-xl bg-muted rounded-md" />

        {/* Chips */}
        <div className="flex gap-2 mt-5">
          <div className="h-6 w-16 bg-muted rounded-md" />
          <div className="h-6 w-20 bg-muted rounded-md" />
          <div className="h-6 w-14 bg-muted rounded-md" />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mb-6">
        <div className="h-9 w-24 bg-muted rounded-lg" />
        <div className="h-9 w-20 bg-muted rounded-lg" />
        <div className="h-9 w-20 bg-muted rounded-lg" />
        <div className="h-9 w-24 bg-muted rounded-lg" />
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-border/60 pb-3">
        <div className="h-5 w-16 bg-muted rounded-md" />
        <div className="h-5 w-12 bg-muted rounded-md" />
      </div>

      {/* Preview area */}
      <div className="rounded-lg border-2 border-border bg-card p-6 min-h-[400px]">
        <div className="h-10 w-full bg-muted rounded-md mb-4" />
        <div className="space-y-3">
          <div className="h-12 w-3/4 bg-muted rounded-lg" />
          <div className="h-12 w-5/6 bg-muted rounded-lg" />
          <div className="h-12 w-2/3 bg-muted rounded-lg" />
        </div>
      </div>
    </div>
  );
}
