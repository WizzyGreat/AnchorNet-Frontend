/**
 * Wallet helpers for the demo connect flow.
 *
 * This is a stand-in for a real Stellar wallet integration (e.g. Freighter):
 * it models a connected account and address formatting without signing.
 */

export interface WalletAccount {
  /** Stellar public key (G... address). */
  address: string;
}

/** Shortens an address for display, e.g. "GABC…WXYZ". */
export function truncateAddress(address: string, visible = 4): string {
  if (address.length <= visible * 2 + 1) return address;
  return `${address.slice(0, visible)}…${address.slice(-visible)}`;
}

/** Produces a deterministic mock Stellar address from a seed. */
export function mockAddress(seed = "ANCHORNET"): string {
  const body = seed
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .padEnd(55, "X")
    .slice(0, 55);
  return `G${body}`;
}
