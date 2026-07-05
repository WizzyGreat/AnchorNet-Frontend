# Changelog

All notable changes to the AnchorNet web app are documented here.

## [0.3.0]

### Added

- **Settlements:** "Load more" pagination over `/api/v1/settlements`, paging
  through `?page=`/`?pageSize=` instead of fetching the full list up front.
- **Validation:** inline, field-level error messages on `AnchorForm` and
  `SettlementForm` instead of silently ignoring an invalid submission.
- **Toasts:** an app-wide `ToastProvider`/`useToast` notification stack,
  surfacing success and error feedback for register, deactivate, open,
  execute and cancel actions.
- **Anchors:** client-side status filter tabs (All / Active / Inactive) over
  the fetched anchor list.
- **Loading UX:** an animated `TableSkeleton` in place of a bare "Loading…"
  line for the anchors, settlements and pools tables.
- **Tests:** Vitest coverage for settlement pagination and the toast stack
  helpers.

## [0.2.0]

### Added

- **Pages:** `/anchors` (register, list, deactivate) and `/settlements` (open,
  execute, cancel), plus a live metrics bar on `/dashboard`.
- **API clients:** anchors, settlements and metrics clients on a shared
  `apiRequest` helper.
- **Wallet:** a mock wallet connect (`WalletProvider`, `useWallet`,
  `ConnectButton`) in the header.
- **Hooks:** `useAsync` (with silent `refresh`) and `useInterval` for polling.
- **UI:** StatusBadge, Spinner, EmptyState, tables, forms and panels for anchors
  and settlements; shared site footer.
- **Tests:** Vitest coverage for the API clients and formatting/wallet helpers.

## [0.1.0]

### Added

- Initial landing page and a liquidity dashboard with pools and a routing quote
  form, backed by a typed API client and Vitest setup.
