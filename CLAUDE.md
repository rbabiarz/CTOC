# CTOC Command

> Cyber Threat Operations Center — a high-fidelity interactive prototype for a unified, fusion-model SOC command dashboard. Next.js + React + Tailwind, realistic mock data, static-exported to GitHub Pages.

This file is the entry point for context. Read it first, then follow the links below.

## What this project is
CTOC Command is a product/UX exploration of a **fusion-center** SOC dashboard — one
operational lens over SIEM/EDR/NDR/IDP/CASB/DLP/fraud/intel streams, framed by the
Lockheed kill chain and MITRE ATT&CK. It is a clickable prototype, not a production
platform. The mock scenario centers on **Operation TIDEWAVE** (a simulated APT-441
intrusion) with parallel insider-DLP, wire-fraud, and KEV-vuln threads.

Full narrative: [`README.md`](./README.md). Product framing: [`docs/brief.md`](./docs/brief.md).

Owner / lead designer: Robert Babiarz (Senior Product Designer).

## Stack & layout (the real app)
- **Next.js 15 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4.** Static
  export (`output: "export"`) deployed to GitHub Pages.
- Entry: [`app/page.tsx`](./app/page.tsx) → [`components/dashboard/Dashboard.tsx`](./components/dashboard/Dashboard.tsx).
- **Components live in [`components/`](./components/)** (not `src/`): `dashboard/`, `screens/`,
  `kill-chain/`, `triage/`, `ui/`, `theme/`. Shared primitives are in
  [`components/ui/index.tsx`](./components/ui/index.tsx).
- **All styling is in [`app/globals.css`](./app/globals.css)** — a single CSS file of design
  tokens (CSS custom properties) + component classes. There is no Tailwind-class soup in the
  markup; classes are semantic (`.panel`, `.sev--critical`, `.kc__stage`).
- Mock data: [`lib/mock-data.ts`](./lib/mock-data.ts); types: [`lib/types.ts`](./lib/types.ts).

## Commands
```bash
npm run dev             # local dev (Turbopack)
npm run build           # production build + static export to out/
npm run build:pages     # build with GitHub Pages basePath (/CTOC)
npm run validate:theme  # WCAG contrast check on every theme token pair — keep this green
npm run lint
```

## How to work in this repo
- **Design philosophy & principles** live in [`DESIGN.md`](./DESIGN.md). Honor them.
- **Rules** Claude must follow are in [`.claude/rules/`](./.claude/rules/):
  [design-system](./.claude/rules/design-system.md), [accessibility](./.claude/rules/accessibility.md),
  [code-style](./.claude/rules/code-style.md), [content-voice](./.claude/rules/content-voice.md).
- **Design tokens** are the source of truth for every visual value. At **runtime** they are
  the CSS custom properties in [`app/globals.css`](./app/globals.css); they are **documented /
  exported** in [`design-tokens.json`](./design-tokens.json) and the three-tier
  [`tokens/`](./tokens/) split. Never hardcode color, spacing, type, radius, or shadow in a
  component — reference a token. If a value lives only in an inline `style={{}}`, it should
  reference `var(--token)`.
- **Design-system docs** describe foundations, components, and patterns in
  [`design-system/`](./design-system/). Generate new UI on-system.
- **Product context** (brief, PRD, decisions, personas, IA) lives in [`docs/`](./docs/).
- **Inspiration, research, brand, and the Figma build** live in [`reference/`](./reference/).

## Non-negotiable constraints (project house style)
- **Severity is the only color system.** Monochrome cream/ink (light) and warm-charcoal
  (dark) base; color is reserved for severity (critical → low) and never decorative.
- **No stoplight semantics by hue alone.** Severity always pairs color with a glyph/label
  (the `Sev` pill, status dots with text). Meaning must survive without color (WCAG 1.4.1).
- **WCAG 2.2 AA is part of done.** The app is axe-clean across all 13 screens in both themes;
  `npm run validate:theme` must pass. See [`.claude/rules/accessibility.md`](./.claude/rules/accessibility.md).
- **Density is a feature.** This is an operator tool; favor information density and the
  established compact scale over whitespace.

## Conventions
- Decisions get logged in [`docs/design-decisions.md`](./docs/design-decisions.md) (ADR style).
- Open questions go in [`docs/open-questions.md`](./docs/open-questions.md).
- Notable changes go in [`docs/changelog.md`](./docs/changelog.md).

## Personal / machine-local context
See [`CLAUDE.local.md`](./CLAUDE.local.md) — gitignored, for notes specific to your machine.
