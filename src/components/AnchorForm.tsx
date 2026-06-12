"use client";

import { FormEvent, useState } from "react";

const inputClass =
  "w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm " +
  "text-zinc-100 outline-none focus:border-zinc-600";

/** Form for registering a new anchor. Calls `onSubmit` with the form values. */
export function AnchorForm({
  onSubmit,
  pending,
}: {
  onSubmit: (input: { id: string; name?: string }) => void;
  pending?: boolean;
}) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (id.trim() === "") return;
    onSubmit({ id: id.trim(), name: name.trim() || undefined });
    setId("");
    setName("");
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Anchor id (account or domain)"
        className={inputClass}
      />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Display name (optional)"
        className={inputClass}
      />
      <button
        type="submit"
        disabled={pending}
        className="shrink-0 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
      >
        Register
      </button>
    </form>
  );
}
