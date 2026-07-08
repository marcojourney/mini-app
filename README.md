# mini-app

`mini-app` is a Next.js project for experimenting with mini app UI concepts.

## Current app route

- Main implemented page: `/argri` (`src/app/argri/page.tsx`)

The repository also contains additional prototype screens in `.txt` files under `src/app/**`, but they are not currently active Next.js routes.

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
npm ci
```

## Run locally

```bash
npm run dev
```

Then open [http://localhost:3000/argri](http://localhost:3000/argri).

## Available scripts

- `npm run dev` — start development server
- `npm run lint` — run ESLint
- `npm run build` — build production bundle
- `npm run start` — run production server

## Notes

- This project uses `next/font/google` in `src/app/layout.tsx`.
