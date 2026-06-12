"use client";

import { useCallback, useEffect, useState } from "react";
import { Pool } from "@/lib/types";
import { fetchPools } from "@/lib/api";
import { formatAmount } from "@/lib/format";
import { Card } from "./Card";
import { StatCard } from "./StatCard";
import { PoolTable } from "./PoolTable";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; pools: Pool[] };

/** Client panel that loads liquidity pools and renders summary stats. */
export function PoolsPanel() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [nonce, setNonce] = useState(0);

  const reload = useCallback(() => {
    setState({ status: "loading" });
    setNonce((n) => n + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchPools(controller.signal)
      .then((pools) => setState({ status: "ready", pools }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const message =
          err instanceof Error ? err.message : "Failed to load pools";
        setState({ status: "error", message });
      });

    return () => controller.abort();
  }, [nonce]);

  if (state.status === "loading") {
    return (
      <Card>
        <p className="text-sm text-zinc-400">Loading pools…</p>
      </Card>
    );
  }

  if (state.status === "error") {
    return (
      <Card>
        <p className="text-sm text-red-400">
          Could not reach the API: {state.message}
        </p>
        <button
          onClick={reload}
          className="mt-3 rounded-lg bg-zinc-800 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-700"
        >
          Retry
        </button>
      </Card>
    );
  }

  const totalLiquidity = state.pools.reduce((sum, p) => sum + p.total, 0);
  const positions = state.pools.reduce((sum, p) => sum + p.anchors, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Assets" value={String(state.pools.length)} />
        <StatCard
          label="Total liquidity"
          value={formatAmount(totalLiquidity)}
        />
        <StatCard
          label="Anchor positions"
          value={String(positions)}
          hint="across all assets"
        />
      </div>
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-200">Pools</h2>
          <button
            onClick={reload}
            className="rounded-lg px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200"
          >
            Refresh
          </button>
        </div>
        <PoolTable pools={state.pools} />
      </Card>
    </div>
  );
}
