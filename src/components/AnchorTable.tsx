import { Anchor } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { EmptyState } from "./EmptyState";

/** Renders registered anchors with an optional deregister action. */
export function AnchorTable({
  anchors,
  onDeregister,
}: {
  anchors: Anchor[];
  onDeregister?: (id: string) => void;
}) {
  if (anchors.length === 0) {
    return <EmptyState message="No anchors registered yet." />;
  }

  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-zinc-800 text-zinc-400">
          <th className="py-2 font-medium">Anchor</th>
          <th className="py-2 font-medium">Registered</th>
          <th className="py-2 font-medium">Status</th>
          {onDeregister ? <th className="py-2" /> : null}
        </tr>
      </thead>
      <tbody>
        {anchors.map((anchor) => (
          <tr key={anchor.id} className="border-b border-zinc-900">
            <td className="py-2">
              <div className="text-zinc-100">{anchor.name}</div>
              <div className="font-mono text-xs text-zinc-500">{anchor.id}</div>
            </td>
            <td className="py-2 text-zinc-400">
              {formatDate(anchor.registeredAt)}
            </td>
            <td className="py-2 text-zinc-300">
              {anchor.active ? "Active" : "Inactive"}
            </td>
            {onDeregister ? (
              <td className="py-2 text-right">
                {anchor.active ? (
                  <button
                    onClick={() => onDeregister(anchor.id)}
                    className="rounded-md px-2 py-1 text-xs text-red-400 hover:text-red-300"
                  >
                    Deactivate
                  </button>
                ) : null}
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
