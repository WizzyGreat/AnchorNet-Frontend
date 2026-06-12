# anchornet-frontend

Web app for **AnchorNet** — the liquidity coordination network for Stellar anchors. Built with Next.js for wallets, payment UI, and Stellar integration.

## Overview

- **Stack:** Next.js, React, TypeScript, Tailwind CSS
- **Role:** User-facing UI for payments and Stellar wallet integration

## Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

## Setup

```bash
# Clone the repo (or use your fork)
git clone <repo-url>
cd anchornet-frontend

# Install dependencies
npm install

# Run in development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

The dashboard talks to the AnchorNet API. Copy `.env.example` to `.env.local`
and point it at your backend:

```bash
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Pages

- `/` – landing page with an overview and a link to the dashboard
- `/dashboard` – live liquidity dashboard:
  - summary stats (assets, total liquidity, anchor positions)
  - a table of aggregated pools with loading / error / empty states
  - a routing **quote form** that previews fees, deliverable amount, and route

### Structure

```
src/app/         routes (landing, dashboard)
src/components/   UI (Card, StatCard, PoolTable, PoolsPanel, QuoteForm, SiteHeader)
src/lib/          types, formatting helpers, API client
```

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run lint (used in CI) |

## Contributing

1. Fork the repo and create a branch from `main`.
2. Install deps: `npm install`. Run `npm run lint` and `npm run build`.
3. Open a pull request. CI runs lint, build, and test on push/PR to `main`.

## License

MIT
