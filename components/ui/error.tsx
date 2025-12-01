import { AlertTriangle, RefreshCw } from "lucide-react";

export function ErrorCard({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 shadow-sm dark:border-red-800 dark:bg-red-950/10">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 text-red-500" />
        <div className="space-y-2">
          <h3 className="font-semibold text-red-900 dark:text-red-100">
            {title}
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-900 transition-colors hover:bg-red-200 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800"
            >
              <RefreshCw className="h-3 w-3" />
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ErrorPage({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <ErrorCard title={title} message={message} onRetry={onRetry} />
    </div>
  );
}
