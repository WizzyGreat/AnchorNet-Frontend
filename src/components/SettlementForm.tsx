"use client";

import { FormEvent, useState } from "react";

const inputClass =
  "w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm " +
  "text-zinc-100 outline-none focus:border-zinc-600";

/** Form for opening a settlement against a pool. */
export function SettlementForm({
  onSubmit,
  pending,
}: {
  onSubmit: (input: { anchor: string; asset: string; amount: number }) => void;
  pending?: boolean;
}) {
  const [anchor, setAnchor] = useState("");
  const [asset, setAsset] = useState("USDC");
  const [amount, setAmount] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const numeric = Number(amount);
    if (anchor.trim() === "" || !Number.isFinite(numeric) || numeric <= 0) {
      return;
    }
    onSubmit({ anchor: anchor.trim(), asset: asset.trim(), amount: numeric });
    setAmount("");
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-3 sm:grid-cols-4">
      <input
        value={anchor}
        onChange={(e) => setAnchor(e.target.value)}
        placeholder="Anchor id"
        className={inputClass}
      />
      <input
        value={asset}
        onChange={(e) => setAsset(e.target.value)}
        placeholder="Asset"
        className={inputClass}
      />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        inputMode="numeric"
        placeholder="Amount"
        className={inputClass}
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
      >
        Open settlement
      </button>
    </form>
  );
}
