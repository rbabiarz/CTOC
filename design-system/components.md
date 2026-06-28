# Components — CTOC Command

Real inventory. Shared primitives are in
[`components/ui/index.tsx`](../components/ui/index.tsx); composed pieces live under their domain
folders. All are token-driven and keyboard-accessible.

## Template
### `<Name>` — file
- **Purpose / Variants / States / Tokens / A11y notes**

## Primitives (`components/ui`)
### `Btn` — `components/ui/index.tsx`
- **Purpose:** the one button. **Variants:** `primary`, `danger`, `ghost` (+ default). **Size:**
  `xs`. **Modifier:** `active`. **States:** default, hover, focus-visible, active, disabled.
- **Tokens:** `--color-ink` / `--btn-danger-bg` / `--panel-bg`, `--rounded-sm`, min-height 24px.
- **A11y:** real `<button type>`; visible focus ring; ≥24px target.

### `Sev` — severity pill
- **Variants:** `critical` (solid red, white text + white square), `high`, `medium`, `low`,
  `resolved` (tinted bg + `-text`/fill). **Always** renders a square glyph (`.sq`, `aria-hidden`)
  + a text label → meaning survives without color.

### `Tag`
- Static chip (`<span>`) or, when given `onClick`, a real `<button>`. Mono, tinted.

### `KPI`
- **Props:** `label`, `value`, `delta`, `deltaDir` (up/down/flat), `footer`, `accent="crit"`.
  Delta arrow is `aria-hidden` (the +/− sign carries direction). `crit` accent = bright value +
  red-tinted card glow.

### `Panel`
- Section wrapper: `title` (renders an **`<h2>`**), `sub`, `toolbar`, `flush` body. The unit
  every screen is built from.

### `BarRow`
- Labeled horizontal bar (`label`, `value`, `max`, `severity`, `suffix`). Value shown as text.

### `Spark`
- Inline SVG sparkline. **Decorative** (`aria-hidden`) — the number beside it carries the data.

## Shell (`components/dashboard`)
- **`Sidebar`** — semantic `nav > ul > li > button` list, three groups, active item
  (`aria-current="page"`), count badges, severity dots (`aria-hidden` + sr-only word). Off-canvas
  + `inert` when hidden on mobile.
- **`Topbar`** — brand, hamburger (`aria-expanded`/`controls`), range chips (`aria-pressed`
  group), search/filters/saved-views, theme toggle, live UTC clock.
- **`Dashboard`** — shell + screen router (`ScreenId` switch) + skip link + nav focus mgmt.

## Domain components
- **`KillChainStrip`** (`kill-chain`) — 7 stage `<button>`s (`aria-pressed`), conf bars.
- **`MitreGrid`** — technique cells; hit cells are `<button>`s (open triage), others static.
- **`AssetMap`** — blast-radius topology; nodes are `<button>`s with `aria-label`; the SVG is
  `role="img"`.
- **`Timeline`** — events render as `<button>`s when interactive, else static.
- **`TriageDrawer`** (`triage`) — modal `role="dialog"` `aria-modal` with focus trap + restore;
  sections: workflow steps, alert context (`dl`), related signals, recommended playbooks, notes.
- **`RiskHeatmap`** (`screens/domains`) — BU × severity grid; opaque blended cells with
  auto black/white text computed per cell for AA in both themes; `role="img"`.
- **`ThemeToggle`** (`theme`) — single icon button (☀/☾), `aria-pressed` + `aria-label`.

## States checklist (for any new interactive component)
default · hover · focus-visible · active · disabled · loading · error — and the keyboard path.
