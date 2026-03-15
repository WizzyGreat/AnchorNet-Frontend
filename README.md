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
