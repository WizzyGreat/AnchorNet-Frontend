import { describe, it, expect } from "vitest";
import { truncateAddress, mockAddress } from "./wallet";

describe("truncateAddress", () => {
  it("shortens a long address", () => {
    expect(truncateAddress("GABCDEFG1234WXYZ")).toBe("GABC…WXYZ");
  });

  it("leaves short addresses untouched", () => {
    expect(truncateAddress("GABC")).toBe("GABC");
  });
});

describe("mockAddress", () => {
  it("produces a 56-character G-address", () => {
    const address = mockAddress();
    expect(address).toHaveLength(56);
    expect(address.startsWith("G")).toBe(true);
  });

  it("is deterministic for a given seed", () => {
    expect(mockAddress("anchorA")).toBe(mockAddress("anchorA"));
  });
});
