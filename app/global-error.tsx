"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold">Something went wrong.</h2>
          <p className="text-muted-foreground">Please try again in a moment.</p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

