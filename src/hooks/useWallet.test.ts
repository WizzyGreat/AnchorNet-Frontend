import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useWallet } from "./useWallet";

describe("useWallet", () => {
  it("throws when used outside a WalletProvider", () => {
    expect(() => renderHook(() => useWallet())).toThrow(
      "useWallet must be used within a WalletProvider",
    );
  });
});
