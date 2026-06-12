"use client";

import { useCallback, useState } from "react";
import {
  fetchAnchors,
  registerAnchor,
  deregisterAnchor,
} from "@/lib/anchorsApi";
import { useAsync } from "@/hooks/useAsync";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import { AnchorForm } from "./AnchorForm";
import { AnchorTable } from "./AnchorTable";

/** Client panel for listing and managing anchors. */
export function AnchorsPanel() {
  const load = useCallback((signal: AbortSignal) => fetchAnchors(signal), []);
  const { state, reload } = useAsync(load);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function register(input: { id: string; name?: string }) {
    setPending(true);
    setError(null);
    try {
      await registerAnchor(input);
      reload();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setPending(false);
    }
  }

  async function deregister(id: string) {
    setError(null);
    try {
      await deregisterAnchor(id);
      reload();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Deactivation failed");
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-3 text-sm font-semibold text-zinc-200">
          Register anchor
        </h2>
        <AnchorForm onSubmit={register} pending={pending} />
        {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
      </Card>
      <Card>
        {state.status === "loading" ? (
          <Spinner label="Loading anchors…" />
        ) : state.status === "error" ? (
          <p className="text-sm text-red-400">{state.message}</p>
        ) : (
          <AnchorTable anchors={state.data} onDeregister={deregister} />
        )}
      </Card>
    </div>
  );
}
