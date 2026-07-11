/**
 * API client for anchor registry endpoints.
 */

import { apiRequest } from "./api";
import { Anchor } from "./types";

/** Fetches all registered anchors. */
export async function fetchAnchors(signal?: AbortSignal): Promise<Anchor[]> {
  const body = await apiRequest<{ anchors: Anchor[] }>("/api/v1/anchors", {
    signal,
  });
  return body.anchors;
}

/** Fetches a single anchor by id. */
export async function fetchAnchor(
  id: string,
  signal?: AbortSignal,
): Promise<Anchor> {
  return apiRequest<Anchor>(`/api/v1/anchors/${encodeURIComponent(id)}`, {
    signal,
  });
}

/** Registers a new anchor. */
export async function registerAnchor(input: {
  id: string;
  name?: string;
}): Promise<Anchor> {
  return apiRequest<Anchor>("/api/v1/anchors", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

/** Deactivates an anchor by id. */
export async function deregisterAnchor(id: string): Promise<Anchor> {
  return apiRequest<Anchor>(`/api/v1/anchors/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
