"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { isAbortError } from "@/lib/api";

export type AsyncState<T> =
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "ready"; data: T };

interface UseAsyncOptions {
    /** Debounce the initial load by this many milliseconds */
    debounceMs?: number;
}

/**
 * Runs an abortable async loader on mount and exposes a reload trigger.
 * If options.debounceMs is provided, the initial load is debounced.
 */
export function useAsync<T>(
    load: (signal: AbortSignal) => Promise<T>,
    initialState: AsyncState<T> = { status: "loading" },
    options: UseAsyncOptions = {}
): {
    state: AsyncState<T>;
    reload: () => void;
} {
    const { debounceMs } = options;

    const [state, setState] = useState<AsyncState<T>>(initialState);
    const abortControllerRef = useRef<AbortController | null>(null);
    const mountedRef = useRef(true);
    const reloadRef = useRef<() => void>(() => {});

    const execute = useCallback(
        async (signal: AbortSignal) => {
            try {
                const data = await load(signal);
                if (mountedRef.current) {
                    setState({ status: "ready", data });
                }
            } catch (err) {
                if (isAbortError(err)) return;
                if (mountedRef.current) {
                    setState({
                        status: "error",
                        message: err instanceof Error ? err.message : "Request failed",
                    });
                }
            }
        },
        [load]
    );

    const reload = useCallback(() => {
        // Cancel any in-flight request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;
        setState({ status: "loading" });
        execute(controller.signal);
    }, [execute]);

    // Keep the latest reload function in a ref so the effect below can call it
    reloadRef.current = reload;

    useEffect(() => {
        mountedRef.current = true;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const startLoad = () => {
            const controller = new AbortController();
            abortControllerRef.current = controller;
            execute(controller.signal);
        };

        if (debounceMs && debounceMs > 0) {
            timeoutId = setTimeout(startLoad, debounceMs);
        } else {
            startLoad();
        }

        return () => {
            mountedRef.current = false;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [execute, debounceMs]);

    return { state, reload };
}