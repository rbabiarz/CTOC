# Changelog — CTOC Command

Newest at top. Design/UX-level notable changes (code-level history is in git).

## 2026-06-29
- **UI primitive extraction + library.** Closed the gap where only 5 Figma components had a real
  `components/ui` counterpart.
  - *Extracted* the genuinely-inline patterns into shared primitives and refactored every call
    site (operations, domains, kill-chain, triage): `StatusDot` (~30 inline status spans),
    `KeyValueList`, `StepProgress`, `Table` + `ClickableRow`, `Feed`.
  - *Built* the missing library primitives (token-driven, accessible): `Field`, `Input`,
    `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Tabs`, `Segmented`, `Modal`, `Alert`,
    `Toast`, `Breadcrumbs`, `Pagination`, `Avatar`, `Empty`, `Spinner`, `Combobox`, `Menu`,
    `Accordion`, `Slider`.
  - **Code Connect** mappings grew **5 → 22** in [`code-connect/`](../code-connect/) — every
    reusable design-system component now maps to a real `components/ui` primitive (only the
    App Shell chrome remains, which is a template composition, not a primitive).
  - **Docs portal** component gallery expanded to all 22 primitives with live examples in
    [`design-system/site/index.html`](../design-system/site/index.html).

## 2026-06-28
- **HTML documentation portal** at [`design-system/site/index.html`](../design-system/site/index.html)
  — a self-contained, token-driven docs site (Overview · Foundations · Build · Standards) with
  live examples, a light/dark toggle, hash routing, and full keyboard/AT support.
- **Figma design system** stood up in
  [CTOC Design System](https://www.figma.com/design/PzFJgRmPVjwzx40af9jQne/CTOC-Design-System):
  153 variables (Light/Dark/High-Contrast modes) + 13 styles, ~29 components, 6 patterns, and
  5 page templates + a reusable App Shell — mirroring the `app/globals.css` / `tokens/` system.
- **Code Connect** authored in [`code-connect/`](../code-connect/) — `figma.connect()` mappings
  for Btn · Sev · Tag · KPI · Panel → their Figma components. Publishing is blocked on a Figma
  Org/Enterprise plan (file is Pro); files are ready for `npm run code-connect:publish`.
- Scaffolded the **deep-dive workspace**: `CLAUDE.md`, `DESIGN.md`, `.claude/` toolkit,
  three-tier `tokens/`, `docs/`, `design-system/`, `reference/` — all CTOC-specific.
- **Punchier critical reds:** brightened `--sev-critical` to `#d81b2a`, solid red critical
  pill, vivid contrast-aware risk heatmap (still AA).
- **Single icon theme toggle** replacing the LIGHT/DARK button pair (space saving).

## 2026-06-27
- **WCAG 2.2 AA / AODA pass:** semantic buttons everywhere, real modal triage dialog (focus
  trap + restore), off-canvas nav focus management, skip link, chart text alternatives,
  heading structure, `validate:theme` + axe-core gate (0 violations × 13 screens × 2 themes).
- **Full responsive pass:** off-canvas sidebar < 1024px, stacking panels, reflowing KPI strips,
  horizontal-scroll dense tables/matrices, `100dvh` shell.

## Earlier (2026)
- App-wide light/dark theme with WCAG-validated contrast tokens.
- Built the full prototype: 13 screens (Operations / Domains / Reporting), Fusion Kill Chain,
  Triage Drawer, TIDEWAVE mock scenario.
- Figma source-of-truth build (file `i3YWhwkly7iJEmk0tK3YJ7`) and GitHub Pages deploy.
