# Project Agent Guide

## Project Snapshot
- Repository: `marcojourney/mini-app`
- Framework: Next.js 16 + React 19 + TypeScript
- UI libraries: Tailwind CSS 4, Ant Design, Lucide icons

## Current App State
- Active route component: `/src/app/argri/page.tsx`
- Global wrapper and metadata: `/src/app/layout.tsx`
- Styling: `/src/app/globals.css`
- Several prototype pages are stored as `.txt` files under `/src/app/**/page.txt` (not active routes until converted to `.tsx`).

## Key Commands
Run from: `/home/runner/work/mini-app/mini-app`

```bash
npm ci
npm run dev
npm run lint
npm run build
```

## Notes for Future Agents
- `npm run lint` currently fails on an existing unescaped apostrophe warning in `/src/app/argri/page.tsx`.
- `npm run build` currently fails in sandboxed/offline environments because Google font assets (Geist/Geist Mono) cannot be fetched.
- Dependencies are already managed with `package-lock.json`; prefer `npm ci` for reproducible installs.

## Suggested Working Flow
1. Install dependencies (`npm ci`).
2. Start dev server and verify route behavior (`npm run dev`).
3. Make small, scoped changes.
4. Re-run lint/build to confirm no regressions.
