import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MetricsBar } from './MetricsBar';
import { useAsync } from '@/hooks/useAsync';

vi.mock('@/hooks/useAsync', () => ({
  useAsync: vi.fn(),
}));

const REFRESH_MS = 15_000;

describe('MetricsBar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('keeps the auto-refresh interval on schedule', () => {
    const mockRefresh = vi.fn();
    (useAsync as any).mockReturnValue({
      state: { status: 'ready', data: { activeAnchors: 50, anchors: 100, pools: 10, totalLiquidity: 500000, settlements: 1000, pendingSettlements: 5 } },
      reload: mockRefresh,
    });

    render(<MetricsBar />);

    act(() => {
      vi.advanceTimersByTime(30000);
    });

    expect(mockRefresh).toHaveBeenCalled();
  });

  it('handles unmount mid-refresh without warnings', () => {
    const mockRefresh = vi.fn();
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    (useAsync as any).mockReturnValue({
      state: { status: 'loading' },
      reload: mockRefresh,
    });

    const { unmount } = render(<MetricsBar />);

    act(() => {
      unmount();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(consoleWarn).not.toHaveBeenCalled();
    consoleWarn.mockRestore();
  });

  it('does not update state after unmount when interval-triggered refresh resolves', async () => {
    let resolvePending: (value: unknown) => void;
    const pendingPromise = new Promise((resolve) => {
      resolvePending = resolve;
    });

    const mockRefresh = vi.fn(() => pendingPromise);
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    (useAsync as any).mockReturnValue({
      state: { status: 'ready', data: { activeAnchors: 50, anchors: 100, pools: 10, totalLiquidity: 500000, settlements: 1000, pendingSettlements: 5 } },
      reload: mockRefresh,
    });

    const { unmount } = render(<MetricsBar />);

    act(() => {
      vi.advanceTimersByTime(REFRESH_MS);
    });

    expect(mockRefresh).toHaveBeenCalledTimes(1);

    act(() => {
      unmount();
    });

    await act(async () => {
      resolvePending!({ activeAnchors: 50, anchors: 100, pools: 10, totalLiquidity: 500000, settlements: 1000, pendingSettlements: 5 });
    });

    const stateUpdateWarnings = consoleError.mock.calls.filter(
      (call: any[]) =>
        typeof call[0] === 'string' &&
        (call[0].includes('state update') || call[0].includes('unmounted'))
    );
    expect(stateUpdateWarnings).toHaveLength(0);

    consoleError.mockRestore();
  });
});
