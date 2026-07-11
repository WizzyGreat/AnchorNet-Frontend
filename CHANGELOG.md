# Changelog

All notable changes to the AnchorNet web app are documented here.

## [0.5.0]

### Added

- **Sorting:** the anchors table (Anchor / Registered / Status) and the pools
  table (Asset / Total liquidity / Anchors) are now sortable, matching the
  settlements table.
- **Search:** a client-side search box on the anchors panel (matches id/name)
  and the settlements panel (matches id/anchor/asset), layered on top of the
  existing status filter tabs and sortable columns.
- **Confirmation dialogs:** deactivating an anchor or cancelling a settlement
  now opens a `ConfirmDialog` instead of firing immediately, on both the list
  panels and their detail pages.
- **Wallet:** the mock wallet connection is persisted to `localStorage`, so a
  connected account survives a page refresh.
- **Tests:** component coverage for `AnchorTable`/`PoolTable` sorting,
  `ConfirmDialog`, `AnchorForm`/`SettlementForm` validation, the
  `matchesQuery` search helper, and wallet session persistence.

## [0.4.0]

### Added

- **Detail pages:** `/anchors/[id]` and `/settlements/[id]`, showing full
  record detail (status, dates, fees) with their own deactivate/execute/cancel
  actions, linked from the anchors and settlements tables.
- **API clients:** `fetchAnchor` and `fetchSettlement` single-record lookups
  against `GET /api/v1/anchors/:id` and `GET /api/v1/settlements/:id`.
- **Sorting:** a reusable `useSortableData` hook, and sortable Anchor / Amount
  / Status columns on the settlements table.
- **Tests:** component-level coverage with React Testing Library under a
  jsdom Vitest environment (`StatusBadge`, `ToastProvider`,
  `SettlementTable`), plus coverage for `useSortableData` and the new API
  client methods.

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
