export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 ${className}`} />
  );
}

export function LoadingPage() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="space-y-4 text-center">
        <LoadingSpinner className="mx-auto h-8 w-8" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="rounded-2xl border bg-background/80 p-6 shadow-sm">
      <div className="space-y-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
