import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useAsync } from "./useAsync";

describe("useAsync", () => {
  it("starts in the loading state and resolves to ready", async () => {
    const { result } = renderHook(() => useAsync(async () => "data"));

    expect(result.current.state.status).toBe("loading");

    await waitFor(() => {
      expect(result.current.state).toEqual({ status: "ready", data: "data" });
    });
  });

  it("surfaces a rejected loader as an error state", async () => {
    const { result } = renderHook(() =>
      useAsync(async () => {
        throw new Error("boom");
      }),
    );

    await waitFor(() => {
      expect(result.current.state).toEqual({
        status: "error",
        message: "boom",
      });
    });
  });

  it("reload re-runs the loader and shows loading again", async () => {
    const load = vi.fn().mockResolvedValue("value");
    const { result } = renderHook(() => useAsync(load));

    await waitFor(() => expect(result.current.state.status).toBe("ready"));

    act(() => result.current.reload());
    expect(result.current.state.status).toBe("loading");

    await waitFor(() => expect(result.current.state.status).toBe("ready"));
    expect(load).toHaveBeenCalledTimes(2);
  });

  it("refresh re-runs the loader without showing a loading state", async () => {
    const load = vi.fn().mockResolvedValue("value");
    const { result } = renderHook(() => useAsync(load));

    await waitFor(() => expect(result.current.state.status).toBe("ready"));

    act(() => result.current.refresh());
    expect(result.current.state.status).toBe("ready");

    await waitFor(() => expect(load).toHaveBeenCalledTimes(2));
  });
});
