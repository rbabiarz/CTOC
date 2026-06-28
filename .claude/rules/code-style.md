# Rule: Code style

- **Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4. Static export
  (`output: "export"`); no server code, no runtime data fetching — all data is mock.
- **Components live in [`components/`](../../components/)**, grouped by domain:
  `dashboard/` (shell: Dashboard, Sidebar, Topbar), `screens/` (operations + domains screens),
  `kill-chain/`, `triage/`, `ui/` (shared primitives), `theme/` (provider + toggle).
- **Styling is centralized in [`app/globals.css`](../../app/globals.css)** as semantic classes
  + tokens. Do NOT scatter Tailwind utility classes across markup; add/extend a semantic class.
  Inline `style={{}}` is acceptable for one-off layout but must reference `var(--token)` for
  any visual value.
- Client components that use state/effects start with `'use client'`.
- One component per file for non-trivial pieces; small related primitives may share a file
  (see `components/ui/index.tsx`).
- Types live in [`lib/types.ts`](../../lib/types.ts); mock data in [`lib/mock-data.ts`](../../lib/mock-data.ts).
  Keep mock data internally consistent with the TIDEWAVE scenario (IDs, timestamps, actors).
- Imports ordered: external, then `@/` aliased/internal, then relative.
- Prefer composition over configuration flags; type and document props.
- Keep `npm run lint`, `npm run build`, and `npm run validate:theme` green before shipping.
