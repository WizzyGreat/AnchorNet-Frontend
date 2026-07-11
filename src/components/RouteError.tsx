"use client";

import { Card } from "./Card";

/**
 * Shared fallback rendered by a route segment's `error.tsx` boundary when a
 * page throws while rendering. `reset` re-renders the segment in place,
 * without a full page reload.
 */
export function RouteError({
  error,
  reset,
  title = "Something went wrong",
}: {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
}) {
  return (
    <Card>
      <h2 className="text-sm font-semibold text-red-400">{title}</h2>
      <p className="mt-2 text-sm text-zinc-400">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-lg bg-zinc-800 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-700"
      >
        Try again
      </button>
    </Card>
  );
}
