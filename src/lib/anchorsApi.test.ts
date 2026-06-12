import { describe, it, expect, vi, afterEach } from "vitest";
import { fetchAnchors, registerAnchor, deregisterAnchor } from "./anchorsApi";
import { ApiRequestError } from "./api";

function mockFetch(status: number, body: unknown) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    statusText: "Mock",
    json: async () => body,
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("anchorsApi", () => {
  it("fetches the anchors array", async () => {
    vi.stubGlobal(
      "fetch",
      mockFetch(200, {
        anchors: [
          { id: "a", name: "A", registeredAt: "", active: true },
        ],
      }),
    );

    const anchors = await fetchAnchors();
    expect(anchors).toHaveLength(1);
    expect(anchors[0].id).toBe("a");
  });

  it("registers an anchor", async () => {
    vi.stubGlobal(
      "fetch",
      mockFetch(201, { id: "a", name: "A", registeredAt: "", active: true }),
    );

    const anchor = await registerAnchor({ id: "a" });
    expect(anchor.active).toBe(true);
  });

  it("surfaces a conflict error", async () => {
    vi.stubGlobal(
      "fetch",
      mockFetch(409, { error: { code: "CONFLICT", message: "exists" } }),
    );

    await expect(registerAnchor({ id: "a" })).rejects.toBeInstanceOf(
      ApiRequestError,
    );
  });

  it("deregisters an anchor", async () => {
    vi.stubGlobal(
      "fetch",
      mockFetch(200, { id: "a", name: "A", registeredAt: "", active: false }),
    );

    const anchor = await deregisterAnchor("a");
    expect(anchor.active).toBe(false);
  });
});
